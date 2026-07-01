# 仕様書

> このサイトの「**何が・どのように動いているか**」を定義する。要件は [REQUIREMENTS.md](REQUIREMENTS.md)、設計判断は [DESIGN.md](DESIGN.md) を参照。

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
| `src/content/profile/{ja,en}/philosophy.md` | `mindset` | 1 | 哲学・信念 |
| `src/content/profile/{ja,en}/motto.md` | `mindset` | 2 | 座右の銘 |
| `src/content/profile/{ja,en}/dream.md` | `direction` | 1 | 長期の夢・ビジョン |
| `src/content/profile/{ja,en}/goal.md` | `direction` | 2 | 短期・中期・長期の具体的目標 |

Schema は `title` / `quote` / `order` / `group ("mindset" | "direction")`、本文は Markdown 記述。`profile.astro` は `getCollection("profile")` で一括取得し `group` でフィルタして 2 つのグループセクションに描画する。新しいサブセクションを追加したい場合は、該当 `group` の新しい `.md` ファイルを置くだけでよい。TOC は 2 グループレベル (`#mindset` / `#direction`)、個別サブセクションへのディープリンクは各ファイル id 経由で可能。

年齢・社会人歴の計算:
- 生年月日: 1998-09-14
- キャリア開始: 2021-04-01
- ビルド時に `calcYears()` で自動計算

### 1.4 Career グラフ仕様（CareerGraph.astro）

SVG 手書きの Git ブランチ風グラフ:

```
      ● 現在 (top)
     /|
    / |       ← 曲線（cubic bezier）で合流
   ●  │      個人開発(シアン)
   ●  │
   ●  │
   ●  │
    \ │
     \│      ← 曲線で分岐
      ● branch ← 分岐点
      │
      ● LTS ソフトウェアテクノロジー
      ● インプリム
      ● アクモス
      ● キャリアスタート (bottom)
```

- 中央線（青）: 正社員キャリア
- 左ブランチ（シアン）: 個人開発（たすきば、HomePage、ユメハシ、Defrago）
- レスポンシブ: `viewBox` + `preserveAspectRatio` で画面幅に自動縮小

### 1.5 Product（product/）

- 一覧: `order` 昇順で表示。ステータスバッジ（Active/Beta/Archived/Suspended）
- 詳細: frontmatter + Markdown 本文。「体験する →」（frontmatter `url`）「GitHub」（`repo`）ボタン（任意）
- **構造化データ（SoftwareApplication）**: `url` を持つ製品（＝実アプリ）の詳細ページに `BaseLayout` の `extraJsonLd` 経由で schema.org `SoftwareApplication` JSON-LD を出力。`applicationCategory` は slug に `tasukiba` を含む場合 `BusinessApplication`、それ以外は `ProductivityApplication`。`offers`（`price: "0"` / `JPY`）は `status !== "suspended"` の製品のみ付与（受付停止中は無料オファーを宣言しない）。検索結果でのリッチリザルト露出を高める目的
- `status: "suspended"` のとき: 詳細ページに「新規受付停止中」のお知らせバナーを表示し、「体験する」ボタンを非活性表示（クリック不可）に置換。GitHub ボタンは引き続き利用可能
- **アプリ導線の固定ピル**: `url` を持ち `status !== "suspended"` の **たすきば配下ページ**（slug が `tasukiba`、または `parent: "tasukiba"`）に限り、`url`（たすきばアプリ）へ飛ぶ小型の固定ピル（フクロウアイコン + ラベル、`position: fixed`、右下／モバイルは下部中央、本文を覆わない）を表示。連載ブログの固定ピル（1.6）と同一の挙動で、リンクは CSS で初期表示され JS 無効でもクロール可能、JS は ✕ での閉じ操作と `sessionStorage`（キー `appFloatDismissed:<slug>`）による閉状態の記憶のみを担う。ラベル等は i18n `product.appFloat`（`text` / `aria` / `dismissAria`）
- **画像ライトボックス**: 本文 `.content` 内の `<img>` をクリック / タップで全画面拡大表示（`ImageLightbox.astro`）。閉じる手段は ✕ ボタン / 背景クリック / Esc キー。リンクで包まれた画像 (`<a><img>`) と `data-no-lightbox` 属性付き画像は対象外
- **アコーディオン（`<details>`）のディープリンク**: 本文中の `<details id="...">` に対し、URL ハッシュ（例 `#terms` / `#tokushoho`）で直接リンクすると、`[...slug].astro` の `openHashAccordion` が対象アコーディオン（およびネストした祖先 `<details>`）を `open` 状態にし、その位置までスクロールする。初期表示・`hashchange`・`astro:after-swap`（ClientRouter 遷移）の各タイミングで発火。利用規約 (`#terms`) / 特定商取引法表記 (`#tokushoho`) などへの直接リンク用途
- **連載ブログ一覧（特別セクション）**: frontmatter に `blogSeriesKey` を持つプロダクトは、詳細ページ下部に当該連載のブログ記事一覧セクションを表示。連載判定は `src/utils/blog-series.ts`（`BLOG_SERIES` が単一ソース）で slug の部分一致により行い、ja/en 共通で機能。記事は `isVisibleInDev` で未来日付/下書きを除外（公開判定はブログ一覧と共通のため「ブログ未公開＝連載セクションにも非表示」が自動で一致）。あわせて `BaseLayout` の `extraJsonLd` prop に schema.org `ItemList` を渡し「連載が一塊のコンテンツ群」であることを検索エンジンに明示。現状 `tasukiba` が `blogSeriesKey: "tasukiba"` を設定（連載記事は slug に `tasukiba` を含む全記事）
- **独立 LP への差し替え（`landingPage`）**: frontmatter に `landingPage`（`public/` 配下のルート相対パス）を持つプロダクトは、一覧の「詳細を見る」ボタンおよび親ページの子カードのリンク先が、通常の Content Collections 詳細ページではなくそのパスへ差し替わる（`src/i18n/content.ts` の `getProductDetailUrl` が判定）。Content Collections 側のページ自体は変わらず生成されるため、直リンクや検索流入は従来どおり到達可能。現状 `tasukiba-user`（audience: user）が `landingPage: "products/tasukiba-lp/"` を設定し、静的にバンドルされた LP（`public/products/tasukiba-lp/index.html`）へ遷移する。当該 LP は Content Collections 外の完全に独立した静的ファイルのため、利用規約・プライバシーポリシー・特定商取引法表記へのフッターリンクは `tasukiba-user` 詳細ページの該当アンカー（`#terms` / `#privacy` / `#tokushoho` / `#operator-info`）への絶対 URL で参照し、二重管理を避けている
  - **テーマ別アコーディオン**: 連載記事は各記事 frontmatter の `seriesCategory` でテーマ分類し、`<details>` アコーディオンにグルーピング表示（記事数増加によるページ縦長化、特にモバイルでの可読性低下を防ぐ）。テーマの表示順は `BlogSeries.categoryOrder`、見出しラベルは i18n `product.blogSeries.categories`（ja/en）で管理。各テーマ内は日付昇順、アコーディオンは既定で全て閉じた状態（初期表示を短く保ち縦長化を防ぐ）。各 `<details id="series-{key}">` は `openHashAccordion` のディープリンク対象（URL ハッシュ `#series-{key}` で当該テーマを開いた状態にできる）。`seriesCategory` 未設定/未知キーの記事は「その他」テーマに集約（`series-category.test.ts` が全連載記事の有効な `seriesCategory` を強制するため通常は発生しない）。新記事は予約投稿時に `seriesCategory` を付与するだけで該当テーマへ自動分類される

### 1.6 Project（project/）

- 一覧: `order` 降順（新しいもの順）で直近 **5 件** のみ表示。正社員/業務委託バッジ
- 5 件超の場合、セクション右下に「全プロジェクトはこちら →」リンクを表示
- 全件表示: `project/all/` で全プロジェクトを表示（戻るリンク付き）
- 詳細: frontmatter + Markdown 本文

### 1.7 Blog（blog/）

#### 1.7.1 一覧ページ（`/{lang}/blog/`）

ページ上部の **ツールバー** に検索ボックスとタグ一覧導線を配置し、その下に 4 つのセクションを表示。

| エリア | 内容 |
|---|---|
| **検索ボックス** | **全記事**を対象に、タイトル + description + タグの部分一致でクライアント側フィルター。検索クエリ入力中は通常ビュー（ピックアップ / 直近 / Qiita / カレンダー）を `hidden` 化し、隠し配置している全記事カード一覧 (`#blogSearchResults`) をマッチ件のみ表示。クリアで通常ビューに復帰。`URL` は変更しない（履歴を汚さず SEO 影響なし）。JS 無効環境では `<input>` を CSS で非表示 |
| **タグ一覧へのリンク** | `#タグ一覧 →` リンクで `/{lang}/blog/tags/` へ遷移 |
| **Featured Articles**（ピックアップ）| `dynamic-stats.json` の `featuredSlugs` で**手動キュレーション**した記事を最大 4 件表示。空の場合は `frontmatter.featured: true` をフォールバック |
| **直近の記事**（regular）| ピックアップ以外の最新記事を `blog.maxPerSection` 件（既定 5 件）表示。各カードのタグはクリック可能なリンク（`/{lang}/blog/tag/{slug}/`）|
| **Tech Blog (Qiita)** | ビルド時に Qiita API から取得。直近 1 年以内 AND Organization 未紐付けで絞り込み、`likes + stocks*2` で降順ソートし上位 5 件を表示 |
| **投稿カレンダー** | 月別グリッド。投稿日と未来日付の「公開予定」記事を一望（`BlogCalendar.astro`）|

5 件超の場合は各セクション右下に「全記事はこちら →」リンク（`/{lang}/blog/all/`）を表示。

#### 1.7.2 全件ページ（`/{lang}/blog/all/`）

- 全記事を日付降順で表示
- `draft: true` の記事は本番では非表示（dev では表示）

#### 1.7.3 詳細ページ（`/{lang}/blog/{slug}/`）

- frontmatter + Markdown 本文
- `ogType="article"` で Article スキーマ適用、`article:published_time` メタタグ付与
- 記事メタの**タグはクリック可能なリンク**（`/{lang}/blog/tag/{slug}/`）
- Markdown 内の外部リンクは `rehype-external-links` で `target="_blank" rel="noopener noreferrer"` を自動付与
- **画像ライトボックス**: 本文 `.content` 内の `<img>` をクリック / タップで全画面拡大表示（`ImageLightbox.astro`）。閉じる手段は ✕ ボタン / 背景クリック / Esc キー。リンクで包まれた画像 (`<a><img>`) と `data-no-lightbox` 属性付き画像は対象外
- 未来日付（`date` が今日より後）の記事は本番ビルドで個別ページ非生成（`isPublished` フィルタ）。dev では常に表示
- **連載記事の LP 導線**: slug が `BLOG_SERIES`（`src/utils/blog-series.ts`）の連載に一致する記事には、対応プロダクト LP への 2 つの内部リンクを表示。(1) **記事末 CTA カード**（プロダクト名・tagline を動的取得して表示）、(2) **画面端の固定ピル**（フクロウアイコン + プロダクト名、`position: fixed`、右下／モバイルは下部中央、本文を覆わない小型サイズ）。固定ピルのリンクは CSS で初期表示され JS 無効でもクロール可能で、JS は ✕ での閉じ操作と `sessionStorage` による閉状態の記憶のみを担う（Google の「煩わしいインタースティシャル」減点を避ける設計）。非連載記事には一切表示しない

#### 1.7.4 タグ別ページ（`/{lang}/blog/tag/{tag-slug}/`）

各タグごとに静的に生成される SEO 最適化済みページ。

| 項目 | 内容 |
|---|---|
| URL | `/{lang}/blog/tag/{tag-slug}/`（日本語タグはそのまま、英数字は小文字 + ハイフン化）|
| タイトル | 2 件以上: `「{tag}」の記事一覧 — {N} 件 | Teppei Suyama` / 1 件: `「{tag}」の記事 | Teppei Suyama` |
| description | テンプレート展開（[blog.tag.descriptionTemplate](../../src/i18n/ja.ts) 参照、120-160 字） |
| **noindex 制御** | **記事数 1 件のタグページは `<meta name="robots" content="noindex, follow">` を出力**（Google Search Central の "thin content" 対策）|
| canonical | 自言語の自タグページ URL（絶対 URL） |
| コンテンツ | 該当タグを持つ記事の一覧（date 降順）、各カードは詳細ページへリンク |

#### 1.7.5 タグ一覧ハブページ（`/{lang}/blog/tags/`）

全タグを記事数降順で一覧表示する内部リンクハブ。タグカードをクリックでタグ別ページへ遷移。SEO 上はサイト内のタグページへの内部リンクを集約することで評価を補強。

### 1.8 Contact（contact.astro）

| フィールド | タイプ | 必須 | maxlength |
|---|---|---|---|
| お名前 | text | はい | 100 |
| メールアドレス | email | はい | 254 |
| お問い合わせ種別 | radio（4択：たすきばに関するお問い合わせ／技術相談／フィードバック／その他） | はい | - |
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
  featured: boolean,      // デフォルト: false（dynamic-stats.json が空の時のフォールバック）
  seriesCategory: string, // 任意（連載記事のテーマ分類キー。LP 連載セクションのアコーディオン見出しに対応。連載記事は必須・src/utils/series-category.test.ts で検証）
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
  status: "active" | "beta" | "archived" | "suspended",  // デフォルト: "active"
  order: number,           // デフォルト: 0
  parent: string,          // 任意（親プロダクトの slug。サブページ化）
  audience: "user" | "firstLogin" | "developer",  // 任意（サブページの対象読者）
  blogSeriesKey: string,   // 任意（連載ブログのキー。LP 下部に連載一覧 + ItemList を表示）
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

### 3.4 profile

```typescript
{
  title: string,                          // 必須（"Philosophy" / "Motto" / "Dream" / "Goal"）
  quote: string,                          // 必須（座右の銘・ビジョン文）
  order: number,                          // デフォルト: 0
  group: "mindset" | "direction",         // 必須（思想 = mindset / 方向性 = direction）
}
```

## 4. 動的データ

### 4.1 dynamic-stats.json

`src/data/dynamic-stats.json` は月次バッチ（`.github/workflows/update-stats.yml`）で自動更新されるサイト全体の動的データ。

```json
{
  "updatedAt": "2026-05-01",
  "engineerYears": 5,
  "qiita": {
    "itemsCount": 113,
    "contributions": 0
  },
  "featuredSlugs": [
    "20260510-objective-self-portrait",
    "20260417-about-me-guide"
  ]
}
```

| フィールド | 用途 | 更新方法 |
|---|---|---|
| `updatedAt` | 最終更新日 | バッチで自動 |
| `engineerYears` | Profile / Home に表示するエンジニア歴 | バッチでキャリア開始日から計算 |
| `qiita.itemsCount` | Profile に表示する Qiita 記事数 | バッチで Qiita API から取得 |
| `qiita.contributions` | Profile に表示する Qiita Contributions | バッチで取得 |
| `featuredSlugs` | Home / Blog のピックアップ記事スラッグ（最大 4 件）| **手動キュレーション**。直接編集する。月次バッチは既存値を保持する |

### 4.2 Qiita 記事（ビルド時取得）

Blog 一覧ページの「Tech Blog (Qiita)」セクション用。`src/pages/[lang]/blog/index.astro` がビルド時に直接 Qiita API（認証不要）を叩いて取得。dev サーバーではスキップ（`import.meta.env.PROD` でガード）。
