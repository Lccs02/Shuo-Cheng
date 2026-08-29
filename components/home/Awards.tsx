import type { Award, Locale } from "@/types/content";

export function Awards({ awards, locale }: { awards: Award[]; locale: Locale }) {
  if (!awards.length) return null;

  return (
    <section
      id="awards"
      className="home-section home-section-grid home-section-secondary academic-shell"
      aria-labelledby="awards-title"
      data-motion
    >
      <header className="home-section-header compact">
        <p className="eyebrow">{locale === "zh" ? "代表性荣誉" : "Selected recognition"}</p>
        <h2 id="awards-title">{locale === "zh" ? "精选奖项与荣誉" : "Selected Awards & Honors"}</h2>
      </header>
      <div className="award-list">
        {awards.map((award) => (
          <article key={award.id} className={award.year ? "award-entry" : "award-entry undated"}>
            {award.year && <time>{award.year}</time>}
            <div>
              <p className="award-distinction">
                {locale === "zh" ? award.distinctionZh : award.distinctionEn}
              </p>
              <h3>{locale === "zh" ? award.nameZh : award.nameEn}</h3>
              {(locale === "zh" ? award.issuerZh : award.issuerEn) && (
                <p className="award-issuer">{locale === "zh" ? award.issuerZh : award.issuerEn}</p>
              )}
              {(locale === "zh" ? award.descriptionZh : award.descriptionEn) && (
                <p className="award-description">
                  {locale === "zh" ? award.descriptionZh : award.descriptionEn}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
