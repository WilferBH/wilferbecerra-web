"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import type { Dictionary } from "@/content/types";
import { Section } from "../ui";

export function Experience({ t }: { t: Dictionary["experience"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="experience" index="06" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-16 lg:grid-cols-12">
        <ol ref={ref} className="relative lg:col-span-8 lg:col-start-5">
          <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line" />
          <motion.span aria-hidden style={{ scaleY: line }} className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-accent-bright" />
          {t.items.map((item, i) => (
            <li key={item.company + item.period} data-reveal style={{ "--i": i } as React.CSSProperties} className="group relative pb-16 pl-10 last:pb-0">
              <span aria-hidden className="absolute left-0 top-1.5 size-[11px] rounded-full border border-accent-bright bg-bg transition-colors duration-300 group-hover:bg-accent-bright" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{item.period}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{item.role}</h3>
              <p className="mt-1 font-serif text-lg italic text-accent-bright">{item.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-fg-2">{item.summary}</p>
              <ul className="mt-5 space-y-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-fg-2">
                    <span aria-hidden className="mt-[9px] h-px w-4 shrink-0 bg-accent-bright/60" />
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <aside className="space-y-10 lg:col-span-3 lg:col-start-1 lg:row-start-1">
          <div data-reveal className="lg:sticky lg:top-28">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.education}</h3>
            <p className="mt-4 font-mono text-[11px] text-fg-3">{t.school.period}</p>
            <p className="mt-1 font-medium">{t.school.title}</p>
            <p className="text-sm text-fg-2">{t.school.institution}</p>
            <p className="mt-2 text-sm text-fg-3">{t.school.note}</p>

            <h3 className="mt-12 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.languagesTitle}</h3>
            <ul className="mt-4 space-y-2">
              {t.languages.map((l) => (
                <li key={l.name} className="flex justify-between border-b border-line-soft pb-2 text-sm">
                  <span>{l.name}</span>
                  <span className="font-mono text-fg-2">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
