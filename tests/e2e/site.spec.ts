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
  await expect(page).toHaveTitle(/程硕/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("程硕");
  await expect(page.getByText("精选科研成果")).toBeVisible();
  await expect(page.getByText("论文信息将在公开后更新。")).toBeVisible();
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
