import type { Education as EducationItem, Locale } from "@/types/content";

export function Education({ items, locale }: { items: EducationItem[]; locale: Locale }) {
  if (!items.length) return null;

  return (
    <section
      id="education"
      className="home-section home-section-grid home-section-secondary academic-shell"
      aria-labelledby="education-title"
      data-motion
    >
      <header className="home-section-header compact">
        <p className="eyebrow">{locale === "zh" ? "学术背景" : "Academic background"}</p>
        <h2 id="education-title">{locale === "zh" ? "教育经历" : "Education"}</h2>
      </header>
      <div className="education-list">
        {items.map((item) => (
          <article key={item.id} className="education-entry">
            <p className="entry-date">{locale === "zh" ? item.periodZh : item.periodEn}</p>
            <div>
              <div className="entry-heading">
                <h3>{locale === "zh" ? item.institutionZh : item.institutionEn}</h3>
                <span>{locale === "zh" ? item.locationZh : item.locationEn}</span>
              </div>
              <p>{locale === "zh" ? item.programZh : item.programEn}</p>
              <p>{locale === "zh" ? item.schoolZh : item.schoolEn}</p>
              {(item.gpa || item.rank) && (
                <p className="education-metrics">
                  {[item.gpa && `GPA: ${item.gpa}`, item.rank && `Rank: ${item.rank}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
