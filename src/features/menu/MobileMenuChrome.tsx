"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type { MenuCategory } from "@/types/menu";

export const recentMobileSearches = [
  "tuna",
  "otoro",
  "dragon roll",
  "spicy roll",
  "uni",
];

export function MobileMenuHeader({
  cartItemCount,
  onOpenCart,
}: {
  cartItemCount: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="flex items-center justify-between">
      <Link className="flex items-center gap-3" href="/home">
        <AssetIcon
          alt="Sushi Bliss"
          className="rounded-full"
          size={54}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] leading-[0.95] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <div className="flex items-center gap-3">
        {cartItemCount > 0 ? (
          <button
            className="flex h-[52px] items-center gap-2 rounded-[18px] border border-[var(--sb-border)] bg-black/46 px-4 text-[15px] text-white/86 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
            onClick={onOpenCart}
            type="button"
          >
            <span className="relative">
              <AssetIcon size={24} src={icons.cart} />
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            </span>
            <span className="sr-only">Open cart</span>
            <span aria-hidden="true">&gt;</span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
          href="/notifications"
        >
          <AssetIcon size={27} src={icons.bell} />
          <span className="absolute right-3 top-2.5 h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)]" />
        </Link>
      </div>
    </header>
  );
}

export function MobileSearchForm({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="grid grid-cols-[1fr_56px] gap-3" onSubmit={handleSubmit}>
      <label
        className={classNames(
          "flex h-14 items-center gap-3 rounded-[14px] border bg-black/52 px-4 backdrop-blur-xl",
          query ? "border-[var(--sb-red-bright)]" : "border-[var(--sb-border)]",
        )}
      >
        <AssetIcon size={23} src={icons.search} />
        <span className="sr-only">Search sushi, rolls, or dishes</span>
        <input
          className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/58"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search sushi, rolls, or dishes..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear search"
            className="grid h-7 w-7 place-items-center rounded-full bg-white/16"
            onClick={() => onQueryChange("")}
            type="button"
          >
            <AssetIcon size={15} src={icons.x} />
          </button>
        ) : null}
      </label>
      <button
        aria-label="Filter menu"
        className="grid h-14 w-14 place-items-center rounded-[14px] border border-[var(--sb-border)] bg-black/52"
        onClick={() => onQueryChange(query.trim() || "tuna")}
        type="button"
      >
        <AssetIcon size={27} src={icons.settings} />
      </button>
    </form>
  );
}

export function MobileCategoryPills({
  activeCategory,
  categories,
  onSelectCategory,
}: {
  activeCategory: string;
  categories: MenuCategory[];
  onSelectCategory: (categoryId: string) => void;
}) {
  return (
    <nav
      aria-label="Mobile menu categories"
      className="mt-5 flex gap-3 overflow-x-auto pb-2"
    >
      {categories.map((item) => {
        const active = item.id === activeCategory;

        return (
          <button
            aria-pressed={active}
            className={classNames(
              "min-h-[52px] shrink-0 rounded-[16px] border px-5 text-[14px] uppercase transition",
              active
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/48 text-white shadow-[0_0_28px_var(--sb-red-glow)]"
                : "border-white/14 bg-white/[0.035] text-white/78",
            )}
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function MobileSectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-7 flex items-center justify-between">
      <h2 className="editorial-title text-[22px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
        {title}
      </h2>
      <Link
        className="flex items-center gap-2 text-[15px] text-[var(--sb-red-bright)]"
        href="/menu"
      >
        View All <span aria-hidden="true">&gt;</span>
      </Link>
    </div>
  );
}
