"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const MIN_SHOW = 1100;
const FLIGHT = 900;

/** Al terminar, la foto vuela hasta #hero-portrait. Sin JS, el CSS oculta la pantalla igualmente. */
export function Intro() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => {
      html.classList.add("intro-done");
      setDone(true);
    };
    if (!html.classList.contains("intro") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    let cancelled = false;
    const start = performance.now();
    const img = photo.current?.querySelector("img");
    const ready = img ? img.decode().catch(() => undefined) : Promise.resolve();

    ready.then(async () => {
      const wait = Math.max(0, MIN_SHOW - (performance.now() - start));
      await new Promise((r) => setTimeout(r, wait));
      if (cancelled || !root.current || !photo.current) return;

      const from = photo.current.getBoundingClientRect();
      const target = document.getElementById("hero-portrait")?.getBoundingClientRect();
      const box = photo.current;
      Object.assign(box.style, {
        position: "fixed",
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
        margin: "0",
      });

      caption.current?.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(8px)" }], { duration: 250, fill: "forwards" });
      const bg = getComputedStyle(root.current).backgroundColor;
      root.current.animate([{ backgroundColor: bg }, { backgroundColor: "rgba(0,0,0,0)" }], {
        duration: FLIGHT * 0.8,
        delay: FLIGHT * 0.2,
        easing: EASE,
        fill: "forwards",
      });

      const onScreen = target && target.top < window.innerHeight * 0.85 && target.width > 0;
      const flight = onScreen
        ? box.animate(
            [
              { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`, borderRadius: "20px" },
              { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px`, borderRadius: "32px" },
            ],
            { duration: FLIGHT, easing: EASE, fill: "forwards" },
          )
        : box.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(0.92)", filter: "blur(6px)" }], { duration: 500, easing: EASE, fill: "forwards" });

      await flight.finished.catch(() => undefined);
      if (!cancelled) finish();
    });

    const failsafe = setTimeout(finish, 4000);
    return () => {
      cancelled = true;
      clearTimeout(failsafe);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} aria-hidden className="loader fixed inset-0 z-[100] grid place-items-center bg-bg">
      <div className="flex flex-col items-center">
        <div className="relative aspect-[3/4] w-36 sm:w-44">
        <div ref={photo} className="loader-photo absolute inset-0 overflow-hidden rounded-[20px] border border-line bg-surface">
          <Image
            src="/wilfer-becerra.webp"
            alt=""
            fill
            preload
            loading="eager"
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        </div>
        <div ref={caption} className="mt-7 flex flex-col items-center">
          <p className="loader-name font-serif text-3xl italic tracking-[-0.01em] text-fg">
            Wilfer <span className="text-accent-bright">Becerra</span>
          </p>
          <div className="mt-4 h-px w-40 overflow-hidden bg-line">
            <div className="loader-bar h-full w-full bg-accent-bright" />
          </div>
        </div>
      </div>
    </div>
  );
}
