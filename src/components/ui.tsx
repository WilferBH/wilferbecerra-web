import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageSlot, Locale } from "@/content/types";
import { ImageIcon } from "./icons";
import { Rich } from "./Rich";

export function SectionHead({ id, index, eyebrow, title, aside }: { id: string; index: string; eyebrow: string; title: string; aside?: ReactNode }) {
  return (
    <div className="mb-14 sm:mb-20">
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3">
        <span className="text-accent-bright">({index})</span>
        <span>{eyebrow}</span>
        <span data-draw aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
        <h2
          id={`${id}-title`}
          data-words
          className="display text-[2.5rem] font-medium leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl lg:col-span-9 lg:text-[4.5rem]"
        >
          <Rich text={title} split />
        </h2>
        {aside && <div className="lg:col-span-3">{aside}</div>}
      </div>
    </div>
  );
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  aside,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-28 sm:py-40 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <SectionHead id={id} index={index} eyebrow={eyebrow} title={title} aside={aside} />
        {children}
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-fg-2">{children}</span>
  );
}

export function Shot({
  slot,
  lang,
  pendingLabel,
  className = "",
  priority = false,
}: {
  slot: ImageSlot;
  lang: Locale;
  pendingLabel: string;
  className?: string;
  priority?: boolean;
}) {
  if (slot.src) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-line bg-surface ${className}`}>
        <Image
          src={slot.src}
          alt={slot.alt[lang]}
          fill
          preload={priority}
          loading={priority ? "eager" : undefined}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${pendingLabel}: ${slot.pending[lang]}`}
      className={`relative grid place-items-center overflow-hidden rounded-xl border border-dashed border-line bg-bg-2 ${className}`}
    >
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <ImageIcon className="text-fg-3" />
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">{pendingLabel}</p>
        <p className="text-sm text-fg-2">{slot.pending[lang]}</p>
      </div>
    </div>
  );
}
