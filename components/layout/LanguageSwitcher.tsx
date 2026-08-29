"use client";

import { usePathname } from "next/navigation";
import { withBasePath, withoutBasePath } from "@/lib/paths";
import type { Locale } from "@/types/content";

function languagePath(pathname: string, locale: Locale) {
  const path = withoutBasePath(pathname);
  if (locale === "zh") {
    return withBasePath(path === "/" ? "/en/" : `/en${path.endsWith("/") ? path : `${path}/`}`);
  }

  const chinesePath = path.replace(/^\/en(?=\/|$)/, "") || "/";
  return withBasePath(chinesePath.endsWith("/") ? chinesePath : `${chinesePath}/`);
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const href = languagePath(pathname, locale);
  const targetLocale = locale === "zh" ? "en" : "zh";
  const label = locale === "zh" ? "切换到英文" : "Switch to Chinese";

  function preserveSection(event: React.MouseEvent<HTMLAnchorElement>) {
    localStorage.setItem("site-locale", targetLocale);
    if (!window.location.hash) return;
    event.preventDefault();
    window.location.assign(`${href}${window.location.hash}`);
  }

  return (
    <a
      href={href}
      className="language-switcher"
      onClick={preserveSection}
      aria-label={label}
      title={label}
      hrefLang={targetLocale === "zh" ? "zh-CN" : "en"}
    >
      <span className={locale === "zh" ? "active" : ""}>中</span>
      <span aria-hidden="true">/</span>
      <span className={locale === "en" ? "active" : ""}>EN</span>
    </a>
  );
}
