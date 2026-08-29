import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ExternalLink } from "@/components/common/Primitives";
import { profile } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

export function ProfilePhoto() {
  if (!profile.photoVisible || !profile.photo) return null;

  return (
    <div className="profile-photo">
      <ImageWithFallback
        src={profile.photo}
        alt={profile.photoAltEn}
        priority
        sizes="(max-width: 768px) 280px, 320px"
        className="profile-photo-image"
      />
    </div>
  );
}

export function AcademicLinks() {
  return (
    <nav className="academic-links" aria-label="Academic profiles and contact">
      {profile.cvUrl && <a href={withBasePath(profile.cvUrl)}>CV</a>}
      <ExternalLink href={profile.github}>GitHub</ExternalLink>
      {profile.scholarUrl && <ExternalLink href={profile.scholarUrl}>Google Scholar</ExternalLink>}
      <ExternalLink href={`https://orcid.org/${profile.orcid}`}>ORCID</ExternalLink>
      <a href={`mailto:${profile.schoolEmail}`}>Email</a>
    </nav>
  );
}

export function Hero() {
  const expectedYear = profile.period.split("—")[1];

  return (
    <section className="home-hero academic-shell" aria-labelledby="home-title">
      <div className={profile.photoVisible && profile.photo ? "hero-layout" : "hero-copy-only"}>
        <div>
          <h1 id="home-title" className="hero-name">
            {profile.nameEn}
            <span lang="zh-CN">{profile.nameZh}</span>
          </h1>

          <div className="hero-affiliation">
            <p>{profile.currentRoleEn}</p>
            <p>{profile.departmentEn}</p>
            <p>{profile.universityEn}</p>
            <p className="hero-degree">
              Expected {profile.degreeEn.replace(" Candidate", "")} {expectedYear} ·{" "}
              {profile.locationEn}
            </p>
          </div>

          <h2 className="research-identity">{profile.researchIdentityEn}</h2>

          <div className="research-statement">
            {profile.researchStatementEn.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="research-keywords">{profile.focusKeywords.join(" · ")}</p>
          <AcademicLinks />
        </div>

        <ProfilePhoto />
      </div>
    </section>
  );
}
