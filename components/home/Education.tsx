import type { Education as EducationItem } from "@/types/content";

export function Education({ items }: { items: EducationItem[] }) {
  if (!items.length) return null;

  return (
    <section
      id="education"
      className="home-section home-section-grid home-section-secondary academic-shell"
      aria-labelledby="education-title"
      data-motion
    >
      <header className="home-section-header compact">
        <p className="eyebrow">Academic background</p>
        <h2 id="education-title">Education</h2>
      </header>
      <div className="education-list">
        {items.map((item) => (
          <article key={item.id} className="education-entry">
            <p className="entry-date">{item.periodEn}</p>
            <div>
              <div className="entry-heading">
                <h3>{item.institutionEn}</h3>
                <span>{item.locationEn}</span>
              </div>
              <p>{item.programEn}</p>
              <p>{item.schoolEn}</p>
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
