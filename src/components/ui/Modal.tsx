"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { useScrollLock } from "@/hooks/useScrollLock";
import { classNames } from "@/lib/classNames";

interface ModalProps {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  footer?: ReactNode;
  labelledById?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: ReactNode;
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  children,
  className,
  description,
  footer,
  labelledById = "app-modal-title",
  onOpenChange,
  open,
  title,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    const activeElement = document.activeElement;

    const focusTarget =
      panelRef.current?.querySelector<HTMLElement>(focusableSelector) ||
      panelRef.current;
    focusTarget?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (activeElement instanceof HTMLElement) {
        activeElement.focus();
      }
    };
  }, [onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby={labelledById}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]/82 p-3 backdrop-blur-xl sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
      role="dialog"
    >
      <div
        className={classNames(
          "smooth-scroll-area max-h-[min(44rem,calc(100dvh-1.5rem))] w-full max-w-lg overflow-y-auto rounded-[22px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018)_34%,rgba(7,9,10,0.96)_100%)] text-sb-rice shadow-[0_28px_90px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none backdrop-blur-2xl",
          className,
        )}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--sb-border)] px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2
              className="editorial-title text-[20px] leading-tight text-sb-rice sm:text-[22px]"
              id={labelledById}
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-[13px] leading-5 text-sb-muted sm:text-sm sm:leading-6">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            aria-label="Close modal"
            className="h-10 w-10 shrink-0 rounded-full border-[var(--sb-border)] bg-black/28 px-0 py-0 text-sb-gold-soft hover:bg-white/[0.04]"
            onClick={() => onOpenChange(false)}
            size="sm"
            variant="ghost"
          >
            <ChevronIcon direction="x" size={18} />
          </Button>
        </div>
        <div className="px-4 py-5 sm:px-5">{children}</div>
        {footer ? (
          <div className="border-t border-[var(--sb-border)] bg-black/18 px-4 py-4 sm:px-5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
