"use client";

import { usePathname } from "next/navigation";
import { hrefFor, profile } from "@/lib/content";

export function Footer() {
  const pathname = usePathname();
  const en = pathname.startsWith("/en");
  return (
    <footer className="border-t border-[var(--line)] py-9 text-sm text-[var(--muted)]">
      <div className="shell flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {en ? profile.nameEn : profile.nameZh} ·{" "}
          {en ? "Last updated" : "最后更新"} {profile.lastUpdated}
        </p>
        <div className="flex flex-wrap gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            GitHub
          </a>
          <a
            href={`https://orcid.org/${profile.orcid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            ORCID
          </a>
          <a href={hrefFor(en ? "en" : "zh", "privacy")} className="link-underline">
            {en ? "Privacy" : "隐私说明"}
          </a>
        </div>
      </div>
    </footer>
  );
}
