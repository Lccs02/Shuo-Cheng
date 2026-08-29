"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  getGithubProjects,
  hrefFor,
  navigation,
  profile,
  projects,
  publications,
  researchExperiences,
  researchTopics,
} from "@/lib/content";
import { withBasePath, withoutBasePath } from "@/lib/paths";
import type { Locale } from "@/types/content";
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
]);

const visibleNavigation = navigation.filter((item) => visibleSections.has(item.path));

function NavigationLinks({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }) {
  return (
    <>
      {visibleNavigation.map((item) => (
        <li key={item.path}>
          <a className="nav-link" href={itemHref(locale, item.path)} onClick={onNavigate}>
            {item.en}
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
    <nav aria-label="Primary navigation" className="desktop-navigation">
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
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-menu">
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
        <a href={hrefFor(locale)} className="site-name" aria-label="Shuo Cheng home">
          {profile.nameEn}
        </a>
        <div className="header-actions">
          <DesktopNavigation locale={locale} />
          <ThemeSwitcher locale="en" />
          <MobileNavigation locale={locale} />
        </div>
      </div>
    </header>
  );
}
