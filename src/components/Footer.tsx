import type { Dictionary, Locale } from "@/content/types";
import { site } from "@/content/site";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "./icons";
import Image from "next/image";

const sections = ["about", "projects", "albor", "skills", "experience", "contact"] as const;

export function Footer({ t, nav, lang }: { t: Dictionary["footer"]; nav: Dictionary["nav"]; lang: Locale }) {
  const socials = [
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
    { label: "GitHub", href: site.links.github, Icon: GitHub },
    { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedIn },
  ];

  return (
    <footer className="relative z-10 border-t border-line bg-bg-2/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-full border border-line ring-2 ring-accent/40 ring-offset-2 ring-offset-bg">
              <Image src="/wilfer-becerra-avatar.webp" alt={site.name} fill sizes="64px" className="object-cover object-[50%_20%]" />
            </span>
            <div>
              <p className="text-lg font-medium tracking-tight">{site.name}</p>
              <p className="font-serif text-lg italic text-fg-2">{t.tagline}</p>
            </div>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="group mt-8 inline-flex items-center gap-2 font-serif text-2xl italic text-fg transition-colors hover:text-accent-bright sm:text-3xl"
          >
            {site.email}
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <nav aria-label={t.sitemap} className="md:col-span-3 md:col-start-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.sitemap}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {sections.map((id) => (
              <li key={id}>
                <a href={`/${lang}#${id}`} className="text-fg-2 transition-colors hover:text-fg">
                  {nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3 md:col-start-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.social}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2.5 text-fg-2 transition-colors hover:text-fg"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-fg-3 sm:px-10">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
          <a
            href="#main"
            aria-label={t.top}
            className="group grid size-10 place-items-center rounded-full border border-line text-fg-2 transition-[color,border-color,scale] duration-200 hover:border-accent-bright hover:text-accent-bright active:scale-[0.94]"
          >
            <ArrowUpRight className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
