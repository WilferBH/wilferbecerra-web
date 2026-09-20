"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "./icons";

type Theme = "dark" | "light";

const listeners = new Set<() => void>();
const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  listeners.forEach((fn) => fn());
}

export function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  const theme = useSyncExternalStore<Theme>(subscribe, read, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return apply(next);

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--tx", `${x}px`);
    root.style.setProperty("--ty", `${y}px`);
    root.style.setProperty("--tr", `${radius}px`);
    root.classList.add("theme-vt");
    const vt = document.startViewTransition(() => flushSync(() => apply(next)));
    vt.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "light" ? labels.light : labels.dark}
      className="group relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-bg/70 text-fg-2 backdrop-blur-xl transition-[color,scale] duration-150 hover:text-fg active:scale-[0.94]"
    >
      <Sun className={`absolute transition-[rotate,scale,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
      <Moon className={`absolute transition-[rotate,scale,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"}`} />
    </button>
  );
}
