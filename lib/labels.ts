import type { Locale } from "@/types/content";

const zh = {
  skip: "跳到正文",
  more: "了解更多",
  selectedResearch: "精选科研成果",
  competitions: "精选竞赛成果",
  awards: "重要荣誉",
  timeline: "教育与研究时间轴",
  projects: "精选工程项目",
  contact: "保持联系",
  all: "查看全部",
  updated: "最后更新",
  emptyPublications: "论文信息将在公开后更新。",
  emptyProjects: "项目内容正在整理中。",
  firstAuthor: "第一作者",
  status: {
    published: "已发表",
    accepted: "已接收",
    under_review: "投稿中",
    preprint: "预印本",
    in_progress: "在研",
  },
};

const en = {
  skip: "Skip to content",
  more: "Learn more",
  selectedResearch: "Selected Research",
  competitions: "Selected Competitions",
  awards: "Selected Honors",
  timeline: "Education & Research Timeline",
  projects: "Selected Projects",
  contact: "Contact",
  all: "View all",
  updated: "Last updated",
  emptyPublications: "Publication details will be updated when they become public.",
  emptyProjects: "Project materials are being organized.",
  firstAuthor: "First author",
  status: {
    published: "Published",
    accepted: "Accepted",
    under_review: "Under review",
    preprint: "Preprint",
    in_progress: "In progress",
  },
};

export function labels(locale: Locale) {
  return locale === "zh" ? zh : en;
}
