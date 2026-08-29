import { Mail } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink } from "@/components/common/Primitives";
import { profile, sites } from "@/lib/content";
import type { Locale } from "@/types/content";

export function ProfilePhoto({ locale }: { locale: Locale }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
      <ImageWithFallback
        src={profile.photo}
        alt={locale === "zh" ? profile.photoAltZh : profile.photoAltEn}
        priority
        className="transition duration-500 ease-out hover:scale-[1.02]"
      />
    </div>
  );
}

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem]">
      {profile.cvUrl && <ExternalLink href={profile.cvUrl}>CV</ExternalLink>}
      {profile.scholarUrl && <ExternalLink href={profile.scholarUrl}>Google Scholar</ExternalLink>}
      <ExternalLink href={profile.github}>GitHub</ExternalLink>
      <ExternalLink href={`https://orcid.org/${profile.orcid}`}>ORCID</ExternalLink>
      <a
        href={`mailto:${profile.schoolEmail}`}
        className="inline-flex items-center gap-1 text-[var(--accent)]"
      >
        <Mail size={15} aria-hidden />
        Email
      </a>
    </div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const site = sites[locale];
  return (
    <section className="hero" data-hero>
      <div className="academic-shell">
        <div className={profile.photoVisible ? "hero-grid" : "max-w-[48rem]"}>
          <div className="reveal">
            <p className="hero-eyebrow">{site.homeEyebrow}</p>
            <h1 className="mt-3 text-[2.55rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[2.85rem]">
              {profile.nameEn}
              <span className="ml-3 text-[0.62em] font-normal tracking-normal text-[var(--muted)]">
                {profile.nameZh}
              </span>
            </h1>
            <div className="mt-4 text-[1.02rem] leading-7">
              <p>
                {locale === "zh" ? profile.majorZh : profile.majorEn} ·{" "}
                {locale === "zh" ? profile.degreeZh : profile.degreeEn}
              </p>
              <p className="text-[var(--muted)]">
                {locale === "zh" ? profile.schoolZh : profile.schoolEn}
              </p>
              <p className="text-[var(--muted)]">
                {locale === "zh" ? profile.universityZh : profile.universityEn} · {profile.period} ·{" "}
                {locale === "zh" ? profile.locationZh : profile.locationEn}
              </p>
            </div>
            <p className="mt-6 max-w-[46rem] text-[1.04rem] leading-[1.75] text-[var(--ink)]">
              {site.researchStatement}
            </p>
            <p className="mt-4 text-[0.94rem] leading-7 text-[var(--muted)]">
              {profile.focusKeywords.join(" · ")}
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>
          {profile.photoVisible ? (
            <div className="reveal reveal-delay mx-auto w-full max-w-[15rem] sm:max-w-[16rem]">
              <ProfilePhoto locale={locale} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
