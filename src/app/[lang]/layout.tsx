import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { site } from "@/content/site";
import { locales } from "@/content/types";
import { PointerGlow, RevealObserver, SmoothScroll } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    alternates: { canonical: `/${lang}`, languages: { es: "/es", en: "/en" } },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "es" ? "es_ES" : "en_US",
      url: `/${lang}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: ["/og.png"] },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}>
      <head>
        {/* Debe ejecutarse antes de pintar para que el tema no parpadee. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('intro')){d.classList.add('no-intro')}else{d.classList.add('intro');sessionStorage.setItem('intro','1')}}catch(e){d.classList.add('no-intro')}try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-dvh">
        <Intro />
        <PointerGlow />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60]" />
        <SmoothScroll />
        <RevealObserver />
        <Header lang={lang} nav={t.nav} a11y={t.a11y} brand={t.brand} />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer t={t.footer} nav={t.nav} lang={lang} />
      </body>
    </html>
  );
}
