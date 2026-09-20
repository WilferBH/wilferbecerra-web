"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import type { Dictionary } from "@/content/types";
import { useReducedMotionSafe } from "../motion";
import { Section } from "../ui";

export function Approach({ t, index }: { t: Dictionary["approach"]; index: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [reached, setReached] = useState(0);
  const n = t.steps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.min(n, Math.round(v * n + 0.35))));
  const done = (i: number) => reduced || i < reached;

  return (
    <Section id="approach" index={index} eyebrow={t.eyebrow} title={t.title} className="bg-bg-2/60">
      <div className="relative">
        <span aria-hidden className="absolute left-[11px] top-0 h-full w-px bg-line lg:left-0 lg:top-0 lg:h-px lg:w-full" />
        <motion.span
          aria-hidden
          style={reduced ? undefined : { scaleY: rail }}
          className="absolute left-[11px] top-0 hidden h-full w-px origin-top bg-accent-bright max-lg:block"
        />
        <motion.span
          aria-hidden
          style={reduced ? undefined : { scaleX: rail }}
          className="absolute left-0 top-0 hidden h-px w-full origin-left bg-accent-bright lg:block"
        />

        <ol ref={ref} className="grid lg:grid-cols-5">
          {t.steps.map((s, i) => {
            const on = done(i);
            return (
              <li
                key={s.title}
                className="group relative py-8 pl-10 pr-6 lg:border-r lg:border-line lg:px-6 lg:pl-8 lg:last:border-r-0 lg:first:pl-0"
              >
                <span
                  aria-hidden
                  className={`absolute left-[5px] top-10 size-3.5 rounded-full border transition-[background-color,border-color,transform] duration-500 ease-out lg:left-0 lg:top-[-7px] lg:first:left-0 ${
                    on ? "scale-100 border-accent-bright bg-accent-bright" : "scale-75 border-line bg-bg-2"
                  }`}
                />
                <span
                  className={`font-serif text-6xl italic leading-none transition-colors duration-500 ${
                    on ? "text-accent-bright" : "text-fg-3/50"
                  }`}
                >
                  {i + 1}
                </span>
                <p className={`mt-8 text-xl font-medium tracking-tight transition-colors duration-500 ${on ? "text-fg" : "text-fg-2"}`}>
                  {s.title}
                </p>
                <p className={`mt-2 text-sm leading-relaxed transition-colors duration-500 ${on ? "text-fg-2" : "text-fg-3"}`}>{s.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
