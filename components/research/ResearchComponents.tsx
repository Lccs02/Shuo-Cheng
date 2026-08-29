import { AccessibleDialog, CopyButton } from "@/components/common/AccessibleDialog";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink } from "@/components/common/Primitives";
import { labels } from "@/lib/labels";
import type { Locale, Publication, ResearchTopic } from "@/types/content";

export function ResearchTopicList({ topics, locale }: { topics: ResearchTopic[]; locale: Locale }) {
  return (
    <div className="academic-list">
      {topics.map((topic) => (
        <article key={topic.id} className="research-topic-row">
          <p className="research-topic-phase">
            {locale === "zh" ? topic.phaseLabelZh : topic.phaseLabelEn}
          </p>
          <div>
            <h3 className="academic-item-title">
              {locale === "zh" ? topic.titleZh : topic.titleEn}
            </h3>
            <p className="research-topic-subtitle">
              {locale === "zh" ? topic.subtitleZh : topic.subtitleEn}
            </p>
            <p className="mt-2 leading-7 text-[var(--muted)]">
              {locale === "zh" ? topic.descriptionZh : topic.descriptionEn}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">{topic.keywords.join(" · ")}</p>
            {(topic.paperUrl || topic.codeUrl || topic.projectUrl) && (
              <div className="academic-links mt-3">
                {topic.paperUrl && <ExternalLink href={topic.paperUrl}>Paper</ExternalLink>}
                {topic.codeUrl && <ExternalLink href={topic.codeUrl}>Code</ExternalLink>}
                {topic.projectUrl && <ExternalLink href={topic.projectUrl}>Project</ExternalLink>}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function PublicationStatusBadge({
  status,
  locale,
}: {
  status: Publication["status"];
  locale: Locale;
}) {
  return <span className="publication-status">{labels(locale).status[status]}</span>;
}

export function BibtexDialog({
  publication,
  locale,
}: {
  publication: Publication;
  locale: Locale;
}) {
  if (!publication.bibtex) return null;
  return (
    <AccessibleDialog trigger="BibTeX" title="BibTeX">
      <div className="mb-4 flex justify-end">
        <CopyButton value={publication.bibtex} label={locale === "zh" ? "复制" : "Copy"} />
      </div>
      <pre className="overflow-x-auto bg-[var(--surface)] p-4 text-sm leading-6">
        <code>{publication.bibtex}</code>
      </pre>
    </AccessibleDialog>
  );
}

export function PublicationCard({
  publication,
  locale,
}: {
  publication: Publication;
  locale: Locale;
}) {
  const description = locale === "zh" ? publication.descriptionZh : publication.descriptionEn;
  return (
    <article
      className={publication.thumbnail ? "publication-entry with-teaser" : "publication-entry"}
    >
      {publication.thumbnail && (
        <div className="publication-teaser">
          <ImageWithFallback
            src={publication.thumbnail}
            alt={`${publication.title} teaser`}
            sizes="(max-width: 720px) 100vw, 210px"
            className="publication-teaser-image"
          />
        </div>
      )}
      <div>
        <h3 className="publication-title">{publication.title}</h3>
        <p className="mt-1.5 text-[0.95rem] leading-6 text-[var(--muted)]">
          {publication.authors.map((author, index) => (
            <span key={`${author}-${index}`}>
              {index > 0 && ", "}
              {author === "Shuo Cheng" ? (
                <strong className="font-semibold text-[var(--ink)]">{author}</strong>
              ) : (
                author
              )}
            </span>
          ))}
        </p>
        <div className="publication-meta">
          {(publication.venue || publication.year) && (
            <>
              <span className="italic text-[var(--muted)]">
                {[publication.venue, publication.year].filter(Boolean).join(", ")}
              </span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <PublicationStatusBadge status={publication.status} locale={locale} />
        </div>
        {description && <p className="publication-description">{description}</p>}
        <div className="academic-links mt-3">
          {publication.paperUrl && <ExternalLink href={publication.paperUrl}>Paper</ExternalLink>}
          {publication.codeUrl && <ExternalLink href={publication.codeUrl}>Code</ExternalLink>}
          {publication.projectUrl && (
            <ExternalLink href={publication.projectUrl}>Project</ExternalLink>
          )}
          {publication.arxivUrl && <ExternalLink href={publication.arxivUrl}>arXiv</ExternalLink>}
          {publication.bibtexUrl && (
            <ExternalLink href={publication.bibtexUrl}>BibTeX</ExternalLink>
          )}
          {publication.doi && (
            <ExternalLink href={`https://doi.org/${publication.doi}`}>DOI</ExternalLink>
          )}
          <BibtexDialog publication={publication} locale={locale} />
        </div>
      </div>
    </article>
  );
}
