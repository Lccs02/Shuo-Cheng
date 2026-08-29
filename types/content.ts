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
  phase: "understanding" | "representation" | "decision";
  phaseLabelZh: string;
  phaseLabelEn: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  keywords: string[];
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
  image?: string;
  imageAltZh?: string;
  imageAltEn?: string;
  visible: boolean;
};

export type Award = {
  id: string;
  nameZh: string;
  nameEn: string;
  distinctionZh: string;
  distinctionEn: string;
  year?: number;
  issuerZh?: string;
  issuerEn?: string;
  descriptionZh?: string;
  descriptionEn?: string;
  certificate?: string;
};

export type Education = {
  id: string;
  institutionZh: string;
  institutionEn: string;
  periodZh: string;
  periodEn: string;
  schoolZh: string;
  schoolEn: string;
  programZh: string;
  programEn: string;
  locationZh: string;
  locationEn: string;
  gpa?: string;
  rank?: string;
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
