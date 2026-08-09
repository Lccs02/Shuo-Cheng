import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
if (!fs.existsSync(outDir)) throw new Error("未找到 out 目录，请先运行静态构建。");

const forbiddenNames = ["cv-zh.pdf", "content-studio", "contact.local.json"];
const localContactPath = path.join(process.cwd(), "private", "contact.local.json");
const localContactValues = fs.existsSync(localContactPath)
  ? Object.values(JSON.parse(fs.readFileSync(localContactPath, "utf8")))
      .map((item) => (typeof item === "object" && item !== null ? item.value : undefined))
      .filter((value) => typeof value === "string" && value.length > 0)
  : [];
const forbiddenText = [
  "GITHUB_TOKEN",
  ...localContactValues,
  ...(process.env.GITHUB_TOKEN ? [process.env.GITHUB_TOKEN] : []),
].filter(Boolean);
const findings = [];

function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    const relative = path.relative(outDir, full).replaceAll("\\", "/");
    if (forbiddenNames.some((name) => relative.toLowerCase().includes(name)))
      findings.push(relative);
    if (entry.isDirectory()) {
      scan(full);
      continue;
    }
    if (entry.size > 5_000_000 || /\.(?:jpg|jpeg|png|webp|avif|woff2?|ico)$/i.test(entry.name))
      continue;
    const text = fs.readFileSync(full, "utf8");
    for (const secret of forbiddenText) {
      if (text.includes(secret))
        findings.push(
          `${relative} 包含敏感标记 ${secret === process.env.GITHUB_TOKEN ? "[GITHUB_TOKEN value]" : secret}`,
        );
    }
  }
}

scan(outDir);
if (findings.length) {
  console.error("构建产物安全扫描失败：\n" + findings.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log("构建产物安全扫描通过：未发现私人联系方式、简历、内容工作室或 Token。");
