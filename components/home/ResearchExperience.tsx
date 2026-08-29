import { ResearchExperienceList } from "@/components/awards/TimelineComponents";
import type { ResearchExperience as ResearchExperienceItem } from "@/types/content";

export function ResearchExperience({ items }: { items: ResearchExperienceItem[] }) {
  if (!items.length) return null;

  return (
    <section
      id="experience"
      className="home-section academic-shell"
      aria-labelledby="experience-title"
    >
      <header className="home-section-header">
        <h2 id="experience-title">Research Experience</h2>
      </header>
      <ResearchExperienceList items={items} locale="en" />
    </section>
  );
}
