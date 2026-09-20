import type { Dictionary } from "@/content/types";

export function FlowDiagram({ t }: { t: Dictionary["flow"] }) {
  return (
    <figure className="rounded-xl border border-line bg-bg-2 p-5 sm:p-6">
      <figcaption className="mb-5 font-mono text-[11px] uppercase tracking-wider text-fg-3">{t.title}</figcaption>
      <ol className="relative grid gap-3 sm:grid-cols-4 sm:gap-0">
        <svg aria-hidden className="absolute left-0 top-[18px] hidden h-2 w-full sm:block" preserveAspectRatio="none">
          <line x1="12%" y1="4" x2="88%" y2="4" className="flow-line" stroke="var(--color-accent-bright)" strokeOpacity="0.5" strokeWidth="1.5" />
        </svg>
        {t.steps.map((s, i) => (
          <li key={s.title} className="relative flex items-start gap-3 sm:flex-col sm:items-center sm:px-2 sm:text-center">
            <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-accent/50 bg-bg-2 font-mono text-xs text-accent-bright">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-fg-2">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
