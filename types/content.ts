export type Locale = "zh" | "en";

export type PublicationStatus =
  "published" | "accepted" | "under_review" | "preprint" | "in_progress";

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  firstAuthor: boolean;
  venue?: string;
  year?: number;
  status: PublicationStatus;
  abstractZh?: string;
  abstractEn?: string;
  doi?: string;
  paperUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  arxivUrl?: string;
  bibtexUrl?: string;
  bibtex?: string;
  thumbnail?: string;
  descriptionZh?: string;
  descriptionEn?: string;
  tags: string[];
  selected: boolean;
  visible: boolean;
};

export type ResearchTopic = {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  keywords: string[];
  stage: "active" | "current_interest";
  paperUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  visible: boolean;
};

export type ResearchExperience = {
  id: string;
  institutionZh: string;
  institutionEn: string;
  labZh?: string;
  labEn?: string;
  roleZh: string;
  roleEn: string;
  advisorZh?: string;
  advisorEn?: string;
  startDate: string;
  endDate?: string;
  topicZh: string;
  topicEn: string;
  descriptionZh: string;
  descriptionEn: string;
  highlightsZh: string[];
  highlightsEn: string[];
  relatedPublicationIds: string[];
  visible: boolean;
};

export type NewsItem = {
  id: string;
  date: string;
  contentZh: string;
  contentEn: string;
  type: "publication" | "research" | "award" | "education" | "other";
  link?: string;
  visible: boolean;
};

export type Competition = {
  id: string;
  nameZh: string;
  nameEn: string;
  projectTitleZh?: string;
  projectTitleEn?: string;
  year?: number;
  level: "international" | "national" | "provincial" | "university";
  awardZh: string;
  awardEn: string;
  roleZh?: string;
  roleEn?: string;
  contributionZh?: string[];
  contributionEn?: string[];
  descriptionZh?: string;
  descriptionEn?: string;
  cover?: string;
  githubUrl?: string;
  demoUrl?: string;
  reportUrl?: string;
  certificate?: string;
  tags: string[];
  featured: boolean;
};

export type Project = {
  id: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  contributionZh: string[];
  contributionEn: string[];
  startDate?: string;
  endDate?: string;
  status: "completed" | "in_progress" | "archived";
  cover?: string;
  githubUrl?: string;
  docsUrl?: string;
  paperUrl?: string;
  demoUrl?: string;
  reportUrl?: string;
  tags: string[];
  selected: boolean;
  visible: boolean;
};
