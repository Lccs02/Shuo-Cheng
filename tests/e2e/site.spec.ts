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
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Shuo Cheng");
  await expect(
    page.getByRole("heading", { name: "Learning for Dynamic Networked Systems" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Research", exact: true })).toBeVisible();
  await expect(page.getByText("Understanding", { exact: true })).toBeVisible();
  await expect(page.getByText("Representation", { exact: true })).toBeVisible();
  await expect(page.getByText("Decision", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Satellite Traffic Modeling" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected Awards & Honors" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Education" })).toBeVisible();
});

test("empty academic sections and internal placeholders stay hidden", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page.getByRole("heading", { name: "Selected Publications" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Research Experience" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Selected Research Projects" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "News" })).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(
    /TODO|Coming Soon|正在整理|占位|论文即将更新|No data/i,
  );
});

test("the concept illustration is not presented as a profile photo", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page.getByRole("img", { name: /research illustration/i })).toHaveCount(0);

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
  await page.goto(sitePath("/"));
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
  await page.goto(sitePath("/"));
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
    await page.goto(sitePath("/"));
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
