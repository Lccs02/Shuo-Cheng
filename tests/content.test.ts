import { describe, expect, it } from "vitest";
import {
  awards,
  competitions,
  getVisibleStats,
  profile,
  projects,
  publications,
  researchExperiences,
  researchTopics,
  news,
} from "@/lib/content";

describe("content integrity", () => {
  it("does not expose incomplete academic records", () => {
    expect(publications).toHaveLength(0);
    expect(researchExperiences).toHaveLength(0);
    expect(news).toHaveLength(0);
    expect(JSON.stringify({ publications, researchExperiences, news })).not.toMatch(/TODO/i);
  });

  it("does not invent project records", () => {
    expect(projects.filter((item) => item.visible)).toHaveLength(0);
  });

  it("calculates achievement statistics from content", () => {
    const stats = getVisibleStats();
    expect(stats.national).toBe(2);
    expect(stats.provincial).toBe(2);
    expect(stats.published).toBe(0);
  });

  it("defines three visible research directions", () => {
    expect(researchTopics.filter((item) => item.visible)).toHaveLength(3);
    expect(researchTopics.every((item) => item.keywords.length >= 3)).toBe(true);
  });

  it("contains only verified public contact basics", () => {
    expect(profile.schoolEmail).toBe("24270230@hdu.edu.cn");
    expect(JSON.stringify({ awards, competitions, profile })).not.toContain(
      "private-person@example.invalid",
    );
    expect(JSON.stringify({ awards, competitions, profile })).not.toContain("PRIVATE-PHONE-VALUE");
  });
});
