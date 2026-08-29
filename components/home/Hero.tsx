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
        sizes="(max-width: 800px) 144px, 224px"
        className="profile-photo-image"
      />
    </div>
  );
}

function HeroResearchVisual({ locale }: { locale: Locale }) {
  if (!profile.heroResearchVisualVisible || !profile.heroResearchVisual) return null;

  return (
    <figure className="hero-research-visual reveal reveal-delay">
      <div className="hero-research-visual-frame">
        <ImageWithFallback
          src={profile.heroResearchVisual}
          alt={locale === "zh" ? profile.heroResearchVisualAltZh : profile.heroResearchVisualAltEn}
          priority
          sizes="(max-width: 520px) 128px, 176px"
          className="hero-research-visual-image"
        />
      </div>
      <figcaption>
        {locale === "zh" ? "研究主题概念插画 · AI 生成" : "Research concept · AI-generated"}
      </figcaption>
    </figure>
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

export function ProfileSidebar({ locale }: { locale: Locale }) {
  const chinese = locale === "zh";
  const expectedYear = profile.period.split("—")[1];

  return (
    <aside className="profile-sidebar reveal" aria-labelledby="home-title">
      <ProfilePhoto locale={locale} />
      <div className="profile-sidebar-copy">
        <h1 id="home-title" className="profile-sidebar-name">
          {chinese ? profile.nameZh : profile.nameEn}
          <span lang={chinese ? "en" : "zh-CN"}>{chinese ? profile.nameEn : profile.nameZh}</span>
        </h1>
        <p className="profile-sidebar-role">
          {chinese ? profile.currentRoleZh : profile.currentRoleEn}
        </p>
        <div className="profile-sidebar-affiliation">
          <p>{chinese ? profile.departmentZh : profile.departmentEn}</p>
          <p>{chinese ? profile.universityZh : profile.universityEn}</p>
        </div>
        <dl className="profile-facts">
          <div>
            <dt>{chinese ? "专业" : "Field"}</dt>
            <dd>{chinese ? profile.majorZh : profile.majorEn}</dd>
          </div>
          <div>
            <dt>{chinese ? "学位" : "Degree"}</dt>
            <dd>
              {chinese
                ? `${profile.degreeZh} · ${expectedYear} 年预计毕业`
                : `${profile.degreeEn} · Expected ${expectedYear}`}
            </dd>
          </div>
          <div>
            <dt>{chinese ? "地点" : "Location"}</dt>
            <dd>{chinese ? profile.locationZh : profile.locationEn}</dd>
          </div>
        </dl>
        <AcademicLinks locale={locale} />
      </div>
    </aside>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const chinese = locale === "zh";

  return (
    <section className="hero-stage" aria-labelledby="research-profile-title">
      <OrbitalResearchField />
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy reveal">
          <p className="hero-eyebrow">{chinese ? "研究简介" : "Research Profile"}</p>
          <h2 id="research-profile-title" className="research-identity">
            {chinese ? profile.researchIdentityZh : profile.researchIdentityEn}
          </h2>

          <div className="research-statement">
            {(chinese ? profile.researchStatementZh : profile.researchStatementEn).map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>

          <ul
            className="research-keywords"
            aria-label={chinese ? "研究关键词" : "Research keywords"}
          >
            {profile.focusKeywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </div>

        {profile.heroResearchVisualVisible && profile.heroResearchVisual ? (
          <HeroResearchVisual locale={locale} />
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
