import fs from "node:fs";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "out");
const chineseSections = new Set([
  "about",
  "research",
  "projects",
  "competitions",
  "awards",
  "experience",
  "contact",
  "privacy",
]);
let updated = 0;

function visit(directory) {
  if (!fs.existsSync(directory)) return;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;

    const relativePath = path.relative(outputRoot, fullPath);
    const firstSegment = relativePath.split(path.sep)[0];
    const language = chineseSections.has(firstSegment) ? "zh-CN" : "en";
    const source = fs.readFileSync(fullPath, "utf8");
    const result = source.replace(/<html lang="[^"]+"/, `<html lang="${language}"`);
    if (result !== source) {
      fs.writeFileSync(fullPath, result);
      updated += 1;
    }
  }
}

visit(outputRoot);
console.log(`静态页面语言标记处理完成：${updated} 个 HTML 文件。`);
