"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-sb-ink/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
      role="dialog"
    >
      <div
        className={classNames(
          "max-h-[min(42rem,calc(100dvh-2rem))] w-full max-w-lg overflow-y-auto rounded-card border border-sb-line bg-sb-panel shadow-soft outline-none",
          className,
        )}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4 border-b border-sb-line p-5">
          <div>
            <h2
              className="text-lg font-semibold text-sb-rice"
              id={labelledById}
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-sb-muted">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            aria-label="Close modal"
            onClick={() => onOpenChange(false)}
            size="sm"
            variant="ghost"
          >
            Close
          </Button>
        </div>
        <div className="p-5">{children}</div>
        {footer ? (
          <div className="border-t border-sb-line p-5">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
