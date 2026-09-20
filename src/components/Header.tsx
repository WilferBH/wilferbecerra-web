"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary, Locale } from "@/content/types";
import { Close, Menu } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

type Props = { lang: Locale; nav: Dictionary["nav"]; a11y: Dictionary["a11y"]; brand: Dictionary["brand"] };

const sectionIds = ["about", "projects", "albor", "skills", "experience"] as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function Header({ lang, nav, a11y, brand }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const home = `/${lang}`;
  const onHome = pathname === home;
  const href = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  const otherLang: Locale = lang === "es" ? "en" : "es";
  const switchHref = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${otherLang}`);
  const pill = hovered ?? active;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    [...sectionIds, "hero", "pipeline", "approach", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        {a11y.skip}
      </a>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-bg via-bg/85 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-10"
      >
        <Link href={home} aria-label={brand.home} transitionTypes={onHome ? undefined : ["nav-back"]} className="group flex items-center gap-3">
          <span className="relative size-10 shrink-0 rounded-full p-[2px] [background:conic-gradient(from_var(--brand-angle),var(--color-accent-bright),transparent_35%,var(--color-accent)_70%,var(--color-accent-bright))] brand-ring">
            <span className="relative block size-full overflow-hidden rounded-full border-2 border-bg bg-surface">
              <Image src="/wilfer-becerra-avatar.webp" alt="" fill sizes="40px" className="object-cover object-[50%_20%] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
            </span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="relative block h-[1.25em] overflow-hidden text-base font-medium tracking-tight">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">Wilfer Becerra</span>
              <span aria-hidden className="absolute inset-x-0 top-full block font-serif text-base italic text-accent-bright transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                Wilfer Becerra
              </span>
            </span>
          </span>
        </Link>

        <nav
          aria-label={a11y.mainNav}
          onMouseLeave={() => setHovered(null)}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-bg/70 p-1 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl lg:flex"
        >
          {sectionIds.map((id) => (
            <a
              key={id}
              href={href(id)}
              onMouseEnter={() => setHovered(id)}
              aria-current={active === id ? "true" : undefined}
              className={`relative rounded-full px-4 py-1.5 text-[13px] transition-colors duration-200 ${
                pill === id ? "text-fg" : "text-fg-2 hover:text-fg"
              }`}
            >
              {pill === id && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  className="absolute inset-0 rounded-full bg-surface-2"
                />
              )}
              <span className="relative">{nav[id]}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle labels={{ light: a11y.themeLight, dark: a11y.themeDark }} />
          <a
            href={switchHref}
            hrefLang={otherLang}
            aria-label={`${a11y.language}: ${otherLang === "es" ? "Español" : "English"}`}
            className="flex h-10 items-center rounded-full border border-line bg-bg/70 px-3.5 font-mono text-[11px] uppercase text-fg-3 backdrop-blur-xl transition-colors hover:text-fg"
          >
            <span className="text-fg">{lang}</span>
            <span className="mx-1.5">/</span>
            {otherLang}
          </a>
          <a
            href={href("contact")}
            className="group relative hidden overflow-hidden rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-transform duration-150 active:scale-[0.97] sm:inline-flex"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-[150%]">{nav.contact}</span>
            <span aria-hidden className="absolute inset-0 grid translate-y-[150%] place-items-center bg-accent-bright transition-transform duration-300 group-hover:translate-y-0">
              {nav.contact}
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            className="grid size-10 place-items-center rounded-full border border-line bg-bg/70 text-fg backdrop-blur-xl lg:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={a11y.mainNav}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 -z-10 flex flex-col justify-end bg-bg px-5 pb-10 lg:hidden"
          >
            <ul>
              {[...sectionIds, "contact" as const].map((id, i) => (
                <li key={id} className="overflow-hidden border-b border-line-soft">
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href(id)}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                    className="flex items-baseline justify-between py-4 text-4xl font-medium tracking-tight"
                  >
                    {nav[id]}
                    <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
