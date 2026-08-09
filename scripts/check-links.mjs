import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");
const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json"));
const external = new Set();
let failed = false;

function walk(value, location) {
  if (typeof value === "string" && /(?:Url|github|doi|orcid)/i.test(location)) {
    if (value.startsWith("http")) {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error("unsupported protocol");
        external.add(value);
      } catch {
        failed = true;
        console.error(`无效 URL：${location} = ${value}`);
      }
    }
    if (value === "#") {
      failed = true;
      console.error(`禁止使用 # 占位链接：${location}`);
    }
  } else if (Array.isArray(value)) {
    value.forEach((entry, index) => walk(entry, `${location}[${index}]`));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => walk(entry, `${location}.${key}`));
  }
}

for (const file of files)
  walk(JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf8")), file);

const routes = [
  "",
  "about",
  "research",
  "projects",
  "competitions",
  "awards",
  "experience",
  "contact",
  "privacy",
];
for (const route of routes) {
  const zh = route ? `/${route}/` : "/";
  const en = route ? `/en/${route}/` : "/en/";
  if (!zh.startsWith("/") || !en.startsWith("/")) {
    failed = true;
    console.error(`无效内部路由：${route}`);
  }
}

if (process.argv.includes("--external")) {
  for (const url of external) {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok && response.status !== 405) throw new Error(`HTTP ${response.status}`);
      console.log(`✓ ${url}`);
    } catch (error) {
      failed = true;
      console.error(
        `外部链接不可达：${url} (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }
} else {
  console.log(`已验证 ${external.size} 个外部链接的格式。使用 --external 可检查在线可达性。`);
}

if (failed) process.exit(1);
console.log("链接检查通过。");
