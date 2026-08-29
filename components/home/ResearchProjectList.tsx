import { ProjectCard } from "@/components/projects/ProjectComponents";
import type { Project } from "@/types/content";

export function ResearchProjectList({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" className="home-section academic-shell" aria-labelledby="projects-title">
      <header className="home-section-header">
        <h2 id="projects-title">Selected Research Projects</h2>
      </header>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale="en" />
        ))}
      </div>
    </section>
  );
}
