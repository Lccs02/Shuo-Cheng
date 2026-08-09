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
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
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
    <section className="shell grid min-h-[calc(100svh-4.75rem)] grid-cols-1 items-center gap-10 pb-14 pt-28 lg:grid-cols-[1.35fr_.65fr] lg:gap-20 lg:pt-24">
      <div className="reveal">
        <p className="eyebrow">{site.homeEyebrow}</p>
        <h1 className="display mt-7">
          <span className="block">{locale === "zh" ? profile.nameZh : profile.nameEn}</span>
          <span className="mt-5 block text-[0.36em] tracking-[0.02em] text-[var(--muted)]">
            {locale === "zh" ? profile.nameEn : profile.nameZh}
          </span>
        </h1>
        <div className="mt-9 max-w-2xl border-l border-[var(--accent)] pl-5">
          <p className="text-lg leading-8">
            {locale === "zh" ? profile.universityZh : profile.universityEn}
          </p>
          <p className="text-[var(--muted)]">
            {locale === "zh"
              ? `${profile.schoolZh} · ${profile.majorZh}专业本科生`
              : `${profile.schoolEn} · ${profile.majorEn} Undergraduate`}
          </p>
          <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-[var(--muted)]">
            <span>{profile.period}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden />
              {locale === "zh" ? profile.locationZh : profile.locationEn}
            </span>
          </p>
        </div>
        <p className="prose-copy mt-7 max-w-2xl">
          {locale === "zh" ? profile.bioZh : profile.bioEn}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {interests.map((item) => (
            <SkillTag key={item.id}>{locale === "zh" ? item.nameZh : item.nameEn}</SkillTag>
          ))}
        </div>
        <div className="mt-7">
          <SocialLinks locale={locale} />
        </div>
        <a
          href={hrefFor(locale, "about")}
          className="mt-9 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1 text-[var(--accent)]"
        >
          {locale === "zh" ? "了解更多" : "Learn more"}
          <ArrowDown size={15} aria-hidden />
        </a>
      </div>
      <div className="reveal reveal-delay mx-auto w-full max-w-[22rem] lg:max-w-none">
        <ProfilePhoto locale={locale} />
      </div>
    </section>
  );
}
