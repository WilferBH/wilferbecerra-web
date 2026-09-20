import Link from "next/link";
import { ViewTransition } from "react";
import { projects } from "@/content/projects";
import type { Dictionary, Locale } from "@/content/types";
import { ArrowUpRight } from "../icons";
import { Spotlight } from "../motion";
import { StackedCards } from "../scroll-fx";
import { Section, Shot, Tag } from "../ui";
import { Testimonial } from "./Testimonial";

export function Projects({ t, testimonial, lang, pendingLabel }: { t: Dictionary["projects"]; testimonial: Dictionary["testimonial"]; lang: Locale; pendingLabel: string }) {
  const sorted = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <Section id="projects" index="03" eyebrow={t.eyebrow} title={t.title} aside={<p className="text-sm leading-relaxed text-fg-2">{t.intro}</p>}>
      <StackedCards>
        {sorted.map((p, i) => (
          <div key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <Spotlight className="group rounded-3xl border border-line bg-surface transition-colors duration-300 hover:bg-surface-2">
              <Link
                href={`/${lang}/projects/${p.slug}`}
                transitionTypes={["nav-forward"]}
                className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12"
              >
                <div className={`flex flex-col lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">
                    <span className="text-accent-bright">0{i + 1}</span>
                    <span className="h-px w-6 bg-line" />
                    {p.featured ? <span className="text-amber">{t.featured}</span> : <span>{p.kicker[lang]}</span>}
                  </div>
                  <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                    <h3 className="mt-6 w-fit text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{p.title}</h3>
                  </ViewTransition>
                  {p.featured && <p className="mt-2 text-sm text-fg-2">{p.kicker[lang]}</p>}
                  <p className="mt-6 max-w-md leading-relaxed text-fg-2">{p.summary[lang]}</p>

                  <div className="mt-8 flex">
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      {t.viewCase}
                      <span className="grid size-9 place-items-center rounded-full border border-line transition-[rotate,background-color,border-color,color] duration-300 ease-out group-hover:rotate-45 group-hover:border-accent-bright group-hover:bg-accent-bright group-hover:text-bg">
                        <ArrowUpRight />
                      </span>
                    </span>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-1.5">
                    {p.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`}>
                  <ViewTransition name={`shot-${p.slug}`} share="morph" default="none">
                    <div className="overflow-hidden rounded-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[0.985]">
                      <Shot slot={p.images[0]} lang={lang} pendingLabel={pendingLabel} className="aspect-[16/10]" />
                    </div>
                  </ViewTransition>
                </div>
              </Link>
            </Spotlight>
          </div>
        ))}
      </StackedCards>
      <Testimonial t={testimonial} lang={lang} className="relative z-10 mt-16 sm:mt-24" />
    </Section>
  );
}
