import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink } from "@/components/common/Primitives";
import type { Competition, Locale, Project } from "@/types/content";

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const contributions = locale === "zh" ? project.contributionZh : project.contributionEn;
  return (
    <article className={project.cover ? "project-entry with-cover" : "project-entry"}>
      {project.cover && (
        <div className="project-cover">
          <ImageWithFallback
            src={project.cover}
            alt={locale === "zh" ? `${project.titleZh}封面` : `${project.titleEn} cover`}
            sizes="(max-width: 720px) 100vw, 220px"
            className="project-cover-image"
          />
        </div>
      )}
      <div>
        <div className="project-heading">
          <h3>{locale === "zh" ? project.titleZh : project.titleEn}</h3>
          {project.githubUrl && <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>}
        </div>
        <p className="mt-2 leading-7 text-[var(--muted)]">
          {locale === "zh" ? project.summaryZh : project.summaryEn}
        </p>
        {contributions.length > 0 && (
          <ul className="project-contributions">
            {contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        )}
        {project.tags.length > 0 && (
          <p className="mt-2 text-sm text-[var(--muted)]">{project.tags.join(" · ")}</p>
        )}
        <div className="academic-links mt-3">
          {project.docsUrl && <ExternalLink href={project.docsUrl}>Documentation</ExternalLink>}
          {project.paperUrl && <ExternalLink href={project.paperUrl}>Paper</ExternalLink>}
          {project.demoUrl && <ExternalLink href={project.demoUrl}>Demo</ExternalLink>}
          {project.reportUrl && <ExternalLink href={project.reportUrl}>Report</ExternalLink>}
        </div>
      </div>
    </article>
  );
}

export function CompetitionCard({
  competition,
  locale,
}: {
  competition: Competition;
  locale: Locale;
}) {
  const contributions = locale === "zh" ? competition.contributionZh : competition.contributionEn;
  const role = locale === "zh" ? competition.roleZh : competition.roleEn;
  return (
    <article className="border-t border-[var(--line)] py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="academic-item-title">
          {locale === "zh" ? competition.nameZh : competition.nameEn}
        </h3>
        {competition.year && (
          <span className="text-sm text-[var(--muted)]">{competition.year}</span>
        )}
      </div>
      <p className="mt-1 text-sm font-medium text-[var(--accent)]">
        {locale === "zh" ? competition.awardZh : competition.awardEn}
      </p>
      {role && <p className="mt-2 text-sm text-[var(--muted)]">{role}</p>}
      {contributions && contributions.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--muted)]">
          {contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
