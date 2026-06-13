"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { icons } from "@/features/home/visualHomeData";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";

import {
  getRecentlyViewedSections,
  type RecentlyViewedEntry,
} from "./recentlyViewedContent";
import { MobileFavoritesHeader } from "./MobileFavoritesPrimitives";

/** Mobile-first recently viewed history with real navigation and clearing actions. */
export function MobileRecentlyViewedPage() {
  const initialSections = useMemo(() => getRecentlyViewedSections(), []);
  const [sections, setSections] = useState(initialSections);
  const [savedExperienceIds, setSavedExperienceIds] = useState(
    () =>
      new Set(
        initialSections.flatMap((section) =>
          section.entries
            .filter((entry) => entry.type === "experience" && entry.isSaved)
            .map((entry) => entry.id),
        ),
      ),
  );
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const hasHistory = sections.some((section) => section.entries.length > 0);

  const clearHistory = () => setSections([]);
  const toggleSavedExperience = (id: string) => {
    setSavedExperienceIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }

      return nextIds;
    });
  };

  return (
    <section
      className="relative min-h-dvh overflow-x-hidden bg-[#030404] px-4 pb-[132px] pt-5 text-white"
      id="recently-viewed"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.16),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#030404_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/editorial/elegant-sashimi-platter-on-slate.webp')] bg-cover bg-center opacity-12"
      />

      <div className="relative z-10 mx-auto max-w-[430px] md:max-w-[900px]">
        <MobileFavoritesHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
        />

        <section className="mt-8">
          <h1 className="editorial-title text-[39px] uppercase leading-none tracking-[0.08em] text-white md:text-[48px]">
            Recently <span className="text-[var(--sb-red-bright)]">Viewed</span>
          </h1>
          <p className="mt-4 text-[16px] leading-6 text-[var(--sb-gold-soft)] md:text-[18px]">
            Your recently viewed dishes and experiences.
          </p>
        </section>

        {hasHistory ? (
          <div className="mt-8 grid gap-7">
            {sections.map((section) => (
              <section key={section.label}>
                <h2 className="editorial-title text-[20px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                  {section.label}
                </h2>
                <div className="mt-3 grid gap-3">
                  {section.entries.map((entry) => (
                    <RecentlyViewedCard
                      entry={entry}
                      isSaved={
                        entry.type === "dish"
                          ? isFavorite(entry.id)
                          : savedExperienceIds.has(entry.id)
                      }
                      key={`${section.label}-${entry.id}`}
                      onToggleSaved={
                        entry.type === "dish"
                          ? () => toggleFavorite(entry.id)
                          : () => toggleSavedExperience(entry.id)
                      }
                    />
                  ))}
                </div>
              </section>
            ))}

            <button
              className="mx-auto flex items-center gap-2 rounded-full px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
              onClick={clearHistory}
              type="button"
            >
              <AssetIcon alt="" size={18} src={icons.clock} />
              Clear history
            </button>
          </div>
        ) : (
          <section className="mt-10 rounded-[20px] border border-[var(--sb-border)] bg-black/42 p-6 text-center">
            <AssetIcon alt="" className="mx-auto" size={42} src={icons.clock} />
            <h2 className="mt-5 text-[24px] font-semibold text-white">
              No recent views
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-white/58">
              Browse the menu or omakase experiences to build your history.
            </p>
            <Link
              className="red-glow-button mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[13px] border px-6 text-[12px]"
              href="/menu"
            >
              Explore menu
            </Link>
          </section>
        )}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile recently viewed navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}

function RecentlyViewedCard({
  entry,
  isSaved,
  onToggleSaved,
}: {
  entry: RecentlyViewedEntry;
  isSaved: boolean;
  onToggleSaved: () => void;
}) {
  return (
    <article className="grid min-h-[150px] grid-cols-[34%_minmax(0,1fr)] overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-black/46 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_46px_rgba(0,0,0,0.36)] md:grid-cols-[220px_minmax(0,1fr)_170px]">
      <Link className="relative min-h-[150px]" href={entry.href}>
        <Image
          alt={entry.image.alt || entry.title}
          className="object-cover"
          fill
          sizes="(min-width: 768px) 220px, 150px"
          src={entry.image.publicUrl}
        />
        <span className="absolute left-3 top-3">
          <StatusBadge tone="danger">{entry.type}</StatusBadge>
        </span>
      </Link>

      <div className="min-w-0 px-4 py-4">
        <h3 className="line-clamp-2 text-[24px] leading-7 text-white">
          {entry.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[16px] leading-5 text-white/62">
          {entry.subtitle}
        </p>
        <p className="mt-3 text-[21px] text-[var(--sb-gold-soft)]">
          {formatMoney(entry.priceCents)}
        </p>
        <p className="mt-3 flex items-center gap-2 text-[13px] leading-5 text-white/50">
          <AssetIcon alt="" size={16} src={icons.clock} />
          {entry.viewedAt}
        </p>
      </div>

      <div className="col-span-2 grid grid-cols-[52px_minmax(0,1fr)] gap-3 border-t border-white/8 px-4 py-3 md:col-span-1 md:grid-cols-1 md:border-l md:border-t-0 md:py-4">
        <button
          aria-pressed={isSaved}
          className={classNames(
            "grid h-[48px] w-[48px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/42 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
            isSaved && "border-[var(--sb-red-bright)]/70 bg-[var(--sb-red)]/16",
          )}
          onClick={onToggleSaved}
          type="button"
        >
          <AssetIcon
            alt={isSaved ? "Saved" : "Save"}
            size={25}
            src="/assets/icons/heart-icon.png"
          />
        </button>
        <Link
          className="inline-flex min-h-[48px] items-center justify-center rounded-[13px] border border-[var(--sb-gold)]/80 px-4 text-center text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          href={entry.href}
        >
          {entry.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
