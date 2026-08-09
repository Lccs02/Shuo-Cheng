import { ExternalLinkIcon } from "lucide-react";
import type { ReactNode } from "react";
import { withBasePath } from "@/lib/paths";

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={withBasePath(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-[var(--accent)] ${className}`}
    >
      {children}
      <ExternalLinkIcon size={13} aria-hidden />
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-[1.75rem] font-normal leading-tight sm:text-[2.1rem]">{title}</h2>
      {description && <p className="prose-copy mt-4 max-w-2xl">{description}</p>}
    </header>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-l-2 border-[var(--accent)] bg-[var(--paper-deep)] px-5 py-5">
      <p className="text-[1.05rem]">{title}</p>
      {description && (
        <p className="mt-1.5 text-[0.9rem] leading-6 text-[var(--muted)]">{description}</p>
      )}
    </div>
  );
}

export function SkillTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[0.76rem] text-[var(--muted)]">
      {children}
    </span>
  );
}

export function PrivacyNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="border border-[var(--line)] bg-[var(--paper-deep)] p-5 text-[0.9rem] leading-6 text-[var(--muted)]">
      {children}
    </aside>
  );
}
