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

export function HomePage() {
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
      <DocumentLanguage locale="en" />
      <Hero />
      <ResearchJourney topics={visibleResearch} introduction={sites.en.researchJourneyIntro} />
      <PublicationList publications={visiblePublications} />
      <ResearchExperience items={visibleResearchExperience} />
      <ResearchProjectList projects={visibleProjects} />
      <Awards awards={visibleAwards} />
      <Education items={visibleEducation} />
      <News items={visibleNews} />
    </main>
  );
}
