import Link from "next/link";

import { liquidOmakaseReservationHref } from "@/lib/menuAvailability";

export function TabletDrinksEmptyState() {
  const pairings = [
    ["Sake flights", "Junmai, ginjo, and daiginjo pairings by course."],
    ["Tea service", "Roasted green tea, matcha, and seasonal infusions."],
    ["Zero-proof", "Yuzu, shiso, and sparkling citrus preparations."],
  ] as const;

  return (
    <div className="grid min-h-[252px] grid-cols-[1.08fr_0.92fr] overflow-hidden rounded-[13px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(0,0,0,0.82),rgba(90,10,8,0.34)_48%,rgba(0,0,0,0.86))]">
      <div className="p-8">
        <p className="text-[13px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
          Beverage Pairings
        </p>
        <h2 className="editorial-title mt-3 text-[38px] uppercase leading-none tracking-[0.12em] text-white">
          Curated at the table
        </h2>
        <p className="mt-4 max-w-[460px] text-[15px] leading-6 text-white/66">
          The digital drinks list is served through guided pairings so each
          sake, tea, or zero-proof course matches the fish, rice temperature,
          and pacing of your meal.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            className="red-glow-button grid h-12 w-[196px] place-items-center rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
            href={liquidOmakaseReservationHref}
          >
            Reserve Pairing
          </Link>
          <Link
            className="grid h-12 w-[170px] place-items-center rounded-[10px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.045]"
            href="/support"
          >
            Ask Concierge
          </Link>
        </div>
      </div>
      <div className="grid content-center gap-3 border-l border-white/10 bg-black/28 p-5">
        {pairings.map(([title, copy]) => (
          <article
            className="rounded-[11px] border border-white/12 bg-white/[0.035] p-4"
            key={title}
          >
            <h3 className="text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold)]">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-white/62">{copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
