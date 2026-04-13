/**
 * SNS シェア URL 生成ユーティリティ
 */

export function buildXShareUrl(pageUrl: string, text: string): string {
  return `https://x.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`;
}

