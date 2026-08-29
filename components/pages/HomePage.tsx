import { DocumentLanguage } from "@/components/common/DocumentLanguage";
import { Awards } from "@/components/home/Awards";
import { Education } from "@/components/home/Education";
import { Hero } from "@/components/home/Hero";
import { News } from "@/components/home/News";
import { PublicationList } from "@/components/home/PublicationList";
import { ResearchExperience } from "@/components/home/ResearchExperience";
import { ResearchJourney } from "@/components/home/ResearchJourney";
import { ResearchProjectList } from "@/components/home/ResearchProjectList";
import {
  awards,
  education,
  getGithubProjects,
  news,
  projects,
  publications,
  researchExperiences,
  researchTopics,
  sites,
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
  const visibleAwards = awards.filter((item) => item.visible && item.featured).slice(0, 4);
  const visibleEducation = education.filter((item) => item.visible);
  const visibleNews = news
    .filter((item) => item.visible)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <main id="main-content">
      <DocumentLanguage locale={locale} />
      <Hero locale={locale} />
      <ResearchJourney
        topics={visibleResearch}
        introduction={sites[locale].researchJourneyIntro}
        locale={locale}
      />
      <PublicationList publications={visiblePublications} locale={locale} />
      <ResearchExperience items={visibleResearchExperience} locale={locale} />
      <ResearchProjectList projects={visibleProjects} locale={locale} />
      <Awards awards={visibleAwards} locale={locale} />
      <Education items={visibleEducation} locale={locale} />
      <News items={visibleNews} locale={locale} />
    </main>
  );
}
