"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionItems = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    let currentProgress = 0;
    let targetProgress = 0;
    let frame = 0;

    function setMotionStyles(progress: number) {
      root.style.setProperty("--hero-progress", progress.toFixed(4));
      root.style.setProperty("--hero-field-y", `${(-1.8 * progress).toFixed(3)}rem`);
      root.style.setProperty("--hero-field-scale", (1 + progress * 0.045).toFixed(4));
      root.style.setProperty("--hero-atmosphere-y", `${(2.5 * progress).toFixed(3)}rem`);
      root.style.setProperty("--hero-atmosphere-opacity", (1 - progress * 0.46).toFixed(4));
      root.style.setProperty("--hero-copy-y", `${(-3.75 * progress).toFixed(3)}rem`);
      root.style.setProperty("--hero-copy-opacity", (1 - progress * 0.72).toFixed(4));
      root.style.setProperty("--hero-portrait-y", `${(-1.65 * progress).toFixed(3)}rem`);
      root.style.setProperty("--hero-portrait-scale", (1 + progress * 0.035).toFixed(4));
    }

    function renderProgress() {
      currentProgress += (targetProgress - currentProgress) * 0.095;
      setMotionStyles(currentProgress);
      root.toggleAttribute("data-scrolled", window.scrollY > 24);

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        frame = requestAnimationFrame(renderProgress);
      }
    }

    function updateScroll() {
      targetProgress = clamp(window.scrollY / Math.max(window.innerHeight * 0.82, 1));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(renderProgress);
    }

    let revealObserver: IntersectionObserver | undefined;

    function configureMotion() {
      revealObserver?.disconnect();
      if (motionPreference.matches) {
        root.classList.remove("motion-enabled");
        setMotionStyles(0);
        motionItems.forEach((item) => item.classList.add("is-visible"));
        return;
      }

      root.classList.add("motion-enabled");
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -4%", threshold: 0.04 },
      );
      motionItems.forEach((item) => revealObserver?.observe(item));
      updateScroll();
    }

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    motionPreference.addEventListener("change", configureMotion);
    configureMotion();

    return () => {
      cancelAnimationFrame(frame);
      revealObserver?.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      motionPreference.removeEventListener("change", configureMotion);
      root.classList.remove("motion-enabled");
      root.removeAttribute("data-scrolled");
      root.style.removeProperty("--hero-progress");
      root.style.removeProperty("--hero-field-y");
      root.style.removeProperty("--hero-field-scale");
      root.style.removeProperty("--hero-atmosphere-y");
      root.style.removeProperty("--hero-atmosphere-opacity");
      root.style.removeProperty("--hero-copy-y");
      root.style.removeProperty("--hero-copy-opacity");
      root.style.removeProperty("--hero-portrait-y");
      root.style.removeProperty("--hero-portrait-scale");
    };
  }, []);

  return null;
}
