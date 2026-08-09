"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hrefFor, navigation, profile } from "@/lib/content";
import { withoutBasePath } from "@/lib/paths";
import type { Locale } from "@/types/content";
import { ThemeSwitcher } from "./ThemeSwitcher";

function useLocale() {
  const pathname = withoutBasePath(usePathname());
  return pathname.startsWith("/en") ? "en" : "zh";
}

function itemHref(locale: Locale, path: string) {
  return hrefFor(locale, path);
}

export function DesktopNavigation({ locale }: { locale: Locale }) {
  const pathname = withoutBasePath(usePathname());
  return (
    <nav aria-label={locale === "zh" ? "主导航" : "Primary navigation"} className="hidden lg:block">
      <ul className="flex items-center gap-5 text-[0.78rem]">
        {navigation.map((item) => {
          const href = itemHref(locale, item.path);
          const routePath = withoutBasePath(href);
          const active = pathname === routePath.slice(0, -1) || pathname === routePath;
          return (
            <li key={item.path}>
              <a
                className="link-underline py-2"
                aria-current={active ? "page" : undefined}
                href={href}
              >
                {item[locale]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = withoutBasePath(usePathname());
  const currentSection = pathname.replace(/^\/en(?=\/|$)/, "").replace(/^\/+|\/+$/g, "");
  return (
    <a
      href={hrefFor(locale === "zh" ? "en" : "zh", currentSection)}
      lang={locale === "zh" ? "en" : "zh-CN"}
      hrefLang={locale === "zh" ? "en" : "zh-CN"}
      className="rounded-sm px-2 py-2 text-xs font-bold tracking-[0.12em] text-[var(--accent)]"
      aria-label={locale === "zh" ? "切换到英文" : "Switch to Chinese"}
      title={locale === "zh" ? "English" : "中文"}
    >
      {locale === "zh" ? "EN" : "中文"}
    </a>
  );
}

export function MobileNavigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="grid size-10 place-items-center"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={
          open
            ? locale === "zh"
              ? "关闭菜单"
              : "Close menu"
            : locale === "zh"
              ? "打开菜单"
              : "Open menu"
        }
      >
        {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label={locale === "zh" ? "移动导航" : "Mobile navigation"}
          className="absolute inset-x-0 top-full border-b border-[var(--line)] bg-[var(--paper)] px-6 py-5 shadow-lg"
        >
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {navigation.map((item) => (
              <li key={item.path}>
                <a
                  href={itemHref(locale, item.path)}
                  onClick={() => setOpen(false)}
                  className="block py-1"
                >
                  {item[locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export function Header() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--header)] backdrop-blur-md">
      <div className="shell flex h-[4.75rem] items-center justify-between gap-5">
        <a
          href={hrefFor(locale)}
          className="flex items-baseline gap-3"
          aria-label={locale === "zh" ? "程硕首页" : "Shuo Cheng home"}
        >
          <span className="text-xl font-bold">
            {locale === "zh" ? profile.nameZh : profile.nameEn}
          </span>
          <span className="hidden text-[0.68rem] tracking-[0.16em] text-[var(--muted)] sm:inline">
            ACADEMIC HOMEPAGE
          </span>
        </a>
        <div className="flex items-center gap-1">
          <DesktopNavigation locale={locale} />
          <span className="mx-2 hidden h-5 w-px bg-[var(--line)] lg:block" />
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher locale={locale} />
          <MobileNavigation locale={locale} />
        </div>
      </div>
    </header>
  );
}
