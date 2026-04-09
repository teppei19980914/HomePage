// ============================================================
// labels.ts — 後方互換シム (Backward Compatibility Shim)
//
// Phase 1 の多言語対応以降、ラベルの実体は src/i18n/ja.ts に移行した。
// このファイルは既存のページ・コンポーネントが
// `import { profile } from "../data/labels"` のように名前付き import で
// 参照しているのを壊さないための一時的な互換層である。
//
// 新規コードでは以下を推奨:
//   import { getLabels } from "../i18n";
//   const t = getLabels(Astro.currentLocale);
//   t.profile.title  ← ロケール対応済みのアクセス
// ============================================================

import { ja } from "../i18n/ja";

export const {
  site,
  nav,
  home,
  profile,
  about,
  careerGraph,
  blog,
  product,
  project,
  contact,
  common,
  profileToc,
  profileGroups,
  blogToc,
  footer,
} = ja;
