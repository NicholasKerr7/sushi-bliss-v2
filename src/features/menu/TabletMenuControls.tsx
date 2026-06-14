import { useEffect, useId, useRef, useState, type ReactNode } from "react";
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
  { id: "drinks", icon: icons.miso, label: "Drinks" },
] as const;

function isAvailableTabletCategory(
  categories: MenuCategory[],
  categoryId: string,
) {
  if (
    categoryId === "all" ||
    categoryId === "chef-specials" ||
    categoryId === "drinks"
  ) {
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
        const disabled = !isAvailableTabletCategory(categories, item.id);
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
        const disabled = !isAvailableTabletCategory(categories, item.id);

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
  const listboxId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const defaultValue = options[0] || "";
  const isActive = value !== defaultValue;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative min-w-0" ref={wrapperRef}>
      <button
        aria-controls={open ? listboxId : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        className={classNames(
          "relative flex h-[58px] w-full min-w-0 items-center justify-between gap-3 rounded-[13px] border px-4 pb-2 pt-6 text-left uppercase outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
          isActive
            ? "border-[var(--sb-gold)] bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] text-[#120b04] shadow-[0_0_24px_rgb(215_168_79_/_0.22)]"
            : "border-white/14 bg-black/28 text-white/82 hover:border-[var(--sb-gold)]/34 hover:bg-white/[0.055]",
        )}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span
          className={classNames(
            "pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-[0.14em]",
            isActive ? "text-black/54" : "text-[var(--sb-gold-soft)]/72",
          )}
        >
          {label}
        </span>
        <span
          className={classNames(
            "min-w-0 truncate text-[13px] font-semibold",
            isActive ? "sb-gold-control-value" : "text-white/82",
          )}
        >
          {value}
        </span>
        <ChevronIcon
          className={classNames(
            "transition",
            isActive ? "sb-gold-control-value" : "text-[var(--sb-gold)]",
            open ? "rotate-180" : "",
          )}
          direction="down"
        />
      </button>
      {open ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-[13px] border border-[var(--sb-border)] bg-[#070808] p-1 shadow-[0_20px_60px_rgba(0,0,0,0.52)]"
          id={listboxId}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = value === option;

            return (
              <button
                aria-selected={isSelected}
                className={classNames(
                  "flex h-10 w-full items-center justify-between rounded-[10px] px-3 text-left text-[12px] font-semibold uppercase tracking-[0.04em] transition",
                  isSelected
                    ? "bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] text-[#120b04]"
                    : "text-white/72 hover:bg-white/[0.06] hover:text-white",
                )}
                key={option}
                onClick={() => selectOption(option)}
                role="option"
                type="button"
              >
                {option}
                {isSelected ? (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#120b04]"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
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
