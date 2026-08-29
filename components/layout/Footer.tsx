import { profile } from "@/lib/content";

const updated = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${profile.lastUpdated}T00:00:00Z`));

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="academic-shell footer-inner">
        <p>© {new Date().getFullYear()} Shuo Cheng</p>
        <nav aria-label="Footer links">
          <a href={`mailto:${profile.schoolEmail}`}>Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {profile.scholarUrl && (
            <a href={profile.scholarUrl} target="_blank" rel="noopener noreferrer">
              Scholar
            </a>
          )}
        </nav>
        <p>Last updated: {updated}</p>
      </div>
    </footer>
  );
}
