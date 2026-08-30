import { expect, test } from "@playwright/test";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const projectBasePath =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName &&
  !repositoryName.toLowerCase().endsWith(".github.io")
    ? `/${repositoryName}`
    : "";
const sitePath = (path: string) => `${projectBasePath}${path}`;

test("home communicates the research identity and journey", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page).toHaveTitle(/Shuo Cheng \| Academic Homepage/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("程硕");
  await expect(page.getByRole("heading", { name: "面向动态网络系统的学习方法" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "科研", exact: true })).toBeVisible();
  await expect(page.getByText("理解", { exact: true })).toBeVisible();
  await expect(page.getByText("表征", { exact: true })).toBeVisible();
  await expect(page.getByText("决策", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "卫星流量建模" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "精选论文" })).toBeVisible();
  await expect(page.locator("#publications").getByText("BWTAC'26", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "精选奖项与荣誉" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "奖学金", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "科研项目", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "学科竞赛", exact: true })).toBeVisible();
  await expect(page.locator(".award-group", { hasText: "奖学金" })).toContainText("暂无公开记录");
  await expect(page.getByRole("heading", { name: "教育经历" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "动态", exact: true })).toBeVisible();
  await expect(page.locator(".desktop-navigation .nav-link")).toHaveText([
    "动态",
    "研究",
    "论文",
    "奖项",
    "教育",
  ]);
  await expect(page.locator(".orbital-research-field")).toBeVisible();
  await expect(page.locator(".profile-sidebar")).toBeVisible();
  const portrait = page.getByRole("img", { name: "程硕的个人照片" });
  await expect(portrait).toBeVisible();
  expect((await portrait.boundingBox())?.width).toBeLessThanOrEqual(190);
  const researchConcept = page.getByRole("img", { name: /AI 研究主题概念插画/ });
  await expect(researchConcept).toBeVisible();
  const portraitBox = await portrait.boundingBox();
  const conceptBox = await researchConcept.boundingBox();
  expect(portraitBox).not.toBeNull();
  expect(conceptBox).not.toBeNull();
  expect(conceptBox!.width).toBeGreaterThan(portraitBox!.width);
  await expect(page.locator("#news time")).toHaveText("2026年8月26日");
  await expect(page.locator("#news img")).toHaveCount(0);
});

test("language switcher covers home and inner pages", async ({ page }) => {
  await page.goto(sitePath("/#news"));
  await page.getByRole("link", { name: "切换到英文" }).click();
  await expect(page).toHaveURL(/\/en\/#news$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "News" })).toBeVisible();
  await expect(page.locator(".desktop-navigation .nav-link")).toHaveText([
    "News",
    "Research",
    "Publications",
    "Awards",
    "Education",
  ]);
  await expect(page.getByRole("heading", { name: "Scholarships", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Research Projects", exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Academic Competitions", exact: true }),
  ).toBeVisible();

  await page.goto(sitePath("/research/"));
  await page.getByRole("link", { name: "切换到英文" }).click();
  await expect(page).toHaveURL(/\/en\/research\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1, name: "Research" })).toBeVisible();
  await page.getByRole("link", { name: "Switch to Chinese" }).click();
  await expect(page).toHaveURL(/\/research\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("empty academic sections and internal placeholders stay hidden", async ({ page }) => {
  await page.goto(sitePath("/en/"));
  await expect(page.getByRole("heading", { name: "Selected Publications" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Research Experience" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Selected Research Projects" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "News" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(
    /TODO|Coming Soon|正在整理|占位|论文即将更新|No data/i,
  );
});

test("profile and research concept images remain clearly distinguished", async ({ page }) => {
  await page.goto(sitePath("/"));
  const portrait = page.getByRole("img", { name: "程硕的个人照片" });
  const concept = page.getByRole("img", { name: /AI 研究主题概念插画/ });
  await expect(portrait).toBeVisible();
  await expect(concept).toBeVisible();
  expect(await portrait.getAttribute("src")).toContain("profile-shuo-cheng.jpg");
  expect(await concept.getAttribute("src")).toContain("academic-research-concept.webp");
  await expect(page.getByText("研究主题概念插画 · AI 生成")).toBeVisible();

  await page.goto(sitePath("/research/"));
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("img", { name: /低轨卫星网络/ })).toBeVisible();
  await expect(page.getByText("AI 生成的研究主题概念插画，非本人肖像。")).toBeVisible();
});

test("theme choice persists", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(sitePath("/en/"));
  const switcher = page.getByRole("button", { name: /Switch to/ });
  const initiallyDark = await page
    .locator("html")
    .evaluate((element) => element.classList.contains("dark"));
  await switcher.click();
  await expect
    .poll(() => page.locator("html").evaluate((element) => element.classList.contains("dark")))
    .toBe(!initiallyDark);
  await page.reload();
  await expect
    .poll(() => page.locator("html").evaluate((element) => element.classList.contains("dark")))
    .toBe(!initiallyDark);
  expect(errors).toEqual([]);
});

test("academic navigation scrolls to visible sections", async ({ page, isMobile }) => {
  await page.goto(sitePath("/en/"));
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Research", exact: true }).click();
  await expect(page).toHaveURL(/#research$/);
  await expect(page.locator("#research")).toBeInViewport();
});

test("private fields remain absent", async ({ page }) => {
  await page.goto(sitePath("/contact/"));
  await expect(page.locator("body")).not.toContainText("private-person@example.invalid");
  await expect(page.locator("body")).not.toContainText("PRIVATE-PHONE-VALUE");
});

test("404 and mobile navigation work", async ({ page, isMobile }) => {
  await page.goto(sitePath("/not-a-page/"));
  await expect(page.getByText(/404/)).toBeVisible();
  if (isMobile) {
    await page.goto(sitePath("/en/"));
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  }
});

test("layout has no horizontal overflow at required widths", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(sitePath("/"));
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflows, `horizontal overflow at ${width}px`).toBe(false);
  }
});
