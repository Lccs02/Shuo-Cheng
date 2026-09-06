"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
    let observer: IntersectionObserver | undefined;
    let scrollFrame = 0;
    const pendingFrames = new Map<HTMLElement, number>();

    function resetSurface(surface: HTMLElement) {
      cancelAnimationFrame(pendingFrames.get(surface) ?? 0);
      pendingFrames.delete(surface);
      surface.style.removeProperty("--tilt-x");
      surface.style.removeProperty("--tilt-y");
      surface.style.removeProperty("--light-x");
      surface.style.removeProperty("--light-y");
    }

    function configure() {
      observer?.disconnect();
      surfaces.forEach(resetSurface);
      root.classList.toggle("motion-enabled", !reducedMotion.matches);
      if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -24px", threshold: 0.025 },
      );
      elements.forEach((element) => observer?.observe(element));
    }

    function move(event: PointerEvent) {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== "mouse") return;
      const surface = event.currentTarget as HTMLElement;
      cancelAnimationFrame(pendingFrames.get(surface) ?? 0);
      const { clientX, clientY } = event;
      pendingFrames.set(
        surface,
        requestAnimationFrame(() => {
          const bounds = surface.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
          const y = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
          surface.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
          surface.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
          surface.style.setProperty("--light-x", `${x * 100}%`);
          surface.style.setProperty("--light-y", `${y * 100}%`);
          pendingFrames.delete(surface);
        }),
      );
    }

    function leave(event: PointerEvent) {
      resetSurface(event.currentTarget as HTMLElement);
    }

    function updateScroll() {
      scrollFrame = 0;
      root.toggleAttribute("data-scrolled", scrollY > 24);
      const distance = root.scrollHeight - innerHeight;
      root.style.setProperty(
        "--reading-progress",
        String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0),
      );
    }
    function onScroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    }

    surfaces.forEach((surface) => {
      surface.addEventListener("pointermove", move);
      surface.addEventListener("pointerleave", leave);
      surface.addEventListener("pointercancel", leave);
    });
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    reducedMotion.addEventListener("change", configure);
    finePointer.addEventListener("change", configure);
    configure();
    updateScroll();

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(scrollFrame);
      surfaces.forEach((surface) => {
        resetSurface(surface);
        surface.removeEventListener("pointermove", move);
        surface.removeEventListener("pointerleave", leave);
        surface.removeEventListener("pointercancel", leave);
      });
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", configure);
      finePointer.removeEventListener("change", configure);
      root.classList.remove("motion-enabled");
      root.removeAttribute("data-scrolled");
      root.style.removeProperty("--reading-progress");
    };
  }, [pathname]);

  return null;
}
