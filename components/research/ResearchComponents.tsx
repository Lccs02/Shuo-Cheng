import { Brain, ChartNoAxesCombined, Gauge, Network, Satellite } from "lucide-react";
import { AccessibleDialog, CopyButton } from "@/components/common/AccessibleDialog";
import { ExternalLink, SkillTag } from "@/components/common/Primitives";
import { labels } from "@/lib/labels";
import type { Locale, Publication } from "@/types/content";

const icons = {
  network: Network,
  gauge: Gauge,
  satellite: Satellite,
  brain: Brain,
  chart: ChartNoAxesCombined,
};

export function ResearchInterestCard({
  item,
  locale,
  index,
}: {
  item: {
    nameZh: string;
    nameEn: string;
    descriptionZh: string;
    descriptionEn: string;
    keywords: string[];
    icon?: string;
  };
  locale: Locale;
  index: number;
}) {
  const Icon = icons[item.icon as keyof typeof icons] ?? Network;
  return (
    <article className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-[var(--line)] py-6">
      <div className="pt-1 text-[var(--accent)]">
        <Icon size={22} strokeWidth={1.5} aria-hidden />
      </div>
      <div>
        <p className="mb-2 text-xs text-[var(--muted)]">0{index + 1}</p>
        <h3 className="text-xl">{locale === "zh" ? item.nameZh : item.nameEn}</h3>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          {locale === "zh" ? item.descriptionZh : item.descriptionEn}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.keywords.map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
        </div>
      </div>
    </article>
  );
}

export function PublicationStatusBadge({
  status,
  locale,
}: {
  status: Publication["status"];
  locale: Locale;
}) {
  return (
    <span className="inline-flex bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--accent)]">
      {labels(locale).status[status]}
    </span>
  );
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
      <pre className="overflow-x-auto bg-[var(--paper-deep)] p-4 text-sm leading-6">
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
  return (
    <article className="border-t border-[var(--line)] py-7">
      <div className="flex flex-wrap items-center gap-3">
        <PublicationStatusBadge status={publication.status} locale={locale} />
        {publication.year && (
          <span className="text-sm text-[var(--muted)]">{publication.year}</span>
        )}
        {publication.firstAuthor && (
          <span className="text-xs text-[var(--accent)]">{labels(locale).firstAuthor}</span>
        )}
      </div>
      <h3 className="mt-4 text-2xl leading-snug break-words">{publication.title}</h3>
      <p className="mt-3 text-sm text-[var(--muted)]">{publication.authors.join(" · ")}</p>
      {publication.venue && <p className="mt-2 italic">{publication.venue}</p>}
      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        {publication.doi && (
          <ExternalLink href={`https://doi.org/${publication.doi}`}>DOI</ExternalLink>
        )}
        {publication.paperUrl && (
          <ExternalLink href={publication.paperUrl}>
            {locale === "zh" ? "论文" : "Paper"}
          </ExternalLink>
        )}
        {publication.codeUrl && (
          <ExternalLink href={publication.codeUrl}>
            {locale === "zh" ? "代码" : "Code"}
          </ExternalLink>
        )}
        {publication.projectUrl && (
          <ExternalLink href={publication.projectUrl}>
            {locale === "zh" ? "项目主页" : "Project"}
          </ExternalLink>
        )}
        <BibtexDialog publication={publication} locale={locale} />
        {(publication.abstractZh || publication.abstractEn) && (
          <AccessibleDialog
            trigger={locale === "zh" ? "摘要" : "Abstract"}
            title={locale === "zh" ? "摘要" : "Abstract"}
          >
            <p className="prose-copy">
              {locale === "zh" ? publication.abstractZh : publication.abstractEn}
            </p>
          </AccessibleDialog>
        )}
      </div>
    </article>
  );
}
