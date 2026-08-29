import { ProjectCard } from "@/components/projects/ProjectComponents";
import type { Locale, Project } from "@/types/content";

export function ResearchProjectList({ projects, locale }: { projects: Project[]; locale: Locale }) {
  if (!projects.length) return null;

  return (
    <section
      id="projects"
      className="home-section home-section-grid academic-shell"
      aria-labelledby="projects-title"
      data-motion
    >
      <header className="home-section-header">
        <p className="eyebrow">{locale === "zh" ? "研究系统" : "Research systems"}</p>
        <h2 id="projects-title">
          {locale === "zh" ? "精选科研项目" : "Selected Research Projects"}
        </h2>
      </header>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
