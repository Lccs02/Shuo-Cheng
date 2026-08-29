import type { Locale, ResearchTopic } from "@/types/content";

export function ResearchJourney({
  topics,
  introduction,
  locale,
}: {
  topics: ResearchTopic[];
  introduction: string;
  locale: Locale;
}) {
  if (!topics.length) return null;

  return (
    <section
      id="research"
      className="home-section home-section-grid academic-shell"
      aria-labelledby="research-title"
      data-motion
    >
      <header className="home-section-header">
        <p className="eyebrow">{locale === "zh" ? "研究主线" : "Research trajectory"}</p>
        <h2 id="research-title">{locale === "zh" ? "科研" : "Research"}</h2>
        <p>{introduction}</p>
      </header>

      <div
        className="research-journey"
        aria-label={locale === "zh" ? "研究主线" : "Research journey"}
      >
        {topics.map((topic, index) => (
          <article key={topic.id} className="journey-step">
            <div className="journey-phase">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{locale === "zh" ? topic.phaseLabelZh : topic.phaseLabelEn}</span>
            </div>
            <h3>{locale === "zh" ? topic.titleZh : topic.titleEn}</h3>
            <p className="journey-subtitle">
              {locale === "zh" ? topic.subtitleZh : topic.subtitleEn}
            </p>
            <p className="journey-description">
              {locale === "zh" ? topic.descriptionZh : topic.descriptionEn}
            </p>
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
