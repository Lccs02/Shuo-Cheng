import { AccessibleDialog } from "@/components/common/AccessibleDialog";
import { ExternalLink } from "@/components/common/Primitives";
import type { Locale } from "@/types/content";
import { withBasePath } from "@/lib/paths";

type Award = {
  id: string;
  nameZh: string;
  nameEn: string;
  year?: number;
  issuerZh: string;
  issuerEn: string;
  level: "national" | "provincial" | "university";
  type: string;
  descriptionZh?: string;
  descriptionEn?: string;
  certificate?: string;
  featured: boolean;
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
  return (
    <article className="grid gap-3 border-t border-[var(--line)] py-6 sm:grid-cols-[6rem_1fr_auto]">
      <p className="text-sm text-[var(--accent)]">{award.year ?? "TODO"}</p>
      <div>
        <h3 className="text-xl">{locale === "zh" ? award.nameZh : award.nameEn}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {locale === "zh" ? award.issuerZh : award.issuerEn}
        </p>
        {(award.descriptionZh || award.descriptionEn) && (
          <p className="mt-3 leading-7 text-[var(--muted)]">
            {locale === "zh" ? award.descriptionZh : award.descriptionEn}
          </p>
        )}
      </div>
      <div className="text-sm">
        <AwardCertificateDialog award={award} locale={locale} />
      </div>
    </article>
  );
}

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
};
export function EducationTimeline({ items, locale }: { items: Education[]; locale: Locale }) {
  return (
    <ol className="border-l border-[var(--line)] pl-7">
      {items.map((item) => (
        <li key={item.id} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[2.08rem] top-1 size-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--paper)]" />
          <p className="text-sm text-[var(--accent)]">
            {locale === "zh" ? item.periodZh : item.periodEn}
          </p>
          <h3 className="mt-2 text-xl">
            {locale === "zh" ? item.institutionZh : item.institutionEn}
          </h3>
          <p className="mt-2 text-[var(--muted)]">
            {locale === "zh" ? item.schoolZh : item.schoolEn}
          </p>
          <p className="text-[var(--muted)]">
            {locale === "zh" ? item.programZh : item.programEn} ·{" "}
            {locale === "zh" ? item.locationZh : item.locationEn}
          </p>
        </li>
      ))}
    </ol>
  );
}

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
export function ExperienceTimeline({ items, locale }: { items: Experience[]; locale: Locale }) {
  return (
    <ol className="border-l border-[var(--line)] pl-7">
      {items.map((item) => {
        const achievements = locale === "zh" ? item.achievementsZh : item.achievementsEn;
        return (
          <li key={item.id} className="relative pb-11 last:pb-0">
            <span className="absolute -left-[2.08rem] top-1 size-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--paper)]" />
            <p className="text-sm text-[var(--accent)]">
              {locale === "zh" ? item.periodZh : item.periodEn}
            </p>
            <h3 className="mt-2 text-xl">
              {locale === "zh" ? item.organizationZh : item.organizationEn}
            </h3>
            <p className="mt-1 italic">{locale === "zh" ? item.roleZh : item.roleEn}</p>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              {locale === "zh" ? item.descriptionZh : item.descriptionEn}
            </p>
            {achievements.length > 0 && (
              <ul className="mt-3 list-disc pl-5">
                {achievements.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            )}
            {item.externalUrl && (
              <ExternalLink href={item.externalUrl} className="mt-3">
                {locale === "zh" ? "外部链接" : "External link"}
              </ExternalLink>
            )}
          </li>
        );
      })}
    </ol>
  );
}
