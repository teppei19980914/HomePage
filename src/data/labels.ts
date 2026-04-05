// ============================================================
// labels.ts — 全 UI テキストの一元管理ファイル
// 新しいテキストを追加する場合は必ずこのファイルに記録すること
// ============================================================

// --- サイト共通 ---
export const site = {
  name: "Teppei Suyama",
  role: "Software Engineer",
  defaultDescription: "Teppei Suyama - Software Engineer",
  titleSuffix: "Teppei Suyama",
  copyright: "Teppei Suyama. All rights reserved.",
} as const;

// --- ナビゲーション ---
export const nav = {
  home: "Home",
  profile: "Profile",
  about: "About",
  product: "Product",
  project: "Project",
  blog: "Blog",
  contact: "Contact",
} as const;

// --- Home ページ ---
export const home = {
  statsHeadline: "各プロジェクトでの実績",
  stats: [
    {
      number: "90",
      unit: "%",
      label: "退行テスト工数削減",
      detail: "C# ユニットテスト自動化で手動テストを排除",
      link: "project/implem-unittest/",
    },
    {
      number: "60",
      unit: "%",
      label: "残業時間削減",
      detail: "VBA 業務自動化ツールでチーム全体の負荷を軽減",
      link: "project/acmos-auto-parts/",
    },
    {
      number: "40",
      unit: "h/月",
      label: "RPA 工数削減",
      detail: "Power Automate で営業事務を完全自動化",
      link: "project/implem-rpa/",
    },
    {
      number: "+25",
      unit: "%",
      label: "単価アップ",
      detail: "PG → PL 昇格。信頼獲得で契約延長も実現",
      link: "project/lts-power-platform/",
    },
  ],
  heroTagline: "課題を発見し、改善を実行するソフトウェアエンジニア",
  links: {
    profile: { label: "Profile", desc: "人物像・哲学・SNSリンク" },
    about: { label: "About", desc: "スキル・資格・キャリア" },
  },
  products: {
    title: "Products",
    desc: "「止まっている人を動かし、動いている人を支える」—— それが自分のものづくりの原点です。人が本来の力を発揮するためのプロダクトを個人で開発しています。",
    linkText: "プロダクト一覧はこちら",
  },
  projects: {
    title: "Projects",
    desc: "業務では課題発見から改善実行まで一気通貫で推進し、定量的な成果を生み出してきました。",
    linkText: "プロジェクト実績はこちら",
  },
  blog: {
    title: "Blog",
    desc: "技術的な学びや個人開発の振り返り、キャリアについての考えなどを発信しています。",
    linkText: "すべての記事を見る",
  },
  contact: {
    title: "Contact",
    desc: "フルスタック開発、技術相談など、お気軽にお問い合わせください。",
    linkText: "お問い合わせはこちら",
  },
} as const;

// --- Profile ページ ---
export const profile = {
  title: "Profile",
  description: "須山 哲平のプロフィール",
  subtitle: "須山 哲平 / Teppei Suyama",
  nameJa: "須山 哲平",
  nameEn: "Teppei Suyama",
  birthDate: "1998-09-14",
  careerStartDate: "2021-04-01",
  birthDateDisplay: "1998年9月14日",
  location: "神奈川県川崎市",
  employer: {
    name: "株式会社LTS ソフトウェアテクノロジー",
    url: "https://www.softec-ic.co.jp/",
  },
  sideJob: {
    name: "株式会社WakuLab（業務委託）",
    url: "https://waku-lab.com/",
  },
  labels: {
    birthDate: "生年月日",
    age: "年齢",
    ageSuffix: "歳",
    careerYears: "社会人歴",
    careerYearsSuffix: "年目",
    location: "居住地",
    employer: "所属",
    sideJob: "副業",
  },
  philosophy: {
    title: "Philosophy",
    quote: "「夢を持つことで、大きな壁も乗り越えられる」",
    body1:
      "心理的安全性の高い社会を目指し、ソフトウェアの力で世界をよりよくすることを信念に活動しています。",
    body2:
      "止まっている人を動かし、動いている人を支える。それが自分のものづくりの原点です。",
  },
  motto: {
    title: "Motto",
    quote:
      "「落ちこぼれでも必死に努力すればエリートを超えることもあるかもよ」",
    body: "塵も積もれば山となる。1.01 の法則を信じて日々努力を積み重ねています。",
  },
  links: {
    title: "Links",
    github: { name: "GitHub", id: "@teppei19980914", url: "https://github.com/teppei19980914" },
    qiita: { name: "Qiita", id: "211 articles", url: "https://qiita.com/teppei19980914" },
    wantedly: { name: "Wantedly", id: "須山 哲平", url: "https://www.wantedly.com/id/teppei_urata" },
  },
} as const;

// --- About ページ ---
export const about = {
  title: "About",
  description: "須山 哲平（Teppei Suyama）のプロフィール",
  subtitle: "須山 哲平 / Teppei Suyama",
} as const;

// --- Blog ページ ---
export const blog = {
  title: "Blog",
  description: "ブログ記事一覧",
  subtitle: "技術的な学びや日々の気づきを発信しています",
} as const;

// --- Product ページ ---
export const product = {
  title: "Product",
  description: "個人開発プロダクトの紹介",
  subtitle: "個人で開発しているプロダクトを紹介します",
} as const;

// --- Project ページ ---
export const project = {
  title: "Project",
  description: "参画プロジェクトの紹介",
  subtitle: "正社員・業務委託として参画したプロジェクトの紹介",
  contractTypes: {
    employee: "正社員",
    contract: "業務委託",
  },
} as const;

// --- Contact ページ ---
export const contact = {
  title: "Contact",
  description: "お問い合わせ・連絡先",
  subtitle: "お仕事のご依頼やお問い合わせはこちらからお願いします",
  formTitle: "お問い合わせフォーム",
  formNote:
    "以下のフォームからお気軽にお問い合わせください。内容を確認の上、折り返しご連絡いたします。",
  fields: {
    name: { label: "お名前", placeholder: "山田 太郎" },
    email: { label: "メールアドレス", placeholder: "example@mail.com" },
    type: {
      label: "お問い合わせ種別",
      options: ["お仕事のご依頼", "技術相談", "その他"],
    },
    message: {
      label: "お問い合わせ内容",
      placeholder: "お問い合わせ内容をご記入ください",
    },
  },
  submitLabel: "送信する",
  submittingLabel: "送信中...",
  successTitle: "お問い合わせありがとうございます",
  successBody: "内容を確認の上、折り返しご連絡いたします。",
  errorMessage: "送信に失敗しました。もう一度お試しください。",
} as const;

// --- Footer ---
export const footer = {
  copyright: site.copyright,
} as const;
