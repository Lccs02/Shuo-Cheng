"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  getGithubProjects,
  hrefFor,
  navigation,
  news,
  profile,
  projects,
  publications,
  researchExperiences,
  researchTopics,
} from "@/lib/content";
import { withBasePath, withoutBasePath } from "@/lib/paths";
import type { Locale } from "@/types/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

function useRouteLocale(): Locale {
  const pathname = withoutBasePath(usePathname());
  return pathname.startsWith("/en") ? "en" : "zh";
}

function itemHref(locale: Locale, path: string) {
  return `${hrefFor(locale)}#${path}`;
}

const visibleSections = new Set([
  ...(researchTopics.some((item) => item.visible) ? ["research"] : []),
  ...(publications.some((item) => item.visible && item.selected) ? ["publications"] : []),
  ...(researchExperiences.some((item) => item.visible) ? ["experience"] : []),
  ...(projects.some((item) => item.visible && item.selected) || getGithubProjects().length
    ? ["projects"]
    : []),
  ...(news.some((item) => item.visible) ? ["news"] : []),
]);

const visibleNavigation = navigation.filter((item) => visibleSections.has(item.path));

function NavigationLinks({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }) {
  return (
    <>
      {visibleNavigation.map((item) => (
        <li key={item.path}>
          <a className="nav-link" href={itemHref(locale, item.path)} onClick={onNavigate}>
            {locale === "zh" ? item.zh : item.en}
          </a>
        </li>
      ))}
      {profile.cvUrl && (
        <li>
          <a className="nav-link" href={withBasePath(profile.cvUrl)} onClick={onNavigate}>
            CV
          </a>
        </li>
      )}
    </>
  );
}

export function DesktopNavigation({ locale }: { locale: Locale }) {
  return (
    <nav
      aria-label={locale === "zh" ? "主导航" : "Primary navigation"}
      className="desktop-navigation"
    >
      <ul>
        <NavigationLinks locale={locale} />
      </ul>
    </nav>
  );
}

export function MobileNavigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-navigation">
      <button
        type="button"
        className="menu-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={
          locale === "zh" ? (open ? "关闭菜单" : "打开菜单") : open ? "Close menu" : "Open menu"
        }
      >
        {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label={locale === "zh" ? "移动端导航" : "Mobile navigation"}
          className="mobile-menu"
        >
          <ul>
            <NavigationLinks locale={locale} onNavigate={() => setOpen(false)} />
          </ul>
        </nav>
      )}
    </div>
  );
}

export function Header() {
  const locale = useRouteLocale();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a
          href={hrefFor(locale)}
          className="site-name"
          aria-label={locale === "zh" ? "程硕学术主页" : "Shuo Cheng home"}
        >
          <span>{locale === "zh" ? profile.nameZh : profile.nameEn}</span>
          <small>{locale === "zh" ? "个人学术主页" : "Academic Homepage"}</small>
        </a>
        <div className="header-actions">
          <DesktopNavigation locale={locale} />
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher locale={locale} />
          <MobileNavigation locale={locale} />
        </div>
      </div>
    </header>
  );
}
