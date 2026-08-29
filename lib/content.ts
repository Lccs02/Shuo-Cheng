import awardsJson from "@/content/awards.json";
import competitionsJson from "@/content/competitions.json";
import contactJson from "@/content/contact.public.json";
import educationJson from "@/content/education.json";
import experiencesJson from "@/content/experiences.json";
import navigationJson from "@/content/navigation.json";
import profileJson from "@/content/profile.json";
import projectsJson from "@/content/projects.json";
import publicationsJson from "@/content/publications.json";
import interestsJson from "@/content/research-interests.json";
import researchJson from "@/content/research.json";
import researchExperiencesJson from "@/content/research-experiences.json";
import newsJson from "@/content/news.json";
import siteEnJson from "@/content/site.en.json";
import siteZhJson from "@/content/site.zh.json";
import skillsJson from "@/content/skills.json";
import githubCacheJson from "@/public/github-cache.json";
import {
  awardsSchema,
  competitionsSchema,
  educationSchema,
  experiencesSchema,
  githubCacheSchema,
  navigationSchema,
  profileSchema,
  projectsSchema,
  publicationsSchema,
  publicContactSchema,
  researchInterestsSchema,
  researchTopicsSchema,
  researchExperiencesSchema,
  newsSchema,
  siteSchema,
  skillsSchema,
} from "@/lib/schemas";
import type { Locale } from "@/types/content";
import { withBasePath } from "@/lib/paths";

export const profile = profileSchema.parse(profileJson);
export const navigation = navigationSchema.parse(navigationJson);
export const education = educationSchema.parse(educationJson);
export const interests = researchInterestsSchema.parse(interestsJson);
export const researchTopics = researchTopicsSchema.parse(researchJson);
export const publications = publicationsSchema.parse(publicationsJson);
export const researchExperiences = researchExperiencesSchema.parse(researchExperiencesJson);
export const news = newsSchema.parse(newsJson);
export const projects = projectsSchema.parse(projectsJson);
export const competitions = competitionsSchema.parse(competitionsJson);
export const awards = awardsSchema.parse(awardsJson);
export const experiences = experiencesSchema.parse(experiencesJson);
export const skills = skillsSchema.parse(skillsJson);
export const publicContact = publicContactSchema.parse(contactJson);
export const githubCache = githubCacheSchema.parse(githubCacheJson);
export const sites = {
  zh: siteSchema.parse(siteZhJson),
  en: siteSchema.parse(siteEnJson),
};

export function localized(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? zh : en;
}

export function hrefFor(locale: Locale, path = "") {
  const suffix = path ? `/${path}` : "";
  const href = locale === "en" ? `/en${suffix}/` : path ? `${suffix}/` : "/";
  return withBasePath(href);
}

export function getVisibleStats() {
  const visiblePublications = publications.filter((item) => item.visible);
  const published = visiblePublications.filter((item) =>
    ["published", "accepted"].includes(item.status),
  ).length;
  const underReview = visiblePublications.filter((item) => item.status === "under_review").length;
  const national = awards.filter((item) => item.level === "national").length;
  const provincial = awards.filter((item) => item.level === "provincial").length;
  const selectedProjects =
    projects.filter((item) => item.visible && item.selected).length +
    githubCache.repositories.length;
  return { published, underReview, national, provincial, selectedProjects };
}

export function getGithubProjects() {
  return githubCache.repositories.map((repository) => ({
    id: `github-${repository.name}`,
    titleZh: repository.name,
    titleEn: repository.name,
    summaryZh: repository.description,
    summaryEn: repository.description,
    contributionZh: [],
    contributionEn: [],
    status: "completed" as const,
    githubUrl: repository.url,
    tags: [repository.language, ...repository.topics].filter(
      (item): item is string => typeof item === "string" && item.length > 0,
    ),
    selected: true,
    visible: true,
  }));
}
