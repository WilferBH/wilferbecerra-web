"use client";

import { Children, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotionSafe } from "./motion";

const spring = { stiffness: 150, damping: 20, mass: 0.6 };

export function TiltPortrait({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring);
  const sheenX = useTransform(px, [0, 1], ["20%", "80%"]);
  const sheenY = useTransform(py, [0, 1], ["10%", "90%"]);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.14), transparent 55%)`;

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 110]);
  const scale = useTransform(scrollY, [0, 900], [1, 0.92]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div style={reduced ? undefined : { y, scale }} className="[perspective:1000px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group/tilt relative"
      >
        {children}
        <motion.div
          aria-hidden
          style={{ backgroundImage: sheen }}
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/tilt:opacity-100"
        />
      </motion.div>
    </motion.div>
  );
}

export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <ScrubWord key={i} p={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} static={!!reduced}>
            {w}
          </ScrubWord>
        ))}
      </span>
    </p>
  );
}

function ScrubWord({ p, from, to, children, static: isStatic }: { p: MotionValue<number>; from: number; to: number; children: string; static: boolean }) {
  const opacity = useTransform(p, [from, to], [0.22, 1]);
  return (
    <>
      <motion.span style={isStatic ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}

export function StackedCards({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = Children.toArray(children);

  return (
    <ul ref={ref} className="relative space-y-6 lg:space-y-10">
      {items.map((child, i) => (
        <StackItem key={i} i={i} n={items.length} p={scrollYProgress} static={!!reduced}>
          {child}
        </StackItem>
      ))}
    </ul>
  );
}

function StackItem({ i, n, p, children, static: isStatic }: { i: number; n: number; p: MotionValue<number>; children: ReactNode; static: boolean }) {
  const start = i / n;
  const scale = useTransform(p, [start, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const shade = useTransform(p, [start, 1], [0, (n - 1 - i) * 0.35]);

  return (
    <li className="lg:sticky" style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}>
      <motion.div style={isStatic ? undefined : { scale }} className="relative origin-top">
        {children}
        {!isStatic && (
          <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 rounded-3xl bg-black" />
        )}
      </motion.div>
    </li>
  );
}

export function DrawnConnectors() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const a = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const b = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const common = { fill: "none", stroke: "var(--color-accent-bright)", strokeWidth: 1.5, vectorEffect: "non-scaling-stroke" as const };

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 hidden lg:block">
    <svg className="size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M 30 18 C 50 18, 50 50, 70 50" {...common} strokeOpacity=".15" />
      <path d="M 70 50 C 50 50, 50 82, 30 82" {...common} strokeOpacity=".15" />
      <motion.path d="M 30 18 C 50 18, 50 50, 70 50" {...common} strokeOpacity=".8" style={{ pathLength: reduced ? 1 : a }} />
      <motion.path d="M 70 50 C 50 50, 50 82, 30 82" {...common} strokeOpacity=".8" style={{ pathLength: reduced ? 1 : b }} />
    </svg>
    </div>
  );
}
