import type { ReactNode } from "react";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type { MenuCategory } from "@/types/menu";

interface TabletCategoryControlProps {
  category: string;
  categories: MenuCategory[];
  variant?: "bar" | "pills";
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

const tabletCategoryTabs = [
  { id: "all", icon: icons.star, label: "Recommended" },
  { id: "nigiri", icon: icons.nigiri, label: "Nigiri" },
  { id: "rolls", icon: icons.menu, label: "Rolls" },
  { id: "sashimi", icon: icons.sashimi, label: "Sashimi" },
  { id: "chef-specials", icon: icons.crown, label: "Chef Specials" },
  { id: "vegetarian", icon: icons.leaf, label: "Vegetarian" },
  {
    disabledReason: "Drinks coming soon",
    id: "drinks",
    icon: icons.miso,
    label: "Drinks",
  },
] as const;

function isAvailableTabletCategory(
  categories: MenuCategory[],
  categoryId: string,
) {
  if (categoryId === "all" || categoryId === "chef-specials") {
    return true;
  }

  return categories.some((item) => item.id === categoryId);
}

export function TabletCategoryBar({
  category,
  categories,
  variant = "bar",
  onSelectCategory,
}: TabletCategoryControlProps) {
  const isPillVariant = variant === "pills";

  return (
    <nav
      aria-label="Tablet menu categories"
      className={classNames(
        "grid grid-cols-4 gap-2",
        isPillVariant
          ? "mt-4 lg:grid-cols-[1.16fr_0.74fr_0.74fr_0.84fr_1.18fr_1fr_0.74fr] lg:gap-3"
          : "mt-3 lg:grid-cols-[1.16fr_0.74fr_0.74fr_0.84fr_1.18fr_1fr_0.74fr] lg:gap-0 lg:overflow-hidden lg:rounded-[12px] lg:border lg:border-white/14 lg:bg-white/[0.035]",
      )}
    >
      {tabletCategoryTabs.map((item) => {
        const disabled =
          "disabledReason" in item ||
          !isAvailableTabletCategory(categories, item.id);
        const isActive = category === item.id;

        return (
          <button
            aria-label={item.label}
            aria-pressed={isActive}
            className={classNames(
              "flex min-h-[46px] min-w-0 items-center justify-center gap-2 whitespace-nowrap px-2 text-[12px] uppercase transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] lg:text-[13px]",
              isPillVariant
                ? "rounded-[10px] border lg:px-3"
                : "rounded-[10px] border lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:last:border-r-0",
              isPillVariant
                ? isActive
                  ? "border-[var(--sb-gold)] bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] text-black shadow-[0_0_24px_rgb(215_168_79_/_0.22)]"
                  : "border-white/14 bg-black/24 text-white/72 hover:border-[var(--sb-gold)]/36 hover:bg-white/[0.055] hover:text-white"
                : isActive
                  ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/28 text-[var(--sb-gold)] lg:border-white/10"
                  : "border-white/14 bg-black/24 text-white/72 hover:bg-white/[0.045] hover:text-white lg:bg-transparent",
              disabled ? "hover:border-white/14 hover:bg-black/24" : "",
            )}
            disabled={disabled}
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            title={"disabledReason" in item ? item.disabledReason : undefined}
            type="button"
          >
            <AssetIcon size={20} src={item.icon} />
            <span>{item.label}</span>
          </button>
        );
      })}
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
      {tabletCategoryTabs.map((item) => {
        const disabled =
          "disabledReason" in item ||
          !isAvailableTabletCategory(categories, item.id);

        return (
          <button
            aria-pressed={category === item.id}
            className={`flex min-h-[108px] flex-col items-center justify-center gap-2 rounded-[10px] border text-sm uppercase disabled:cursor-not-allowed disabled:opacity-45 ${
              category === item.id
                ? "border-[var(--sb-gold)] bg-[var(--sb-red)]/18 text-white shadow-[0_0_22px_var(--sb-red-glow)]"
                : "border-white/12 bg-white/[0.035] text-white/78"
            }`}
            disabled={disabled}
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            title={"disabledReason" in item ? item.disabledReason : undefined}
            type="button"
          >
            <AssetIcon size={34} src={item.icon} />
            {item.label}
          </button>
        );
      })}
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
      <ChevronIcon className="text-[var(--sb-gold)]" direction="down" />
    </button>
  );
}

export function TabletFilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        className="h-12 min-w-[150px] appearance-none rounded-[9px] border border-[var(--sb-border)] bg-black/22 px-5 pr-10 text-sm uppercase text-white outline-none focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/25"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option className="bg-[#050607] text-white" key={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronIcon
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sb-gold)]"
        direction="down"
      />
    </label>
  );
}

export function TabletSection({ children, icon, title }: TabletSectionProps) {
  return (
    <section className="mt-3 rounded-[14px] border border-white/14 bg-white/[0.035] p-3.5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-base uppercase tracking-[0.08em] text-white">
          {icon ? <AssetIcon size={24} src={icon} /> : null}
          {title}
        </h2>
        {icon ? (
          <Link
            className="text-sm uppercase text-[var(--sb-gold)]"
            href="/menu"
          >
            View All <ChevronIcon direction="right" size={18} />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
