import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import {
  customerExploreSections,
  getCustomerExploreItems,
} from "@/data/explore";
import { classNames } from "@/lib/classNames";
import type { ExploreNavigationItem } from "@/data/explore";

type ExploreDirectoryVariant = "desktop" | "mobile" | "tablet";

interface ExploreDirectoryProps {
  className?: string;
  variant?: ExploreDirectoryVariant;
}

const mobileExploreLabels: Record<string, string> = {
  chefs: "Chefs",
  "recently-viewed": "Recent",
  notifications: "Alerts",
};

const mobileExploreMarks: Record<string, string> = {
  about: "ST",
  chefs: "CF",
  favorites: "FV",
  gifts: "GF",
  locations: "JP",
  loyalty: "PT",
  notifications: "!",
  offers: "%",
  omakase: "OM",
  profile: "ID",
  "recently-viewed": "RV",
  support: "CS",
};

/** Shared customer route directory used when primary navigation stays compact. */
export function ExploreDirectory({
  className,
  variant = "mobile",
}: ExploreDirectoryProps) {
  if (variant === "tablet") {
    return <TabletExploreDirectory className={className} />;
  }

  if (variant === "desktop") {
    return <DesktopExploreDirectory className={className} />;
  }

  return <MobileExploreDirectory className={className} />;
}

function MobileExploreDirectory({ className }: { className?: string }) {
  const exploreItems = getCustomerExploreItems();

  return (
    <section
      aria-labelledby="mobile-explore-directory-title"
      className={classNames(
        "mt-4 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.014)_44%,rgba(0,0,0,0.42))] shadow-[0_22px_60px_rgba(0,0,0,0.34)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3.5 py-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            More to explore
          </p>
          <h2
            className="mt-0.5 text-[19px] font-semibold text-white"
            id="mobile-explore-directory-title"
          >
            Sushi Bliss
          </h2>
        </div>
        <Link
          aria-label="Ask concierge support"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-black/34 text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(215,168,79,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/support"
        >
          <AssetIcon size={22} src="/assets/icons/headset-icon.png" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2.5 min-[390px]:gap-2.5 min-[390px]:p-3">
        {exploreItems.map((item) => (
          <MobileExploreTile item={item} key={item.id} />
        ))}
      </div>
      <Link
        className="mx-2.5 mb-2.5 flex min-h-11 items-center justify-between gap-3 rounded-[14px] border border-[var(--sb-gold)]/18 bg-black/28 px-3 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[390px]:mx-3 min-[390px]:mb-3"
        href="/support"
      >
        Concierge help
        <ChevronIcon direction="right" size={16} />
      </Link>
    </section>
  );
}

function MobileExploreTile({ item }: { item: ExploreNavigationItem }) {
  const isRed = item.tone === "red";
  const label = mobileExploreLabels[item.id] || item.label;

  return (
    <Link
      aria-label={`${item.label}: ${item.description}`}
      className={classNames(
        "group relative grid min-h-[92px] min-w-0 place-items-center gap-1.5 overflow-hidden rounded-[14px] border px-1.5 py-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[390px]:min-h-[98px] min-[390px]:rounded-[16px]",
        isRed
          ? "border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/13 hover:border-[var(--sb-red-bright)]/70"
          : "border-white/10 bg-black/24 hover:border-[var(--sb-gold)]/42",
      )}
      href={item.href}
    >
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute inset-0 opacity-80",
          isRed
            ? "bg-[radial-gradient(circle_at_50%_0%,rgba(239,47,37,0.18),transparent_58%)]"
            : "bg-[radial-gradient(circle_at_50%_0%,rgba(215,168,79,0.12),transparent_58%)]",
        )}
      />
      <MobileExploreMark item={item} />
      <span className="relative z-10 line-clamp-2 max-w-full text-[10px] font-semibold uppercase leading-3 tracking-[0.04em] text-white min-[390px]:text-[11px] min-[390px]:leading-[13px]">
        {label}
      </span>
    </Link>
  );
}

function MobileExploreMark({ item }: { item: ExploreNavigationItem }) {
  const isRed = item.tone === "red";

  return (
    <span
      aria-hidden="true"
      className={classNames(
        "relative z-10 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border font-mono text-[12px] font-black uppercase tracking-[0.08em]",
        isRed
          ? "border-[var(--sb-red-bright)]/42 bg-[radial-gradient(circle_at_42%_35%,rgba(239,47,37,0.34),rgba(54,7,7,0.42)_54%,rgba(0,0,0,0.58)_100%)] text-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(239,47,37,0.18)]"
          : "border-[var(--sb-gold)]/30 bg-[radial-gradient(circle_at_42%_35%,rgba(215,168,79,0.24),rgba(30,22,10,0.44)_54%,rgba(0,0,0,0.58)_100%)] text-[var(--sb-gold-soft)] shadow-[0_0_18px_rgba(215,168,79,0.14)]",
      )}
    >
      <AssetIcon
        className="absolute h-8 w-8 opacity-20 brightness-125 contrast-125 saturate-150"
        size={34}
        src={item.iconUrl}
      />
      <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
        {mobileExploreMarks[item.id] || item.label.slice(0, 2)}
      </span>
    </span>
  );
}

function TabletExploreDirectory({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="tablet-explore-directory-title"
      className={classNames(
        "mt-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:mt-4",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] min-[1080px]:text-[14px]">
            Explore
          </p>
          <h2
            className="mt-1 text-[17px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[19px]"
            id="tablet-explore-directory-title"
          >
            Complete app directory
          </h2>
        </div>
        <Link
          className="hidden items-center gap-2 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] min-[1080px]:inline-flex"
          href="/support"
        >
          Concierge <ChevronIcon direction="right" size={18} />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 min-[960px]:grid-cols-4 min-[960px]:gap-3">
        {getCustomerExploreItems().map((item) => (
          <ExplorePill item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

function DesktopExploreDirectory({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="desktop-explore-directory-title"
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5",
        className,
      )}
    >
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            App directory
          </p>
          <h2
            className="editorial-title mt-1 text-[31px] uppercase tracking-[0.08em] text-white"
            id="desktop-explore-directory-title"
          >
            Explore Sushi Bliss
          </h2>
        </div>
        <p className="max-w-[520px] text-right text-[14px] leading-6 text-white/58">
          A single polished hub for chef stories, locations, favorites, offers,
          recent views, alerts, gifts, and concierge support.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 min-[1500px]:grid-cols-3">
        {customerExploreSections.map((section) => (
          <article
            className="rounded-[14px] border border-white/10 bg-black/24 p-3"
            key={section.id}
          >
            <h3 className="px-2 text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              {section.label}
            </h3>
            <div className="mt-3 grid gap-2">
              {section.items.map((item) => (
                <ExploreTile item={item} key={item.id} variant="desktop" />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExploreTile({
  compact = false,
  item,
  variant,
}: {
  compact?: boolean;
  item: ReturnType<typeof getCustomerExploreItems>[number];
  variant: ExploreDirectoryVariant;
}) {
  const isDesktop = variant === "desktop";
  const isRed = item.tone === "red";

  return (
    <Link
      className={classNames(
        "group relative overflow-hidden border text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
        isDesktop
          ? "grid min-h-[86px] grid-cols-[46px_minmax(0,1fr)_18px] items-center gap-3 rounded-[12px] px-3 py-3"
          : "min-h-[104px] rounded-[16px] p-3",
        isRed
          ? "border-[var(--sb-red-bright)]/44 bg-[var(--sb-red)]/14 hover:border-[var(--sb-red-bright)]/70"
          : "border-white/10 bg-black/24 hover:border-[var(--sb-gold)]/42",
      )}
      href={item.href}
    >
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100",
          isRed
            ? "bg-[radial-gradient(circle_at_20%_20%,rgba(239,47,37,0.18),transparent_58%)]"
            : "bg-[radial-gradient(circle_at_20%_20%,rgba(215,168,79,0.14),transparent_58%)]",
        )}
      />
      <ExploreIcon compact={compact} item={item} variant={variant} />
      <span
        className={classNames(
          "relative z-10 block min-w-0 text-white",
          isDesktop ? "mt-0" : "mt-4",
        )}
      >
        <span
          className={classNames(
            "block font-semibold",
            isDesktop ? "text-[15px]" : "text-[14px]",
          )}
        >
          {item.label}
        </span>
        <span
          className={classNames(
            "mt-1 block text-white/52",
            isDesktop
              ? "line-clamp-2 text-[12px] leading-5"
              : "line-clamp-2 text-[12px] leading-4",
          )}
        >
          {item.description}
        </span>
      </span>
      {isDesktop ? (
        <span
          aria-hidden="true"
          className="relative z-10 text-[var(--sb-gold-soft)]"
        >
          <ChevronIcon direction="right" size={18} />
        </span>
      ) : null}
    </Link>
  );
}

function ExplorePill({
  item,
}: {
  item: ReturnType<typeof getCustomerExploreItems>[number];
}) {
  const isRed = item.tone === "red";

  return (
    <Link
      className={classNames(
        "grid min-h-[86px] min-w-0 grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:min-h-[78px]",
        isRed
          ? "border-[var(--sb-red-bright)]/48 bg-[var(--sb-red)]/16"
          : "border-white/10 bg-black/24 hover:border-[var(--sb-gold)]/36",
      )}
      href={item.href}
    >
      <ExploreIcon item={item} variant="tablet" />
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold uppercase tracking-[0.04em] text-white min-[1080px]:text-[13px]">
          {item.label}
        </span>
        <span className="mt-1 block line-clamp-2 text-[11px] leading-4 text-white/48">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

function ExploreIcon({
  compact = false,
  item,
  variant,
}: {
  compact?: boolean;
  item: ReturnType<typeof getCustomerExploreItems>[number];
  variant: ExploreDirectoryVariant;
}) {
  const isDesktop = variant === "desktop";
  const isRed = item.tone === "red";
  const chipSize = isDesktop
    ? "h-12 w-12"
    : compact
      ? "h-11 w-11"
      : "h-10 w-10";
  const iconSize = isDesktop ? 36 : compact ? 31 : 32;

  return (
    <span
      aria-hidden="true"
      className={classNames(
        "relative z-10 grid shrink-0 place-items-center overflow-hidden rounded-full border",
        chipSize,
        isRed
          ? "border-[var(--sb-red-bright)]/42 bg-[radial-gradient(circle_at_42%_35%,rgba(239,47,37,0.34),rgba(54,7,7,0.42)_54%,rgba(0,0,0,0.58)_100%)] shadow-[0_0_18px_rgba(239,47,37,0.18)]"
          : "border-[var(--sb-gold)]/30 bg-[radial-gradient(circle_at_42%_35%,rgba(215,168,79,0.24),rgba(30,22,10,0.44)_54%,rgba(0,0,0,0.58)_100%)] shadow-[0_0_18px_rgba(215,168,79,0.14)]",
      )}
    >
      <span
        className={classNames(
          "absolute inset-[3px] rounded-full border",
          isRed ? "border-[var(--sb-red-bright)]/16" : "border-white/8",
        )}
      />
      <AssetIcon
        className={classNames(
          "relative z-10 brightness-125 contrast-125 saturate-150",
          isRed
            ? "drop-shadow-[0_0_8px_rgba(239,47,37,0.42)]"
            : "drop-shadow-[0_0_8px_rgba(215,168,79,0.42)]",
        )}
        loading={isDesktop ? "eager" : "lazy"}
        size={iconSize}
        src={item.iconUrl}
      />
    </span>
  );
}
