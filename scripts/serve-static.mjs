import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const projectBasePath =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName &&
  !repositoryName.toLowerCase().endsWith(".github.io")
    ? `/${repositoryName}`
    : "";
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

http
  .createServer((request, response) => {
    const requestPath = decodeURIComponent(
      new URL(request.url || "/", "http://localhost").pathname,
    );
    const sitePath =
      projectBasePath && requestPath.startsWith(projectBasePath)
        ? requestPath.slice(projectBasePath.length) || "/"
        : requestPath;
    const relative = sitePath.replace(/^\/+/, "");
    let file = path.resolve(root, relative);
    if (sitePath.endsWith("/")) file = path.join(file, "index.html");
    if (!path.extname(file) && fs.existsSync(path.join(file, "index.html"))) {
      file = path.join(file, "index.html");
    }
    if (
      !file.startsWith(`${root}${path.sep}`) ||
      !fs.existsSync(file) ||
      fs.statSync(file).isDirectory()
    ) {
      file = path.join(root, "404.html");
      response.statusCode = 404;
    }
    response.setHeader(
      "Content-Type",
      types[path.extname(file).toLowerCase()] || "application/octet-stream",
    );
    response.setHeader("Cache-Control", "no-store");
    fs.createReadStream(file).pipe(response);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`静态站点预览：http://127.0.0.1:${port}${projectBasePath || "/"}`);
  });
