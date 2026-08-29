import type { Locale } from "@/types/content";

const zh = {
  status: {
    published: "已发表",
    accepted: "已接收",
    under_review: "审稿中",
    preprint: "预印本",
    in_progress: "研究中",
  },
};

const en = {
  status: {
    published: "Published",
    accepted: "Accepted",
    under_review: "Manuscript under review",
    preprint: "Preprint",
    in_progress: "In progress",
  },
};

export function labels(locale: Locale) {
  return locale === "zh" ? zh : en;
}
