"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { chefs } from "@/data/chefs";
import { brand, icons } from "@/features/home/visualHomeData";
import type { Chef } from "@/types/chef";

import { ChefDetailModal } from "./ChefDetailModal";

const chefTabs = [
  ["Head chefs", "/assets/icons/user-icon.png"],
  ["Sushi masters", "/assets/icons/sushi-menu-icon.png"],
  ["Hospitality team", "/assets/icons/group-icon.png"],
] as const;

const chefById = new Map(chefs.map((chef) => [chef.id, chef]));

function tabletChefCard(
  sourceId: string,
  overrides: Pick<
    Chef,
    "about" | "id" | "name" | "position" | "specialty" | "sushi"
  >,
): Chef {
  const source = chefById.get(sourceId) || chefById.get("hiroshi-tanaka");

  if (!source) {
    throw new Error("Tablet chef roster requires at least one chef profile.");
  }

  return {
    ...source,
    ...overrides,
  };
}

const tabletChefRoster = [
  tabletChefCard("hiroshi-tanaka", {
    about:
      "30+ years of mastery in Edomae sushi. Trained in Tokyo, dedicated to perfection and tradition.",
    id: "hiroshi-tanaka",
    name: "Hiroshi Tanaka",
    position: "Executive Head Chef",
    specialty: "Edomae Sushi",
    sushi: "Omakase",
  }),
  tabletChefCard("kenji-sato", {
    about:
      "Innovative yet authentic, Kenji brings creativity and precision to every plate.",
    id: "kenji-sato",
    name: "Kenji Sato",
    position: "Head Chef",
    specialty: "Nigiri",
    sushi: "Seasonal Creations",
  }),
  tabletChefCard("ren-mori", {
    about:
      "Master of the flame. Daichi combines tradition and fire to elevate every bite.",
    id: "daichi-nakamura",
    name: "Daichi Nakamura",
    position: "Robatayaki Head Chef",
    specialty: "Robatayaki",
    sushi: "Grilled Specialties",
  }),
  tabletChefCard("hiroshi-tanaka", {
    about:
      "Precision, patience, and passion in every cut. Specialist in premium fish and aging.",
    id: "takashi-yamada",
    name: "Takashi Yamada",
    position: "Sushi Master",
    specialty: "Sashimi",
    sushi: "Fish Aging",
  }),
  tabletChefCard("kenji-sato", {
    about:
      "Artistry in balance and harmony. Ryuichi crafts sushi that delights all the senses.",
    id: "ryuichi-mori",
    name: "Ryuichi Mori",
    position: "Sushi Master",
    specialty: "Hand Roll",
    sushi: "Custom Creations",
  }),
  tabletChefCard("ren-mori", {
    about:
      "Young, driven, and detail-oriented. Sota represents the future of sushi craftsmanship.",
    id: "sota-fujimoto",
    name: "Sota Fujimoto",
    position: "Sushi Master",
    specialty: "Nigiri",
    sushi: "Modern Sushi",
  }),
] satisfies Chef[];

function filterChefsByQuery(roster: Chef[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return roster;
  }

  return roster.filter((chef) =>
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
  const [query, setQuery] = useState("");
  const displayedChefs = useMemo(
    () => filterChefsByQuery(tabletChefRoster, query),
    [query],
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
            alt="Chef preparing nigiri at Sushi Bliss"
            className="object-cover object-[62%_77%] opacity-86"
            fill
            priority
            sizes="1086px"
            src="/assets/chefs/kenji-sato-sous-chef-plating.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,1)_0%,rgba(5,6,7,0.94)_28%,rgba(5,6,7,0.48)_56%,rgba(5,6,7,0.18)_78%,rgba(5,6,7,0.64)),linear-gradient(180deg,rgba(5,6,7,0),rgba(5,6,7,0.72))]" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[950px] translate-y-3 flex-col justify-center">
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

        <div className="mx-auto w-full max-w-[950px]">
          <nav
            aria-label="Tablet chef teams"
            className="mt-3 grid h-[60px] grid-cols-3 rounded-[8px] border border-white/12 bg-white/[0.035] p-1"
          >
            {chefTabs.map(([label, icon], index) => (
              <button
                aria-pressed={index === 0}
                className={
                  index === 0
                    ? "red-glow-button grid h-full grid-cols-[32px_auto] place-content-center items-center gap-3 rounded-[7px] text-[12px] uppercase tracking-[0.08em]"
                    : "grid h-full grid-cols-[32px_auto] place-content-center items-center gap-3 border-l border-white/10 text-[12px] uppercase tracking-[0.08em] text-white/62 first:border-l-0"
                }
                key={label}
                type="button"
              >
                <AssetIcon size={25} src={icon} />
                {label}
              </button>
            ))}
          </nav>

          <section className="mt-3 grid grid-cols-3 gap-3.5">
            {displayedChefs.length > 0 ? (
              displayedChefs.map((chef, index) => (
                <TabletChefCard
                  chef={chef}
                  compact={index >= 3}
                  imagePriority={index < 3}
                  key={chef.id}
                  onViewChef={setSelectedChef}
                />
              ))
            ) : (
              <div className="col-span-3 rounded-[14px] border border-white/12 bg-white/[0.035] p-8 text-center">
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

          <section className="mt-3 grid grid-cols-[78px_minmax(0,1fr)_308px] items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.04] px-5 py-2">
            <AssetIcon size={58} src="/assets/icons/floral-emblem-icon.png" />
            <div>
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Our philosophy
              </h2>
              <p className="mt-1 text-[14px] leading-5 text-white/56">
                Respect for tradition. Passion for excellence. Each dish
                reflects our commitment.
              </p>
            </div>
            <Link
              className="grid h-[44px] place-items-center rounded-[12px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href="/about"
            >
              Meet our full team
            </Link>
          </section>
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
    <header className="mx-auto grid h-[98px] w-full max-w-[1034px] grid-cols-[210px_48px_minmax(0,1fr)_214px] items-center gap-4">
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
          placeholder="Search menu, chefs, items..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear chef search"
            className="grid h-7 w-7 place-items-center text-white/82"
            onClick={onClearQuery}
            type="button"
          >
            <AssetIcon size={18} src={icons.x} />
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
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
        {badge}
      </span>
    </Link>
  );
}

function TabletChefCard({
  chef,
  compact,
  imagePriority,
  onViewChef,
}: {
  chef: Chef;
  compact: boolean;
  imagePriority: boolean;
  onViewChef: (chef: Chef) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[7px] border border-white/12 bg-white/[0.035]">
      <div
        className={
          compact
            ? "relative h-[136px] bg-black/30"
            : "relative h-[178px] bg-black/30"
        }
      >
        <Image
          alt=""
          className="object-cover object-top"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority || undefined}
          sizes="330px"
          src={chef.standingImage.publicUrl}
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border)] bg-black/54">
          <AssetIcon size={24} src="/assets/icons/floral-emblem-icon.png" />
        </span>
      </div>
      <div className={compact ? "px-4 pb-3 pt-3" : "p-4"}>
        <h2
          className={
            compact
              ? "font-serif text-[26px] leading-none text-white"
              : "font-serif text-[27px] leading-none text-white"
          }
        >
          {chef.name}
        </h2>
        <p className="mt-1 text-[13px] font-semibold text-[var(--sb-gold-soft)]">
          {chef.position}
        </p>
        <p
          className={
            compact
              ? "mt-3 line-clamp-2 min-h-9 text-[13px] leading-[18px] text-white/58"
              : "mt-3 line-clamp-3 min-h-[54px] text-[13px] leading-[18px] text-white/58"
          }
        >
          {chef.about}
        </p>
        <p
          className={
            compact
              ? "mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
              : "mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
          }
        >
          Specialties
        </p>
        <div
          className={
            compact
              ? "mt-1 flex flex-wrap gap-2"
              : "mt-1.5 flex flex-wrap gap-2"
          }
        >
          {[chef.specialty, chef.sushi].map((specialty) => (
            <span
              className="rounded-full border border-[var(--sb-border)] px-3 py-1 text-[10px] text-[var(--sb-gold-soft)]"
              key={specialty}
            >
              {specialty}
            </span>
          ))}
        </div>
        <button
          className={
            compact
              ? "red-glow-button mt-2 flex h-8 w-full items-center justify-center gap-14 rounded-[7px] text-[12px] uppercase tracking-[0.08em]"
              : "red-glow-button mt-3 flex h-9 w-full items-center justify-center gap-14 rounded-[7px] text-[12px] uppercase tracking-[0.08em]"
          }
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
