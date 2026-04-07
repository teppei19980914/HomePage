# 仕様書

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
| Philosophy | `philosophy` | 哲学・信念の引用 + 説明 |
| Dream | `dream` | 夢の引用 + 説明 |
| Motto | `motto` | 座右の銘の引用 + 説明 |
| Links | `links` | GitHub / Qiita / Wantedly のカードリンク |

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
