/**
 * Markdown 本文から読了時間（分）を算出する。
 *
 * - 日本語: 約 500 文字/分（総務省調査ベース）
 * - 英語: 約 200 単語/分（一般的な成人の読速度）
 * - コードブロック・frontmatter・画像記法は除外
 * - 最低 1 分
 */

/** Markdown からノイズを除去し、本文テキストのみを返す */
function stripMarkdown(raw: string): string {
  return (
    raw
      // frontmatter (---...---) を除去
      .replace(/^---[\s\S]*?---\n*/m, "")
      // コードブロック (```...```) を除去
      .replace(/```[\s\S]*?```/g, "")
      // インラインコード (`...`) を除去
      .replace(/`[^`]*`/g, "")
      // 画像 (![alt](url)) を除去
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // リンク [text](url) → text のみ残す
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // HTML タグを除去
      .replace(/<[^>]+>/g, "")
      // Markdown 見出し記号 (##) を除去
      .replace(/^#{1,6}\s+/gm, "")
      // 水平線 (---) を除去
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // 強調記号 (**, __, ~~) を除去
      .replace(/[*_~]{1,3}/g, "")
      // 引用記号 (>) を除去
      .replace(/^>\s*/gm, "")
      // 連続空行を 1 行に
      .replace(/\n{2,}/g, "\n")
      .trim()
  );
}

/** 日本語文字数をカウント（CJK 統合漢字 + ひらがな + カタカナ + 全角記号） */
function countJapaneseChars(text: string): number {
  const cjk = text.match(/[\u3000-\u9fff\uff00-\uffef]/g);
  return cjk ? cjk.length : 0;
}

/** 英語単語数をカウント（CJK 文字を除いたラテン文字の単語） */
function countEnglishWords(text: string): number {
  // CJK 文字を除去してから単語を数える
  const latin = text.replace(/[\u3000-\u9fff\uff00-\uffef]/g, " ");
  const words = latin.split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

const JA_CHARS_PER_MIN = 500;
const EN_WORDS_PER_MIN = 200;

export function estimateReadingTime(rawMarkdown: string): number {
  const text = stripMarkdown(rawMarkdown);
  const jaChars = countJapaneseChars(text);
  const enWords = countEnglishWords(text);

  const jaMinutes = jaChars / JA_CHARS_PER_MIN;
  const enMinutes = enWords / EN_WORDS_PER_MIN;

  return Math.max(1, Math.round(jaMinutes + enMinutes));
}
