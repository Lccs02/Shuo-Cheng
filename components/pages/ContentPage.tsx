import { Code2, Mail, MapPin } from "lucide-react";
import {
  AwardItem,
  EducationTimeline,
  ExperienceTimeline,
} from "@/components/awards/TimelineComponents";
import { DocumentLanguage } from "@/components/common/DocumentLanguage";
import {
  EmptyState,
  ExternalLink,
  PrivacyNotice,
  SectionHeading,
  SkillTag,
} from "@/components/common/Primitives";
import { CompetitionCard, ProjectCard } from "@/components/projects/ProjectComponents";
import { PublicationCard, ResearchInterestCard } from "@/components/research/ResearchComponents";
import {
  awards,
  competitions,
  education,
  experiences,
  getGithubProjects,
  interests,
  profile,
  projects,
  publications,
  publicContact,
  skills,
  sites,
} from "@/lib/content";
import { getVisiblePrivateContact } from "@/lib/private-contact";
import type { Locale } from "@/types/content";

export const pageSections = [
  "about",
  "research",
  "projects",
  "competitions",
  "awards",
  "experience",
  "contact",
  "privacy",
] as const;
type PageSection = (typeof pageSections)[number];

const pageTitles: Record<PageSection, { zh: string; en: string; eyebrow: string }> = {
  about: { zh: "关于我", en: "About", eyebrow: "Profile" },
  research: { zh: "科研", en: "Research", eyebrow: "Research" },
  projects: { zh: "工程项目", en: "Projects", eyebrow: "Engineering" },
  competitions: { zh: "竞赛经历", en: "Competitions", eyebrow: "Competitions" },
  awards: { zh: "荣誉奖项", en: "Awards", eyebrow: "Honors" },
  experience: { zh: "其他经历", en: "Experience", eyebrow: "Timeline" },
  contact: { zh: "联系方式", en: "Contact", eyebrow: "Contact" },
  privacy: { zh: "隐私说明", en: "Privacy Notice", eyebrow: "Privacy" },
};

function PageIntro({ locale, section }: { locale: Locale; section: PageSection }) {
  const title = pageTitles[section];
  return (
    <header className="mb-10 border-b border-[var(--line)] pb-7">
      <p className="eyebrow">{title.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-normal leading-tight sm:text-[3.4rem]">{title[locale]}</h1>
    </header>
  );
}

function About({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="section-grid">
        <SectionHeading title={locale === "zh" ? "学术简介" : "Academic Profile"} />
        <div>
          <p className="prose-copy">{locale === "zh" ? profile.bioZh : profile.bioEn}</p>
          <p className="prose-copy mt-3">
            {locale === "zh"
              ? "目前以课程学习、论文研究与工程实践为基础，持续训练问题建模、实验设计、数据分析、模型复现与学术写作能力。"
              : "Current work combines coursework, paper research, and engineering practice, with continued training in problem formulation, experimental design, data analysis, model reproduction, and academic writing."}
          </p>
        </div>
      </section>
      <section className="section section-grid">
        <SectionHeading title={locale === "zh" ? "教育背景" : "Education"} />
        <EducationTimeline items={education} locale={locale} />
      </section>
      <section className="section section-grid">
        <SectionHeading title={locale === "zh" ? "研究兴趣" : "Research Interests"} />
        <div className="grid gap-x-8 md:grid-cols-2">
          {interests.map((item, index) => (
            <ResearchInterestCard key={item.id} item={item} locale={locale} index={index} />
          ))}
        </div>
      </section>
      <section className="section section-grid">
        <SectionHeading title={locale === "zh" ? "技能与工具" : "Skills & Tools"} />
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.categoryZh}>
              <h3 className="mb-2 text-[1.05rem]">
                {locale === "zh" ? group.categoryZh : group.categoryEn}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillTag key={item}>{item}</SkillTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Research({ locale }: { locale: Locale }) {
  const visible = publications.filter((item) => item.visible);
  return (
    <>
      <section className="section-grid">
        <SectionHeading
          title={locale === "zh" ? "研究兴趣" : "Research Interests"}
          description={sites[locale].researchStatement}
        />
        <div className="grid gap-x-8 md:grid-cols-2">
          {interests.map((item, index) => (
            <ResearchInterestCard key={item.id} item={item} locale={locale} index={index} />
          ))}
        </div>
      </section>
      <section className="section section-grid">
        <SectionHeading title={locale === "zh" ? "论文成果" : "Publications"} />
        <div>
          {visible.length ? (
            visible.map((item) => (
              <PublicationCard key={item.id} publication={item} locale={locale} />
            ))
          ) : (
            <EmptyState
              title={
                locale === "zh"
                  ? "论文信息将在公开后更新。"
                  : "Publication details will be updated when public."
              }
              description={
                locale === "zh"
                  ? "当前三篇投稿中论文均为第一作者；为避免泄露未公开信息，题目、投稿 venue 和链接未在页面展示。"
                  : "Three first-author manuscripts are currently under review. Titles, venues, and links remain hidden until disclosure is appropriate."
              }
            />
          )}
        </div>
      </section>
      <section className="section section-grid">
        <SectionHeading
          title={locale === "zh" ? "在研内容与未来计划" : "Current & Future Directions"}
        />
        <ol className="grid gap-4 sm:grid-cols-2">
          {sites[locale].futurePlans.map((item, index) => (
            <li key={item} className="border-t border-[var(--line)] py-4">
              <span className="text-xs text-[var(--accent)]">0{index + 1}</span>
              <p className="mt-2 text-[1.05rem] leading-7">{item}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section section-grid">
        <SectionHeading
          title={locale === "zh" ? "希望进一步研究的问题" : "Questions for Further Study"}
        />
        <ul className="space-y-3">
          {sites[locale].furtherQuestions.map((item) => (
            <li
              key={item}
              className="border-l border-[var(--accent)] pl-4 text-[1.05rem] leading-7"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Projects({ locale }: { locale: Locale }) {
  const visible = [...projects.filter((item) => item.visible), ...getGithubProjects()];
  return visible.length ? (
    <div>
      {visible.map((item) => (
        <ProjectCard key={item.id} project={item} locale={locale} />
      ))}
    </div>
  ) : (
    <EmptyState
      title={locale === "zh" ? "项目内容正在整理中。" : "Project materials are being organized."}
      description={
        locale === "zh"
          ? "不会以虚构示例替代真实项目；可在 content/projects.json 中补充后启用。"
          : "Placeholder projects are not shown as real work. Add verified entries in content/projects.json when ready."
      }
    />
  );
}

function Competitions({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-x-10 md:grid-cols-2">
      {competitions.map((item) => (
        <CompetitionCard key={item.id} competition={item} locale={locale} />
      ))}
    </div>
  );
}

function Awards({ locale }: { locale: Locale }) {
  const levels = ["national", "provincial", "university"] as const;
  const names = {
    national: { zh: "国家级", en: "National" },
    provincial: { zh: "省级", en: "Provincial" },
    university: { zh: "校级", en: "University" },
  };
  return (
    <div className="space-y-10">
      {levels.map((level) => {
        const items = awards
          .filter((item) => item.level === level)
          .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        if (!items.length) return null;
        return (
          <section key={level}>
            <h2 className="mb-3 text-2xl">{names[level][locale]}</h2>
            <div className="grid gap-x-10 md:grid-cols-2">
              {items.map((item) => (
                <AwardItem key={item.id} award={item} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Experience({ locale }: { locale: Locale }) {
  const visible = experiences.filter((item) => item.visible);
  return visible.length ? (
    <ExperienceTimeline items={visible} locale={locale} />
  ) : (
    <EmptyState
      title={locale === "zh" ? "经历内容正在整理中。" : "Experience details are being organized."}
    />
  );
}

function Contact({ locale }: { locale: Locale }) {
  const privateContact = getVisiblePrivateContact();
  const subject = encodeURIComponent(
    locale === "zh" ? publicContact.cvRequestSubjectZh : publicContact.cvRequestSubjectEn,
  );
  return (
    <div className="grid gap-9 md:grid-cols-[1.15fr_.85fr]">
      <div>
        <p className="prose-copy">
          {locale === "zh"
            ? "如需联系或申请查看个人简历，请优先使用学校邮箱。本站不设置联系表单，也不收集访客填写内容。"
            : "Please use the university email for correspondence or to request a CV. This site has no contact form and does not collect visitor submissions."}
        </p>
        <dl className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {publicContact.contactVisibility.schoolEmail && (
            <div>
              <dt className="text-sm text-[var(--muted)]">
                {locale === "zh" ? "学校邮箱" : "University email"}
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${profile.schoolEmail}`}
                  className="inline-flex items-center gap-2 text-[var(--accent)]"
                >
                  <Mail size={17} aria-hidden />
                  {profile.schoolEmail}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-[var(--muted)]">GitHub</dt>
            <dd className="mt-1">
              <ExternalLink href={profile.github}>
                <Code2 size={17} aria-hidden />
                Lccs02
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-[var(--muted)]">ORCID</dt>
            <dd className="mt-1">
              <ExternalLink href={`https://orcid.org/${profile.orcid}`}>
                {profile.orcid}
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-[var(--muted)]">
              {locale === "zh" ? "所在地" : "Location"}
            </dt>
            <dd className="mt-1 inline-flex items-center gap-2">
              <MapPin size={17} aria-hidden />
              {locale === "zh" ? publicContact.locationZh : publicContact.locationEn}
            </dd>
          </div>
          {privateContact.personalEmail && (
            <div>
              <dt>{locale === "zh" ? "个人邮箱" : "Personal email"}</dt>
              <dd>
                <a href={`mailto:${privateContact.personalEmail}`}>
                  {privateContact.personalEmail}
                </a>
              </dd>
            </div>
          )}
          {privateContact.phone && (
            <div>
              <dt>{locale === "zh" ? "电话" : "Phone"}</dt>
              <dd>{privateContact.phone}</dd>
            </div>
          )}
          {privateContact.wechat && (
            <div>
              <dt>{locale === "zh" ? "微信" : "WeChat"}</dt>
              <dd>{privateContact.wechat}</dd>
            </div>
          )}
        </dl>
        <a
          href={`mailto:${profile.schoolEmail}?subject=${subject}`}
          className="mt-8 inline-flex border border-[var(--accent)] px-4 py-2.5 text-[0.92rem] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--paper)]"
        >
          {locale === "zh" ? "邮件申请简历" : "Request CV by email"}
        </a>
      </div>
      <PrivacyNotice>
        {locale === "zh"
          ? "私人邮箱、手机号和微信默认不进入网站。若在本地配置中主动开启，它们会成为公开静态页面的一部分，无法通过前端代码真正保密。"
          : "Personal email, phone, and WeChat are excluded by default. If explicitly enabled in local configuration, they become part of a public static page and cannot be kept secret by frontend code."}
      </PrivacyNotice>
    </div>
  );
}

function Privacy({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const sections = zh
    ? [
        [
          "公开信息",
          "本站公开姓名、学校、学院、专业、研究兴趣、经确认的成果、学校邮箱、GitHub、ORCID 与所在地。",
        ],
        [
          "默认隐藏的信息",
          "个人邮箱、手机号、微信号和私人简历默认不部署。只有站点所有者主动开启后才会公开。",
        ],
        [
          "访问统计",
          "统计默认关闭。未来如启用，只收集聚合访问数据，不收集姓名、邮箱、手机号、精确位置或表单内容。普通网站统计通常无法判断具体是哪位导师访问。",
        ],
        [
          "搜索与抓取",
          "本站默认使用 noindex、nofollow、noarchive，并通过 robots.txt 请求禁止抓取；这些请求不能保证所有爬虫遵守。公开网页可能被访问、保存、复制或抓取。",
        ],
        ["第三方链接", "GitHub、ORCID 等链接会跳转到第三方网站，并受其隐私政策约束。"],
        [
          "联系方式用途",
          "公开联系方式仅用于学术交流、升学联系与材料申请，请勿用于营销或无关用途。",
        ],
        ["更新与删除", `如需更正或删除本站信息，请通过学校邮箱 ${profile.schoolEmail} 联系。`],
      ]
    : [
        [
          "Public information",
          "This site publishes the name, university, school, major, research interests, verified achievements, university email, GitHub, ORCID, and location.",
        ],
        [
          "Hidden by default",
          "Personal email, phone, WeChat, and the private CV are not deployed unless explicitly enabled by the site owner.",
        ],
        [
          "Analytics",
          "Analytics is disabled by default. If enabled later, it will only collect aggregate traffic data, not names, email addresses, phone numbers, precise location, or form content. Ordinary analytics usually cannot identify a specific advisor.",
        ],
        [
          "Search and crawling",
          "The site requests noindex, nofollow, noarchive and disallows crawling in robots.txt. These requests cannot ensure every crawler complies. Public pages may be accessed, saved, copied, or scraped.",
        ],
        [
          "External links",
          "GitHub and ORCID links open third-party sites governed by their own privacy policies.",
        ],
        [
          "Use of contact details",
          "Public contact information is intended for academic and admissions-related correspondence, not marketing.",
        ],
        [
          "Updates and removal",
          `Contact ${profile.schoolEmail} to request a correction or removal.`,
        ],
      ];
  return (
    <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
      {sections.map(([title, body]) => (
        <section key={title} className="border-t border-[var(--line)] pt-4">
          <h2 className="text-xl">{title}</h2>
          <p className="mt-2 text-[0.95rem] leading-7 text-[var(--muted)]">{body}</p>
        </section>
      ))}
    </div>
  );
}

export function ContentPage({ locale, section }: { locale: Locale; section: PageSection }) {
  const content = {
    about: <About locale={locale} />,
    research: <Research locale={locale} />,
    projects: <Projects locale={locale} />,
    competitions: <Competitions locale={locale} />,
    awards: <Awards locale={locale} />,
    experience: <Experience locale={locale} />,
    contact: <Contact locale={locale} />,
    privacy: <Privacy locale={locale} />,
  }[section];
  return (
    <main id="main-content" className="shell page-shell">
      <DocumentLanguage locale={locale} />
      <PageIntro locale={locale} section={section} />
      {content}
    </main>
  );
}
