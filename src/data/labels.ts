// ============================================================
// labels.ts — 全 UI テキストの一元管理ファイル
// 新しいテキストを追加する場合は必ずこのファイルに記録すること
// ============================================================

// --- サイト共通 ---
export const site = {
  name: "Teppei Suyama",
  role: "Software Engineer",
  defaultDescription: "業務自動化・フルスタック開発が強みのソフトウェアエンジニア須山哲平のポートフォリオ",
  titleSuffix: "Teppei Suyama",
  copyright: "Teppei Suyama. All rights reserved.",
} as const;

// --- ナビゲーション ---
export const nav = {
  home: "Home",
  profile: "Profile",
  product: "Product",
  project: "Project",
  blog: "Blog",
  contact: "Contact",
  themeToggleLabel: "Toggle dark mode",
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
  heroSummary: "エンジニア歴5年+ / Qiita 211記事 / 副業・個人開発を並行推進",
  strengths: {
    title: "Strengths",
    items: [
      {
        heading: "課題発見 → 改善実行の推進力",
        body: "業務の非効率を自ら特定し、VBA や Power Automate による自動化を提案・実行。残業時間 60% 削減、月 40 人時の完全 RPA 化など、定量的な成果に結びつけてきました。",
      },
      {
        heading: "上流から下流まで一気通貫の技術力",
        body: "要件定義・設計からバックエンド・フロントエンド開発、テスト自動化、運用保守まで一貫して対応。応用情報技術者・Java Gold・LPIC 等の資格も保有しています。",
      },
      {
        heading: "信頼構築を通じたビジネス成果",
        body: "ステークホルダーとの合意形成を積み重ね、契約額 +33% 拡大や PG → PL 昇格（単価 +25%）を実現。3 か月の短期契約を延長に導いた実績があります。",
      },
    ],
  },
  profileSection: {
    title: "Profile",
    desc: "基本情報やスキル・資格・キャリア、哲学や座右の銘など、エンジニアとしてのすべてをまとめています。",
    linkText: "プロフィールはこちら",
  },
  productCards: {
    title: "Products",
    desc: "個人で開発しているプロダクト",
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
  subtitle: "基本情報・哲学・SNSリンク",
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
    quote: "「みんなが夢から得られた幸福感によって、世界を変える原動力を生み出したい」",
    paragraphs: [
      "学生時代、夢を持っておらず、将来に希望を見いだせず、他責思考で自分を守っていた学生時代でした。",
      "しかし、パートナーとの出会いによって「やりたいこと」が見つかり、毎日生き生きと暮らせるようになりました。これによって、自らの人生を主体的に生きることができるようになりました。",
      "この経験から、夢（やりたいこと）を見つけることで人は生き生きと生活できるようになり、自分の人生の舵取りを自分でとれるようになると考えています。",
      "夢を持つことでみんなが主体的に行動し、自身の人生をより良くしようとします。そして、その先に得られる幸福感が、日本、ないしは世界を大きく動かす原動力になると信じています。",
    ],
  },
  dream: {
    title: "Dream",
    quote: "「みんなが夢を語ることができる環境を構築すること」",
    paragraphs: [
      "「世界を変える原動力を生み出す」ために、私は「夢を持ち、夢を語らい、夢をかなえられる環境が必要」だと考えています。",
      "なぜなら、夢を持ち、語ることで人（脳）はそれを現実のものとして認識し、夢に向かって主体的に行動するようになると考えているからです。",
      "「夢を持ち、語り合える環境」を一言で表現すると、「みんなが素直になれる環境」であると考え、これを私は「心理的安全性の高い組織」と表現しています。",
      "ただし、一人で組織を心理的安全性の高い状態にすることは非常に難しいと考えているため、チームとしての力が必要と考えています。",
      "そのため、PM（プロジェクトマネージャ）としての影響力を駆使し、心理的安全性の高いチームを構築したいと考えています。",
    ],
  },
  motto: {
    title: "Motto",
    quote:
      "「落ちこぼれでも必死に努力すればエリートを超えることもあるかもよ」",
    paragraphs: [
      "「塵も積もれば山となる」ということわざをもとに、1.01 の法則を信じて日々コツコツと積み上げることを大切にしています。",
      "私は、学力が高いわけでもなく、才能があるわけでもありません。",
      "しかし、ドラゴンボールの主人公（孫悟空）が「落ちこぼれでも必死に努力すればエリートを超えることもあるかもよ」と言い、結果的にエリートを超えます。私も孫悟空のように、こつこつと努力することで想像もできないような景色を見ることができるのではないかと考えています。",
    ],
  },
  links: {
    title: "Links",
    github: {
      name: "GitHub",
      id: "teppei19980914",
      url: "https://github.com/teppei19980914",
    },
    qiita: {
      name: "Qiita",
      id: "teppei19980914",
      url: "https://qiita.com/teppei19980914",
    },
    wantedly: {
      name: "Wantedly",
      id: "須山 哲平",
      url: "https://www.wantedly.com/id/teppei_urata",
    },
  },
} as const;

// --- About ページ ---
export const about = {
  title: "About",
  description: "須山 哲平（Teppei Suyama）のプロフィール",
  subtitle: "スキル・資格・キャリア",
  skills: {
    title: "Skills",
    legend: "\u25CF 実務2年以上　\u25CB 実務1年以上　\u25B3 知識あり",
    categories: {
      languages: "Languages",
      database: "Database",
      cloud: "Cloud / Platform",
      os: "OS",
      tools: "Tools",
      personalDev: "Personal Dev",
    },
  },
  certifications: {
    title: "Certifications",
    items: [
      { date: "2026.02", name: "Python 3 エンジニア認定実践試験" },
      { date: "2024.10", name: "応用情報技術者試験" },
      { date: "2024.03", name: "OSS-DB Silver" },
      { date: "2023.11", name: "AZ-900 (Microsoft Azure Fundamentals)" },
      { date: "2023.09", name: "LPIC Level 1" },
      { date: "2022.11", name: "基本情報技術者試験" },
      { date: "2021.07", name: "Oracle Certified Java Programmer, Gold SE 11" },
      { date: "2019.07", name: "MOS Excel 2019 Expert" },
      { date: "2018.06", name: "日本語漢字能力検定 2級" },
    ],
  },
  career: {
    title: "Career",
    legend: { employee: "正社員", personal: "個人開発", sideJob: "副業" },
    now: "現在",
    branchLabel: "branch",
  },
  education: {
    title: "Education",
    items: [
      { period: "2017年4月 - 2021年3月", name: "東京福祉大学 心理学部心理学科" },
      { period: "2014年4月 - 2017年3月", name: "目黒学院高等学校" },
    ],
  },
} as const;

// --- Career グラフ ---
export const careerGraph = {
  personalDev: [
    { name: "ユメハシ", date: "2026.03" },
    { name: "Defrago", date: "2026.01" },
  ],
  sideBusiness: { name: "株式会社WakuLab", date: "2026.03", suffix: "/ 業務委託" },
  history: [
    { name: "株式会社LTS ソフトウェアテクノロジー 入社", dateSuffix: "2025.05" },
    { name: "株式会社インプリム 退職", dateSuffix: "2025.04" },
    { name: "株式会社インプリム 入社", dateSuffix: "2023.01" },
    { name: "アクモス株式会社 退職", dateSuffix: "2022.12" },
    { name: "アクモス株式会社 入社", dateSuffix: "2021.04" },
  ],
} as const;

// --- Blog ページ ---
export const blog = {
  title: "Blog",
  description: "ブログ記事一覧",
  subtitle: "技術的な学びや日々の気づきを発信しています",
  maxPerSection: 5,
  viewAllText: "全記事はこちら",
  workSection: {
    title: "Work & Dev",
    subtitle: "仕事や開発に関する振り返り・ナレッジ",
    emptyMessage: "記事はまだありません。",
  },
  essaySection: {
    title: "Essay",
    subtitle: "思想や考えを自由に書き出すエッセイ",
    emptyMessage: "記事はまだありません。",
  },
  qiitaSection: {
    title: "Tech Blog (Qiita)",
    subtitle: "Qiita で発信した技術記事（いいね・ストック数の多い記事を厳選）",
    qiitaUserId: "teppei19980914",
    maxArticles: 5,
    linkText: "Qiita ですべての記事を見る",
    linkUrl: "https://qiita.com/teppei19980914",
  },
} as const;

// --- Product ページ ---
export const product = {
  title: "Product",
  description: "個人開発プロダクトの紹介",
  subtitle: "個人で開発しているプロダクトを紹介します",
  emptyMessage: "プロダクトはまだありません。",
  statusLabels: { active: "Active", beta: "開発中 — こうご期待", archived: "Archived" },
  detailLink: "詳細を見る",
  tryLink: "体験する",
  githubLink: "GitHub",
} as const;

// --- Project ページ ---
export const project = {
  title: "Project",
  description: "参画プロジェクトの紹介",
  subtitle: "正社員・業務委託として参画したプロジェクトの紹介",
  emptyMessage: "プロジェクトはまだありません。",
  maxDisplay: 5,
  viewAllText: "全プロジェクトはこちら",
  allTitle: "All Projects",
  allSubtitle: "正社員・業務委託として参画したすべてのプロジェクト",
  contractTypes: {
    employee: "正社員",
    contract: "業務委託",
  },
  detailLink: "詳細を見る",
} as const;

// --- Contact ページ ---
export const contact = {
  title: "Contact",
  description: "お問い合わせ・連絡先",
  subtitle: "お仕事のご依頼やお問い合わせはこちらからお願いします",
  availability: {
    title: "対応可能な業務形態",
    items: [
      "業務委託のみ対応可",
      "対応可能時間: 平日 19:00 以降、土日祝（本業が平日 8:00〜19:00 のため）",
    ],
    responseTime: "2営業日以内に返信いたします。",
  },
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

// --- 共通 ---
export const common = {
  backLink: "前のページに戻る",
  scrollTopLabel: "ページ先頭に戻る",
  tocTitle: "目次",
  ctaTitle: "お仕事のご依頼・ご相談",
  ctaBody: "フルスタック開発、技術相談など、お気軽にお問い合わせください。",
  ctaButton: "お問い合わせはこちら",
} as const;

// --- Profile ページの目次 ---
export const profileToc = [
  { href: "#basic", label: "基本情報" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#career", label: "Career" },
  { href: "#education", label: "Education" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#dream", label: "Dream" },
  { href: "#motto", label: "Motto" },
  { href: "#links", label: "Links" },
] as const;

// --- Blog ページの目次 ---
export const blogToc = [
  { href: "#work", label: "Work & Dev" },
  { href: "#essay", label: "Essay" },
  { href: "#qiita", label: "Tech Blog (Qiita)" },
] as const;

// --- Footer ---
export const footer = {
  copyright: site.copyright,
} as const;
