import type { ReactNode } from "react";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import type { MenuCategory } from "@/types/menu";

interface TabletCategoryControlProps {
  category: string;
  categories: MenuCategory[];
  onSelectCategory: (categoryId: string) => void;
}

interface TabletSegmentGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

interface TabletSectionProps {
  children: ReactNode;
  icon?: string;
  title: string;
}

export function TabletCategoryBar({
  category,
  categories,
  onSelectCategory,
}: TabletCategoryControlProps) {
  return (
    <nav
      aria-label="Tablet menu categories"
      className="mt-4 grid grid-cols-7 rounded-[12px] border border-white/14 bg-white/[0.035]"
    >
      {categories.slice(0, 7).map((item) => (
        <button
          aria-pressed={category === item.id}
          className={`flex min-h-[48px] items-center justify-center gap-3 border-r border-white/10 px-4 text-sm uppercase last:border-r-0 ${
            category === item.id
              ? "bg-[var(--sb-gold)]/28 text-[var(--sb-gold)]"
              : "text-white/72"
          }`}
          key={item.id}
          onClick={() => onSelectCategory(item.id)}
          type="button"
        >
          <AssetIcon size={22} src={getCategoryIcon(item.id)} />
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export function TabletCategoryTiles({
  category,
  categories,
  onSelectCategory,
}: TabletCategoryControlProps) {
  return (
    <div className="mt-4 grid grid-cols-7 gap-3">
      {categories.slice(0, 7).map((item) => (
        <button
          aria-pressed={category === item.id}
          className={`flex min-h-[108px] flex-col items-center justify-center gap-2 rounded-[10px] border text-sm uppercase ${
            category === item.id
              ? "border-[var(--sb-gold)] bg-[var(--sb-red)]/18 text-white shadow-[0_0_22px_var(--sb-red-glow)]"
              : "border-white/12 bg-white/[0.035] text-white/78"
          }`}
          key={item.id}
          onClick={() => onSelectCategory(item.id)}
          type="button"
        >
          <AssetIcon size={34} src={getCategoryIcon(item.id)} />
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function TabletSegmentGroup({
  label,
  options,
  value,
  onChange,
}: TabletSegmentGroupProps) {
  return (
    <div>
      <p className="mb-2 text-sm uppercase text-white/78">{label}</p>
      <div className="flex overflow-hidden rounded-[8px] border border-[var(--sb-border)]">
        {options.map((option) => (
          <button
            aria-pressed={value === option}
            className={`h-10 border-r border-[var(--sb-border)] px-5 text-sm last:border-r-0 ${
              value === option
                ? "red-glow-button text-white"
                : "bg-black/22 text-white/76"
            }`}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TabletSelectButton({ label }: { label: string }) {
  return (
    <button
      className="flex h-11 min-w-[132px] items-center justify-between gap-6 rounded-[9px] border border-[var(--sb-border)] bg-black/22 px-5 text-sm uppercase text-white"
      type="button"
    >
      {label}
      <span className="text-[var(--sb-gold)]" aria-hidden="true">
        v
      </span>
    </button>
  );
}

export function TabletSection({ children, icon, title }: TabletSectionProps) {
  return (
    <section className="mt-4 rounded-[14px] border border-white/14 bg-white/[0.035] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-base uppercase tracking-[0.08em] text-white">
          {icon ? <AssetIcon size={24} src={icon} /> : null}
          {title}
        </h2>
        {icon ? (
          <Link
            className="text-sm uppercase text-[var(--sb-gold)]"
            href="/menu"
          >
            View All &gt;
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function getCategoryIcon(categoryId: string) {
  if (categoryId === "all") return icons.flower;
  if (categoryId === "nigiri") return icons.nigiri;
  if (categoryId === "rolls") return icons.menu;
  if (categoryId === "sashimi") return icons.sashimi;
  if (categoryId === "vegetarian") return icons.leaf;
  if (categoryId === "drinks") return icons.miso;
  return icons.crown;
}
