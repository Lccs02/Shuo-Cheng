"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import type { Locale } from "@/types/content";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeInitializer() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark =
      saved === "dark" ||
      (saved !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  }, []);
  return null;
}

export function ThemeSwitcher({ locale }: { locale: Locale }) {
  // 服务端快照固定为浅色图标；水合后再同步初始化脚本设置的真实主题。
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  }

  const label =
    locale === "zh"
      ? dark
        ? "切换到浅色模式"
        : "切换到深色模式"
      : dark
        ? "Switch to light mode"
        : "Switch to dark mode";
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={toggle}
      className="grid size-10 place-items-center rounded-full"
      aria-label={label}
      title={label}
    >
      {dark ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
    </button>
  );
}
