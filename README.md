# 程硕个人学术主页

面向国内保研、夏令营、预推免和导师联系的长期可维护双语学术主页。网站强调科研兴趣、
论文研究能力、竞赛成果和工程实践，不使用夸张的自我宣传，也不公开私人简历和默认隐藏的联系方式。

当前仓库部署地址：<https://lccs02.github.io/Shuo-Cheng/>。构建会在 GitHub Actions 中自动识别项目仓库路径；本地开发仍使用根路径 `/`。

## 技术栈

- Next.js 16 App Router、React 19、TypeScript
- Tailwind CSS 4、ESLint、Prettier
- Zod 内容校验、Vitest 单元测试、Playwright 端到端测试
- Next.js 静态导出与 GitHub Pages
- Node.js 24 LTS、npm

生产站点不需要 Node.js 服务器、数据库、API Route、Server Actions、登录系统或管理后台。
完整交付文件见 [`docs/file-manifest.md`](docs/file-manifest.md)。

## 目录结构

```text
.
├── app/                       # App Router、双语路由和 404
├── components/                # 布局、首页、科研、项目、奖项和通用组件
├── content/                   # 可维护的结构化 JSON 内容
├── docs/                      # 分析与规划
├── lib/                       # 内容加载、Zod 模型、标签和私密配置读取
├── types/                     # TypeScript 内容类型
├── public/                    # 公开图片、图标、证书和 GitHub 缓存
├── private/                   # 本地私人材料（默认被 Git 忽略）
├── scripts/                   # 校验、同步、链接与构建安全扫描
├── tools/content-studio/      # 仅本地运行的内容工作室
├── tests/                     # Vitest 与 Playwright 测试
└── .github/workflows/         # GitHub Pages 自动部署
```

## Windows 安装 Node.js

1. 打开 [Node.js 官网](https://nodejs.org/) 下载当前 LTS 安装包。
2. 安装时保留“Add to PATH”选项。
3. 重新打开 PowerShell，运行：

```powershell
node --version
npm.cmd --version
```

如果 PowerShell 禁止执行 `npm.ps1`，直接使用 `npm.cmd` 即可，无需修改系统执行策略。
本项目要求 Node.js 22 或更高，自动部署使用 Node.js 24 LTS。

## 安装、启动与检查

```powershell
cd F:\biancheng\codex\lccs02.github.io
npm.cmd install
npm.cmd run dev
```

浏览器打开 <http://localhost:3000/>。常用质量命令：

```powershell
npm.cmd run validate:content
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run format
npm.cmd run format:check
npm.cmd run test
npm.cmd run test:e2e
npm.cmd run check:links
npm.cmd run build
```

`npm run build` 会生成 `out/`，并自动扫描私人联系方式、手机号、简历文件、内容工作室和 Token。

## 修改个人信息和中英文内容

主要资料位于 `content/`：

- `profile.json`：姓名、学校、专业、简介、公开链接和最后更新时间
- `site.zh.json` / `site.en.json`：页面说明、研究计划、统计和搜索索引设置
- `navigation.json`：双语导航
- `education.json`、`experiences.json`：教育和经历时间轴
- `research-interests.json`：研究方向、介绍和关键词
- `publications.json`、`projects.json`：论文和项目
- `competitions.json`、`awards.json`：竞赛和荣誉
- `skills.json`：技能分组
- `contact.public.json`：公开联系方式显示开关

同一条内容的 `Zh` 和 `En` 字段必须分别维护。没有可靠英文译文时保留明确 TODO 并保持内容不可见，
不要把未经核对的机器翻译当作正式材料。修改后先运行：

```powershell
npm.cmd run validate:content
```

错误会包含具体文件和字段路径。

## 替换头像和图片

将真实照片替换为：

```text
public/images/profile-placeholder.jpg
```

建议使用竖向 4:5 证件照，至少 1200 × 1500 像素，文件名不变即可。当前文件是无真实身份的抽象占位图。
项目、竞赛和奖项封面建议使用 16:10，至少 1600 × 1000 像素；可使用 JPG、WebP 或 AVIF。
图片路径从 `/images/...` 开始。组件为所有图片保留固定比例，并在加载失败时显示本地 fallback，避免布局跳动。

## 新增论文

编辑 `content/publications.json`，复制一个对象并填写：

```json
{
  "id": "unique-paper-id",
  "title": "公开后的真实论文题目",
  "authors": ["Shuo Cheng", "Other Author"],
  "firstAuthor": true,
  "venue": "公开后的真实期刊或会议",
  "year": 2027,
  "status": "under_review",
  "abstractZh": "经确认的中文摘要",
  "abstractEn": "Verified English abstract",
  "paperUrl": "https://...",
  "codeUrl": "https://...",
  "bibtex": "@article{...}",
  "tags": ["Network"],
  "featured": true,
  "visible": true
}
```

状态可选 `published`、`accepted`、`under_review`、`preprint`、`in_progress`。未公开时保持
`visible: false`；链接、DOI、venue 和年份没有真实信息时直接省略，不要使用 `#`。

## 新增项目

编辑 `content/projects.json`。必须填写中英文名称、简介、个人贡献、状态、标签和显示开关。
`visible: true` 才会公开，`featured: true` 且公开时才进入首页。封面、GitHub、Demo 和报告链接均为可选字段。

## 新增奖项和竞赛

- 竞赛写入 `content/competitions.json`，个人角色和贡献必须只写本人实际完成的内容。
- 荣誉写入 `content/awards.json`，级别为 `national`、`provincial` 或 `university`。
- 不确定年份、正式全称、颁发单位时保留 TODO，不要推断。
- 证明材料可放入 `public/certificates/` 并在条目中配置路径，界面只提供“查看证明”。

公开网页无法真正阻止浏览者保存已经加载的图片或 PDF，“仅查看”只能代表界面不主动提供下载按钮，
不代表文件不可取得。

## 本地内容管理工具

```powershell
npm.cmd run content:studio
```

打开 <http://127.0.0.1:4173>。工具只监听本机，可编辑个人资料、研究兴趣、论文、项目、奖项、
竞赛和时间轴；数组条目可以在 JSON 编辑器中新增、修改或删除，也可切换 `featured` 和 `visible`。
“验证并保存”会检查 JSON、中英文字段和链接格式，再输出统一缩进的 JSON。

该工具不参与 Next.js 构建，不会进入 `out/`，没有远程登录、密码或文件上传功能。
不使用工具时，直接编辑 `content/*.json` 并运行内容校验即可。

## GitHub 项目同步

编辑 `content/github-sync.config.json` 的 `featuredRepositories` 白名单，然后运行：

```powershell
npm.cmd run sync:github
```

脚本只读取 `Lccs02` 的公开、非 fork、有描述且位于白名单中的仓库，缓存到
`public/github-cache.json`，后续构建会把缓存项目加入项目页和精选项目统计。API 失败时保留旧缓存且不让构建失败。可在本机通过普通环境变量
`GITHUB_TOKEN` 提高限额；Token 只由 Node.js 脚本读取，绝不要使用 `NEXT_PUBLIC_*` 保存秘密。

## 私密联系方式

复制示例并在本机填写：

```powershell
Copy-Item private\contact.local.example.json private\contact.local.json
```

每个字段都有 `value` 和 `visible`。默认全部为 `false`。`contact.local.json` 被 Git 忽略；
构建时只有 `visible: true` 的值会进入 HTML。静态网页中渲染过的信息都属于公开信息，
不存在“前端可见但仍保密”的设置。

## 私人简历

私人中文 PDF 可放在：

```text
private/cv-zh.pdf
```

它不会被复制到 `public` 或 `out`，也不会提交到 Git。生产页面只提供预填主题的
`mailto:` 简历申请入口。不要使用前端密码保护 PDF；硬编码到浏览器的密码没有安全性。

## 访问统计

`content/site.zh.json` 与 `site.en.json` 的 `analyticsProvider` 支持：

```text
none | google | umami
```

默认 `none`，不会加载任何统计脚本。若未来启用，应在 `components/common/Analytics.tsx`
中填写提供商的匿名化公开配置，并同步更新隐私页面；不得收集姓名、邮箱、手机号、精确位置或表单内容。

普通网站统计只能提供聚合访问数据，通常无法判断具体是哪位导师访问了网站。

## 搜索引擎索引

默认 `allowSearchIndexing: false`，页面输出 `noindex, nofollow, noarchive`，`public/robots.txt`
同时禁止抓取。未来希望索引时：

1. 将两个 `site.*.json` 中的开关改为 `true`。
2. 将 `public/robots.txt` 改为 `Allow: /`。
3. 重新构建和部署。

`robots.txt` 与 `noindex` 只是向规范搜索引擎提出请求，不能保证所有爬虫遵守。
网站只要公开部署，就无法保证完全不被访问、保存、复制或抓取，不应上传真正敏感的信息。

## 修改主题颜色

浅色和深色设计变量位于 `app/globals.css` 的 `:root` 与 `:root.dark`：

- `--paper`：背景
- `--ink`：正文
- `--muted`：次要文字
- `--line`：边框
- `--accent`：暗红强调

保持暗红只用于链接、状态和反馈，并检查两种主题的对比度。

## 创建仓库并推送

当前代码仓库为：

```text
Shuo-Cheng
```

在本项目目录执行：

```powershell
git init
git branch -M main
git add .
git commit -m "feat: build academic homepage"
git remote add origin https://github.com/Lccs02/Shuo-Cheng.git
git push -u origin main
```

推送前用 `git status` 确认 `private/contact.local.json` 和私人简历没有进入暂存区。

## GitHub Pages 与自动部署

仓库进入 `Settings → Pages`，在 `Build and deployment` 中选择 `GitHub Actions`。
推送 `main` 后，`.github/workflows/deploy.yml` 会依次执行内容校验、类型检查、ESLint、
单元测试、静态构建、安全扫描、上传 `out` 和官方 Pages 部署。也可在 Actions 页面手动运行。

`next.config.ts` 会在 GitHub Actions 中根据仓库名称自动使用 `/Shuo-Cheng` 作为 `basePath`，本地开发不添加前缀。核心静态导出配置为：

```ts
output: "export";
trailingSlash: true;
images: {
  unoptimized: true;
}
```

## 常见错误

### PowerShell 无法执行 npm

使用 `npm.cmd` 代替 `npm`。

### Zod 报必要字段缺失

根据输出的 `content/文件名` 与字段路径补充内容；可选链接没有资料时删除字段，不要填空字符串或 `#`。

### 图片 404

确认文件在 `public/` 中，JSON 路径以 `/` 开头，注意 GitHub 区分文件名大小写。

### 子页面刷新失败

确保 Pages 来源为 GitHub Actions，并保留 `trailingSlash: true` 和自动仓库路径配置。
导出目录中每个路由都有独立 `index.html`。

### 构建扫描发现敏感信息

不要绕过扫描。先搜索报告中的值，关闭私密字段、移出简历或清除环境变量误用，再重新构建。

### GitHub API 限额或网络失败

站点仍使用上一次 `public/github-cache.json`，不会依赖实时 API。稍后重新同步即可。

## 每三个月内容更新流程

1. 新建分支并备份当前内容。
2. 更新 `content/` 中真实、可公开的信息和 `lastUpdated`。
3. 替换必要图片，检查图片说明与证明材料。
4. 运行 `npm run content:studio` 或手动编辑。
5. 依次运行内容、类型、Lint、单元、链接、构建和 E2E 检查。
6. 本地浏览中英文、深浅色、桌面和移动端。
7. 检查 Git 状态，确认没有私人文件。
8. 合并到 `main`，观察 Pages 工作流完成。

## 发布前检查清单

- [ ] 所有公开成果均有事实依据，没有虚构题目、venue、年份、导师或贡献
- [ ] TODO 不会被误当成正式成果，未公开论文和项目保持 `visible: false`
- [ ] 中文和英文页面均已检查
- [ ] 头像、封面、替代文本和外部链接正确
- [ ] 私人邮箱、手机号、微信和简历不在 `git status` 与 `out/`
- [ ] 统计仍为预期状态，隐私说明同步
- [ ] 搜索索引开关和 `robots.txt` 一致
- [ ] `npm run validate:content`、`typecheck`、`lint`、`test`、`build` 全部通过
- [ ] `npm run test:e2e` 在桌面与移动视口通过
- [ ] GitHub Pages 工作流成功，根路径与子页面刷新正常
