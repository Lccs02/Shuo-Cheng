import { PublicationCard } from "@/components/research/ResearchComponents";
import type { Locale, Publication } from "@/types/content";

export function PublicationList({
  publications,
  locale,
}: {
  publications: Publication[];
  locale: Locale;
}) {
  if (!publications.length) return null;

  return (
    <section
      id="publications"
      className="home-section home-section-grid academic-shell"
      aria-labelledby="publications-title"
      data-motion
    >
      <header className="home-section-header">
        <p className="eyebrow">{locale === "zh" ? "科研成果" : "Research output"}</p>
        <h2 id="publications-title">{locale === "zh" ? "精选论文" : "Selected Publications"}</h2>
      </header>
      <div className="publication-list">
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} locale={locale} />
        ))}
      </div>
    </section>
  );
}
