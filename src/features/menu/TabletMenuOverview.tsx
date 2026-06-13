import Image from "next/image";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import Link from "next/link";

import { featuredAssets, icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";
import type { MenuCategory, MenuItem } from "@/types/menu";

import {
  allTabletMenuItems,
  chefSpecialItems,
  menuHeroItem,
} from "./tabletMenuData";
import { TabletCompactMenuRow, TabletMenuCard } from "./TabletMenuCards";
import {
  TabletCategoryBar,
  TabletSection,
  TabletSelectButton,
} from "./TabletMenuControls";

interface TabletMenuOverviewProps {
  category: string;
  categories: MenuCategory[];
  isFavorite: (itemId: string) => boolean;
  onAddToCart: (item: MenuItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

export function TabletMenuOverview({
  category,
  categories,
  isFavorite,
  onAddToCart,
  onSelectCategory,
  onToggleFavorite,
  onViewDetails,
}: TabletMenuOverviewProps) {
  return (
    <>
      <section className="relative mt-[18px] min-h-[342px] overflow-hidden rounded-[14px] border border-white/16">
        <Image
          alt=""
          className="object-cover object-[72%_45%]"
          fill
          priority
          sizes="1034px"
          src={featuredAssets.heroSushi.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.82)_39%,rgba(0,0,0,0.18)_74%,rgba(0,0,0,0.58)_100%)]" />
        <Link
          aria-label="Previous recommendation"
          className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold)]"
          href="/menu"
        >
          <ChevronIcon direction="left" size={18} />
        </Link>
        <Link
          aria-label="Next recommendation"
          className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold)]"
          href="/menu"
        >
          <ChevronIcon direction="right" size={18} />
        </Link>
        <div className="relative z-10 flex min-h-[342px] flex-col justify-center px-[104px]">
          <p className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
            Chef&apos;s Recommendation
          </p>
          <h1 className="editorial-title mt-3 text-[40px] uppercase tracking-[0.16em] text-white">
            {menuHeroItem.name}
          </h1>
          <p className="mt-2 text-[22px] text-[var(--sb-gold)]">
            {menuHeroItem.description}
          </p>
          <p className="mt-4 max-w-[270px] text-[15px] leading-6 text-white/72">
            Indulge in the melt-in-your-mouth richness of premium otoro.
          </p>
          <p className="mt-5 text-[22px] text-[var(--sb-gold)]">
            {formatMoney(menuHeroItem.priceCents)}
          </p>
          <button
            className="red-glow-button mt-4 flex h-12 w-[205px] items-center justify-center gap-8 rounded-[8px] uppercase tracking-[0.08em] text-white"
            onClick={() => onAddToCart(menuHeroItem)}
            type="button"
          >
            Add to Order
            <span aria-hidden="true">+</span>
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                className={`h-3 w-3 rounded-full ${
                  index === 0 ? "bg-[var(--sb-red-bright)]" : "bg-white/26"
                }`}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
      <TabletCategoryBar
        category={category}
        categories={categories}
        onSelectCategory={onSelectCategory}
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-3">
          <TabletSelectButton label="Dietary" />
          <TabletSelectButton label="Spicy Level" />
        </div>
        <TabletSelectButton label="Sort By" />
      </div>
      <TabletSection title="Chef's Specials" icon={icons.crown}>
        <div className="grid grid-cols-4 gap-3">
          {chefSpecialItems.map((item, index) => (
            <TabletMenuCard
              badge={
                index === 0
                  ? "Chef's Special"
                  : index === 1
                    ? "Hot"
                    : index === 2
                      ? "Signature"
                      : "Premium"
              }
              eagerImage={index < 4}
              isFavorite={isFavorite(item.id)}
              item={item}
              key={item.id}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </TabletSection>
      <TabletSection title="All Menu Items">
        <div className="grid grid-cols-3 gap-3">
          {allTabletMenuItems.map((item, index) => (
            <TabletCompactMenuRow
              eagerImage={index < 3}
              item={item}
              key={item.id}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </TabletSection>
    </>
  );
}
