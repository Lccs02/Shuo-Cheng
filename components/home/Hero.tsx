import { ArrowDown, Code2, Mail, MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink, SkillTag } from "@/components/common/Primitives";
import { hrefFor, interests, profile, sites } from "@/lib/content";
import type { Locale } from "@/types/content";

export function ProfilePhoto({ locale }: { locale: Locale }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--paper-deep)]">
      <ImageWithFallback
        src={profile.photo}
        alt={locale === "zh" ? profile.photoAltZh : profile.photoAltEn}
        priority
        className="transition duration-500 hover:scale-[1.015]"
      />
      <span className="absolute bottom-0 left-0 bg-[var(--paper)] px-3 py-2 text-[0.65rem] tracking-[0.12em] text-[var(--muted)]">
        {locale === "zh" ? "照片占位 · 可替换" : "PHOTO PLACEHOLDER"}
      </span>
    </div>
  );
}

export function SocialLinks({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9rem]">
      <ExternalLink href={profile.github}>
        <Code2 size={15} aria-hidden />
        GitHub
      </ExternalLink>
      <ExternalLink href={`https://orcid.org/${profile.orcid}`}>ORCID</ExternalLink>
      <a
        href={`mailto:${profile.schoolEmail}`}
        className="inline-flex items-center gap-1 text-[var(--accent)]"
      >
        <Mail size={15} aria-hidden />
        {locale === "zh" ? "学校邮箱" : "School email"}
      </a>
    </div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const site = sites[locale];
  return (
    <section className="shell grid min-h-[min(46rem,calc(100svh-4.25rem))] grid-cols-1 items-center gap-9 pb-12 pt-24 lg:grid-cols-[1.48fr_.52fr] lg:gap-16 lg:pt-20">
      <div className="reveal">
        <p className="eyebrow">{site.homeEyebrow}</p>
        <h1 className="display mt-5">
          <span className="block">{locale === "zh" ? profile.nameZh : profile.nameEn}</span>
          <span className="mt-3 block text-[0.4em] tracking-[0.015em] text-[var(--muted)]">
            {locale === "zh" ? profile.nameEn : profile.nameZh}
          </span>
        </h1>
        <div className="mt-7 max-w-2xl border-l border-[var(--accent)] pl-4">
          <p className="text-[1.05rem] leading-7">
            {locale === "zh" ? profile.universityZh : profile.universityEn}
          </p>
          <p className="text-[0.92rem] text-[var(--muted)]">
            {locale === "zh"
              ? `${profile.schoolZh} · ${profile.majorZh}专业本科生`
              : `${profile.schoolEn} · ${profile.majorEn} Undergraduate`}
          </p>
          <p className="mt-1 flex flex-wrap gap-x-4 text-[0.85rem] text-[var(--muted)]">
            <span>{profile.period}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden />
              {locale === "zh" ? profile.locationZh : profile.locationEn}
            </span>
          </p>
        </div>
        <p className="prose-copy mt-5 max-w-[42rem]">
          {locale === "zh" ? profile.bioZh : profile.bioEn}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {interests.map((item) => (
            <SkillTag key={item.id}>{locale === "zh" ? item.nameZh : item.nameEn}</SkillTag>
          ))}
        </div>
        <div className="mt-5">
          <SocialLinks locale={locale} />
        </div>
        <a
          href={hrefFor(locale, "about")}
          className="mt-6 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1 text-[0.92rem] text-[var(--accent)]"
        >
          {locale === "zh" ? "了解更多" : "Learn more"}
          <ArrowDown size={15} aria-hidden />
        </a>
      </div>
      <div className="reveal reveal-delay mx-auto w-full max-w-[18rem] lg:max-w-[19rem]">
        <ProfilePhoto locale={locale} />
      </div>
    </section>
  );
}
