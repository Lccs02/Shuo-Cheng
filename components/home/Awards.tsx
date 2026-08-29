import type { Award } from "@/types/content";

export function Awards({ awards }: { awards: Award[] }) {
  if (!awards.length) return null;

  return (
    <section
      id="awards"
      className="home-section home-section-grid home-section-secondary academic-shell"
      aria-labelledby="awards-title"
      data-motion
    >
      <header className="home-section-header compact">
        <p className="eyebrow">Selected recognition</p>
        <h2 id="awards-title">Selected Awards &amp; Honors</h2>
      </header>
      <div className="award-list">
        {awards.map((award) => (
          <article key={award.id} className={award.year ? "award-entry" : "award-entry undated"}>
            {award.year && <time>{award.year}</time>}
            <div>
              <p className="award-distinction">{award.distinctionEn}</p>
              <h3>{award.nameEn}</h3>
              {award.issuerEn && <p className="award-issuer">{award.issuerEn}</p>}
              {award.descriptionEn && <p className="award-description">{award.descriptionEn}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
