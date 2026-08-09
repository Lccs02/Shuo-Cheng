import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const config = JSON.parse(
  fs.readFileSync(path.join(root, "content", "github-sync.config.json"), "utf8"),
);
const cacheFile = path.join(root, "public", "github-cache.json");
const headers = { Accept: "application/vnd.github+json", "User-Agent": "lccs02-academic-homepage" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const response = await fetch(
    `https://api.github.com/users/${config.username}/repos?per_page=100&sort=updated`,
    {
      headers,
      signal: AbortSignal.timeout(20000),
    },
  );
  if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
  const repos = await response.json();
  const allow = new Set(config.featuredRepositories);
  const selected = repos
    .filter((repo) => !repo.private && !repo.fork && repo.description && allow.has(repo.name))
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
    }));
  fs.writeFileSync(
    cacheFile,
    `${JSON.stringify({ syncedAt: new Date().toISOString(), repositories: selected }, null, 2)}\n`,
  );
  console.log(`GitHub 同步完成：${selected.length} 个白名单公开仓库。`);
} catch (error) {
  console.warn(
    `GitHub 同步失败，已保留上一次缓存：${error instanceof Error ? error.message : String(error)}`,
  );
  if (!fs.existsSync(cacheFile)) {
    fs.writeFileSync(
      cacheFile,
      `${JSON.stringify({ syncedAt: null, repositories: [] }, null, 2)}\n`,
    );
  }
}
