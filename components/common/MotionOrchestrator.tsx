"use client";

import { useEffect } from "react";

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    let observer: IntersectionObserver | undefined;

    function configure() {
      observer?.disconnect();
      if (reducedMotion.matches) {
        root.classList.remove("motion-enabled");
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      root.classList.add("motion-enabled");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -2%", threshold: 0.025 },
      );
      elements.forEach((element) => observer?.observe(element));
    }

    const onScroll = () => root.toggleAttribute("data-scrolled", scrollY > 24);
    addEventListener("scroll", onScroll, { passive: true });
    reducedMotion.addEventListener("change", configure);
    configure();
    onScroll();

    return () => {
      observer?.disconnect();
      removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", configure);
      root.classList.remove("motion-enabled");
      root.removeAttribute("data-scrolled");
    };
  }, []);

  return null;
}
