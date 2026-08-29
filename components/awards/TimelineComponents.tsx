import { AccessibleDialog } from "@/components/common/AccessibleDialog";
import { ExternalLink } from "@/components/common/Primitives";
import { withBasePath } from "@/lib/paths";
import type { Locale, NewsItem, ResearchExperience } from "@/types/content";

type Award = {
  id: string;
  nameZh: string;
  nameEn: string;
  distinctionZh: string;
  distinctionEn: string;
  year?: number;
  issuerZh?: string;
  issuerEn?: string;
  descriptionZh?: string;
  descriptionEn?: string;
  certificate?: string;
};

type Education = {
  id: string;
  institutionZh: string;
  institutionEn: string;
  periodZh: string;
  periodEn: string;
  schoolZh: string;
  schoolEn: string;
  programZh: string;
  programEn: string;
  locationZh: string;
  locationEn: string;
  gpa?: string;
  rank?: string;
};

type Experience = {
  id: string;
  periodZh: string;
  periodEn: string;
  organizationZh: string;
  organizationEn: string;
  roleZh: string;
  roleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  achievementsZh: string[];
  achievementsEn: string[];
  externalUrl?: string;
};

export function AwardCertificateDialog({ award, locale }: { award: Award; locale: Locale }) {
  if (!award.certificate) return null;
  return (
    <AccessibleDialog
      trigger={locale === "zh" ? "查看证明" : "View certificate"}
      title={locale === "zh" ? award.nameZh : award.nameEn}
    >
      <iframe
        src={withBasePath(award.certificate)}
        title={locale === "zh" ? `${award.nameZh}获奖证明` : `${award.nameEn} certificate`}
        className="h-[60svh] w-full border-0"
      />
    </AccessibleDialog>
  );
}

export function AwardItem({ award, locale }: { award: Award; locale: Locale }) {
  const issuer = locale === "zh" ? award.issuerZh : award.issuerEn;
  const description = locale === "zh" ? award.descriptionZh : award.descriptionEn;
  return (
    <article className="cv-row">
      <p className="cv-date">{award.year ?? ""}</p>
      <div>
        <h3 className="academic-item-title">{locale === "zh" ? award.nameZh : award.nameEn}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--accent)]">
          {locale === "zh" ? award.distinctionZh : award.distinctionEn}
        </p>
        {issuer && <p className="mt-1 text-sm text-[var(--muted)]">{issuer}</p>}
        {description && <p className="mt-2 leading-7 text-[var(--muted)]">{description}</p>}
      </div>
      <div className="text-sm">
        <AwardCertificateDialog award={award} locale={locale} />
      </div>
    </article>
  );
}

export function EducationList({ items, locale }: { items: Education[]; locale: Locale }) {
  return (
    <div className="academic-list">
      {items.map((item) => (
        <article key={item.id} className="cv-row">
          <p className="cv-date">{locale === "zh" ? item.periodZh : item.periodEn}</p>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="academic-item-title">
                {locale === "zh" ? item.institutionZh : item.institutionEn}
              </h3>
              <span className="text-sm text-[var(--muted)]">
                {locale === "zh" ? item.locationZh : item.locationEn}
              </span>
            </div>
            <p className="mt-1 text-[0.95rem] text-[var(--muted)]">
              {locale === "zh" ? item.programZh : item.programEn}
            </p>
            <p className="text-[0.95rem] text-[var(--muted)]">
              {locale === "zh" ? item.schoolZh : item.schoolEn}
            </p>
            {(item.gpa || item.rank) && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                {[item.gpa && `GPA: ${item.gpa}`, item.rank && `Rank: ${item.rank}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ResearchExperienceList({
  items,
  locale,
}: {
  items: ResearchExperience[];
  locale: Locale;
}) {
  return (
    <div className="academic-list">
      {items.map((item) => {
        const highlights = locale === "zh" ? item.highlightsZh : item.highlightsEn;
        const advisor = locale === "zh" ? item.advisorZh : item.advisorEn;
        const lab = locale === "zh" ? item.labZh : item.labEn;
        return (
          <article key={item.id} className="cv-row">
            <p className="cv-date">
              {item.startDate} – {item.endDate ?? (locale === "zh" ? "至今" : "Present")}
            </p>
            <div>
              <h3 className="academic-item-title">{locale === "zh" ? item.roleZh : item.roleEn}</h3>
              <p className="mt-1 text-[0.95rem] text-[var(--muted)]">
                {[lab, locale === "zh" ? item.institutionZh : item.institutionEn]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {advisor && (
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {locale === "zh" ? "导师" : "Advisor"}: {advisor}
                </p>
              )}
              <p className="mt-3 font-medium">{locale === "zh" ? item.topicZh : item.topicEn}</p>
              <p className="mt-1 leading-7 text-[var(--muted)]">
                {locale === "zh" ? item.descriptionZh : item.descriptionEn}
              </p>
              {highlights.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95rem] leading-6 text-[var(--muted)]">
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function NewsList({ items, locale }: { items: NewsItem[]; locale: Locale }) {
  return (
    <div className="academic-list">
      {items.map((item) => (
        <article key={item.id} className="news-row">
          <time dateTime={item.date}>{item.date.slice(0, 7).replace("-", ".")}</time>
          <p>
            {item.link ? (
              <ExternalLink href={item.link} className="text-[var(--ink)]">
                {locale === "zh" ? item.contentZh : item.contentEn}
              </ExternalLink>
            ) : locale === "zh" ? (
              item.contentZh
            ) : (
              item.contentEn
            )}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ExperienceTimeline({ items, locale }: { items: Experience[]; locale: Locale }) {
  return (
    <div className="academic-list">
      {items.map((item) => {
        const achievements = locale === "zh" ? item.achievementsZh : item.achievementsEn;
        return (
          <article key={item.id} className="cv-row">
            <p className="cv-date">{locale === "zh" ? item.periodZh : item.periodEn}</p>
            <div>
              <h3 className="academic-item-title">
                {locale === "zh" ? item.organizationZh : item.organizationEn}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {locale === "zh" ? item.roleZh : item.roleEn}
              </p>
              <p className="mt-2 leading-7 text-[var(--muted)]">
                {locale === "zh" ? item.descriptionZh : item.descriptionEn}
              </p>
              {achievements.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-[0.95rem] text-[var(--muted)]">
                  {achievements.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
