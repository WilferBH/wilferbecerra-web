import type { Dictionary } from "@/content/types";
import { CountUp, Spotlight } from "../motion";
import { ScrubText } from "../scroll-fx";
import { Section } from "../ui";

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <Section id="about" index="01" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-3 lg:grid-cols-12">
        <Spotlight className="rounded-3xl border border-line bg-surface/50 p-7 sm:p-10 lg:col-span-7 lg:row-span-2">
          <div data-reveal className="space-y-6">
            {t.paragraphs.map((p, i) =>
              i === 0 ? (
                <ScrubText key={i} text={p} className="text-xl leading-relaxed text-fg sm:text-2xl sm:leading-snug" />
              ) : (
                <p key={i} className="leading-relaxed text-fg-2">
                  {p}
                </p>
              ),
            )}
          </div>
        </Spotlight>

        <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:row-span-2">
          {t.stats.map((s, i) => (
            <Spotlight key={s.label} className="rounded-3xl border border-line bg-surface/50">
              <div data-reveal style={{ "--i": i } as React.CSSProperties} className="flex h-full min-h-44 flex-col justify-between p-6">
                <p className="text-5xl font-medium tracking-[-0.04em] sm:text-6xl">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-6 text-sm leading-snug text-fg-2">{s.label}</p>
              </div>
            </Spotlight>
          ))}
        </div>

        <dl data-reveal className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 lg:col-span-12">
          {t.facts.map((f) => (
            <div key={f.label} className="bg-bg-2 px-6 py-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{f.label}</dt>
              <dd className="mt-2 text-sm text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
