import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";
import type { MenuOrderAction } from "@/lib/menuAvailability";
import type { MenuItem } from "@/types/menu";

interface ReservationHandoffCardProps {
  action: MenuOrderAction;
  className?: string;
  compact?: boolean;
  item: MenuItem;
  variant?: "mobile" | "tablet" | "desktop";
}

const featureCopy = {
  "liquid-omakase": ["Chef counter", "Paced pairing", "ID checked"],
  "table-service": ["Dining room", "Tableside finish", "Prefilled notes"],
  cart: ["Online order", "Pickup or delivery", "Fast checkout"],
} as const;

/** Presents non-cart menu items as a premium reservation handoff instead of a dead add-to-cart state. */
export function ReservationHandoffCard({
  action,
  className,
  compact: compactProp = false,
  item,
  variant = "mobile",
}: ReservationHandoffCardProps) {
  const mobile = variant === "mobile";
  const compact = mobile || compactProp;
  const features = featureCopy[action.intent];

  return (
    <section
      className={classNames(
        "relative overflow-hidden rounded-[18px] border border-[var(--sb-gold)]/32 bg-[linear-gradient(145deg,rgba(215,168,79,0.16),rgba(255,255,255,0.035)_42%,rgba(7,9,10,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_22px_54px_rgba(0,0,0,0.32)]",
        compact ? "p-4" : "p-5",
        className,
      )}
    >
      <span className="pointer-events-none absolute -right-12 -top-14 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.2),transparent_68%)]" />
      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.42),transparent)]" />

      <div className="relative z-10 flex items-start gap-3">
        <span
          className={classNames(
            "grid shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/40 bg-black/42 shadow-[0_0_24px_rgba(215,168,79,0.16)]",
            compact ? "h-11 w-11" : "h-12 w-12",
          )}
        >
          <AssetIcon size={compact ? 25 : 28} src={action.icon} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            {action.badge}
          </p>
          <h2
            className={classNames(
              "editorial-title mt-1 uppercase leading-none text-white",
              compact ? "text-[22px]" : "text-[27px]",
            )}
          >
            {action.title}
          </h2>
          <p
            className={classNames(
              "mt-2 text-[13px] leading-5 text-white/68",
              compact && "line-clamp-2",
            )}
          >
            {action.note}
          </p>
        </div>
      </div>

      <div
        className={classNames(
          "relative z-10 mt-4 grid gap-2",
          mobile && !compactProp ? "grid-cols-1" : "grid-cols-3",
        )}
      >
        {features.map((feature) => (
          <span
            className={classNames(
              "rounded-[10px] border border-white/10 bg-black/24 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-white/64",
              compact ? "px-2 py-1.5" : "px-3 py-2",
            )}
            key={feature}
          >
            {feature}
          </span>
        ))}
      </div>

      <div
        className={classNames(
          "relative z-10 mt-4 grid gap-3",
          mobile && !compactProp
            ? "grid-cols-1"
            : compact
              ? "grid-cols-[minmax(0,1fr)_132px]"
              : "grid-cols-[minmax(0,1fr)_160px]",
        )}
      >
        <Link
          aria-label={`${action.label} for ${item.name}`}
          className={classNames(
            "red-glow-button grid place-items-center rounded-[14px] px-5 text-[14px] uppercase tracking-[0.08em]",
            compact ? "min-h-[50px]" : "min-h-[58px]",
          )}
          href={action.href || "/reservations"}
        >
          {action.label}
        </Link>
        <Link
          className="grid min-h-[50px] place-items-center rounded-[13px] border border-[var(--sb-gold)]/30 bg-black/24 px-4 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/56"
          href="/support"
        >
          Concierge
        </Link>
      </div>
    </section>
  );
}
