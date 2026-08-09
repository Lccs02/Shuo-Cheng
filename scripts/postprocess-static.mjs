import fs from "node:fs";
import path from "node:path";

const englishRoot = path.join(process.cwd(), "out", "en");
let updated = 0;

function visit(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(full);
    } else if (entry.name.endsWith(".html")) {
      const source = fs.readFileSync(full, "utf8");
      const result = source.replace('<html lang="zh-CN"', '<html lang="en"');
      if (result !== source) {
        fs.writeFileSync(full, result);
        updated += 1;
      }
    }
  }
}

visit(englishRoot);
console.log(`英文静态页面语言标记处理完成：${updated} 个 HTML 文件。`);
