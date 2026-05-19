// ============================================================
// en.ts — English labels
//
// Phase 5: Home / Profile / Track Record を優先的に英訳済み。
// Product / Blog / Contact は Phase 6 で順次翻訳予定で、現時点では ja を継承する。
//
// 翻訳方針:
//   - ロケール不変の値(URL、ID、日付、人物名、会社名など)は ja と同じ値を設定
//   - 会社名は原文(日本語)のままで問題ない(固有名詞として扱う)
//   - Markdown コンテンツ(src/content/profile/*.md 等)はこのファイルの対象外
// ============================================================

import type { Labels } from "./types";

export const en: Labels = {
  // --- サイト共通 ---
  site: {
    name: "Teppei Suyama",
    role: "Software Engineer",
    defaultDescription:
      "Portfolio of software engineer Teppei Suyama: workflow automation and full-stack development, with 90% regression test reduction and 40h/month RPA savings.",
    titleSuffix: "Teppei Suyama",
    copyright: "Teppei Suyama. All rights reserved.",
  },

  // --- Navigation ---
  nav: {
    home: "Home",
    profile: "Profile",
    product: "Product",
    project: "Track Record",
    blog: "Blog",
    contact: "Contact",
    themeToggleLabel: "Toggle dark mode",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  // --- Home page ---
  home: {
    pageTitle: "Portfolio — Workflow Automation, AI Engineer",
    statsHeadline: "Measurable impact across my track record",
    stats: [
      {
        number: "90",
        unit: "%",
        label: "Regression testing cut",
        detail: "Replaced manual test cycles with automated C# unit tests",
        link: "project/implem-unittest/",
      },
      {
        number: "60",
        unit: "%",
        label: "Overtime reduced",
        detail: "VBA automation tools lifted the load across the whole team",
        link: "project/acmos-auto-parts/",
      },
      {
        number: "40",
        unit: "h / mo",
        label: "RPA savings",
        detail: "Fully automated sales operations with Power Automate",
        link: "project/implem-rpa/",
      },
      {
        number: "15.45",
        unit: "%",
        label: "Search CTR",
        detail: "Personal site SEO improvements reached ~3x the industry average (78 clicks in 25 days)",
        link: "project/homepage-seo/",
      },
    ],
    heroTagline: "The engineer who cut regression tests by 90% and team overtime by 60%.",
    heroSummary: {
      engineerYears: (years: number) => `${years}+ years as an engineer`,
      qiitaArticles: (count: number) => `${count} Qiita articles`,
      personalDev: "running 3 personal dev products in parallel",
      separator: " / ",
    },
    strengths: {
      title: "Strengths",
      items: [
        {
          heading: "Drive from problem discovery to execution",
          body: "I spot inefficiencies in day-to-day operations and ship fixes with VBA or Power Automate. Results include 60% less overtime and 40 person-hours/month saved with full RPA.",
        },
        {
          heading: "Full-stack skills from requirements to production",
          body: "I cover the full cycle: requirements, design, backend, frontend, test automation, and operations. Certifications include Japan's Applied Information Technology Engineer, Java Gold, and LPIC.",
        },
        {
          heading: "Business outcomes through trust",
          body: "I build alignment with stakeholders and turn it into business outcomes — 4× project-scale expansion at one engagement. On this self-operated portfolio I have also lifted search CTR to 15.45% (~3x industry average) through SEO improvements.",
        },
      ],
    },
    profileSection: {
      title: "Profile",
      desc: "Basics, skills, certifications, career, philosophy and mottos — everything I bring as an engineer, in one place.",
      linkText: "See my profile",
    },
    productCards: {
      title: "Products",
      desc: "Products I build on the side",
    },
    products: {
      title: "Products",
      desc: "\"Get the stuck moving, and keep the moving going.\" That is the heart of how I build. I ship products that help people unlock the potential they already have.",
      linkText: "See all products",
    },
    projects: {
      title: "Track Record",
      desc: "In my day job I drive each engagement from problem discovery through execution, turning it into measurable business outcomes.",
      linkText: "See my full track record",
    },
    blog: {
      title: "Blog",
      desc: "Thoughts on technical learnings, retrospectives from personal projects, and career reflections.",
      linkText: "Read all posts",
    },
    contact: {
      title: "Contact",
      desc: "Feel free to reach out with any questions or feedback.",
      linkText: "Get in touch",
    },
  },

  // --- Profile page ---
  profile: {
    title: "Profile — Workflow Automation & AI Engineer",
    description: "Software engineer Teppei Suyama — workflow automation & AI. 90% regression test reduction, 40h/month RPA savings. Skills, career, philosophy in one page.",
    subtitle: "Basics, philosophy, and social links",
    nameJa: "須山 哲平",
    nameEn: "Teppei Suyama",
    birthDate: "1998-09-14",
    careerStartDate: "2021-04-01",
    birthDateDisplay: "September 14, 1998",
    location: "Kawasaki, Kanagawa, Japan",
    employer: {
      name: "Company C",
      url: "",
    },
    // sideJob: hidden (intentionally empty for privacy reasons)
    sideJob: {
      name: "",
      url: "",
    },
    labels: {
      birthDate: "Date of birth",
      age: "Age",
      ageSuffix: "",
      careerYears: "Years as engineer",
      careerYearsSuffix: "yr",
      location: "Location",
      employer: "Employer",
      sideJob: "Side work",
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
        id: "Teppei Suyama",
        url: "https://www.wantedly.com/id/teppei_urata",
      },
    },
  },

  // --- About (Profile sub-sections) ---
  about: {
    title: "About",
    description: "About Teppei Suyama: skills, certifications, career, and education. Tech: Flutter, TypeScript, Astro, RPA, AI-driven development, with real automation results.",
    subtitle: "Skills, certifications, and career",
    skills: {
      title: "Skills",
      legend: "\u25CF 2+ years production  \u25CB 1+ year production  \u25B3 Familiar",
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
        { date: "2026.02", name: "Python 3 Engineer Certification (Practical)" },
        { date: "2024.10", name: "Applied Information Technology Engineer (JP)" },
        { date: "2024.03", name: "OSS-DB Silver" },
        { date: "2023.11", name: "AZ-900 (Microsoft Azure Fundamentals)" },
        { date: "2023.09", name: "LPIC Level 1" },
        { date: "2022.11", name: "Fundamental Information Technology Engineer (JP)" },
        { date: "2021.07", name: "Oracle Certified Java Programmer, Gold SE 11" },
        { date: "2019.07", name: "MOS Excel 2019 Expert" },
        { date: "2018.06", name: "Kanji Proficiency Test, Level 2 (JP)" },
      ],
    },
    career: {
      title: "Career",
      // sideJob hidden for privacy; label kept as empty for schema parity
      legend: { employee: "Full-time", personal: "Personal dev", sideJob: "" },
      now: "Now",
      branchLabel: "branch",
    },
    education: {
      title: "Education",
      items: [
        { period: "Apr 2017 - Mar 2021", name: "Tokyo University of Social Welfare, Dept. of Psychology" },
        { period: "Apr 2014 - Mar 2017", name: "Meguro Gakuin High School" },
      ],
    },
  },

  // --- Career graph ---
  careerGraph: {
    personalDev: [
      { name: "HomePage", date: "2026.04" },
      { name: "YumeHashi", date: "2026.03" },
      { name: "Defrago", date: "2026.01" },
    ],
    // sideBusiness: hidden (intentionally empty for privacy reasons)
    sideBusiness: { name: "", date: "", suffix: "" },
    history: [
      { name: "Joined Company C", dateSuffix: "2025.05" },
      { name: "Left Company B", dateSuffix: "2025.04" },
      { name: "Joined Company B", dateSuffix: "2023.01" },
      { name: "Left Company A", dateSuffix: "2022.12" },
      { name: "Joined Company A", dateSuffix: "2021.04" },
    ],
  },

  // --- Track Record page ---
  project: {
    title: "Track Record",
    description: "Track record of engagements delivered by Teppei Suyama as a full-time and contract engineer: 90% regression test reduction, 40h/month RPA savings, and core business system rollouts.",
    subtitle: "Engagements I have delivered as a full-time engineer",
    emptyMessage: "Track record coming soon.",
    maxDisplay: 5,
    viewAllText: "See full track record",
    allTitle: "Full Track Record",
    allSubtitle: "Every engagement in my full-time engineering track record",
    contractTypes: {
      employee: "Full-time",
      contract: "Contract",
      personal: "Personal",
    },
    detailLink: "View details",
  },

  // --- Common ---
  common: {
    backLink: "Go back",
    scrollTopLabel: "Back to top",
    tocTitle: "Contents",
    ctaTitle: "Contact",
    ctaBody: "Feel free to reach out with any questions or feedback.",
    ctaButton: "Get in touch",
  },

  // --- Profile page TOC ---
  profileToc: [
    { href: "#basic", label: "Basics" },
    { href: "#skills", label: "Skills" },
    { href: "#certifications", label: "Certifications" },
    { href: "#career", label: "Career" },
    { href: "#education", label: "Education" },
    { href: "#mindset", label: "Mindset" },
    { href: "#direction", label: "Direction" },
    { href: "#links", label: "Links" },
  ],

  // --- Profile page groups (Mindset / Direction) ---
  profileGroups: {
    mindset: {
      title: "Mindset",
      lead: "The abstract values that shape my day-to-day decisions. Made up of Philosophy and Motto.",
      sections: {
        philosophy: "Philosophy",
        motto: "Motto",
      },
    },
    direction: {
      title: "Direction",
      lead: "The concrete direction I am heading. Dream lays out the long-term vision; Goal breaks it into short, mid, and long-term targets.",
      sections: {
        dream: "Dream",
        goal: "Goal",
      },
    },
  },

  // --- Language switcher ---
  languageSwitcher: {
    label: "Language",
    switchTo: "View in English",
  },

  readingTime: (min: number) => `${min} min read`,

  // --- SNS share buttons ---
  share: {
    title: "Share this article",
    x: "Share on X",
    copyText: "Copy share text",
    copyLink: "Copy URL",
    copied: "Copied!",
  },

  // --- Blog page ---
  blog: {
    title: "Blog",
    description: "Daily blog by software engineer Teppei Suyama on AI-driven development, workflow automation, and personal projects with Astro v6, Flutter, and Claude Code.",
    subtitle: "Technical learnings, reflections, and daily discoveries",
    maxPerSection: 5,
    viewAllText: "See all posts",
    allTitle: "All Posts",
    allDescription: "Full archive by software engineer Teppei Suyama, sorted by date: AI-driven development, workflow automation, personal projects, career, and reading reflections.",
    emptyMessage: "No posts yet.",
    draftBanner: "This article is a draft. It will not be displayed on the web.",
    scheduledBanner: "This article is scheduled. It will not be displayed on the web until the publish date.",
    featuredSection: {
      title: "Featured Articles",
      subtitle: "Handpicked by the author",
    },
    qiitaSection: {
      title: "Tech Blog (Qiita)",
      subtitle: "Technical articles published on Qiita (curated by likes and stocks)",
      qiitaUserId: "teppei19980914",
      maxArticles: 5,
      linkText: "See all articles on Qiita",
      linkUrl: "https://qiita.com/teppei19980914",
    },
    calendar: {
      title: "Publishing Calendar",
      subtitle: "Past posts and upcoming scheduled articles at a glance",
      legendPublished: "Published",
      legendScheduled: "Scheduled",
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      scheduledSuffix: " (scheduled)",
      prev: "Previous month",
      next: "Next month",
      monthArticlesTitle: "Articles this month",
      emptyMonth: "No articles published this month.",
    },
    search: {
      placeholder: "Search articles (title / description)",
      ariaLabel: "Search blog articles",
      clearLabel: "Clear",
      noResults: "No articles found. Try different keywords.",
      resultCountTemplate: "{count} hit(s)",
    },
    tag: {
      titleTemplate: "Articles tagged \"{tag}\" — {count} posts",
      titleSingleTemplate: "Articles tagged \"{tag}\"",
      descriptionTemplate: "Archive of {count} articles tagged \"{tag}\". Latest: \"{latest}\" (published {date}). Curated technical explanations, experience reports, and reading reflections.",
      descriptionSingleTemplate: "1 article tagged \"{tag}\". \"{latest}\" (published {date}).",
      indexTitle: "All Tags",
      indexDescription: "Index of all tags on Teppei Suyama's blog. Pick a theme — technical, career, reading, personal dev — and filter the entire archive at once.",
      indexSubtitle: "Browse articles by theme",
      countSuffix: "post(s)",
      backToBlogIndex: "Back to Blog",
      backToTagIndex: "Back to all tags",
    },
  },

  // --- Product page ---
  product: {
    title: "Product",
    description: "Personal products by Teppei Suyama: YumeHashi (goals), Defrago (PDCA), and Tasukiba (knowledge-driven PM). Flutter, FastAPI, Next.js — zero monthly cost.",
    subtitle: "Products I build and maintain on the side",
    emptyMessage: "No products yet.",
    statusLabels: { active: "Active", beta: "In development — stay tuned", archived: "Archived", suspended: "Not accepting new users" },
    detailLink: "View details",
    tryLink: "Try it",
    suspendedLink: "Not accepting new users",
    suspendedNotice: "We are currently not accepting new users.",
    githubLink: "GitHub",
    subPagesTitle: "Pick the page that matches what you're here for",
    subPagesIntro: "This product page is split based on what you want to read.",
    audienceLabels: {
      user: "If you're curious about the app",
      developer: "If you might join the dev team",
    },
  },

  // --- Contact page ---
  contact: {
    title: "Contact",
    description: "Contact software engineer Teppei Suyama for personal-dev consulting, hiring, speaking, writing, advice, or collaboration. GitHub, Qiita, Wantedly listed too.",
    subtitle: "Feel free to reach out with any questions or feedback",
    availability: {
      title: "",
      items: [],
      responseTime: "I'll get back to you within 2 business days.",
    },
    formTitle: "Contact form",
    formNote:
      "Use the form below to reach out. I'll review your message and get back to you.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@example.com" },
      type: {
        label: "Inquiry type",
        options: [
          "About Tasukiba",
          "Technical consultation",
          "Feedback",
          "Other",
        ],
      },
      message: {
        label: "Message",
        placeholder: "Please describe your inquiry",
      },
    },
    submitLabel: "Send",
    submittingLabel: "Sending...",
    successTitle: "Thanks for reaching out",
    successBody: "I'll review your message and get back to you shortly.",
    errorMessage: "Failed to send. Please try again.",
  },

  // --- Blog page TOC (unused after blog unification) ---
  blogToc: [],

  // --- Footer ---
  footer: {
    copyright: "Teppei Suyama. All rights reserved.",
  },
};
