import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { ArrowRight } from "../icons";
import { Rich } from "../Rich";
import { TiltPortrait } from "../scroll-fx";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="hero" className="relative flex min-h-[min(100svh,1000px)] flex-col overflow-hidden pt-32 sm:pt-40">
      <div aria-hidden className="absolute -top-1/3 right-[-10%] size-[60vw] max-w-[900px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="display words-now max-w-[14ch] text-[3rem] font-medium leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <Rich text={t.title} split />
            </h1>
            <p className="rise mt-10 max-w-xl text-lg leading-relaxed text-fg-2" style={d(4)}>
              {t.description}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={d(5)}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-full bg-fg py-2 pl-5 pr-2 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
              >
                {t.ctaPrimary}
                <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-bg text-fg">
                  <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]" />
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm font-medium text-fg transition-[border-color,scale] duration-200 hover:border-fg-2 active:scale-[0.97]"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-md lg:col-span-5 xl:col-span-4">
            <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-accent/20 blur-3xl" />
            <TiltPortrait>
            <div id="hero-portrait" className="portrait relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-line bg-surface">
              <Image
                src="/wilfer-becerra.webp"
                alt="Wilfer Becerra"
                fill
                preload
                loading="eager"
                sizes="(min-width: 1024px) 420px, 90vw"
                className="portrait-img object-cover object-[50%_18%]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                Wilfer Becerra
              </span>
            </div>
            </TiltPortrait>
          </figure>
        </div>
      </div>

      <div className="rise relative mx-auto flex w-full max-w-7xl items-center gap-4 px-5 pb-8 pt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3 sm:px-10" style={d(7)}>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-accent-bright" />
        </span>
        {t.scroll}
      </div>
    </section>
  );
}
