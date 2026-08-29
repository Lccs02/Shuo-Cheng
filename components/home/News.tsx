import { ExternalLink } from "@/components/common/Primitives";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { withBasePath } from "@/lib/paths";
import type { NewsItem } from "@/types/content";

const newsDate = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

export function News({ items }: { items: NewsItem[] }) {
  if (!items.length) return null;

  return (
    <section
      id="news"
      className="home-section home-section-grid home-section-secondary academic-shell"
      aria-labelledby="news-title"
      data-motion
    >
      <header className="home-section-header compact">
        <p className="eyebrow">Updates</p>
        <h2 id="news-title">News</h2>
      </header>
      <div className="news-list">
        {items.map((item) => (
          <article key={item.id} className={item.image ? "news-entry with-image" : "news-entry"}>
            <time dateTime={item.date}>
              {newsDate.format(
                new Date(`${item.date.length === 7 ? `${item.date}-01` : item.date}T00:00:00Z`),
              )}
            </time>
            <div className="news-content">
              <p>
                {item.link ? (
                  <ExternalLink href={item.link}>{item.contentEn}</ExternalLink>
                ) : (
                  item.contentEn
                )}
              </p>
              {item.image && (
                <a
                  href={withBasePath(item.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-evidence"
                  aria-label="View the BWTAC'26 acceptance email image"
                >
                  <span className="news-evidence-image">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.imageAltEn ?? "News evidence image"}
                      sizes="(max-width: 800px) 100vw, 620px"
                      className="news-evidence-image-content"
                    />
                  </span>
                  <span>View acceptance email ↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
