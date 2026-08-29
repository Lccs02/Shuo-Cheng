import { DocumentLanguage } from "@/components/common/DocumentLanguage";
import { ExternalLink, SectionHeading } from "@/components/common/Primitives";
import { Hero } from "@/components/home/Hero";
import { ResearchVisual } from "@/components/home/ResearchVisual";
import {
  AwardItem,
  EducationList,
  NewsList,
  ResearchExperienceList,
} from "@/components/awards/TimelineComponents";
import { ProjectCard } from "@/components/projects/ProjectComponents";
import { PublicationCard, ResearchTopicList } from "@/components/research/ResearchComponents";
import {
  awards,
  education,
  getGithubProjects,
  news,
  profile,
  projects,
  publications,
  researchExperiences,
  researchTopics,
} from "@/lib/content";
import type { Locale } from "@/types/content";

export function HomePage({ locale }: { locale: Locale }) {
  const visibleResearch = researchTopics.filter((item) => item.visible);
  const visiblePublications = publications.filter((item) => item.visible && item.selected);
  const visibleResearchExperience = researchExperiences.filter((item) => item.visible);
  const visibleProjects = [
    ...projects.filter((item) => item.visible && item.selected),
    ...getGithubProjects(),
  ].slice(0, 4);
  const visibleAwards = awards.filter((item) => item.visible && item.featured).slice(0, 6);
  const visibleEducation = education.filter((item) => item.visible);
  const visibleNews = news
    .filter((item) => item.visible)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <main id="main-content">
      <DocumentLanguage locale={locale} />
      <Hero locale={locale} />

      {visibleResearch.length > 0 && (
        <section id="research" className="academic-section academic-shell" data-motion>
          <SectionHeading
            title={locale === "zh" ? "研究方向" : "Research"}
            description={
              locale === "zh"
                ? "围绕智能网络系统形成相互衔接的研究主线，并根据公开成果持续更新。"
                : "Connected research directions around intelligent networked systems, updated as public work becomes available."
            }
          />
          <div>
            <ResearchTopicList topics={visibleResearch} locale={locale} />
            {profile.researchVisualVisible && profile.researchVisual && (
              <ResearchVisual locale={locale} />
            )}
          </div>
        </section>
      )}

      {visiblePublications.length > 0 && (
        <section id="publications" className="academic-section academic-shell" data-motion>
          <SectionHeading title={locale === "zh" ? "论文与预印本" : "Publications & Preprints"} />
          <div>
            {visiblePublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {visibleResearchExperience.length > 0 && (
        <section id="experience" className="academic-section academic-shell" data-motion>
          <SectionHeading title={locale === "zh" ? "科研经历" : "Research Experience"} />
          <ResearchExperienceList items={visibleResearchExperience} locale={locale} />
        </section>
      )}

      {visibleProjects.length > 0 && (
        <section id="projects" className="academic-section academic-shell" data-motion>
          <SectionHeading title={locale === "zh" ? "精选项目" : "Selected Projects"} />
          <div>
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {visibleAwards.length > 0 && (
        <section id="awards" className="academic-section academic-shell" data-motion>
          <SectionHeading title={locale === "zh" ? "精选荣誉与奖项" : "Selected Awards & Honors"} />
          <div>
            {visibleAwards.map((award) => (
              <AwardItem key={award.id} award={award} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {visibleEducation.length > 0 && (
        <section id="education" className="academic-section academic-shell" data-motion>
          <SectionHeading title={locale === "zh" ? "教育背景" : "Education"} />
          <EducationList items={visibleEducation} locale={locale} />
        </section>
      )}

      {visibleNews.length > 0 && (
        <section id="news" className="academic-section academic-shell" data-motion>
          <SectionHeading title={locale === "zh" ? "最新动态" : "News"} />
          <NewsList items={visibleNews} locale={locale} />
        </section>
      )}

      <section id="contact" className="academic-section academic-shell" data-motion>
        <SectionHeading title={locale === "zh" ? "联系" : "Contact"} />
        <div>
          <p className="max-w-2xl leading-7 text-[var(--muted)]">
            {locale === "zh"
              ? "如需学术交流或申请查看个人简历，请通过学校邮箱联系。"
              : "For academic correspondence or to request a CV, please use my university email."}
          </p>
          <div className="academic-links mt-4">
            <a href={`mailto:${profile.schoolEmail}`}>{profile.schoolEmail}</a>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={`https://orcid.org/${profile.orcid}`}>ORCID</ExternalLink>
          </div>
        </div>
      </section>
    </main>
  );
}
