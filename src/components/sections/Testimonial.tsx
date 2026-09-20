"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useReducedMotionSafe } from "../motion";
import { testimonials } from "@/content/site";
import type { Dictionary, Locale, Testimonial as T } from "@/content/types";
import { ArrowLeft, ArrowRight } from "../icons";

const ease = [0.22, 1, 0.36, 1] as const;

function Slide({ item, t, lang }: { item: T; t: Dictionary["testimonial"]; lang: Locale }) {
  const initials = item.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-line ring-2 ring-accent/30 ring-offset-2 ring-offset-surface sm:size-20">
        {item.photo ? (
          <Image src={item.photo} alt={item.author} fill sizes="80px" className="object-cover object-[50%_25%]" />
        ) : (
          <span className="grid size-full place-items-center bg-bg-2 font-serif text-xl italic text-fg-3">{initials}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        {item.quote ? (
          <blockquote className="font-serif text-2xl leading-snug tracking-[-0.01em] text-balance sm:text-[1.7rem]">
            <span aria-hidden className="mr-1 text-accent-bright">“</span>
            {item.quote[lang]}
            <span aria-hidden className="ml-0.5 text-accent-bright">”</span>
          </blockquote>
        ) : (
          <p className="text-fg-2">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-amber">{t.pending}</span>
            {t.pendingNote}
          </p>
        )}
        <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-medium tracking-tight">{item.author}</span>
          <span className="text-sm text-fg-3">{item.role[lang]}</span>
          {item.project && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-bright">
              {t.client} {item.project}
            </span>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

export function Testimonial({ t, lang, className = "" }: { t: Dictionary["testimonial"]; lang: Locale; className?: string }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduced = useReducedMotionSafe();
  const n = testimonials.length;
  if (n === 0) return null;

  const go = (d: number) => setState(([i]) => [(i + d + n) % n, d]);
  const many = n > 1;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400;
    if (swipe) go(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <section
      aria-roledescription={many ? "carousel" : undefined}
      aria-label={t.eyebrow}
      data-reveal
      className={`mx-auto max-w-3xl ${className}`}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">
          {t.eyebrow}
        </p>
        {many && (
          <p className="font-mono text-[11px] tabular-nums text-fg-3">
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
        )}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 48, filter: "blur(4px)" }),
              center: { opacity: 1, x: 0, filter: "blur(0px)" },
              exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -48, filter: "blur(4px)" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease }}
            drag={many && !reduced ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className={many ? "cursor-grab touch-pan-y active:cursor-grabbing" : undefined}
          >
            <Slide item={testimonials[index]} t={t} lang={lang} />
          </motion.div>
        </AnimatePresence>
      </div>

      {many && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`${t.goTo} ${i + 1}`}
                aria-current={i === index}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="grid h-10 place-items-center px-1"
              >
                <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-6 bg-accent-bright" : "w-1.5 bg-line"}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label={t.prev} onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full border border-line text-fg-2 transition-[color,border-color,scale] duration-150 hover:border-fg-3 hover:text-fg active:scale-[0.94]">
              <ArrowLeft />
            </button>
            <button type="button" aria-label={t.next} onClick={() => go(1)} className="grid size-10 place-items-center rounded-full border border-line text-fg-2 transition-[color,border-color,scale] duration-150 hover:border-fg-3 hover:text-fg active:scale-[0.94]">
              <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
