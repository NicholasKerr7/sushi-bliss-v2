import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import {
  customerExploreSections,
  getCustomerExploreItems,
} from "@/data/explore";
import { classNames } from "@/lib/classNames";

type ExploreDirectoryVariant = "desktop" | "mobile" | "tablet";

interface ExploreDirectoryProps {
  className?: string;
  variant?: ExploreDirectoryVariant;
}

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
  return (
    <section
      aria-labelledby="mobile-explore-directory-title"
      className={classNames(
        "mt-4 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-black/44 shadow-[0_22px_60px_rgba(0,0,0,0.34)]",
        className,
      )}
    >
      <div className="border-b border-white/10 p-4">
        <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          More to explore
        </p>
        <h2
          className="mt-1 text-[21px] font-semibold text-white"
          id="mobile-explore-directory-title"
        >
          Explore Sushi Bliss
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {getCustomerExploreItems().map((item) => (
          <ExploreTile compact item={item} key={item.id} variant="mobile" />
        ))}
      </div>
    </section>
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
        "grid min-h-[72px] min-w-0 grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border px-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
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
        <span className="mt-1 block truncate text-[11px] text-white/48">
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
