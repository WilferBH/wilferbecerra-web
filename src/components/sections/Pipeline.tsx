"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "../motion";
import type { Dictionary } from "@/content/types";
import { SectionHead } from "../ui";

type T = Dictionary["pipeline"];

function useStage(p: MotionValue<number>, a: number, b: number) {
  return useTransform(p, [a, b], [0, 1], { clamp: true });
}

function Stage({ t, p }: { t: T; p: MotionValue<number> }) {
  const chat = useStage(p, 0.02, 0.2);
  const rows = useStage(p, 0.27, 0.45);
  const total = useStage(p, 0.52, 0.66);
  const pdf = useStage(p, 0.74, 0.9);

  const chatDim = useTransform(rows, [0, 1], [1, 0.35]);
  const tableDim = useTransform(pdf, [0, 1], [1, 0.35]);
  const pdfY = useTransform(pdf, [0, 1], [60, 0]);
  const pdfScale = useTransform(pdf, [0, 1], [0.94, 1]);
  const beam = useTransform(p, [0.2, 0.9], [0, 1]);

  return (
    <div className="relative h-full min-h-[440px] overflow-hidden rounded-3xl border border-line bg-bg-2 p-4 sm:min-h-[520px] sm:p-7">
      <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">
        <span>exodus · pipeline</span>
        <span className="rounded-full border border-amber/40 px-2 py-0.5 text-amber">{t.sample}</span>
      </div>

      <motion.div aria-hidden style={{ scaleY: beam }} className="absolute bottom-10 left-8 top-14 w-px origin-top bg-gradient-to-b from-accent-bright via-accent-bright/50 to-transparent sm:left-9 sm:top-16" />

      <div className="relative mt-5 grid gap-3 pl-7 sm:mt-6 sm:gap-4 sm:pl-8">
        <motion.div style={{ opacity: chatDim }} className="rounded-2xl border border-line bg-surface/80 p-3 sm:p-4">
          <p className="mb-2 text-xs text-fg-3 sm:mb-3">{t.chatTitle}</p>
          <div className="space-y-1.5 sm:space-y-2">
            {t.messages.map((m, i) => (
              <Bubble key={m.from} p={chat} i={i} m={m} />
            ))}
          </div>
        </motion.div>

        <motion.div style={{ opacity: tableDim }} className="rounded-2xl border border-line bg-surface/80 p-3 font-mono text-xs sm:p-4">
          <div className="grid grid-cols-4 gap-2 border-b border-line pb-2 text-[10px] uppercase tracking-wider text-fg-3">
            {t.tableHead.map((h) => (
              <span key={h} className="last:text-right">
                {h}
              </span>
            ))}
          </div>
          {t.rows.map((r, i) => (
            <Row key={r[0]} p={rows} i={i} r={r} />
          ))}
          <motion.div style={{ opacity: total }} className="mt-2 flex justify-between border-t border-accent/40 pt-2 text-accent-bright">
            <span>{t.totalLabel}</span>
            <span>{t.total}</span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: pdf, y: pdfY, scale: pdfScale }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-accent/50 bg-surface-2 p-3 shadow-[0_20px_60px_-20px_rgb(25_184_155/0.35)] sm:flex-nowrap sm:gap-4 sm:p-4"
        >
          <span className="grid h-12 w-9 shrink-0 place-items-center rounded-md bg-fg font-mono text-[9px] font-semibold text-bg sm:h-14 sm:w-11">PDF</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{t.pdfTitle}</p>
            <p className="font-mono text-[11px] text-fg-3">{t.pdfMeta}</p>
          </div>
          <span className="ml-12 basis-full rounded-full bg-accent-bright/15 px-2.5 py-1 text-center font-mono text-[10px] uppercase tracking-wider text-accent-bright sm:ml-0 sm:basis-auto sm:text-left">
            {t.pdfReady}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function Bubble({ p, i, m }: { p: MotionValue<number>; i: number; m: T["messages"][number] }) {
  const o = useTransform(p, [i * 0.3, i * 0.3 + 0.4], [0, 1]);
  const y = useTransform(p, [i * 0.3, i * 0.3 + 0.4], [12, 0]);
  return (
    <motion.div style={{ opacity: o, y }} className="flex max-w-[85%] flex-col rounded-xl rounded-tl-sm bg-accent/25 px-3 py-1.5 sm:py-2">
      <span className="text-[11px] font-medium text-accent-bright">{m.from}</span>
      <span className="text-[13px] text-fg">{m.text}</span>
      <span className="self-end font-mono text-[10px] text-fg-3">{m.time}</span>
    </motion.div>
  );
}

function Row({ p, i, r }: { p: MotionValue<number>; i: number; r: string[] }) {
  const o = useTransform(p, [i * 0.25, i * 0.25 + 0.5], [0, 1]);
  const x = useTransform(p, [i * 0.25, i * 0.25 + 0.5], [-10, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="grid grid-cols-4 gap-2 border-b border-line-soft py-1.5 text-fg-2 sm:py-2">
      {r.map((c, j) => (
        <span key={j} className={j === 3 ? "text-right text-fg" : ""}>
          {c}
        </span>
      ))}
    </motion.div>
  );
}

type Mode = "static" | "desktop" | "mobile";

function Step({ s, i, mode, step }: { s: T["steps"][number]; i: number; mode: Mode; step: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const centred = useInView(ref, { margin: "-42% 0px -42% 0px" });

  const on = mode === "static" ? true : mode === "desktop" ? step >= i : seen;
  const current = mode === "desktop" ? step === i : mode === "mobile" && centred;

  return (
    <li
      ref={ref}
      className={`relative rounded-2xl border p-5 transition-[opacity,background-color,border-color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        current ? "border-line bg-surface/70" : "border-transparent"
      } ${on ? "opacity-100" : "opacity-35 max-lg:translate-y-3"}`}
    >
      <div className="flex items-baseline gap-4">
        <span className={`font-mono text-xs transition-colors duration-500 ${on ? "text-accent-bright" : "text-fg-3"}`}>0{i + 1}</span>
        <div>
          <p className="text-lg font-medium tracking-tight">{s.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-fg-2">{s.detail}</p>
        </div>
      </div>
    </li>
  );
}

export function Pipeline({ t }: { t: T }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const desk = useScroll({ target: ref, offset: ["start start", "end end"] });
  const mob = useScroll({ target: stageRef, offset: ["start start", "end end"] });
  const [desktop, setDesktop] = useState(false);
  const [step, setStep] = useState(0);
  const progress = useMotionValue(1);
  const mode: Mode = reduced ? "static" : desktop ? "desktop" : "mobile";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (mode === "static") {
      progress.set(1);
      return;
    }
    const source = mode === "desktop" ? desk.scrollYProgress : mob.scrollYProgress;
    const apply = (v: number) => {
      progress.set(v);
      if (mode === "desktop") setStep(Math.min(3, Math.floor(v * 4.2)));
    };
    apply(source.get());
    return source.on("change", apply);
  }, [mode, desk.scrollYProgress, mob.scrollYProgress, progress]);

  return (
    <section id="pipeline" aria-labelledby="pipeline-title" className="relative">
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-10 sm:pt-40">
        <SectionHead id="pipeline" index="02" eyebrow={t.eyebrow} title={t.title} aside={<p className="text-sm leading-relaxed text-fg-2">{t.intro}</p>} />
      </div>

      <div ref={ref} className={reduced ? "" : "lg:h-[320vh]"}>
        <div className={`mx-auto grid max-w-7xl gap-10 px-5 pb-28 sm:px-10 lg:grid-cols-12 ${reduced ? "" : "lg:sticky lg:top-0 lg:h-svh lg:items-center lg:pb-0"}`}>
          <ol className="space-y-2 lg:col-span-5">
            {t.steps.map((s, i) => (
              <Step key={s.title} s={s} i={i} mode={mode} step={step} />
            ))}
          </ol>

          <div ref={stageRef} className={`lg:col-span-7 ${reduced ? "" : "max-lg:h-[175vh]"}`} aria-hidden>
            <div className={reduced ? "" : "max-lg:sticky max-lg:top-[4.75rem]"}>
              <Stage t={t} p={progress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
