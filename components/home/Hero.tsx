import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink } from "@/components/common/Primitives";
import { profile } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import type { Locale } from "@/types/content";
import { OrbitalResearchField } from "./OrbitalResearchField";

export function ProfilePhoto({ locale }: { locale: Locale }) {
  if (!profile.photoVisible || !profile.photo) return null;

  return (
    <div className="profile-photo">
      <ImageWithFallback
        src={profile.photo}
        alt={locale === "zh" ? profile.photoAltZh : profile.photoAltEn}
        priority
        sizes="(max-width: 768px) 184px, 192px"
        className="profile-photo-image"
      />
    </div>
  );
}

export function AcademicLinks({ locale }: { locale: Locale }) {
  return (
    <nav
      className="academic-links"
      aria-label={locale === "zh" ? "学术主页与联系方式" : "Academic profiles and contact"}
    >
      {profile.cvUrl && <a href={withBasePath(profile.cvUrl)}>CV</a>}
      <ExternalLink href={profile.github}>GitHub</ExternalLink>
      {profile.scholarUrl && <ExternalLink href={profile.scholarUrl}>Google Scholar</ExternalLink>}
      <ExternalLink href={`https://orcid.org/${profile.orcid}`}>ORCID</ExternalLink>
      <a href={`mailto:${profile.schoolEmail}`}>{locale === "zh" ? "邮箱" : "Email"}</a>
    </nav>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const expectedYear = profile.period.split("—")[1];
  const chinese = locale === "zh";
  const primaryName = chinese ? profile.nameZh : profile.nameEn;
  const secondaryName = chinese ? profile.nameEn : profile.nameZh;

  return (
    <section className="hero-stage" aria-labelledby="home-title">
      <OrbitalResearchField />
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-inner academic-shell">
        <div className="hero-copy reveal">
          <p className="hero-eyebrow">
            {chinese ? "本科生科研主页" : "Undergraduate Research Portfolio"}
          </p>
          <h1 id="home-title" className="hero-name">
            {primaryName}
            <span lang={chinese ? "en" : "zh-CN"}>{secondaryName}</span>
          </h1>

          <div className="hero-affiliation">
            <p>{chinese ? profile.currentRoleZh : profile.currentRoleEn}</p>
            <p>{chinese ? profile.departmentZh : profile.departmentEn}</p>
            <p>{chinese ? profile.universityZh : profile.universityEn}</p>
            <p className="hero-degree">
              {chinese
                ? `${profile.degreeZh} · ${expectedYear} 年预计毕业 · ${profile.locationZh}`
                : `Expected ${profile.degreeEn.replace(" Candidate", "")} ${expectedYear} · ${profile.locationEn}`}
            </p>
          </div>

          <h2 className="research-identity">
            {chinese ? profile.researchIdentityZh : profile.researchIdentityEn}
          </h2>

          <div className="research-statement">
            {(chinese ? profile.researchStatementZh : profile.researchStatementEn).map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>

          <p className="research-keywords">{profile.focusKeywords.join(" · ")}</p>
          <AcademicLinks locale={locale} />
        </div>

        {profile.photoVisible && profile.photo ? (
          <div className="hero-portrait reveal reveal-delay">
            <ProfilePhoto locale={locale} />
          </div>
        ) : (
          <div className="hero-signal-caption" aria-label="Research process summary">
            <span>Dynamic networked systems</span>
            <strong>Model · Represent · Decide</strong>
            <small>Satellite networks / Multi-agent learning</small>
          </div>
        )}
      </div>
    </section>
  );
}
