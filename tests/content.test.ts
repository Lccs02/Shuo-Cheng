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
    expect(news[0]?.date).toBe("2026-08-26");
    expect(news[0]?.image).toContain("bwtac26-acceptance-email.png");
    expect(JSON.stringify({ publications, researchExperiences, news })).not.toMatch(/TODO/i);
  });

  it("does not invent project records", () => {
    expect(projects.filter((item) => item.visible)).toHaveLength(0);
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
    expect(profile.researchIdentityEn).toBe("Learning for Dynamic Networked Systems");
    expect(JSON.stringify({ awards, competitions, profile })).not.toContain(
      "private-person@example.invalid",
    );
    expect(JSON.stringify({ awards, competitions, profile })).not.toContain("PRIVATE-PHONE-VALUE");
  });
});
