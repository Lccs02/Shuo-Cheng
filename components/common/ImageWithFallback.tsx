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
        className={`network-field grid place-items-center bg-[var(--paper-deep)] text-xs tracking-[0.18em] text-[var(--muted)] ${className}`}
      >
        IMAGE
      </div>
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
