import { ExternalLink } from "@/components/common/Primitives";
import type { NewsItem } from "@/types/content";

const newsDate = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

export function News({ items }: { items: NewsItem[] }) {
  if (!items.length) return null;

  return (
    <section
      id="news"
      className="home-section home-section-secondary academic-shell"
      aria-labelledby="news-title"
    >
      <header className="home-section-header compact">
        <h2 id="news-title">News</h2>
      </header>
      <div className="news-list">
        {items.map((item) => (
          <article key={item.id} className="news-entry">
            <time dateTime={item.date}>
              {newsDate.format(
                new Date(`${item.date.length === 7 ? `${item.date}-01` : item.date}T00:00:00Z`),
              )}
            </time>
            <p>
              {item.link ? (
                <ExternalLink href={item.link}>{item.contentEn}</ExternalLink>
              ) : (
                item.contentEn
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
