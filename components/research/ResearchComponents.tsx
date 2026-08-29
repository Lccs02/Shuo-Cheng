import { AccessibleDialog, CopyButton } from "@/components/common/AccessibleDialog";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink } from "@/components/common/Primitives";
import { labels } from "@/lib/labels";
import type { Locale, Publication, ResearchTopic } from "@/types/content";

export function ResearchTopicList({ topics, locale }: { topics: ResearchTopic[]; locale: Locale }) {
  return (
    <div className="academic-list">
      {topics.map((topic, index) => (
        <article key={topic.id} className="research-row">
          <p className="academic-index">{String(index + 1).padStart(2, "0")}</p>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="academic-item-title">
                {locale === "zh" ? topic.titleZh : topic.titleEn}
              </h3>
              {topic.stage === "current_interest" && (
                <span className="text-xs text-[var(--muted)]">
                  {locale === "zh" ? "当前研究兴趣" : "Current research interest"}
                </span>
              )}
            </div>
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
      className={publication.thumbnail ? "publication-row" : "border-t border-[var(--line)] py-6"}
    >
      {publication.thumbnail && (
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
          <ImageWithFallback
            src={publication.thumbnail}
            alt={`${publication.title} teaser`}
            sizes="(max-width: 720px) 100vw, 210px"
            className="transition duration-500 ease-out hover:scale-[1.02]"
          />
        </div>
      )}
      <div>
        <h3 className="academic-item-title break-words">{publication.title}</h3>
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
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {(publication.venue || publication.year) && (
            <span className="italic text-[var(--muted)]">
              {[publication.venue, publication.year].filter(Boolean).join(", ")}
            </span>
          )}
          <PublicationStatusBadge status={publication.status} locale={locale} />
        </div>
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
        {description && (
          <p className="mt-3 text-[0.95rem] leading-7 text-[var(--muted)]">{description}</p>
        )}
      </div>
    </article>
  );
}
