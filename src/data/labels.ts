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
      "「夢を持ち、語り合える環境」を一言で表現すると、みんなが素直になれる環境であると考え、これを私は「心理的安全性の高い組織」と表現しています。",
      "ただし、一人で組織を心理的安全性の高い状態にすることは非常に難しいと考えているため、チームとしての力が櫃よと考えています。",
      "これを実現するために、心理的安全性の高いチーム構築ができるPM（プロジェクトマネージャ）を目指しています。",
    ],
  },
  motto: {
    title: "Motto",
    quote:
      "「落ちこぼれでも必死に努力すればエリートを超えることもあるかもよ」",
    paragraphs: [
      "「塵も積もれば山となる」ということわざをもとに、1.01 の法則を信じて日々コツコツと積み上げることを大切にしています。",
      "私は、学力が高いわけでもなく、才能があるわけでもありません。",
      "そんな中、ドラゴンボールの名言で、主人公の孫悟空が「落ちこぼれでも必死に努力すればエリートを超えることもあるかもよ」といっています。そして、結果的にエリートを超えてしまう姿を目にし、私もこつこつと努力していけば、落ちこぼれでもエリートが見ているような景色を見ることができると考えています。",
      "この景色を見るために、日々読書や自己学習などを実施し、努力を積み重ねています。",
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
  profile: {
    title: "Profile",
    intro: "須山 哲平（Teppei Suyama）。川崎在住のソフトウェアエンジニア。",
    career:
      "株式会社LTS ソフトウェアテクノロジーにて SES エンジニアとして従事。前職ではローコード開発プラットフォーム「Pleasanter」の開発・導入支援に携わり、Qiita にて 211 件以上の技術記事を発信しています。",
    personal:
      "個人では Flutter / Dart を用いたモバイル・Web アプリ開発に取り組み、夢や目標を管理するアプリ「ユメログ」を個人開発しています。",
    quote:
      "「落ちこぼれでも必死に努力すればエリートを超えることもあるかもよ」",
    quoteSub:
      "塵も積もれば山となる。1.01 の法則を信じて日々努力を積み重ねています。",
  },
  philosophy: {
    title: "Philosophy",
    heading: "「夢を持つことで、大きな壁も乗り越えられる」",
    items: [
      "夢は外に出し、脳に認識させる必要がある ── 言霊の力を信じています",
      "人は慣性で行動する。動いている人は動き続け、止まっている人は止まり続ける",
      "止まっている人を動かし、動いている人を支える ── それが自分のものづくりの原点",
      "他者に依存せず、自分の力で世界をよりよくするという信念",
    ],
    visionLabel: "最終目標:",
    visionText: "心理的安全性の高い社会の構築",
  },
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
    { name: "ユメログ", date: "2026.03" },
    { name: "MindFlow", date: "2026.01" },
  ],
  sideBusiness: { name: "WakuLab", date: "2026.03", suffix: "/ 業務委託" },
  history: [
    { name: "LTS ソフトウェアテクノロジー", dateSuffix: "2025.05 入社" },
    { name: "インプリム 退職", dateSuffix: "2025.04" },
    { name: "インプリム 入社", dateSuffix: "2023.01 / Pleasanter" },
    { name: "アクモス 退職", dateSuffix: "2022.12" },
    { name: "キャリアスタート", dateSuffix: "2021.04" },
  ],
} as const;

// --- Blog ページ ---
export const blog = {
  title: "Blog",
  description: "ブログ記事一覧",
  subtitle: "技術的な学びや日々の気づきを発信しています",
  emptyMessage: "記事はまだありません。",
} as const;

// --- Product ページ ---
export const product = {
  title: "Product",
  description: "個人開発プロダクトの紹介",
  subtitle: "個人で開発しているプロダクトを紹介します",
  emptyMessage: "プロダクトはまだありません。",
  statusLabels: { active: "Active", beta: "Beta", archived: "Archived" },
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
} as const;

// --- Footer ---
export const footer = {
  copyright: site.copyright,
} as const;
