// ============================================================
// ja.ts — 日本語ラベルの単一情報源 (Single Source of Truth)
//
// このファイルの構造が typeof ja = Labels として全ロケールの基準型になる。
// en.ts は Labels 型を満たす必要があり、フィールドが欠けるとビルドエラーになる。
// 新しいラベルを追加する場合は、このファイルに先に追加してから他言語を更新すること。
// ============================================================

export const ja = {
  // --- サイト共通 ---
  site: {
    name: "Teppei Suyama", // 人名(brand): 翻訳不要
    role: "ソフトウェアエンジニア",
    defaultDescription:
      "業務自動化・フルスタック開発が強みのソフトウェアエンジニア須山哲平のポートフォリオ。退行テスト 90% 削減・RPA 月 40h 工数削減などの実績、個人開発プロダクト、技術ブログを公開しています。",
    titleSuffix: "Teppei Suyama", // サイト名(brand): 翻訳不要
    copyright: "Teppei Suyama. All rights reserved.",
  },

  // --- ナビゲーション ---
  nav: {
    home: "ホーム",
    profile: "プロフィール",
    product: "プロダクト",
    project: "プロジェクト",
    blog: "ブログ",
    contact: "お問い合わせ",
    themeToggleLabel: "ダークモード切替",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
  },

  // --- Home ページ ---
  home: {
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
    heroSummary: {
      engineerYears: (years: number) => `エンジニア歴${years}年+`,
      qiitaArticles: (count: number) => `Qiita ${count}記事`,
      personalDev: "個人開発3作を並行推進",
      separator: " / ",
    },
    strengths: {
      title: "強み",
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
          body: "ステークホルダーとの合意形成を積み重ね、契約額 +33% 拡大や PG → PL 昇格(単価 +25%)を実現。3 か月の短期契約を延長に導いた実績があります。",
        },
      ],
    },
    profileSection: {
      title: "プロフィール",
      desc: "基本情報やスキル・資格・キャリア、哲学や座右の銘など、エンジニアとしてのすべてをまとめています。",
      linkText: "プロフィールはこちら",
    },
    productCards: {
      title: "プロダクト",
      desc: "個人で開発しているプロダクト",
    },
    products: {
      title: "プロダクト",
      desc: "「止まっている人を動かし、動いている人を支える」—— それが自分のものづくりの原点です。人が本来の力を発揮するためのプロダクトを個人で開発しています。",
      linkText: "プロダクト一覧はこちら",
    },
    projects: {
      title: "プロジェクト",
      desc: "業務では課題発見から改善実行まで一気通貫で推進し、定量的な成果を生み出してきました。",
      linkText: "プロジェクト実績はこちら",
    },
    blog: {
      title: "ブログ",
      desc: "技術的な学びや個人開発の振り返り、キャリアについての考えなどを発信しています。",
      linkText: "すべての記事を見る",
    },
    contact: {
      title: "お問い合わせ",
      desc: "ご質問やフィードバックなど、お気軽にお問い合わせください。",
      linkText: "お問い合わせはこちら",
    },
  },

  // --- Profile ページ ---
  profile: {
    title: "プロフィール",
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
    // sideJob: 非公開扱い(空文字で profile.astro 側で非表示分岐)
    sideJob: {
      name: "",
      url: "",
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
    // Philosophy / Dream / Motto / Goal は src/content/profile/*.md に移行済み
    links: {
      title: "リンク",
      github: {
        name: "GitHub", // brand
        id: "teppei19980914",
        url: "https://github.com/teppei19980914",
      },
      qiita: {
        name: "Qiita", // brand
        id: "teppei19980914",
        url: "https://qiita.com/teppei19980914",
      },
      wantedly: {
        name: "Wantedly", // brand
        id: "須山 哲平",
        url: "https://www.wantedly.com/id/teppei_urata",
      },
    },
  },

  // --- About (Profile サブ情報) ---
  about: {
    title: "自己紹介",
    description: "須山 哲平(Teppei Suyama)のプロフィール",
    subtitle: "スキル・資格・キャリア",
    skills: {
      title: "スキル",
      legend: "\u25CF 実務2年以上　\u25CB 実務1年以上　\u25B3 知識あり",
      categories: {
        languages: "言語",
        database: "データベース",
        cloud: "クラウド / プラットフォーム",
        os: "OS", // 技術略語(brand)
        tools: "ツール",
        personalDev: "個人開発",
      },
    },
    certifications: {
      title: "資格",
      items: [
        // 資格名は公式名称(brand)のため原文のまま
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
      title: "キャリア",
      // sideJob は副業情報の非公開化に伴い表示対象外(凡例ラベルは後方互換のため残置)
      legend: { employee: "正社員", personal: "個人開発", sideJob: "" },
      now: "現在",
      branchLabel: "分岐",
    },
    education: {
      title: "学歴",
      items: [
        { period: "2017年4月 - 2021年3月", name: "東京福祉大学 心理学部心理学科" },
        { period: "2014年4月 - 2017年3月", name: "目黒学院高等学校" },
      ],
    },
  },

  // --- Career グラフ ---
  careerGraph: {
    personalDev: [
      { name: "ユメハシ", date: "2026.03" },
      { name: "Defrago", date: "2026.01" },
    ],
    // sideBusiness: 副業情報の非公開化に伴い空文字化(CareerGraph 側で非表示分岐)
    sideBusiness: { name: "", date: "", suffix: "" },
    history: [
      { name: "株式会社LTS ソフトウェアテクノロジー 入社", dateSuffix: "2025.05" },
      { name: "株式会社インプリム 退職", dateSuffix: "2025.04" },
      { name: "株式会社インプリム 入社", dateSuffix: "2023.01" },
      { name: "アクモス株式会社 退職", dateSuffix: "2022.12" },
      { name: "アクモス株式会社 入社", dateSuffix: "2021.04" },
    ],
  },

  // --- Blog ページ ---
  blog: {
    title: "ブログ",
    description: "ブログ記事一覧",
    subtitle: "技術的な学びや日々の気づきを発信しています",
    maxPerSection: 5,
    viewAllText: "全記事はこちら",
    allTitle: "記事一覧",
    emptyMessage: "記事はまだありません。",
    draftBanner: "この記事は下書きです。Web では表示されません。",
    scheduledBanner: "この記事は予約投稿です。公開予定日まで Web では表示されません。",
    featuredSection: {
      title: "ピックアップ記事",
      subtitle: "著者が特におすすめする記事",
    },
    qiitaSection: {
      title: "技術記事 (Qiita)",
      subtitle: "Qiita で発信した技術記事(いいね・ストック数の多い記事を厳選)",
      qiitaUserId: "teppei19980914",
      maxArticles: 5,
      linkText: "Qiita ですべての記事を見る",
      linkUrl: "https://qiita.com/teppei19980914",
    },
  },

  // --- Product ページ ---
  product: {
    title: "プロダクト",
    description: "個人開発プロダクトの紹介",
    subtitle: "個人で開発しているプロダクトを紹介します",
    emptyMessage: "プロダクトはまだありません。",
    statusLabels: { active: "公開中", beta: "開発中 — こうご期待", archived: "アーカイブ" },
    detailLink: "詳細を見る",
    tryLink: "体験する",
    githubLink: "GitHub", // brand
  },

  // --- Project ページ ---
  project: {
    title: "プロジェクト",
    description: "参画プロジェクトの紹介",
    subtitle: "正社員として参画したプロジェクトの紹介",
    emptyMessage: "プロジェクトはまだありません。",
    maxDisplay: 5,
    viewAllText: "全プロジェクトはこちら",
    allTitle: "プロジェクト一覧",
    allSubtitle: "正社員として参画したすべてのプロジェクト",
    contractTypes: {
      employee: "正社員",
      contract: "業務委託",
    },
    detailLink: "詳細を見る",
  },

  // --- Contact ページ ---
  contact: {
    title: "お問い合わせ",
    description: "お問い合わせ・連絡先",
    subtitle: "ご質問やご相談はこちらからお気軽にどうぞ",
    availability: {
      title: "",
      items: [],
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
        options: ["技術相談", "フィードバック", "その他"],
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
  },

  // --- 共通 ---
  common: {
    backLink: "前のページに戻る",
    scrollTopLabel: "ページ先頭に戻る",
    tocTitle: "目次",
    ctaTitle: "お問い合わせ",
    ctaBody: "ご質問やフィードバックなど、お気軽にお問い合わせください。",
    ctaButton: "お問い合わせはこちら",
  },

  // --- Profile ページの目次 ---
  profileToc: [
    { href: "#basic", label: "基本情報" },
    { href: "#skills", label: "スキル" },
    { href: "#certifications", label: "資格" },
    { href: "#career", label: "キャリア" },
    { href: "#education", label: "学歴" },
    { href: "#mindset", label: "思想" },
    { href: "#direction", label: "方向性" },
    { href: "#links", label: "リンク" },
  ],

  // --- Profile ページの 2 大グループ (思想 / 方向性) のセクション文言 ---
  //
  // sections は Content Collections の slug (philosophy / motto / dream / goal) を
  // キーとしたタイトルマップ。profile.astro が各サブセクションの見出しに使用する。
  // ロケール別に翻訳される一方、Markdown 本文(引用・段落)は ja 固定で運用する
  // (Content Collections 側で管理されるため、このファイルでは本文を扱わない)。
  profileGroups: {
    mindset: {
      title: "思想",
      lead: "日々の意思決定の根底にある、私の抽象的な価値観です。哲学(Philosophy)と座右の銘(Motto)の 2 つで構成しています。",
      sections: {
        philosophy: "哲学",
        motto: "座右の銘",
      },
    },
    direction: {
      title: "方向性",
      lead: "これから具体的に目指す先です。夢(Dream)で長期のビジョンを、目標(Goal)で期間ごとの到達点を示します。",
      sections: {
        dream: "夢",
        goal: "目標",
      },
    },
  },

  // --- Blog ページの目次 (不使用: Blog 統合により削除) ---
  blogToc: [],

  // --- Footer ---
  footer: {
    copyright: "Teppei Suyama. All rights reserved.",
  },

  // --- 言語スイッチャー ---
  languageSwitcher: {
    label: "言語",
    switchTo: "日本語で見る",
  },

  // --- SNS シェアボタン ---
  readingTime: (min: number) => `${min}分で読めます`,

  share: {
    title: "この記事をシェア",
    x: "X でシェア",
    copyText: "シェア用テキストをコピー",
    copyLink: "URL をコピー",
    copied: "コピーしました！",
  },

};
