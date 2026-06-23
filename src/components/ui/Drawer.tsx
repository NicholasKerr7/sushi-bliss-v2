"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { useScrollLock } from "@/hooks/useScrollLock";
import { classNames } from "@/lib/classNames";

type DrawerSide = "bottom" | "left" | "right";

interface DrawerProps {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  footer?: ReactNode;
  labelledById?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  side?: DrawerSide;
  title: ReactNode;
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const sideClasses: Record<DrawerSide, string> = {
  bottom:
    "bottom-[calc(10px+var(--sb-safe-bottom))] left-3 right-3 max-h-[calc(100dvh-1.25rem-var(--sb-safe-bottom))] rounded-[24px] border sm:bottom-[calc(16px+var(--sb-safe-bottom))] sm:left-1/2 sm:right-auto sm:w-[min(42rem,calc(100vw-2rem))] sm:max-h-[calc(100dvh-2rem-var(--sb-safe-bottom))] sm:-translate-x-1/2",
  left: "inset-y-3 left-3 h-[calc(100dvh-1.5rem)] w-[min(30rem,calc(100vw-1.5rem))] rounded-[24px] border sm:inset-y-4 sm:left-4 sm:h-[calc(100dvh-2rem)] sm:w-[min(26rem,calc(100vw-2rem))]",
  right:
    "inset-y-3 right-3 h-[calc(100dvh-1.5rem)] w-[min(30rem,calc(100vw-1.5rem))] rounded-[24px] border sm:inset-y-4 sm:right-4 sm:h-[calc(100dvh-2rem)] sm:w-[min(26rem,calc(100vw-2rem))]",
};

export function Drawer({
  children,
  className,
  description,
  footer,
  labelledById = "app-drawer-title",
  onOpenChange,
  open,
  side = "bottom",
  title,
}: DrawerProps) {
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
      className="fixed inset-0 z-50 bg-[#020202]/82 backdrop-blur-xl"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
      role="dialog"
    >
      <div
        className={classNames(
          "fixed flex min-h-0 flex-col overflow-hidden border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.024)_36%,rgba(7,9,10,0.97)_100%)] text-sb-rice shadow-[0_28px_90px_rgba(0,0,0,0.62),0_0_44px_rgba(215,168,79,0.08),inset_0_1px_0_rgba(255,255,255,0.09)] outline-none backdrop-blur-2xl",
          sideClasses[side],
          className,
        )}
        ref={panelRef}
        tabIndex={-1}
      >
        {side === "bottom" ? (
          <span
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-[linear-gradient(90deg,transparent,var(--sb-gold-soft),transparent)] opacity-70"
          />
        ) : null}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--sb-border)] px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2
              className="editorial-title break-words text-[20px] leading-tight text-sb-rice sm:text-[22px]"
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
            aria-label="Close drawer"
            className="h-10 w-10 shrink-0 rounded-full border-[var(--sb-border)] bg-black/28 px-0 py-0 text-sb-gold-soft hover:bg-white/[0.04]"
            onClick={() => onOpenChange(false)}
            size="sm"
            variant="ghost"
          >
            <ChevronIcon direction="x" size={18} />
          </Button>
        </div>
        <div className="smooth-scroll-area min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
          {children}
        </div>
        {footer ? (
          <div className="shrink-0 border-t border-[var(--sb-border)] bg-black/28 px-4 py-4 shadow-[0_-18px_42px_rgba(0,0,0,0.34)] sm:px-5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
