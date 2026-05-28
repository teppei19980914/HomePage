/**
 * 画像ライトボックスのロジック層。
 *
 * 「記事本文の画像をクリック / タップして拡大表示する」機能の
 * 判定ロジックを Pure 関数として切り出し、 vitest で検証可能にする。
 * DOM 操作・イベント結線は ImageLightbox.astro のクライアント側スクリプトが担う。
 */

export interface LightboxImageLike {
  /** <img> の src 属性（拡大表示時にそのまま使用） */
  src: string;
  /** <img> の alt（拡大表示時の代替テキスト・キャプション） */
  alt?: string;
  /** 親要素のタグ名。 <a><img></a> の <img> はリンク優先で除外する。 */
  parentTagName?: string;
  /** data-no-lightbox 属性で明示的に除外できるエスケープハッチ */
  hasNoLightboxAttr?: boolean;
}

/**
 * 拡大表示を有効化すべき画像か判定する。
 * - src がない画像は対象外（壊れた画像）
 * - リンクで包まれた画像 (`<a><img></a>`) はリンク遷移を優先するため対象外
 * - `data-no-lightbox` が付与された画像は明示的に対象外
 */
export function shouldEnhanceImage(img: LightboxImageLike): boolean {
  if (!img.src) return false;
  if (img.hasNoLightboxAttr) return false;
  if ((img.parentTagName ?? "").toUpperCase() === "A") return false;
  return true;
}
