"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { chefs } from "@/data/chefs";
import { brand, icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import type { Chef } from "@/types/chef";

import { ChefDetailModal } from "./ChefDetailModal";

type ChefFilterId = "all" | "counter" | "dessert";

const chefFilters = [
  {
    id: "all",
    icon: "/assets/icons/group-icon.png",
    label: "Four chefs",
  },
  {
    id: "counter",
    icon: "/assets/icons/sushi-menu-icon.png",
    label: "Sushi counter",
  },
  {
    id: "dessert",
    icon: "/assets/icons/lotus-icon.png",
    label: "Dessert course",
  },
] as const;

const tabletChefRoster = chefs.slice(0, 4);
const chefTableHighlights = [
  ["18", "course omakase"],
  ["4", "chef stations"],
  ["90", "minute counter"],
] as const;
const chefCounterFlow = [
  ["01", "Market selection", "Daily fish, produce, and garnish checks."],
  ["02", "Knife work", "Sashimi and nigiri cuts paced for the counter."],
  ["03", "Warm course", "Seared, sauced, and plated at exact timing."],
  ["04", "Final note", "Matcha, yuzu, and black sesame finish cleanly."],
] as const;

function filterChefs(roster: Chef[], query: string, filterId: ChefFilterId) {
  const normalizedQuery = query.trim().toLowerCase();
  const filterMatches = (chef: Chef) => {
    if (filterId === "dessert") {
      return chef.position.toLowerCase().includes("pastry");
    }

    if (filterId === "counter") {
      return !chef.position.toLowerCase().includes("pastry");
    }

    return true;
  };

  const filteredRoster = roster.filter(filterMatches);

  if (!normalizedQuery) {
    return filteredRoster;
  }

  return filteredRoster.filter((chef) =>
    [
      chef.name,
      chef.position,
      chef.about,
      chef.specialty,
      chef.sushi,
      chef.sashimi,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export function TabletChefsSection() {
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [activeFilter, setActiveFilter] = useState<ChefFilterId>("all");
  const [query, setQuery] = useState("");
  const displayedChefs = useMemo(
    () => filterChefs(tabletChefRoster, query, activeFilter),
    [activeFilter, query],
  );

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#050607] pb-[86px] text-white"
      id="chefs"
    >
      <TabletChefsHeader
        query={query}
        onClearQuery={() => setQuery("")}
        onQueryChange={setQuery}
      />

      <main className="w-full">
        <section className="relative h-[288px] overflow-hidden border-y border-white/[0.04] bg-black/42">
          <Image
            alt="The four master chefs of Sushi Bliss"
            className="object-cover object-[57%_27%] opacity-86"
            fill
            loading="eager"
            priority
            sizes="1086px"
            src="/assets/chefs/sushi-bliss-master-chef-team.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,1)_0%,rgba(5,6,7,0.92)_31%,rgba(5,6,7,0.36)_60%,rgba(5,6,7,0.1)_78%,rgba(5,6,7,0.52)),linear-gradient(180deg,rgba(5,6,7,0.08),rgba(5,6,7,0.84))]" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[950px] translate-y-3 flex-col justify-center px-6 min-[900px]:px-0">
            <h1 className="editorial-title max-w-[610px] text-[52px] leading-[0.98] tracking-[0.12em] text-white">
              <span className="block whitespace-nowrap">Master Chefs</span>
              <span className="block tracking-[0.16em] text-[var(--sb-red-bright)]">
                Our Team
              </span>
            </h1>
            <p className="mt-5 max-w-[390px] text-[18px] leading-7 text-white/68">
              Meet the talented artisans behind your unforgettable dining
              experience.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-[150px] bg-[var(--sb-border)]" />
              <AssetIcon size={28} src="/assets/icons/floral-emblem-icon.png" />
              <span className="h-px w-[150px] bg-[var(--sb-border)]" />
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[950px] px-4 min-[900px]:px-0">
          <nav
            aria-label="Tablet chef filters"
            className="mt-3 grid h-[60px] grid-cols-3 rounded-[8px] border border-white/12 bg-white/[0.035] p-1"
          >
            {chefFilters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  aria-pressed={isActive}
                  className={classNames(
                    "grid h-full grid-cols-[32px_auto] place-content-center items-center gap-3 text-[12px] uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    isActive
                      ? "red-glow-button rounded-[7px]"
                      : "border-l border-white/10 text-white/62 hover:text-white first:border-l-0",
                  )}
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  type="button"
                >
                  <AssetIcon size={25} src={filter.icon} />
                  {filter.label}
                </button>
              );
            })}
          </nav>

          <section className="mt-3 grid grid-cols-2 gap-3.5">
            {displayedChefs.length > 0 ? (
              displayedChefs.map((chef, index) => (
                <TabletChefCard
                  chef={chef}
                  imagePriority={index < 4}
                  key={chef.id}
                  onViewChef={setSelectedChef}
                />
              ))
            ) : (
              <div className="col-span-2 rounded-[14px] border border-white/12 bg-white/[0.035] p-8 text-center">
                <p className="text-[18px] uppercase text-[var(--sb-gold-soft)]">
                  No chefs match this search
                </p>
                <button
                  className="mt-4 rounded-full border border-[var(--sb-border)] px-5 py-2 text-[12px] uppercase tracking-[0.08em] text-white/72"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  Clear search
                </button>
              </div>
            )}
          </section>

          <TabletChefTablePanel />
          <TabletChefCounterFlow />
        </div>
      </main>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet chefs navigation"
        compact
        edge
      />
      <ChefDetailModal
        chef={selectedChef}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedChef(null);
          }
        }}
      />
    </section>
  );
}

function TabletChefsHeader({
  onClearQuery,
  onQueryChange,
  query,
}: {
  query: string;
  onClearQuery: () => void;
  onQueryChange: (query: string) => void;
}) {
  return (
    <header className="mx-auto grid h-[98px] w-full max-w-[1034px] grid-cols-[210px_48px_minmax(0,1fr)_214px] items-center gap-4 px-5 min-[900px]:px-0">
      <Link className="flex items-center gap-5" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          loading="eager"
          size={70}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[23px] uppercase leading-[1.05] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <Link
        aria-label="Back to profile"
        className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        href="/profile"
      >
        <ChevronIcon direction="left" size={24} />
      </Link>

      <form
        className="mx-auto flex h-[58px] w-full max-w-[360px] items-center gap-4 rounded-[24px] border border-white/16 bg-white/[0.035] px-6 focus-within:border-[var(--sb-gold)] focus-within:ring-2 focus-within:ring-[var(--sb-gold)]/20"
        onSubmit={(event) => event.preventDefault()}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-chefs-search">
          Search chefs
        </label>
        <input
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/58"
          id="tablet-chefs-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search chefs..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear chef search"
            className="grid h-8 w-8 place-items-center rounded-full text-white/72 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            onClick={onClearQuery}
            type="button"
          >
            <ChevronIcon direction="x" size={16} />
          </button>
        ) : null}
      </form>

      <div className="flex items-center justify-end gap-5">
        <TabletHeaderIcon
          badge={3}
          href="/notifications"
          icon={icons.bell}
          label="Open notifications"
        />
        <TabletHeaderIcon
          badge={2}
          href="/favorites"
          icon="/assets/icons/heart-icon.png"
          label="Open favorites"
        />
        <Link
          aria-label="Open profile"
          className="grid h-14 w-14 place-items-center rounded-full border border-[var(--sb-gold)]/62 text-[var(--sb-gold-soft)]"
          href="/profile"
        >
          <AssetIcon size={34} src={icons.profile} />
        </Link>
      </div>
    </header>
  );
}

function TabletHeaderIcon({
  badge,
  href,
  icon,
  label,
}: {
  badge: number;
  href: string;
  icon?: string;
  label: string;
}) {
  return (
    <Link
      aria-label={label}
      className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold-soft)]"
      href={href}
    >
      <AssetIcon size={32} src={icon} />
      <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
        {badge}
      </span>
    </Link>
  );
}

function TabletChefCard({
  chef,
  imagePriority,
  onViewChef,
}: {
  chef: Chef;
  imagePriority: boolean;
  onViewChef: (chef: Chef) => void;
}) {
  return (
    <article className="grid min-h-[276px] grid-cols-[166px_minmax(0,1fr)] overflow-hidden rounded-[7px] border border-white/12 bg-white/[0.035] min-[820px]:grid-cols-[178px_minmax(0,1fr)] min-[900px]:min-h-[250px] min-[900px]:grid-cols-[190px_minmax(0,1fr)]">
      <div className="relative min-h-full bg-black/30">
        <Image
          alt={chef.standingImage.alt || chef.name}
          className="object-cover object-top"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority || undefined}
          sizes="(max-width: 819px) 166px, (max-width: 899px) 178px, 190px"
          src={chef.standingImage.publicUrl}
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border)] bg-black/54">
          <AssetIcon size={24} src="/assets/icons/floral-emblem-icon.png" />
        </span>
      </div>
      <div className="flex min-w-0 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {chef.position}
        </p>
        <h2 className="mt-1 font-serif text-[28px] leading-none text-white">
          {chef.name}
        </h2>
        <p className="mt-3 line-clamp-3 min-h-[54px] text-[13px] leading-[18px] text-white/58">
          {chef.about}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 min-[900px]:grid-cols-2">
          <TabletChefSignal label="Signature" value={chef.specialty} />
          <TabletChefSignal label="Service" value={chef.sushi} />
        </div>
        <button
          className="red-glow-button mt-auto flex h-11 w-full items-center justify-center gap-8 rounded-[7px] text-[12px] uppercase tracking-[0.08em]"
          onClick={() => onViewChef(chef)}
          type="button"
        >
          <span>View profile</span>
          <ChevronIcon direction="right" size={16} />
        </button>
      </div>
    </article>
  );
}

function TabletChefSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[7px] border border-[var(--sb-border)] bg-black/20 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/42">
        {label}
      </p>
      <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-[var(--sb-gold-soft)]">
        {value}
      </p>
    </div>
  );
}

function TabletChefTablePanel() {
  return (
    <section className="mt-3 grid grid-cols-[minmax(0,1fr)_340px] overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(128,16,14,0.18),rgba(255,255,255,0.035)_42%,rgba(215,168,79,0.1))]">
      <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center gap-4 px-5 py-3">
        <AssetIcon size={58} src="/assets/icons/floral-emblem-icon.png" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-red-bright)]">
            Chef&apos;s table
          </p>
          <h2 className="mt-1 font-serif text-[22px] leading-none text-white">
            Complete the night at the counter.
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {chefTableHighlights.map(([value, label]) => (
              <div key={label}>
                <p className="font-mono text-[18px] font-semibold text-[var(--sb-gold-soft)]">
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/48">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid content-center gap-3 border-l border-white/10 px-5">
        <Link
          className="red-glow-button flex h-11 items-center justify-center gap-8 rounded-[7px] text-[12px] uppercase tracking-[0.08em]"
          href="/reservations"
        >
          <span>Reserve chef&apos;s table</span>
          <ChevronIcon direction="right" size={16} />
        </Link>
        <Link
          className="flex h-10 items-center justify-center gap-8 rounded-[7px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/omakase"
        >
          <span>View omakase</span>
          <ChevronIcon direction="right" size={16} />
        </Link>
      </div>
    </section>
  );
}

function TabletChefCounterFlow() {
  return (
    <section className="mt-3 rounded-[8px] border border-white/10 bg-white/[0.025] px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Tonight&apos;s counter flow
          </p>
          <h2 className="mt-1 font-serif text-[22px] leading-none text-white">
            Four chefs, one composed service.
          </h2>
        </div>
        <p className="max-w-[300px] text-right text-[12px] leading-5 text-white/50">
          A complete arc from selection to dessert, designed for a quiet luxury
          omakase pace.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {chefCounterFlow.map(([step, title, copy]) => (
          <article
            className="rounded-[7px] border border-[var(--sb-border)] bg-black/18 p-3"
            key={step}
          >
            <p className="font-mono text-[18px] font-semibold text-[var(--sb-red-bright)]">
              {step}
            </p>
            <h3 className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              {title}
            </h3>
            <p className="mt-2 text-[11px] leading-4 text-white/48">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
