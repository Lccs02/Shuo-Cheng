import { ExternalLink } from "@/components/common/Primitives";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { withBasePath } from "@/lib/paths";
import type { Locale, NewsItem } from "@/types/content";

const newsDates = {
  zh: new Intl.DateTimeFormat("zh-CN", { month: "2-digit", year: "numeric" }),
  en: new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }),
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
          <article key={item.id} className={item.image ? "news-entry with-image" : "news-entry"}>
            <time dateTime={item.date}>
              {newsDates[locale].format(
                new Date(`${item.date.length === 7 ? `${item.date}-01` : item.date}T00:00:00Z`),
              )}
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
              {item.image && (
                <a
                  href={withBasePath(item.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-evidence"
                  aria-label={
                    locale === "zh"
                      ? "查看 BWTAC'26 论文录用邮件图片"
                      : "View the BWTAC'26 acceptance email image"
                  }
                >
                  <span className="news-evidence-image">
                    <ImageWithFallback
                      src={item.image}
                      alt={
                        locale === "zh"
                          ? (item.imageAltZh ?? "动态证明图片")
                          : (item.imageAltEn ?? "News evidence image")
                      }
                      sizes="(max-width: 800px) calc(100vw - 32px), 384px"
                      className="news-evidence-image-content"
                    />
                  </span>
                  <span>{locale === "zh" ? "查看录用邮件 ↗" : "View acceptance email ↗"}</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
