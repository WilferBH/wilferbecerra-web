import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-center px-5 py-32 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright">Error 404</p>
      <h1 className="display mt-6 max-w-3xl text-[2.6rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">
        Esta página no existe. <em>This page doesn&apos;t exist.</em>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/es"
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-[scale] duration-150 active:scale-[0.97]"
        >
          <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Volver al inicio
        </Link>
        <Link
          href="/en"
          className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm font-medium text-fg transition-[border-color,scale] duration-200 hover:border-fg-2 active:scale-[0.97]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
