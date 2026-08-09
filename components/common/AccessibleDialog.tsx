"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function AccessibleDialog({
  trigger,
  title,
  children,
}: {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function close() {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    const cancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    dialog?.addEventListener("cancel", cancel);
    return () => dialog?.removeEventListener("cancel", cancel);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4"
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        className="m-auto w-[min(42rem,calc(100%-2rem))] border border-[var(--line)] bg-[var(--paper)] p-0 text-[var(--ink)] shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4">
          <h3 className="text-xl">{title}</h3>
          <button
            type="button"
            onClick={close}
            aria-label="关闭 / Close"
            className="grid size-10 place-items-center"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <div className="max-h-[70svh] overflow-auto p-6">{children}</div>
      </dialog>
    </>
  );
}

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-[var(--line)] px-3 py-2 text-sm"
    >
      {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}
