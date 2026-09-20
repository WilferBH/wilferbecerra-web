import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { PageTransition } from "@/components/PageTransition";
import { About } from "@/components/sections/About";
import { Albor } from "@/components/sections/Albor";
import { Approach } from "@/components/sections/Approach";
import { Certifications } from "@/components/sections/Certifications";
import { certifications } from "@/content/certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Pipeline } from "@/components/sections/Pipeline";
import { Projects } from "@/components/sections/Projects";
import { SkillsExplorer } from "@/components/sections/Skills";
import { Section } from "@/components/ui";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  // La sección de certificados solo existe si hay alguno; la numeración se ajusta.
  const n = certifications.length > 0 ? 1 : 0;
  const num = (i: number) => String(i + n).padStart(2, "0");

  return (
    <PageTransition>
      <Hero t={t.hero} />
      <About t={t.about} />
      <Pipeline t={t.pipeline} />
      <Projects t={t.projects} testimonial={t.testimonial} lang={lang} pendingLabel={t.pendingImage} />
      <Albor t={t.albor} lang={lang} pendingLabel={t.pendingImage} />
      <Section id="skills" index="05" eyebrow={t.skills.eyebrow} title={t.skills.title}>
        <div data-reveal>
          <SkillsExplorer t={t.skills} />
        </div>
      </Section>
      <Experience t={t.experience} />
      <Certifications t={t.certifications} lang={lang} />
      <Approach t={t.approach} index={num(7)} />
      <Contact t={t.contact} index={num(8)} />
    </PageTransition>
  );
}
