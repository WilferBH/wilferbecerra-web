import { site } from "@/content/site";
import type { Dictionary, ImageSlot, Locale } from "@/content/types";
import { ArrowUpRight } from "../icons";
import { Spotlight } from "../motion";
import { DrawnConnectors } from "../scroll-fx";
import { Section, Shot } from "../ui";

const shots: ImageSlot[] = [
  {
    src: "/capturas/albor-web.webp",
    alt: { es: "Portada de albor-automations.com", en: "albor-automations.com homepage" },
    pending: { es: "Portada de albor-automations.com", en: "albor-automations.com homepage" },
  },
  {
    src: "/capturas/albor-n8n.webp",
    alt: { es: "Flujo de automatización en n8n", en: "Automation workflow in n8n" },
    pending: { es: "Flujo de n8n en el editor", en: "n8n workflow in the editor" },
  },
];

function NodeGraph({ services }: { services: Dictionary["albor"]["services"] }) {
  return (
    <div className="relative">
      <DrawnConnectors />
      <ol className="relative grid gap-7 lg:grid-rows-3 lg:gap-6">
        {services.map((s, i) => (
          <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className={`relative lg:w-[62%] ${i === 1 ? "lg:ml-auto" : ""}`}>
            {i > 0 && <span data-draw-y aria-hidden className="absolute -top-7 left-10 h-7 w-px bg-accent-bright/60 lg:hidden" />}
            <Spotlight className="rounded-2xl border border-line bg-surface/80 backdrop-blur">
              <div className="flex gap-4 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/15 font-mono text-xs text-accent-bright">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{s.detail}</p>
                </div>
              </div>
            </Spotlight>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Albor({ t, lang, pendingLabel }: { t: Dictionary["albor"]; lang: Locale; pendingLabel: string }) {
  return (
    <Section id="albor" index="04" eyebrow={t.eyebrow} title={t.title} className="bg-bg-2/60">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <p data-reveal className="text-xl leading-relaxed text-fg">
            {t.description}
          </p>
          <a
            href={site.albor}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-line py-2 pl-5 pr-2 text-sm font-medium transition-colors duration-200 hover:border-accent-bright"
          >
            {t.visit}
            <span className="grid size-8 place-items-center rounded-full bg-accent-bright text-bg transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight />
            </span>
          </a>
          <div data-reveal className="mt-12 hidden lg:block">
            <Shot slot={shots[0]} lang={lang} pendingLabel={pendingLabel} className="aspect-[16/10]" />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.servicesTitle}</h3>
          <NodeGraph services={t.services} />
          <div data-reveal>
            <Shot slot={shots[1]} lang={lang} pendingLabel={pendingLabel} className="aspect-[16/8]" />
          </div>
          <div data-reveal className="lg:hidden">
            <Shot slot={shots[0]} lang={lang} pendingLabel={pendingLabel} className="aspect-[16/10]" />
          </div>
        </div>
      </div>
    </Section>
  );
}
