# 学术主页重构：分析与实施规划

## 当前问题

- 信息架构：旧首页按作品集与 Landing Page 方式平铺模块，科研、竞赛、项目之间缺少明确优先级。
- 科研叙事：五个平级兴趣词无法解释研究问题如何从网络动态建模发展到智能决策。
- Hero：装饰和概念图占据过多注意力，身份、机构与研究定位没有形成稳定的学术层级。
- 成果模块：空论文、空项目或维护提示会稀释真实信息；奖项视觉权重偏高。
- UI：卡片、标签、动效和多套强调色带来作品集模板感，不利于导师快速扫描。
- 响应式：复杂装饰在窄屏增加阅读负担，长标题与研究阶段需要独立的流式布局。

## 内容迁移

- `research interests` → `Research Journey`，统一为 Understanding → Representation → Decision。
- `publications` → `Selected Publications`，仅显示 `visible && selected` 的真实条目。
- `research-experiences` → `Research Experience`，没有真实实验室、导师或经历时整段隐藏。
- `projects` 与精选 GitHub 缓存 → `Selected Research Projects`，仅展示与研究主线相关的公开项目。
- `competitions` 与 `awards` → 首页统一的 `Selected Awards & Honors`，最多四项，不生成统计数字。
- `education` → 学术 CV 式教育列表；`news` 按日期倒序最多五项。

## 首页结构

```text
Home
├── Navbar
├── Hero
├── ResearchJourney
├── PublicationList
├── ResearchExperience
├── ResearchProjectList
├── Awards
├── Education
├── News
└── Footer
```

空数组、不可见内容和缺少必要字段的条目不生成公开模块，也不显示 TODO、Coming Soon 或空状态。

## 视觉系统

- 视觉主张：英文优先、学术简历式排版，以研究主线作为首页的主要视觉与内容线索。
- 字体：Inter 与系统无衬线字体栈，中英文均提供跨平台 fallback。
- 色彩：恢复 2026 年 8 月 9 日版的矿物纸张、暗红索引与青绿信号色；深色模式使用深青黑背景。
- 布局：宽屏左右首屏配合双栏学术内容区，以细分隔线和紧凑文字层级组织信息。
- 动效：卫星与多智能体轨道 Canvas 作为主要动态线索，区块采用快速、无模糊的轻微上移动效。
- 头像：只有配置真实照片时启用桌面 65/35 Hero；AI 研究概念图仅放在独立 Research 页面并明确非本人肖像。

## 技术与隐私

- 保留 Next.js App Router、TypeScript、Tailwind CSS 与完全静态导出。
- 根路径使用英文首页和 `lang="en"`；中文独立内容页在导出后写入 `lang="zh-CN"`。
- JSON 内容由 Zod 在构建前验证；首页组件不写死可维护的个人成果数据。
- 私密联系方式和简历仍位于 Git 忽略的本地配置，构建扫描阻止其进入 `out`。
- 统计与搜索索引默认关闭；公开部署仍不能阻止内容被访问、保存或抓取。

## 验证计划

依次执行格式化、内容校验、TypeScript、ESLint、Vitest、静态构建、安全扫描、链接检查和 Playwright。
浏览器检查覆盖 375、768、1024、1440 像素，验证导航、主题、语言、404、无横向溢出和控制台错误。
