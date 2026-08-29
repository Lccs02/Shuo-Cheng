"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="返回顶部 / Back to top"
      title="返回顶部 / Back to top"
      className={`back-to-top ${visible ? "" : "hidden"}`}
    >
      <ArrowUp size={18} aria-hidden />
    </button>
  );
}
