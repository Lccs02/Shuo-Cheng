import { ExternalLink } from "@/components/common/Primitives";
import type { Locale, NewsItem } from "@/types/content";

const newsDates = {
  zh: new Intl.DateTimeFormat("zh-CN", { day: "numeric", month: "long", year: "numeric" }),
  en: new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }),
};

export function News({ items, locale }: { items: NewsItem[]; locale: Locale }) {
  if (!items.length) return null;

  return (
    <section
      id="news"
      className="home-section home-section-grid home-section-secondary academic-shell"
      aria-labelledby="news-title"
      data-motion
    >
      <header className="home-section-header compact">
        <p className="eyebrow">{locale === "zh" ? "近期动态" : "Updates"}</p>
        <h2 id="news-title">{locale === "zh" ? "动态" : "News"}</h2>
      </header>
      <div className="news-list">
        {items.map((item) => (
          <article key={item.id} className="news-entry">
            <time dateTime={item.date}>
              {newsDates[locale].format(new Date(`${item.date}T00:00:00Z`))}
            </time>
            <div className="news-content">
              <p>
                {item.link ? (
                  <ExternalLink href={item.link}>
                    {locale === "zh" ? item.contentZh : item.contentEn}
                  </ExternalLink>
                ) : locale === "zh" ? (
                  item.contentZh
                ) : (
                  item.contentEn
                )}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
