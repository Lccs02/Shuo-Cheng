import { ResearchExperienceList } from "@/components/awards/TimelineComponents";
import type { Locale, ResearchExperience as ResearchExperienceItem } from "@/types/content";

export function ResearchExperience({
  items,
  locale,
}: {
  items: ResearchExperienceItem[];
  locale: Locale;
}) {
  if (!items.length) return null;

  return (
    <section
      id="experience"
      className="home-section home-section-grid academic-shell"
      aria-labelledby="experience-title"
      data-motion
    >
      <header className="home-section-header">
        <p className="eyebrow">{locale === "zh" ? "学术路径" : "Academic path"}</p>
        <h2 id="experience-title">{locale === "zh" ? "科研经历" : "Research Experience"}</h2>
      </header>
      <ResearchExperienceList items={items} locale={locale} />
    </section>
  );
}
