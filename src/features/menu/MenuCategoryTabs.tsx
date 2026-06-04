"use client";

import { classNames } from "@/lib/classNames";
import type { MenuCategory } from "@/types/menu";

interface MenuCategoryTabsProps {
  activeCategory: string;
  categories: MenuCategory[];
  onCategoryChange: (categoryId: string) => void;
}

export function MenuCategoryTabs({
  activeCategory,
  categories,
  onCategoryChange,
}: MenuCategoryTabsProps) {
  return (
    <div
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto pb-2"
      role="group"
    >
      {categories.map((category) => {
        const isActive = category.id === activeCategory;

        return (
          <button
            aria-pressed={isActive}
            className={classNames(
              "min-h-10 shrink-0 rounded-control border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              isActive
                ? "border-sb-gold bg-sb-gold/15 text-sb-gold-soft"
                : "border-sb-line bg-sb-rice/5 text-sb-muted hover:bg-sb-rice/10 hover:text-sb-rice",
            )}
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            type="button"
          >
            {category.label}
            <span className="ml-2 font-mono text-xs opacity-75">
              {category.itemCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}
