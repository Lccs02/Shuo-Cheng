import { PublicationCard } from "@/components/research/ResearchComponents";
import type { Publication } from "@/types/content";

export function PublicationList({ publications }: { publications: Publication[] }) {
  if (!publications.length) return null;

  return (
    <section
      id="publications"
      className="home-section home-section-grid academic-shell"
      aria-labelledby="publications-title"
      data-motion
    >
      <header className="home-section-header">
        <p className="eyebrow">Research output</p>
        <h2 id="publications-title">Selected Publications</h2>
      </header>
      <div className="publication-list">
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} locale="en" />
        ))}
      </div>
    </section>
  );
}
