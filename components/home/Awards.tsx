import type { Award, Locale } from "@/types/content";

const awardGroups = [
  {
    id: "scholarships",
    types: ["scholarship"],
    titleZh: "奖学金",
    titleEn: "Scholarships",
  },
  {
    id: "research-projects",
    types: ["research"],
    titleZh: "科研项目",
    titleEn: "Research Projects",
  },
  {
    id: "academic-competitions",
    types: ["competition"],
    titleZh: "学科竞赛",
    titleEn: "Academic Competitions",
  },
] as const;

function AwardEntry({ award, locale }: { award: Award; locale: Locale }) {
  return (
    <article className={award.year ? "award-entry" : "award-entry undated"}>
      {award.year && <time>{award.year}</time>}
      <div>
        <p className="award-distinction">
          {locale === "zh" ? award.distinctionZh : award.distinctionEn}
        </p>
        <h4>{locale === "zh" ? award.nameZh : award.nameEn}</h4>
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
  );
}

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
      <div className="award-groups">
        {awardGroups.map((group, index) => {
          const items = awards.filter((award) => group.types.some((type) => type === award.type));
          const groupTitle = locale === "zh" ? group.titleZh : group.titleEn;

          return (
            <section key={group.id} className="award-group" aria-labelledby={`${group.id}-title`}>
              <header className="award-group-header">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3 id={`${group.id}-title`}>{groupTitle}</h3>
              </header>
              <div className="award-group-list">
                {items.length ? (
                  items.map((award) => <AwardEntry key={award.id} award={award} locale={locale} />)
                ) : (
                  <p className="award-group-empty">
                    {locale === "zh" ? "暂无公开记录" : "No public records listed."}
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
