import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { EmailActions } from "../EmailActions";
import { ArrowUpRight, GitHub, LinkedIn } from "../icons";
import { Rich } from "../Rich";

export function Contact({ t, index }: { t: Dictionary["contact"]; index: string }) {
  const profiles = [
    { label: "GitHub", href: site.links.github, Icon: GitHub },
    { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedIn },
    ...(site.links.upwork ? [{ label: "Upwork", href: site.links.upwork, Icon: ArrowUpRight }] : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-32 sm:py-44">
      <div aria-hidden className="absolute bottom-[-30%] left-1/2 size-[70vw] max-w-[1000px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3">
          <span className="text-accent-bright">({index})</span>
          <span>{t.eyebrow}</span>
          <span data-draw aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <h2 id="contact-title" data-words className="display mt-10 max-w-5xl text-[2.6rem] font-medium leading-[1] tracking-[-0.04em] text-balance sm:text-7xl lg:text-[6rem]">
          <Rich text={t.title} split />
        </h2>
        <p data-reveal className="mt-8 max-w-xl text-lg text-fg-2">
          {t.description}
        </p>

        <EmailActions email={site.email} t={t} />

        <ul data-reveal className="mt-16 flex flex-wrap gap-3">
          {profiles.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/60 px-5 py-3 text-sm text-fg-2 backdrop-blur transition-colors duration-200 hover:border-fg-2 hover:text-fg"
              >
                <Icon />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
