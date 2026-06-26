"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { icons } from "@/features/home/homeDashboardData";
import { useCart } from "@/hooks/useCart";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";

import type { RecentlyViewedEntry } from "./recentlyViewedContent";

/** Tablet recent-history dashboard with compact cards and app navigation. */
export function TabletRecentlyViewedPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { clearHistory, hasHistory, isEntrySaved, sections, toggleEntrySaved } =
    useRecentlyViewed();
  const eagerEntryKeys = new Set(
    sections
      .flatMap((section) =>
        section.entries.map((entry) => `${section.label}:${entry.id}`),
      )
      .slice(0, 6),
  );

  return (
    <>
      <section
        className="min-h-dvh overflow-x-hidden bg-[#040506] px-[18px] pb-[126px] pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pt-3"
        id="recently-viewed"
      >
        <TabletExperienceHeader
          cartCount={itemCount}
          title="Recently Viewed"
          onOpenCart={() => setCartOpen(true)}
        />

        <main className="mx-auto w-full max-w-[1034px]">
          <section className="relative mt-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-5 min-[1080px]:p-6">
            <Image
              alt=""
              className="object-cover opacity-26"
              fill
              loading="eager"
              priority
              sizes="1034px"
              src="/assets/editorial/elegant-sashimi-platter-on-slate.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#050607_0%,rgba(5,6,7,0.9)_42%,rgba(5,6,7,0.52)_100%)]" />
            <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_250px] items-end gap-8 min-[1080px]:grid-cols-[minmax(0,1fr)_310px]">
              <div>
                <p className="text-[13px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                  Member history
                </p>
                <h1 className="editorial-title mt-2 text-[46px] uppercase leading-none tracking-[0.08em] min-[1080px]:text-[54px]">
                  Recently{" "}
                  <span className="text-[var(--sb-red-bright)]">Viewed</span>
                </h1>
                <p className="mt-3 max-w-[620px] text-[16px] leading-6 text-white/64">
                  Return to the dishes, offers, and chef-led experiences you
                  inspected most recently.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 rounded-[14px] border border-white/10 bg-black/44 p-4">
                <SummaryMetric
                  label="Entries"
                  value={sections.reduce(
                    (total, section) => total + section.entries.length,
                    0,
                  )}
                />
                <SummaryMetric label="Sections" value={sections.length} />
              </div>
            </div>
          </section>

          {hasHistory ? (
            <div className="mt-5 grid gap-5">
              {sections.map((section) => (
                <section key={section.label}>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-[16px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                      {section.label}
                    </h2>
                    <Link
                      className="inline-flex min-h-10 items-center gap-2 rounded-full px-2 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                      href="/menu"
                    >
                      Browse menu <ChevronIcon direction="right" size={18} />
                    </Link>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 min-[1080px]:grid-cols-3">
                    {section.entries.map((entry) => (
                      <TabletHistoryCard
                        entry={entry}
                        isSaved={isEntrySaved(entry)}
                        key={`${section.label}-${entry.id}`}
                        priority={eagerEntryKeys.has(
                          `${section.label}:${entry.id}`,
                        )}
                        onToggleSaved={() => toggleEntrySaved(entry)}
                      />
                    ))}
                  </div>
                </section>
              ))}
              <button
                className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                onClick={clearHistory}
                type="button"
              >
                <AssetIcon size={18} src={icons.clock} />
                Clear history
              </button>
            </div>
          ) : (
            <section className="mt-6 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-8 text-center">
              <AssetIcon className="mx-auto" size={46} src={icons.clock} />
              <h2 className="mt-4 text-[28px] font-semibold text-white">
                No recent views
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-6 text-white/58">
                Browse the menu or omakase experiences to rebuild your history.
              </p>
              <Button className="mt-6 rounded-[10px]" href="/menu">
                Explore menu
              </Button>
            </section>
          )}
        </main>
      </section>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet recently viewed navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </>
  );
}

function TabletHistoryCard({
  entry,
  isSaved,
  priority,
  onToggleSaved,
}: {
  entry: RecentlyViewedEntry;
  isSaved: boolean;
  priority: boolean;
  onToggleSaved: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-black/38 shadow-[0_18px_46px_rgba(0,0,0,0.34)]">
      <Link className="relative block h-[164px]" href={entry.href}>
        <Image
          alt={entry.image.alt || entry.title}
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="(min-width: 1080px) 310px, 480px"
          src={entry.image.publicUrl}
        />
        <span className="absolute left-3 top-3">
          <StatusBadge tone={entry.type === "dish" ? "danger" : "warning"}>
            {entry.type}
          </StatusBadge>
        </span>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-[21px] font-semibold text-white">
              {entry.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/56">
              {entry.subtitle}
            </p>
          </div>
          <button
            aria-label={
              isSaved ? `Remove ${entry.title}` : `Save ${entry.title}`
            }
            aria-pressed={isSaved}
            className={classNames(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/42 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              isSaved &&
                "border-[var(--sb-red-bright)]/70 bg-[var(--sb-red)]/18",
            )}
            onClick={onToggleSaved}
            type="button"
          >
            <AssetIcon size={22} src="/assets/icons/heart-icon.png" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[19px] text-[var(--sb-gold-soft)]">
            {formatMoney(entry.priceCents)}
          </span>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[var(--sb-gold)]/62 px-4 text-[11px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
            href={entry.href}
          >
            {entry.ctaLabel}
          </Link>
        </div>
        <p className="mt-3 flex items-center gap-2 text-[12px] text-white/46">
          <AssetIcon size={15} src={icons.clock} />
          {entry.viewedAt}
        </p>
      </div>
    </article>
  );
}

function SummaryMetric({ label, value }: { label: string; value: number }) {
  return (
    <p className="text-center">
      <span className="block font-mono text-[30px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
      <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-white/48">
        {label}
      </span>
    </p>
  );
}
