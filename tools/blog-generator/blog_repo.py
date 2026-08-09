"""ブログ記事のファイル入出力・検証ロジック。

src/content/blog/{ja,en}/*.md の frontmatter を読み書きし、
CLAUDE.md のブログ運用ルール（日付間隔・SEO文字数・内部リンクなど）を
Python 側でも機械的にチェックできるようにする。
"""

from __future__ import annotations

import datetime as dt
import re
import subprocess
from dataclasses import dataclass, field
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
BLOG_DIRS = {
    "ja": REPO_ROOT / "src" / "content" / "blog" / "ja",
    "en": REPO_ROOT / "src" / "content" / "blog" / "en",
}

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)
SLUG_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")


@dataclass
class ExistingPost:
    stem: str  # ファイル名から拡張子を除いたもの。URL slug と一致する
    lang: str
    date: dt.date
    title: str
    description: str
    tags: list[str] = field(default_factory=list)


def _parse_frontmatter_value(raw: str, key: str) -> str | None:
    m = re.search(rf'^{key}:\s*"(.*)"\s*$', raw, re.MULTILINE)
    if m:
        return m.group(1)
    m = re.search(rf"^{key}:\s*(\S.*)$", raw, re.MULTILINE)
    return m.group(1).strip() if m else None


def _parse_tags(raw: str) -> list[str]:
    m = re.search(r"^tags:\s*\[(.*)\]\s*$", raw, re.MULTILINE)
    if not m:
        return []
    items = re.findall(r'"([^"]*)"', m.group(1))
    return items


def parse_post_file(path: Path, lang: str) -> ExistingPost | None:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        return None
    fm = m.group(1)
    title = _parse_frontmatter_value(fm, "title") or ""
    description = _parse_frontmatter_value(fm, "description") or ""
    date_raw = _parse_frontmatter_value(fm, "date") or ""
    try:
        date = dt.date.fromisoformat(date_raw)
    except ValueError:
        return None
    tags = _parse_tags(fm)
    return ExistingPost(
        stem=path.stem,
        lang=lang,
        date=date,
        title=title,
        description=description,
        tags=tags,
    )


def list_existing_posts(lang: str) -> list[ExistingPost]:
    posts = []
    for path in sorted(BLOG_DIRS[lang].glob("*.md")):
        post = parse_post_file(path, lang)
        if post:
            posts.append(post)
    posts.sort(key=lambda p: p.date)
    return posts


def latest_date(lang: str = "ja") -> dt.date:
    posts = list_existing_posts(lang)
    if not posts:
        raise RuntimeError(f"既存記事が見つかりません: {BLOG_DIRS[lang]}")
    return posts[-1].date


def used_dates(lang: str) -> set[dt.date]:
    return {p.date for p in list_existing_posts(lang)}


def suggest_date(gap_days: int = 3) -> dt.date:
    """既存最新日付 + gap_days を提案する。ja/en どちらにも未使用の日付であることを保証する。"""
    base = latest_date("ja")
    candidate = base + dt.timedelta(days=gap_days)
    taken = used_dates("ja") | used_dates("en")
    while candidate in taken:
        candidate += dt.timedelta(days=1)
    return candidate


def is_date_available(date: dt.date) -> bool:
    taken = used_dates("ja") | used_dates("en")
    return date not in taken


def build_catalog(lang: str, limit: int = 200) -> str:
    """プロンプトに埋め込む「実在する記事一覧」。内部リンクの hallucination 防止用。"""
    posts = list_existing_posts(lang)
    lines = []
    for p in posts[-limit:]:
        lines.append(f"- stem={p.stem} | title={p.title} | desc={p.description[:60]}")
    return "\n".join(lines)


def existing_stems(lang: str) -> set[str]:
    return {p.stem for p in list_existing_posts(lang)}


def build_frontmatter(title: str, description: str, date: dt.date, tags: list[str]) -> str:
    def esc(s: str) -> str:
        # frontmatter は1行の "..." リテラルなので、改行が混入すると YAML が壊れる
        return s.replace('"', '\\"').replace("\r\n", " ").replace("\n", " ").replace("\r", " ")

    tags_literal = "[" + ", ".join(f'"{esc(t)}"' for t in tags) + "]"
    return (
        "---\n"
        f'title: "{esc(title)}"\n'
        f'description: "{esc(description)}"\n'
        f"date: {date.isoformat()}\n"
        f"tags: {tags_literal}\n"
        "---\n"
    )


def post_path(lang: str, date: dt.date, short_slug: str) -> Path:
    if not SLUG_RE.fullmatch(short_slug):
        raise ValueError(
            f"slug が不正です（英小文字+ハイフンのみ許可、パス区切り文字は使用不可）: {short_slug!r}"
        )
    filename = f"{date:%Y%m%d}-{short_slug}.md"
    return BLOG_DIRS[lang] / filename


def write_post(
    lang: str,
    date: dt.date,
    short_slug: str,
    title: str,
    description: str,
    tags: list[str],
    body: str,
    overwrite: bool = False,
) -> Path:
    path = post_path(lang, date, short_slug)
    if path.exists() and not overwrite:
        raise FileExistsError(f"既に存在します: {path}")
    frontmatter = build_frontmatter(title, description, date, tags)
    body = body.strip() + "\n"
    path.write_text(frontmatter + "\n" + body, encoding="utf-8")
    return path


def run_npm(args: list[str], timeout: int = 300) -> tuple[int, str]:
    cmd = ["npm.cmd" if _is_windows() else "npm", *args]
    proc = subprocess.run(
        cmd,
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    return proc.returncode, (proc.stdout or "") + (proc.stderr or "")


def run_npx(args: list[str], timeout: int = 300) -> tuple[int, str]:
    cmd = ["npx.cmd" if _is_windows() else "npx", *args]
    proc = subprocess.run(
        cmd,
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    return proc.returncode, (proc.stdout or "") + (proc.stderr or "")


def git_status() -> str:
    proc = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
    )
    return proc.stdout


def _is_windows() -> bool:
    import platform

    return platform.system() == "Windows"
