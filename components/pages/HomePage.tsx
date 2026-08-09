import { ArrowRight, Mail } from "lucide-react";
import { AwardItem, EducationTimeline } from "@/components/awards/TimelineComponents";
import { DocumentLanguage } from "@/components/common/DocumentLanguage";
import { EmptyState, SectionHeading } from "@/components/common/Primitives";
import { Hero } from "@/components/home/Hero";
import { CompetitionCard, ProjectCard } from "@/components/projects/ProjectComponents";
import { PublicationCard, ResearchInterestCard } from "@/components/research/ResearchComponents";
import {
  awards,
  competitions,
  education,
  getGithubProjects,
  getVisibleStats,
  hrefFor,
  interests,
  profile,
  projects,
  publications,
  sites,
} from "@/lib/content";
import { labels } from "@/lib/labels";
import type { Locale } from "@/types/content";

function MoreLink({ locale, path }: { locale: Locale; path: string }) {
  return (
    <a
      href={hrefFor(locale, path)}
      className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--accent)]"
    >
      {labels(locale).all}
      <ArrowRight size={14} aria-hidden />
    </a>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = labels(locale);
  const visiblePapers = publications.filter((item) => item.visible && item.featured);
  const featuredProjects = [
    ...projects.filter((item) => item.visible && item.featured),
    ...getGithubProjects(),
  ];
  const featuredCompetitions = competitions.filter((item) => item.featured);
  const featuredAwards = awards.filter((item) => item.featured);
  const stats = getVisibleStats();
  const statisticItems = [
    { value: stats.published, zh: "已发表论文", en: "Published papers" },
    { value: stats.underReview, zh: "投稿中论文", en: "Papers under review" },
    { value: stats.national, zh: "国家级奖项", en: "National awards" },
    { value: stats.provincial, zh: "省级奖项", en: "Provincial awards" },
    { value: stats.selectedProjects, zh: "精选项目", en: "Selected projects" },
  ].filter((item) => item.value > 0);

  return (
    <main id="main-content">
      <DocumentLanguage locale={locale} />
      <Hero locale={locale} />
      <section className="section shell section-grid">
        <SectionHeading
          eyebrow={locale === "zh" ? "Research focus" : "Research focus"}
          title={locale === "zh" ? "研究兴趣" : "Research Interests"}
          description={sites[locale].researchStatement}
        />
        <div>
          {interests.map((item, index) => (
            <ResearchInterestCard key={item.id} item={item} locale={locale} index={index} />
          ))}
        </div>
      </section>
      {statisticItems.length > 0 && (
        <section
          aria-label={locale === "zh" ? "成果统计" : "Achievement statistics"}
          className="border-t border-[var(--line)] bg-[var(--paper-deep)]"
        >
          <div className="shell grid grid-cols-2 divide-x divide-[var(--line)] md:grid-cols-4">
            {statisticItems.map((item) => (
              <div key={item.zh} className="px-5 py-8 first:pl-0">
                <strong className="text-4xl font-normal text-[var(--accent)]">{item.value}</strong>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {locale === "zh" ? item.zh : item.en}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="section shell section-grid">
        <div>
          <SectionHeading eyebrow="Publications" title={t.selectedResearch} />
          <MoreLink locale={locale} path="research" />
        </div>
        <div>
          {visiblePapers.length ? (
            visiblePapers.map((item) => (
              <PublicationCard key={item.id} publication={item} locale={locale} />
            ))
          ) : (
            <EmptyState
              title={t.emptyPublications}
              description={
                locale === "zh"
                  ? "三篇第一作者投稿中论文已在内容文件中保留为不可见 TODO，公开信息确认后即可启用。"
                  : "Three first-author submissions are stored as hidden TODO entries and can be enabled after public details are confirmed."
              }
            />
          )}
        </div>
      </section>
      <section className="section shell section-grid">
        <div>
          <SectionHeading eyebrow="Competitions" title={t.competitions} />
          <MoreLink locale={locale} path="competitions" />
        </div>
        <div>
          {featuredCompetitions.map((item) => (
            <CompetitionCard key={item.id} competition={item} locale={locale} />
          ))}
        </div>
      </section>
      <section className="section shell section-grid">
        <div>
          <SectionHeading eyebrow="Honors" title={t.awards} />
          <MoreLink locale={locale} path="awards" />
        </div>
        <div>
          {featuredAwards.map((item) => (
            <AwardItem key={item.id} award={item} locale={locale} />
          ))}
        </div>
      </section>
      <section className="section shell section-grid">
        <div>
          <SectionHeading eyebrow="Timeline" title={t.timeline} />
          <MoreLink locale={locale} path="experience" />
        </div>
        <EducationTimeline items={education} locale={locale} />
      </section>
      <section className="section shell section-grid">
        <div>
          <SectionHeading eyebrow="Engineering" title={t.projects} />
          <MoreLink locale={locale} path="projects" />
        </div>
        <div>
          {featuredProjects.length ? (
            featuredProjects.map((item) => (
              <ProjectCard key={item.id} project={item} locale={locale} />
            ))
          ) : (
            <EmptyState
              title={t.emptyProjects}
              description={
                locale === "zh"
                  ? "已准备完整项目数据结构；补充真实材料并将 visible 与 featured 设为 true 后会自动展示。"
                  : "The project schema is ready. Add verified materials and enable visible and featured to publish an entry."
              }
            />
          )}
        </div>
      </section>
      <section className="border-t border-[var(--line)] bg-[var(--ink)] py-16 text-[var(--paper)]">
        <div className="shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">{locale === "zh" ? "联系方式" : "Contact"}</p>
            <h2 className="mt-4 max-w-3xl text-3xl leading-snug sm:text-5xl">
              {locale === "zh"
                ? "研究信息、公开材料与联系方式集中于此。"
                : "Research details, public materials, and contact information in one place."}
            </h2>
          </div>
          <a
            href={`mailto:${profile.schoolEmail}`}
            className="inline-flex items-center gap-2 border-b border-[var(--accent)] pb-2 text-[var(--accent)]"
          >
            <Mail size={17} aria-hidden />
            {profile.schoolEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
