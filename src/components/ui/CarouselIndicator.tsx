"use client";

import { classNames } from "@/lib/classNames";

type CarouselIndicatorVariant = "dots" | "progress";

interface CarouselIndicatorProps {
  activeIndex: number;
  ariaLabel: string;
  className?: string;
  count: number;
  labelPrefix?: string;
  onSelect: (index: number) => void;
  variant?: CarouselIndicatorVariant;
}

/** Accessible carousel position control shared by hero, gallery, and menu surfaces. */
export function CarouselIndicator({
  activeIndex,
  ariaLabel,
  className,
  count,
  labelPrefix = "Show slide",
  onSelect,
  variant = "dots",
}: CarouselIndicatorProps) {
  if (count <= 1) {
    return null;
  }

  const currentIndex = Math.min(Math.max(activeIndex, 0), count - 1);

  return (
    <nav aria-label={ariaLabel} className={className}>
      {variant === "progress" ? (
        <div className="flex items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/58">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: count }, (_, index) => (
              <button
                aria-current={index === currentIndex ? "true" : undefined}
                aria-label={`${labelPrefix} ${index + 1} of ${count}`}
                className={classNames(
                  "grid h-10 place-items-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
                  index === currentIndex ? "w-14" : "w-10",
                )}
                key={index}
                onClick={() => onSelect(index)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-12 bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]"
                      : "w-6 bg-white/24",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {Array.from({ length: count }, (_, index) => (
            <button
              aria-current={index === currentIndex ? "true" : undefined}
              aria-label={`${labelPrefix} ${index + 1} of ${count}`}
              className="grid h-10 w-10 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
              key={index}
              onClick={() => onSelect(index)}
              type="button"
            >
              <span
                aria-hidden="true"
                className={classNames(
                  "h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]"
                    : "w-3 bg-white/26",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
