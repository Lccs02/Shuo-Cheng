"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/types/content";

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
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
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
