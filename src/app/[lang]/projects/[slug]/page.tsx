import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getDictionary, hasLocale } from "@/content";
import { getProject, projects } from "@/content/projects";
import { locales } from "@/content/types";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { PageTransition } from "@/components/PageTransition";
import { Testimonial } from "@/components/sections/Testimonial";
import { Shot, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  return {
    title: project.title,
    description: project.summary[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { es: `/es/projects/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();
  const t = getDictionary(lang);
  const labels = t.projects;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <PageTransition>
    <article className="relative pt-16">
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
        <Link href={`/${lang}#projects`} transitionTypes={["nav-back"]} className="rise inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
          <ArrowLeft />
          {labels.back}
        </Link>

        <header className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="rise font-mono text-xs text-accent-bright" style={{ "--i": 1 } as React.CSSProperties}>
              {project.kicker[lang]}
            </p>
            <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
              <h1 className="mt-4 w-fit text-5xl font-medium tracking-[-0.04em] sm:text-7xl lg:text-8xl">{project.title}</h1>
            </ViewTransition>
            <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-fg-2" style={{ "--i": 3 } as React.CSSProperties}>
              {project.summary[lang]}
            </p>
          </div>
          <dl className="rise space-y-5 self-end lg:col-span-4" style={{ "--i": 4 } as React.CSSProperties}>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-3">{labels.role}</dt>
              <dd className="mt-1 text-sm">{project.role[lang]}</dd>
              {project.period && <dd className="mt-1 font-mono text-sm text-fg-2">{project.period[lang]}</dd>}
            </div>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent-bright hover:text-fg">
                {labels.visit} <ArrowUpRight />
              </a>
            )}
          </dl>
        </header>

        <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
          <div className="mt-16 overflow-hidden rounded-2xl">
            <Shot slot={project.images[0]} lang={lang} pendingLabel={t.pendingImage} priority className="aspect-[16/9]" />
          </div>
        </ViewTransition>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-8">
            <section data-reveal>
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-fg-3">{labels.problem}</h2>
              <p className="mt-4 text-xl leading-relaxed">{project.problem[lang]}</p>
            </section>
            <section data-reveal>
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-fg-3">{labels.solution}</h2>
              <ol className="mt-6 space-y-5">
                {project.solution[lang].map((step, i) => (
                  <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 border-b border-line-soft pb-5 text-fg-2">
                    <span className="font-mono text-xs text-accent-bright">0{i + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
            {project.slug === "exodus-logistics" && (
              <div data-reveal>
                <FlowDiagram t={t.flow} />
              </div>
            )}
          </div>

          <aside className="space-y-10 lg:col-span-4">
            {project.result && (
              <div data-reveal className="rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-3">{labels.result}</p>
                <p className="mt-3 font-serif text-5xl italic leading-none text-accent-bright">{project.result.value}</p>
                <p className="mt-2 text-sm text-fg-2">{project.result.label[lang]}</p>
              </div>
            )}
            <div data-reveal>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-3">{labels.stack}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {project.slug === "exodus-logistics" && <Testimonial t={t.testimonial} lang={lang} className="mt-20" />}

        {project.images.length > 1 && (
          <div className="mt-20 grid gap-4 md:grid-cols-2">
            {project.images.slice(1).map((img, i) => (
              <div key={i} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <Shot slot={img} lang={lang} pendingLabel={t.pendingImage} className="aspect-[4/3]" />
              </div>
            ))}
          </div>
        )}

        {next.slug !== project.slug && (
          <Link
            href={`/${lang}/projects/${next.slug}`}
            transitionTypes={["nav-forward"]}
            className="group mt-24 flex items-center justify-between border-t border-line pt-8"
          >
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-3">{labels.next}</span>
              <span className="mt-3 block text-4xl font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent-bright sm:text-6xl">{next.title}</span>
            </span>
            <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
    </PageTransition>
  );
}
