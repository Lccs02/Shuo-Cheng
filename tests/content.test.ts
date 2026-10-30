import { describe, expect, it } from "vitest";
import {
  awards,
  competitions,
  profile,
  projects,
  publications,
  researchExperiences,
  researchTopics,
  news,
} from "@/lib/content";

describe("content integrity", () => {
  it("publishes only verified academic records", () => {
    expect(publications).toHaveLength(1);
    expect(publications[0]).toMatchObject({
      venue: "BWTAC'26",
      year: 2026,
      status: "accepted",
      firstAuthor: true,
      visible: true,
    });
    expect(researchExperiences).toHaveLength(0);
    expect(news).toHaveLength(2);
    expect(news).toContainEqual(
      expect.objectContaining({
        date: "2026-10-28",
        contentZh: "获得2025-2026学年浙江省政府奖学金。",
        type: "award",
        visible: true,
      }),
    );
    expect(news).toContainEqual(expect.objectContaining({ date: "2026-08-26" }));
    expect(news.every((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.date))).toBe(true);
    expect(JSON.stringify({ publications, researchExperiences, news })).not.toMatch(/TODO/i);
  });

  it("does not invent project records", () => {
    expect(projects.filter((item) => item.visible)).toHaveLength(0);
  });

  it("classifies selected recognition including the confirmed scholarship", () => {
    expect(awards.filter((item) => item.type === "scholarship")).toHaveLength(1);
    expect(awards).toContainEqual(
      expect.objectContaining({
        nameZh: "浙江省政府奖学金",
        distinctionZh: "2025-2026学年",
        level: "provincial",
        type: "scholarship",
        featured: true,
        visible: true,
      }),
    );
    expect(awards.filter((item) => item.type === "research")).toHaveLength(1);
    expect(awards.filter((item) => item.type === "competition")).toHaveLength(4);
    expect(awards).toContainEqual(
      expect.objectContaining({
        nameZh: "浙江省数学建模竞赛",
        distinctionZh: "省级二等奖",
        level: "provincial",
        type: "competition",
      }),
    );
  });

  it("defines a three-stage research journey", () => {
    expect(researchTopics.filter((item) => item.visible)).toHaveLength(3);
    expect(researchTopics.map((item) => item.phase)).toEqual([
      "understanding",
      "representation",
      "decision",
    ]);
    expect(researchTopics.every((item) => item.keywords.length >= 3)).toBe(true);
  });

  it("contains only verified public contact basics", () => {
    expect(profile.schoolEmail).toBe("24270230@hdu.edu.cn");
    expect(profile.photoVisible).toBe(true);
    expect(profile.photo).toBe("/images/profile-shuo-cheng.jpg");
    expect(profile.heroResearchVisualVisible).toBe(true);
    expect(profile.heroResearchVisual).toBe("/images/research/academic-research-concept.webp");
    expect(profile.researchIdentityEn).toBe("Learning for Dynamic Networked Systems");
    expect(JSON.stringify({ awards, competitions, profile })).not.toContain(
      "private-person@example.invalid",
    );
    expect(JSON.stringify({ awards, competitions, profile })).not.toContain("PRIVATE-PHONE-VALUE");
  });
});
