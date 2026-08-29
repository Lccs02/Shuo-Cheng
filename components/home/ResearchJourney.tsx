import type { ResearchTopic } from "@/types/content";

export function ResearchJourney({
  topics,
  introduction,
}: {
  topics: ResearchTopic[];
  introduction: string;
}) {
  if (!topics.length) return null;

  return (
    <section id="research" className="home-section academic-shell" aria-labelledby="research-title">
      <header className="home-section-header">
        <h2 id="research-title">Research</h2>
        <p>{introduction}</p>
      </header>

      <div className="research-journey" aria-label="Research journey">
        {topics.map((topic, index) => (
          <article key={topic.id} className="journey-step">
            <div className="journey-phase">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{topic.phaseLabelEn}</span>
            </div>
            <h3>{topic.titleEn}</h3>
            <p className="journey-subtitle">{topic.subtitleEn}</p>
            <p className="journey-description">{topic.descriptionEn}</p>
            <p className="journey-keywords">{topic.keywords.join(" · ")}</p>
            {index < topics.length - 1 && (
              <span className="journey-arrow" aria-hidden="true">
                →
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
