"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/homeDashboardData";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";

import type { RecentlyViewedEntry } from "./recentlyViewedContent";

/** Desktop recent-history route for returning to viewed dishes and experiences. */
export function DesktopRecentlyViewedPage() {
  const { itemCount } = useCart();
  const { clearHistory, hasHistory, isEntrySaved, sections, toggleEntrySaved } =
    useRecentlyViewed();
  const entryCount = sections.reduce(
    (total, section) => total + section.entries.length,
    0,
  );
  const savedEntryCount = sections.reduce(
    (total, section) =>
      total + section.entries.filter((entry) => isEntrySaved(entry)).length,
    0,
  );

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="recently-viewed"
    >
      <DesktopMenuHeader activeId="recently-viewed" cartCount={itemCount} />
      <main className="mx-auto max-w-[1672px] px-10 pb-6 pt-5">
        <section className="relative overflow-hidden rounded-[24px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
          <Image
            alt=""
            className="object-cover object-[65%_48%] opacity-38"
            fill
            loading="eager"
            priority
            sizes="1672px"
            src="/assets/editorial/elegant-sashimi-platter-on-slate.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#07090a_0%,rgba(7,9,10,0.92)_40%,rgba(7,9,10,0.5)_72%,#07090a_100%)]" />
          <div className="relative z-10 grid min-h-[280px] grid-cols-[minmax(0,1fr)_380px] items-center gap-10 px-8 py-8">
            <div>
              <p className="text-[14px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                Member history
              </p>
              <h1 className="editorial-title mt-3 text-[64px] uppercase leading-none tracking-[0.08em]">
                Recently{" "}
                <span className="text-[var(--sb-red-bright)]">Viewed</span>
              </h1>
              <p className="mt-4 max-w-[720px] text-[18px] leading-7 text-white/66">
                Continue from viewed dishes, chef experiences, pairings, and
                premium reservations without hunting through the app.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  className="h-[50px] rounded-[10px] px-7 text-[13px] uppercase tracking-[0.08em]"
                  href="/menu"
                >
                  Browse menu <ChevronIcon direction="right" size={18} />
                </Button>
                <Button
                  className="h-[50px] rounded-[10px] px-7 text-[13px] uppercase tracking-[0.08em]"
                  href="/omakase"
                  variant="secondary"
                >
                  View omakase
                </Button>
              </div>
            </div>

            <aside className="rounded-[18px] border border-white/10 bg-black/54 p-5">
              <h2 className="flex items-center gap-3 text-[17px] uppercase tracking-[0.08em] text-white">
                <AssetIcon size={28} src={icons.clock} />
                History summary
              </h2>
              <div className="mt-5 grid grid-cols-3 rounded-[12px] border border-white/10 bg-black/24 py-4 text-center">
                <SummaryMetric label="Views" value={entryCount} />
                <SummaryMetric label="Groups" value={sections.length} />
                <SummaryMetric label="Saved" value={savedEntryCount} />
              </div>
              <button
                className="mt-5 h-10 w-full rounded-[10px] border border-[var(--sb-gold)]/32 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/60"
                disabled={!hasHistory}
                onClick={clearHistory}
                type="button"
              >
                Clear history
              </button>
            </aside>
          </div>
        </section>

        {hasHistory ? (
          <section className="mt-5 grid gap-5">
            {sections.map((section) => (
              <article
                className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5"
                key={section.label}
              >
                <div className="flex items-center justify-between gap-5">
                  <h2 className="text-[17px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                    {section.label}
                  </h2>
                  <Link
                    className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                    href="/favorites"
                  >
                    Saved items <ChevronIcon direction="right" size={18} />
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {section.entries.map((entry, index) => (
                    <DesktopHistoryCard
                      entry={entry}
                      isSaved={isEntrySaved(entry)}
                      key={`${section.label}-${entry.id}`}
                      priority={section.label === "Today" && index < 3}
                      onToggleSaved={() => toggleEntrySaved(entry)}
                    />
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="mt-5 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-10 text-center">
            <AssetIcon className="mx-auto" size={56} src={icons.clock} />
            <h2 className="mt-5 text-[32px] font-semibold text-white">
              No recent views
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[16px] leading-7 text-white/58">
              Browse the menu or omakase experiences to rebuild your viewing
              history.
            </p>
            <Button className="mt-7 rounded-[10px]" href="/menu">
              Explore menu
            </Button>
          </section>
        )}

        <div className="mt-5">
          <DesktopBenefitStrip />
        </div>
      </main>
    </section>
  );
}

function DesktopHistoryCard({
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
    <article className="grid min-h-[192px] grid-cols-[178px_minmax(0,1fr)] overflow-hidden rounded-[16px] border border-white/10 bg-black/32">
      <Link className="relative" href={entry.href}>
        <Image
          alt={entry.image.alt || entry.title}
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="178px"
          src={entry.image.publicUrl}
        />
        <span className="absolute left-3 top-3">
          <StatusBadge tone={entry.type === "dish" ? "danger" : "warning"}>
            {entry.type}
          </StatusBadge>
        </span>
      </Link>
      <div className="grid min-w-0 grid-rows-[1fr_auto] p-4">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-2 text-[23px] leading-7 text-white">
              {entry.title}
            </h3>
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
          <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-white/56">
            {entry.subtitle}
          </p>
          <p className="mt-3 flex items-center gap-2 text-[12px] text-white/44">
            <AssetIcon size={15} src={icons.clock} />
            {entry.viewedAt}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <span className="text-[21px] text-[var(--sb-gold-soft)]">
            {formatMoney(entry.priceCents)}
          </span>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[var(--sb-gold)]/60 px-4 text-[11px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
            href={entry.href}
          >
            {entry.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

function SummaryMetric({ label, value }: { label: string; value: number }) {
  return (
    <p>
      <span className="block font-mono text-[30px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
      <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-white/48">
        {label}
      </span>
    </p>
  );
}
