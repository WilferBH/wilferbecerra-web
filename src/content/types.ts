export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type Localized<T = string> = Record<Locale, T>;

export type ImageSlot = {
  src?: string;
  alt: Localized;
  pending: Localized;
};

export type Project = {
  slug: string;
  title: string;
  kicker: Localized;
  summary: Localized;
  role: Localized;
  period?: Localized;
  problem: Localized;
  solution: Localized<string[]>;
  result?: { value: string; label: Localized };
  technologies: string[];
  images: ImageSlot[];
  liveUrl?: string;
  featured?: boolean;
};

export type Testimonial = {
  author: string;
  role: Localized;
  photo?: string;
  project?: string;
  /** Pendiente hasta tener la reseña real del cliente. */
  quote?: Localized;
};

export type Dictionary = {
  meta: { title: string; description: string };
  brand: { home: string };
  nav: { about: string; projects: string; albor: string; skills: string; experience: string; contact: string };
  a11y: { skip: string; openMenu: string; closeMenu: string; language: string; mainNav: string; themeLight: string; themeDark: string };
  hero: {
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    stats: { value: number; prefix?: string; suffix?: string; label: string }[];
  };
  pipeline: {
    eyebrow: string;
    title: string;
    intro: string;
    sample: string;
    steps: { title: string; detail: string }[];
    chatTitle: string;
    messages: { from: string; text: string; time: string }[];
    tableHead: [string, string, string, string];
    rows: [string, string, string, string][];
    totalLabel: string;
    total: string;
    pdfTitle: string;
    pdfMeta: string;
    pdfReady: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    viewCase: string;
    featured: string;
    back: string;
    problem: string;
    solution: string;
    role: string;
    stack: string;
    result: string;
    visit: string;
    next: string;
  };
  flow: { title: string; steps: { title: string; detail: string }[] };
  albor: {
    eyebrow: string;
    title: string;
    description: string;
    servicesTitle: string;
    services: { title: string; detail: string }[];
    visit: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: { id: string; name: string; items: { name: string; where: string }[] }[];
    whereLabel: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    present: string;
    education: string;
    items: { period: string; role: string; company: string; summary: string; highlights: string[] }[];
    school: { period: string; title: string; institution: string; note: string };
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  certifications: { eyebrow: string; title: string; intro: string; inProgress: string; view: string };
  approach: { eyebrow: string; title: string; steps: { title: string; detail: string }[] };
  testimonial: { eyebrow: string; client: string; pending: string; pendingNote: string; prev: string; next: string; goTo: string };
  contact: { eyebrow: string; title: string; description: string; email: string; copy: string; copied: string; gmail: string; mailApp: string };
  footer: { rights: string; top: string; sitemap: string; social: string; tagline: string };
  pendingImage: string;
};
