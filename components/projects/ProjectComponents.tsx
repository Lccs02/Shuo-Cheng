import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink, SkillTag } from "@/components/common/Primitives";
import type { Competition, Locale, Project } from "@/types/content";

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <article className="grid gap-5 border-t border-[var(--line)] py-6 md:grid-cols-[11rem_1fr]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-deep)]">
        <ImageWithFallback
          src={project.cover}
          alt={locale === "zh" ? `${project.titleZh}封面` : `${project.titleEn} cover`}
        />
      </div>
      <div>
        <div className="flex flex-wrap justify-between gap-3">
          <h3 className="text-xl">{locale === "zh" ? project.titleZh : project.titleEn}</h3>
          <span className="text-xs uppercase tracking-wider text-[var(--accent)]">
            {project.status.replace("_", " ")}
          </span>
        </div>
        <p className="mt-2 text-[0.92rem] leading-6 text-[var(--muted)]">
          {locale === "zh" ? project.summaryZh : project.summaryEn}
        </p>
        {(locale === "zh" ? project.contributionZh : project.contributionEn).length > 0 && (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.92rem]">
            {(locale === "zh" ? project.contributionZh : project.contributionEn).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          {project.githubUrl && <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>}
          {project.demoUrl && <ExternalLink href={project.demoUrl}>Demo</ExternalLink>}
          {project.reportUrl && (
            <ExternalLink href={project.reportUrl}>
              {locale === "zh" ? "报告" : "Report"}
            </ExternalLink>
          )}
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
  return (
    <article className="group border-t border-[var(--line)] py-5 transition-transform duration-200 hover:translate-y-[-2px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">
          {locale === "zh" ? competition.awardZh : competition.awardEn}
        </span>
        <span className="text-sm text-[var(--muted)]">{competition.year ?? "TODO"}</span>
      </div>
      <h3 className="mt-3 text-xl leading-snug">
        {locale === "zh" ? competition.nameZh : competition.nameEn}
      </h3>
      {competition.cover && (
        <div className="relative mt-5 aspect-[16/10] max-w-xl overflow-hidden bg-[var(--paper-deep)]">
          <ImageWithFallback
            src={competition.cover}
            alt={
              locale === "zh"
                ? `${competition.nameZh}项目封面`
                : `${competition.nameEn} project cover`
            }
          />
        </div>
      )}
      {(competition.projectTitleZh || competition.projectTitleEn) && (
        <p className="mt-2 italic">
          {locale === "zh" ? competition.projectTitleZh : competition.projectTitleEn}
        </p>
      )}
      {(competition.roleZh || competition.roleEn) && (
        <p className="mt-2 text-sm text-[var(--muted)]">
          {locale === "zh" ? "角色" : "Role"} ·{" "}
          {locale === "zh" ? competition.roleZh : competition.roleEn}
        </p>
      )}
      {contributions && contributions.length > 0 && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
          {contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {competition.tags.map((tag) => (
          <SkillTag key={tag}>{tag}</SkillTag>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        {competition.githubUrl && <ExternalLink href={competition.githubUrl}>GitHub</ExternalLink>}
        {competition.demoUrl && <ExternalLink href={competition.demoUrl}>Demo</ExternalLink>}
        {competition.reportUrl && (
          <ExternalLink href={competition.reportUrl}>
            {locale === "zh" ? "报告" : "Report"}
          </ExternalLink>
        )}
        {competition.certificate && (
          <ExternalLink href={competition.certificate}>
            {locale === "zh" ? "查看证明" : "View certificate"}
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
