import { expect, test } from "@playwright/test";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const projectBasePath =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName &&
  !repositoryName.toLowerCase().endsWith(".github.io")
    ? `/${repositoryName}`
    : "";
const sitePath = (path: string) => `${projectBasePath}${path}`;

test("Chinese home renders its academic hierarchy", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page).toHaveTitle(/Shuo Cheng \| Academic Homepage/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Shuo Cheng");
  await expect(page.getByRole("heading", { name: "研究方向" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "精选荣誉与奖项" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "教育背景" })).toBeVisible();
  await expect(page.getByRole("img", { name: /低轨卫星网络、网络拓扑与强化学习/ })).toBeVisible();
  await expect(page.getByText("AI 生成的研究概念图（非本人肖像）")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/TODO|Coming Soon|正在整理|占位/);
});

test("language switch keeps the current page", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(sitePath("/research/"));
  await page.getByRole("link", { name: "切换到英文" }).click();
  await expect(page).toHaveURL(/\/en\/research\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Research");
  expect(errors).toEqual([]);
});

test("theme choice persists", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(sitePath("/"));
  const switcher = page.getByRole("button", { name: /切换到/ });
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
  if (isMobile) await page.getByRole("button", { name: "打开菜单" }).click();
  await page.getByRole("link", { name: "研究", exact: true }).click();
  await expect(page).toHaveURL(/#research$/);
  await expect(page.locator("#research")).toBeInViewport();
});

test("reduced motion removes nonessential section animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(sitePath("/"));
  await expect(page.locator("html")).not.toHaveClass(/motion-enabled/);
  await expect(page.locator("#research")).toBeVisible();
});

test("sections reveal without blur or scroll-linked depth", async ({ page }) => {
  await page.goto(sitePath("/"));
  const firstSection = page.locator("[data-motion]").first();
  await firstSection.scrollIntoViewIfNeeded();
  await expect(firstSection).toHaveClass(/is-visible/);
  await expect(firstSection).toHaveCSS("filter", "none");
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
    await page.getByRole("button", { name: "打开菜单" }).click();
    await expect(page.getByRole("navigation", { name: "移动导航" })).toBeVisible();
  }
});

test("layout never overflows horizontally", async ({ page }) => {
  await page.goto(sitePath("/"));
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflows).toBe(false);
});
