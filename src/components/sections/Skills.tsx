"use client";

import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Dictionary } from "@/content/types";
import { Spotlight, useReducedMotionSafe } from "../motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function SkillsExplorer({ t }: { t: Dictionary["skills"] }) {
  const [active, setActive] = useState(t.groups[0].id);
  const reduced = useReducedMotionSafe();
  const group = t.groups.find((g) => g.id === active) ?? t.groups[0];
  const index = t.groups.indexOf(group);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Patrón de pestañas ARIA: flechas, Inicio y Fin mueven el foco y activan la pestaña.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const n = t.groups.length;
    let next: number | null = null;
    if (e.key in keys) next = (index + keys[e.key] + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(t.groups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <LayoutGroup>
          <div
            role="tablist"
            aria-label={t.eyebrow}
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
          >
            {t.groups.map((g, i) => {
              const on = g.id === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`skills-tab-${g.id}`}
                  role="tab"
                  tabIndex={on ? 0 : -1}
                  type="button"
                  aria-selected={on}
                  aria-controls="skills-panel"
                  onClick={() => setActive(g.id)}
                  className={`group relative flex shrink-0 items-center gap-4 rounded-2xl px-5 py-3.5 text-left transition-colors duration-200 lg:py-5 ${on ? "text-fg" : "text-fg-3 hover:text-fg-2"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="skills-tab"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                      className="absolute inset-0 rounded-2xl border border-line bg-surface"
                    />
                  )}
                  {on && (
                    <motion.span
                      layoutId="skills-bar"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                      className="absolute left-0 top-1/2 hidden h-8 w-[3px] -translate-y-1/2 rounded-full bg-accent-bright lg:block"
                    />
                  )}
                  <span className={`relative font-mono text-xs transition-colors ${on ? "text-accent-bright" : ""}`}>0{i + 1}</span>
                  <span className="relative whitespace-nowrap text-base font-medium tracking-tight lg:text-2xl">{g.name}</span>
                  <span className="relative ml-auto hidden font-mono text-xs text-fg-3 lg:inline">{g.items.length}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${group.id}`} tabIndex={0} className="rounded-3xl lg:col-span-8">
          <div className="mb-6 flex items-baseline gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={group.id}
                initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(6px)", transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, ease }}
                className="font-serif text-5xl italic leading-none text-accent-bright sm:text-6xl"
              >
                {group.name}
              </motion.p>
            </AnimatePresence>
            <span className="font-mono text-xs text-fg-3">
              0{index + 1} / 0{t.groups.length}
            </span>
          </div>

          <motion.ul layout className="grid gap-3 sm:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {group.items.map((item, i) => (
                <motion.li
                  key={group.id + item.name}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97, filter: "blur(4px)", transition: { duration: 0.12 } }}
                  transition={{ duration: 0.45, ease, delay: reduced ? 0 : 0.05 + i * 0.05 }}
                >
                  <Spotlight className="group h-full rounded-2xl border border-line bg-surface/70 transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-surface">
                    <div className="flex h-full items-start gap-4 p-5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-serif text-lg italic text-accent-bright transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
                        {item.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium tracking-tight">{item.name}</p>
                        <p className="mt-1 font-mono text-[11px] text-fg-3">
                          <span className="uppercase tracking-[0.14em]">{t.whereLabel}</span> · {item.where}
                        </p>
                      </div>
                    </div>
                  </Spotlight>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
