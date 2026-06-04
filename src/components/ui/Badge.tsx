import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: "neutral" | "premium" | "success";
}

const toneClasses = {
  neutral: "border-sb-line bg-sb-rice/5 text-sb-muted",
  premium: "border-sb-gold/40 bg-sb-gold/10 text-sb-gold-soft",
  success: "border-sb-wasabi/40 bg-sb-wasabi/10 text-sb-wasabi",
};

export function Badge({
  children,
  className = "",
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-control border px-3 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
