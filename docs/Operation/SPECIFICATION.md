# 仕様書

## 0. 多言語対応

### 0.1 サポート言語
- `ja` (日本語、デフォルト)
- `en` (English)

### 0.2 URL 戦略
両言語とも URL にプレフィックスを付与する:
- `/HomePage/ja/...` → 日本語
- `/HomePage/en/...` → 英語
- `/HomePage/` → クライアントサイドで言語検出し、適切な言語ページへリダイレクト

### 0.3 言語検出(`/HomePage/` ルート)
1. `localStorage.preferred-locale` (明示設定が最優先)
2. `navigator.language` (例: `"ja-JP"` → `"ja"`)
3. `navigator.languages` を順にチェック
4. 上記いずれも未対応なら `ja` (デフォルト) にフォールバック

JS 無効環境では `<noscript> + meta refresh` で `ja` にリダイレクト。

### 0.4 フォールバック戦略
- **UI ラベル**: `src/i18n/ja.ts` の構造を `Labels` 型として導出。`en.ts` は同じ型を満たす必要があり、翻訳漏れはビルド時にコンパイルエラーとして検出される
- **Markdown コンテンツ**: `src/content/{blog,product,project,profile}/{ja,en}/*.md`。指定ロケールに該当ファイルがなければ、`getLocalizedCollection` が自動的に `ja` にフォールバック
- **未対応言語**: 一律 `ja` を表示

### 0.5 ページ実装
単一ソースから両言語分を生成する `src/pages/[lang]/` 構造:
- 静的ページ: `getStaticPaths = localeStaticPaths` で LOCALES を列挙
- 動的ページ ([...slug], [category] 等): LOCALES × エントリのクロス積で列挙
- ページ内では `Astro.params.lang` を `normalizeLocale()` でサニタイズし、`getLabels(lang)` でラベル辞書を取得
- 内部リンクは必ず `localeUrl(lang, path)` 経由で生成(ハードコード禁止)

### 0.6 SEO 対応
- `<html lang={locale}>` 動的化
- `<link rel="alternate" hreflang="...">` ja / en / x-default の 3 種
- `<meta property="og:locale">` + `og:locale:alternate`
- JSON-LD に `inLanguage` 追加
- 各ページの canonical は自言語 URL (ja ページは ja URL を canonical に、en ページは en URL を canonical に)
- sitemap.xml は `@astrojs/sitemap` の i18n オプションで自動生成

### 0.7 言語スイッチャー
Header に配置。2 つの `<a>` リンクのみで実装(ゼロ JS)。
- 現在表示中のページと同じ階層の別言語 URL にジャンプ
- クリック時に `localStorage.preferred-locale` に選択を保存(次回ルートアクセス時に使用)
- `aria-current="true"` で現在の言語を示す

### 0.8 セキュリティ設計
- ロケール値は必ず `isLocale()` / `normalizeLocale()` でホワイトリスト検証
- `navigator.language` 等の外部ソースを信頼せず、常に LOCALES 列挙に対して判定
- リダイレクトは `window.location.replace()` を使用し履歴汚染を防止
- 翻訳辞書は全て TypeScript オブジェクトリテラル(XSS リスクなし、外部ソース経由の翻訳注入なし)

### 0.9 ファイル配置
```
src/
├── i18n/
│   ├── index.ts         # getLabels, normalizeLocale, 再エクスポート
│   ├── types.ts         # Labels 型, Locale 型, LOCALES, BCP47
│   ├── ja.ts            # 日本語辞書(Single Source of Truth)
│   ├── en.ts            # 英語辞書(Labels 型を満たす必要あり)
│   ├── url.ts           # localeUrl, rootUrl
│   ├── content.ts       # getLocalizedCollection, getLocalizedEntry
│   └── paths.ts         # localeStaticPaths, localeContentPaths
├── content/
│   ├── blog/{ja,en}/*.md
│   ├── product/{ja,en}/*.md
│   ├── project/{ja,en}/*.md
│   └── profile/{ja,en}/*.md
└── pages/
    ├── index.astro      # ルート(言語検出リダイレクト)
    ├── rss.xml.ts       # RSS (ja 固定)
    └── [lang]/
        ├── index.astro
        ├── profile.astro
        ├── contact.astro
        ├── blog/
        │   ├── index.astro
        │   ├── [...slug].astro
        │   └── category/[category].astro
        ├── product/
        │   ├── index.astro
        │   └── [...slug].astro
        └── project/
            ├── index.astro
            ├── all.astro
            └── [...slug].astro
```

## 1. ページ仕様

### 1.1 Home（index.astro）

| セクション | 仕様 |
|---|---|
| 実績数値 | 4つの定量実績（90%/60%/40h/+25%）。クリックで該当プロジェクト詳細に遷移 |
| Hero | 名前（グラデーション）+ キャッチコピー + Profile/About 導線カード |
| Products | 説明文 + 「プロダクト一覧はこちら →」リンク |
| Projects | 説明文 + 「プロジェクト実績はこちら →」リンク |
| Blog | 説明文 + 直近4件の記事カード + 「すべての記事を見る →」リンク |
| Contact | 説明文 + 「お問い合わせはこちら →」リンク |

### 1.2 Profile（profile.astro）

先頭に**目次（TOC）カード**を配置し、各セクションへアンカーリンクでジャンプ可能（ゼロ JS、`scroll-behavior: smooth` + `scroll-margin-top: 5rem`）。各セクションは**常時表示**（アコーディオンは使用しない）。

| セクション | id | 仕様 |
|---|---|---|
| 基本情報カード | `basic` | 名前、生年月日、年齢（動的計算）、社会人歴（動的計算）、居住地、所属、副業 |
| Skills | `skills` | 6カテゴリ（3段階レベル表示: ●実務2年+/○実務1年+/△知識あり） |
| Certifications | `certifications` | 資格一覧（取得日付き、新しい順） |
| Career | `career` | Git ブランチ風 SVG グラフ（CareerGraph コンポーネント） |
| Education | `education` | 学歴タイムライン |
| 思想 (Mindset) | `mindset` | 抽象的な価値観のグループ。Philosophy (`#philosophy`) と Motto (`#motto`) の 2 サブセクションを含む |
| 方向性 (Direction) | `direction` | 具体的な目指す先のグループ。Dream (`#dream`) と Goal (`#goal`) の 2 サブセクションを含む |
| Links | `links` | GitHub / Qiita / Wantedly のカードリンク |

**思想 / 方向性 の内訳は Content Collections（`profile` collection）管理**:

| ファイル | group | order | 内容 |
|---|---|---|---|
| `src/content/profile/philosophy.md` | `mindset` | 1 | 哲学・信念 |
| `src/content/profile/motto.md` | `mindset` | 2 | 座右の銘 |
| `src/content/profile/dream.md` | `direction` | 1 | 長期の夢・ビジョン |
| `src/content/profile/goal.md` | `direction` | 2 | 短期・中期・長期の具体的目標 |

Schema は `title` / `quote` / `order` / `group ("mindset" | "direction")`、本文は Markdown 記述。`profile.astro` は `getCollection("profile")` で一括取得し `group` でフィルタして 2 つのグループセクションに描画する。新しいサブセクションを追加したい場合は、該当 `group` の新しい `.md` ファイルを置くだけでよい。TOC は 2 グループレベル (`#mindset` / `#direction`)、個別サブセクションへのディープリンクは各ファイル id 経由で可能。

年齢・社会人歴の計算:
- 生年月日: 1998-09-14
- キャリア開始: 2021-04-01
- ビルド時に `calcYears()` で自動計算

### 1.4 Career グラフ仕様（CareerGraph.astro）

SVG 手書きの Git ブランチ風グラフ:

```
      ● 現在 (top)
     /|\
    / | \     ← 曲線（cubic bezier）で合流
   ●  │  ●   個人開発(シアン) / 副業(紫)
   ●  │
    \ │ /
     \│/     ← 曲線で分岐
      ● branch ← 分岐点
      │
      ● LTS ソフトウェアテクノロジー
      ● インプリム
      ● アクモス
      ● キャリアスタート (bottom)
```

- 中央線（青）: 正社員キャリア
- 左ブランチ（シアン）: 個人開発（ユメハシ、Defrago）
- 右ブランチ（紫）: 副業（WakuLab）
- レスポンシブ: `viewBox` + `preserveAspectRatio` で画面幅に自動縮小

### 1.5 Product（product/）

- 一覧: `order` 昇順で表示。ステータスバッジ（Active/Beta/Archived）
- 詳細: frontmatter + Markdown 本文。「体験する →」「GitHub」ボタン（任意）

### 1.6 Project（project/）

- 一覧: `order` 降順（新しいもの順）で直近 **5 件** のみ表示。正社員/業務委託バッジ
- 5 件超の場合、セクション右下に「全プロジェクトはこちら →」リンクを表示
- 全件表示: `project/all/` で全プロジェクトを表示（戻るリンク付き）
- 詳細: frontmatter + Markdown 本文

### 1.7 Blog（blog/）

- 一覧: 日付降順。タグ表示。`draft: true` の記事は非表示
- 先頭に**目次（TOC）カード**を配置し、各セクション (`#work` / `#essay` / `#qiita`) へアンカージャンプ。Tech Blog は Qiita 記事が 1 件以上取得できた場合のみ TOC に表示
- 3 セクション構成（`category` で分類）: **Work & Dev** (`#work`) / **Essay** (`#essay`) / **Tech Blog (Qiita)** (`#qiita`)
- 各セクション直近 **5 件** のみ表示。5 件超の場合「全記事はこちら →」リンクを表示
- カテゴリ別全件表示: `blog/category/work/`、`blog/category/essay/`
- Tech Blog (Qiita): ビルド時に Qiita API から取得。直近 1 年以内 AND Organization 未紐付けで絞り込み、`likes + stocks*2` で降順ソートし上位 5 件を表示
- 詳細: frontmatter + Markdown 本文。`ogType="article"` で Article スキーマ適用
- **Markdown 内の外部リンク**は `rehype-external-links` プラグインによりビルド時に `target="_blank" rel="noopener noreferrer"` を自動付与（離脱抑止と HomePage への戻りやすさを両立。サイト内の相対リンク・アンカーは対象外）

### 1.8 Contact（contact.astro）

| フィールド | タイプ | 必須 | maxlength |
|---|---|---|---|
| お名前 | text | はい | 100 |
| メールアドレス | email | はい | 254 |
| お問い合わせ種別 | radio（3択） | はい | - |
| お問い合わせ内容 | textarea | はい | 5000 |

- 送信先: Formspree (`https://formspree.io/f/xykbnzvv`)
- スパム対策: honeypot フィールド（`_gotcha`）
- 送信後: フォーム非表示 → 完了メッセージ表示
- エラー時: アラート表示、ボタン再有効化

## 2. UI 仕様

### 2.1 カラーパレット

| 変数 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--color-primary` | #2563eb | #60a5fa | リンク・インタラクティブ要素のみ |
| `--color-accent` | #a78bfa | #c4b5fd | 装飾・強調テキスト |
| `--color-bg` | #fafafa | #0f172a | 背景 |
| `--color-text` | #1a1a1a | #e2e8f0 | テキスト |
| `--color-text-muted` | #6b7280 | #94a3b8 | 補助テキスト |
| `--color-surface` | #ffffff | #1e293b | カード背景 |
| `--color-border` | #e5e7eb | #1e293b | 罫線 |

**ルール**: `--color-primary`（青）= リンク・ボタンのみ。`--color-accent`（紫）= 装飾・強調。

### 2.2 フォント

```
"Helvetica Neue", Arial, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
```

システムフォントのみ使用。Web フォントは不使用（パフォーマンス最適化）。

### 2.3 レスポンシブ

| ブレークポイント | 対応 |
|---|---|
| ~480px | ナビ横スクロール、グリッド1列化 |
| ~600px | 実績グリッド2列化 |
| 601px~ | デスクトップレイアウト |

### 2.4 アニメーション

| 種類 | 仕様 |
|---|---|
| フェードイン | 0.6s ease、16px上移動。cascade: 0.15s 間隔 |
| スクロール reveal | IntersectionObserver（threshold: 0.1）で `.visible` 付与 |
| ページ遷移 | ClientRouter（View Transitions API） |
| ダークモード切替 | 0.3s transition（背景・テキスト色） |
| カードホバー | translateY(-3px) + box-shadow |

## 3. Content Collections スキーマ

### 3.1 blog

```typescript
{
  title: string,          // 必須
  description: string,    // 必須
  date: Date,             // 必須（coerce）
  tags: string[],         // デフォルト: []
  draft: boolean,         // デフォルト: false
}
```

### 3.2 product

```typescript
{
  title: string,
  description: string,
  tagline: string,
  date: Date,
  tags: string[],
  url: string (URL),       // 任意
  repo: string (URL),      // 任意
  status: "active" | "beta" | "archived",  // デフォルト: "active"
  order: number,           // デフォルト: 0
}
```

### 3.3 project

```typescript
{
  title: string,
  description: string,
  period: string,
  role: string,
  company: string,
  companyUrl: string (URL),  // 任意
  contractType: "employee" | "contract",
  tags: string[],
  order: number,             // デフォルト: 0
}
```
