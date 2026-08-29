"use client";

import Image from "next/image";
import { useState } from "react";
import { withBasePath } from "@/lib/paths";

export function ImageWithFallback({
  src,
  alt,
  className = "",
  sizes = "(max-width: 800px) 100vw, 40vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`image-fallback bg-[var(--surface)] ${className}`}
      />
    );
  }
  return (
    <Image
      src={withBasePath(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
