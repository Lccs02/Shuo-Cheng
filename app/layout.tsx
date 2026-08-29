import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@/components/common/Analytics";
import { BackToTop } from "@/components/common/BackToTop";
import { MotionOrchestrator } from "@/components/common/MotionOrchestrator";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeInitializer } from "@/components/layout/ThemeSwitcher";
import { profile, sites } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lccs02.github.io"),
  title: { default: sites.zh.siteTitle, template: `%s | ${profile.nameEn}` },
  description: sites.zh.siteDescription,
  authors: [{ name: profile.nameEn, url: profile.github }],
  alternates: {
    canonical: "/Shuo-Cheng/",
    languages: {
      "zh-CN": "/Shuo-Cheng/",
      en: "/Shuo-Cheng/en/",
    },
  },
  openGraph: {
    type: "website",
    url: "/Shuo-Cheng/",
    title: sites.en.siteTitle,
    description: sites.en.siteDescription,
    siteName: sites.en.siteTitle,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  robots: sites.zh.allowSearchIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  icons: { icon: withBasePath("/favicon/favicon.svg") },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b111b" },
  ],
};

const themeScript = `(() => { try { const saved = localStorage.getItem("theme"); const dark = saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.classList.toggle("dark", dark); } catch {} })();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body>
        <ThemeInitializer />
        <MotionOrchestrator />
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-20 bg-[var(--ink)] px-4 py-2 text-[var(--paper)] focus:translate-y-0"
        >
          跳到正文 / Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
