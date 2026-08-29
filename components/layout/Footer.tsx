"use client";

import { usePathname } from "next/navigation";
import { profile } from "@/lib/content";
import { withoutBasePath } from "@/lib/paths";

export function Footer() {
  const locale = withoutBasePath(usePathname()).startsWith("/en") ? "en" : "zh";
  const updated = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    month: locale === "zh" ? "2-digit" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${profile.lastUpdated}T00:00:00Z`));

  return (
    <footer className="site-footer">
      <div className="academic-shell footer-inner">
        <p>© {new Date().getFullYear()} Shuo Cheng</p>
        <nav aria-label={locale === "zh" ? "页脚链接" : "Footer links"}>
          <a href={`mailto:${profile.schoolEmail}`}>{locale === "zh" ? "邮箱" : "Email"}</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {profile.scholarUrl && (
            <a href={profile.scholarUrl} target="_blank" rel="noopener noreferrer">
              Scholar
            </a>
          )}
        </nav>
        <p>{locale === "zh" ? `最后更新：${updated}` : `Last updated: ${updated}`}</p>
      </div>
    </footer>
  );
}
