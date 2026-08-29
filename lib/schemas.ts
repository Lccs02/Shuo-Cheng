import { z } from "zod";

const url = z.string().url();
const optionalUrl = url.optional();

export const profileSchema = z.object({
  nameZh: z.string().min(1),
  nameEn: z.string().min(1),
  universityZh: z.string().min(1),
  universityEn: z.string().min(1),
  departmentZh: z.string().min(1),
  departmentEn: z.string().min(1),
  majorZh: z.string().min(1),
  majorEn: z.string().min(1),
  degreeZh: z.string().min(1),
  degreeEn: z.string().min(1),
  currentRoleZh: z.string().min(1),
  currentRoleEn: z.string().min(1),
  period: z.string().min(1),
  locationZh: z.string().min(1),
  locationEn: z.string().min(1),
  bioZh: z.string().min(1),
  bioEn: z.string().min(1),
  bioEditable: z.boolean(),
  researchIdentityZh: z.string().min(1),
  researchIdentityEn: z.string().min(1),
  researchStatementZh: z.array(z.string().min(1)).min(1),
  researchStatementEn: z.array(z.string().min(1)).min(1),
  focusKeywords: z.array(z.string().min(1)),
  photo: z.string().startsWith("/").optional(),
  photoAltZh: z.string().min(1),
  photoAltEn: z.string().min(1),
  photoVisible: z.boolean(),
  researchVisual: z.string().startsWith("/").optional(),
  researchVisualAltZh: z.string().min(1),
  researchVisualAltEn: z.string().min(1),
  researchVisualVisible: z.boolean(),
  github: url,
  scholarUrl: optionalUrl,
  cvUrl: z.string().startsWith("/").optional(),
  orcid: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/),
  schoolEmail: z.string().email(),
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const navigationSchema = z.array(
  z.object({ path: z.string(), zh: z.string().min(1), en: z.string().min(1) }),
);

export const educationSchema = z.array(
  z.object({
    id: z.string().min(1),
    institutionZh: z.string().min(1),
    institutionEn: z.string().min(1),
    periodZh: z.string().min(1),
    periodEn: z.string().min(1),
    schoolZh: z.string().min(1),
    schoolEn: z.string().min(1),
    programZh: z.string().min(1),
    programEn: z.string().min(1),
    locationZh: z.string().min(1),
    locationEn: z.string().min(1),
    type: z.enum(["education", "exchange"]),
    gpa: z.string().optional(),
    rank: z.string().optional(),
    courseworkZh: z.array(z.string()).optional(),
    courseworkEn: z.array(z.string()).optional(),
    visible: z.boolean(),
  }),
);

export const researchTopicsSchema = z.array(
  z.object({
    id: z.string().min(1),
    phase: z.enum(["understanding", "representation", "decision"]),
    phaseLabelZh: z.string().min(1),
    phaseLabelEn: z.string().min(1),
    titleZh: z.string().min(1),
    titleEn: z.string().min(1),
    subtitleZh: z.string().min(1),
    subtitleEn: z.string().min(1),
    descriptionZh: z.string().min(1),
    descriptionEn: z.string().min(1),
    keywords: z.array(z.string().min(1)),
    paperUrl: optionalUrl,
    codeUrl: optionalUrl,
    projectUrl: optionalUrl,
    visible: z.boolean(),
  }),
);

export const publicationsSchema = z.array(
  z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    firstAuthor: z.boolean(),
    venue: z.string().optional(),
    year: z.number().int().optional(),
    status: z.enum(["published", "accepted", "under_review", "preprint", "in_progress"]),
    abstractZh: z.string().optional(),
    abstractEn: z.string().optional(),
    doi: z.string().optional(),
    paperUrl: optionalUrl,
    codeUrl: optionalUrl,
    projectUrl: optionalUrl,
    arxivUrl: optionalUrl,
    bibtexUrl: optionalUrl,
    bibtex: z.string().optional(),
    thumbnail: z.string().optional(),
    descriptionZh: z.string().optional(),
    descriptionEn: z.string().optional(),
    tags: z.array(z.string()),
    selected: z.boolean(),
    visible: z.boolean(),
  }),
);

export const researchExperiencesSchema = z.array(
  z.object({
    id: z.string().min(1),
    institutionZh: z.string().min(1),
    institutionEn: z.string().min(1),
    labZh: z.string().optional(),
    labEn: z.string().optional(),
    roleZh: z.string().min(1),
    roleEn: z.string().min(1),
    advisorZh: z.string().optional(),
    advisorEn: z.string().optional(),
    startDate: z.string().min(1),
    endDate: z.string().optional(),
    topicZh: z.string().min(1),
    topicEn: z.string().min(1),
    descriptionZh: z.string().min(1),
    descriptionEn: z.string().min(1),
    highlightsZh: z.array(z.string()),
    highlightsEn: z.array(z.string()),
    relatedPublicationIds: z.array(z.string()),
    visible: z.boolean(),
  }),
);

export const newsSchema = z.array(
  z.object({
    id: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}(?:-\d{2})?$/),
    contentZh: z.string().min(1),
    contentEn: z.string().min(1),
    type: z.enum(["publication", "research", "award", "education", "other"]),
    link: optionalUrl,
    image: z.string().optional(),
    imageAltZh: z.string().optional(),
    imageAltEn: z.string().optional(),
    visible: z.boolean(),
  }),
);

export const projectsSchema = z.array(
  z.object({
    id: z.string().min(1),
    titleZh: z.string().min(1),
    titleEn: z.string().min(1),
    summaryZh: z.string().min(1),
    summaryEn: z.string().min(1),
    contributionZh: z.array(z.string()),
    contributionEn: z.array(z.string()),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(["completed", "in_progress", "archived"]),
    cover: z.string().optional(),
    githubUrl: optionalUrl,
    docsUrl: optionalUrl,
    paperUrl: optionalUrl,
    demoUrl: optionalUrl,
    reportUrl: optionalUrl,
    tags: z.array(z.string()),
    selected: z.boolean(),
    visible: z.boolean(),
  }),
);

export const competitionsSchema = z.array(
  z.object({
    id: z.string().min(1),
    nameZh: z.string().min(1),
    nameEn: z.string().min(1),
    projectTitleZh: z.string().optional(),
    projectTitleEn: z.string().optional(),
    year: z.number().int().optional(),
    level: z.enum(["international", "national", "provincial", "university"]),
    awardZh: z.string().min(1),
    awardEn: z.string().min(1),
    roleZh: z.string().optional(),
    roleEn: z.string().optional(),
    contributionZh: z.array(z.string()).optional(),
    contributionEn: z.array(z.string()).optional(),
    descriptionZh: z.string().optional(),
    descriptionEn: z.string().optional(),
    cover: z.string().optional(),
    githubUrl: optionalUrl,
    demoUrl: optionalUrl,
    reportUrl: optionalUrl,
    certificate: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean(),
  }),
);

export const awardsSchema = z.array(
  z.object({
    id: z.string().min(1),
    nameZh: z.string().min(1),
    nameEn: z.string().min(1),
    year: z.number().int().optional(),
    issuerZh: z.string().optional(),
    issuerEn: z.string().optional(),
    distinctionZh: z.string().min(1),
    distinctionEn: z.string().min(1),
    level: z.enum(["national", "provincial", "university"]),
    type: z.enum(["competition", "scholarship", "honor", "research", "other"]),
    descriptionZh: z.string().optional(),
    descriptionEn: z.string().optional(),
    certificate: z.string().optional(),
    featured: z.boolean(),
    visible: z.boolean(),
  }),
);

export const experiencesSchema = z.array(
  z.object({
    id: z.string().min(1),
    periodZh: z.string().min(1),
    periodEn: z.string().min(1),
    organizationZh: z.string().min(1),
    organizationEn: z.string().min(1),
    roleZh: z.string().min(1),
    roleEn: z.string().min(1),
    descriptionZh: z.string().min(1),
    descriptionEn: z.string().min(1),
    achievementsZh: z.array(z.string()),
    achievementsEn: z.array(z.string()),
    category: z.string().min(1),
    image: z.string().optional(),
    externalUrl: optionalUrl,
    visible: z.boolean(),
  }),
);

export const skillsSchema = z.array(
  z.object({
    categoryZh: z.string().min(1),
    categoryEn: z.string().min(1),
    items: z.array(z.string().min(1)),
  }),
);

export const publicContactSchema = z.object({
  contactVisibility: z.object({
    schoolEmail: z.boolean(),
    personalEmail: z.boolean(),
    phone: z.boolean(),
    wechat: z.boolean(),
  }),
  locationZh: z.string().min(1),
  locationEn: z.string().min(1),
  cvRequestSubjectZh: z.string().min(1),
  cvRequestSubjectEn: z.string().min(1),
});

export const siteSchema = z.object({
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  researchJourneyIntro: z.string().min(1),
  futurePlans: z.array(z.string().min(1)),
  furtherQuestions: z.array(z.string().min(1)),
  analyticsProvider: z.enum(["none", "google", "umami"]),
  allowSearchIndexing: z.boolean(),
});

export const githubSyncConfigSchema = z.object({
  username: z.string().min(1),
  featuredRepositories: z.array(z.string().min(1)),
});

export const githubCacheSchema = z.object({
  syncedAt: z.string().datetime().nullable(),
  repositories: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      url: z.string().url(),
      language: z.string().nullable(),
      topics: z.array(z.string()),
      stars: z.number().int().nonnegative(),
    }),
  ),
});

export const schemas = {
  "profile.json": profileSchema,
  "navigation.json": navigationSchema,
  "education.json": educationSchema,
  "research.json": researchTopicsSchema,
  "publications.json": publicationsSchema,
  "research-experiences.json": researchExperiencesSchema,
  "news.json": newsSchema,
  "projects.json": projectsSchema,
  "competitions.json": competitionsSchema,
  "awards.json": awardsSchema,
  "experiences.json": experiencesSchema,
  "skills.json": skillsSchema,
  "contact.public.json": publicContactSchema,
  "site.zh.json": siteSchema,
  "site.en.json": siteSchema,
  "github-sync.config.json": githubSyncConfigSchema,
} as const;
