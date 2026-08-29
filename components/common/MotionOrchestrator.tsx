"use client";

import { useEffect } from "react";

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionItems = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    let revealObserver: IntersectionObserver | undefined;

    function configureMotion() {
      revealObserver?.disconnect();
      if (motionPreference.matches) {
        root.classList.remove("motion-enabled");
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
    }

    motionPreference.addEventListener("change", configureMotion);
    configureMotion();

    return () => {
      revealObserver?.disconnect();
      motionPreference.removeEventListener("change", configureMotion);
      root.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
