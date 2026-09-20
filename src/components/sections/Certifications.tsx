import Image from "next/image";
import { certifications } from "@/content/certifications";
import type { Dictionary, Locale } from "@/content/types";
import { ArrowUpRight } from "../icons";
import { Spotlight } from "../motion";
import { Section } from "../ui";

const formatDate = (date: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { month: "short", year: "numeric" }).format(new Date(`${date}-01T12:00:00`));

export function Certifications({ t, lang }: { t: Dictionary["certifications"]; lang: Locale }) {
  if (certifications.length === 0) return null;
  const sorted = [...certifications].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section id="certifications" index="07" eyebrow={t.eyebrow} title={t.title} aside={<p className="text-sm leading-relaxed text-fg-2">{t.intro}</p>}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((c, i) => {
          const content = (
            <Spotlight className="group h-full rounded-3xl border border-line bg-surface/70 transition-[transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-surface">
              <div className="flex h-full flex-col p-6">
                {c.image ? (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg-2">
                    <Image src={c.image} alt={c.title[lang]} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  </div>
                ) : (
                  <span className="mb-6 grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 font-serif text-2xl italic text-accent-bright transition-transform duration-300 group-hover:rotate-[-6deg]">
                    {c.issuer.charAt(0)}
                  </span>
                )}
                <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-fg-3">{c.issuer}</span>
                  <span className={c.status === "done" ? "text-accent-bright" : "text-amber"}>
                    {c.status === "done" ? formatDate(c.date, lang) : t.inProgress}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight">{c.title[lang]}</h3>
                {c.url && (
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-fg-2 transition-colors group-hover:text-fg">
                    {t.view}
                    <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </Spotlight>
          );
          return (
            <li key={c.title.es + c.issuer} data-reveal style={{ "--i": i } as React.CSSProperties}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
