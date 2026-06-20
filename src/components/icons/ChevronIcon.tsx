import { classNames } from "@/lib/classNames";

type ChevronDirection = "down" | "left" | "right" | "up" | "x";

interface ChevronIconProps {
  className?: string;
  direction?: ChevronDirection;
  size?: number;
  strokeWidth?: number;
}

const chevronPaths: Record<ChevronDirection, string> = {
  down: "m5 9 7 7 7-7",
  left: "m15 5-7 7 7 7",
  right: "m9 5 7 7-7 7",
  up: "m5 15 7-7 7 7",
  x: "m6 6 12 12M18 6 6 18",
};

/** Renders consistent directional chevrons without relying on text glyphs. */
export function ChevronIcon({
  className,
  direction = "right",
  size = 18,
  strokeWidth = 2.2,
}: ChevronIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={classNames("inline-block shrink-0 text-current", className)}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={chevronPaths[direction]} />
    </svg>
  );
}
