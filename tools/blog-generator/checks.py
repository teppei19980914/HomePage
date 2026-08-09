"""CLAUDE.md のブログ SEO チェックリストを機械的に検証するヘルパー群。

reading-time の算出ロジックは src/utils/reading-time.ts の移植（同期はコード
レビュー時に手動で確認すること。アルゴリズム自体を変える場合は両方直す）。
"""

from __future__ import annotations

import re
from dataclasses import dataclass

CJK_RE = re.compile(r"[　-鿿＀-￯]")
JA_CHARS_PER_MIN = 500
EN_WORDS_PER_MIN = 200

GENERIC_TAG_BLOCKLIST = {"AI", "エンジニア", "技術", "プログラミング", "開発", "IT"}


def strip_markdown(raw: str) -> str:
    text = raw
    text = re.sub(r"^---[\s\S]*?---\n*", "", text, flags=re.MULTILINE)
    text = re.sub(r"```[\s\S]*?```", "", text)
    text = re.sub(r"`[^`]*`", "", text)
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^[-*_]{3,}\s*$", "", text, flags=re.MULTILINE)
    text = re.sub(r"[*_~]{1,3}", "", text)
    text = re.sub(r"^>\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"\n{2,}", "\n", text)
    return text.strip()


def estimate_reading_minutes(raw_markdown: str) -> int:
    text = strip_markdown(raw_markdown)
    ja_chars = len(CJK_RE.findall(text))
    latin = CJK_RE.sub(" ", text)
    en_words = len([w for w in latin.split() if w])
    minutes = ja_chars / JA_CHARS_PER_MIN + en_words / EN_WORDS_PER_MIN
    return max(1, round(minutes))


@dataclass
class CheckResult:
    label: str
    ok: bool
    detail: str


def check_title(title: str) -> CheckResult:
    n = len(title)
    ok = 30 <= n <= 60
    return CheckResult("title 文字数 (30-60)", ok, f"{n} 文字")


def check_description(description: str) -> CheckResult:
    n = len(description)
    ok = 120 <= n <= 160
    return CheckResult("description 文字数 (120-160)", ok, f"{n} 文字")


def check_tags(tags: list[str]) -> CheckResult:
    generic = [t for t in tags if t in GENERIC_TAG_BLOCKLIST]
    ok = len(tags) >= 3 and not generic
    detail = f"{len(tags)} 個"
    if generic:
        detail += f" / 汎用的すぎるタグ: {', '.join(generic)}"
    return CheckResult("tags の具体性", ok, detail)


def check_slug(slug: str) -> CheckResult:
    ok = bool(re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug))
    return CheckResult("URL slug (英小文字+ハイフン)", ok, slug)


def check_no_h1(body: str) -> CheckResult:
    m = re.search(r"^#\s+", body, re.MULTILINE)
    return CheckResult("本文中に H1 (# ) がない", not bool(m), "OK" if not m else "見出し # が見つかりました")


def check_no_bare_urls(body: str) -> CheckResult:
    without_links = re.sub(r"\[[^\]]*\]\([^)]*\)", "", body)
    bare = re.findall(r"https?://\S+", without_links)
    ok = not bare
    return CheckResult("裸URLがない", ok, "OK" if ok else f"{len(bare)} 件検出")


def extract_internal_link_stems(body: str, lang: str) -> list[str]:
    pattern = rf"/HomePage/{lang}/blog/([a-z0-9-]+)/"
    return re.findall(pattern, body)


def check_internal_links(body: str, lang: str, existing_stems: set[str], min_links: int = 3) -> CheckResult:
    stems = extract_internal_link_stems(body, lang)
    unknown = [s for s in stems if s not in existing_stems]
    ok = len(stems) >= min_links and not unknown
    detail = f"{len(stems)} 件"
    if unknown:
        detail += f" / 実在しないslug: {', '.join(unknown)}"
    return CheckResult(f"内部リンク {min_links}件以上・実在確認", ok, detail)


def check_reading_time(body: str) -> CheckResult:
    minutes = estimate_reading_minutes(body)
    ok = 3 <= minutes <= 5
    return CheckResult("読了時間 (3-5分)", ok, f"約{minutes}分")


def run_all_checks(
    title: str,
    description: str,
    tags: list[str],
    slug: str,
    body: str,
    lang: str,
    existing_stems: set[str],
) -> list[CheckResult]:
    return [
        check_title(title),
        check_description(description),
        check_tags(tags),
        check_slug(slug),
        check_no_h1(body),
        check_no_bare_urls(body),
        check_internal_links(body, lang, existing_stems),
        check_reading_time(body),
    ]
