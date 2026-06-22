import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

import type { TabletCategoryContent } from "./TabletMenuCategoryData";
import {
  tabletDietaryOptions,
  tabletSortOptions,
  tabletSpiceOptions,
} from "./TabletMenuCategoryData";
import { TabletFilterSelect } from "./TabletMenuControls";

export function TabletMenuCategoryFilters({
  content,
  dietary,
  isDrinksCategory,
  primaryFilter,
  searchQuery,
  sort,
  spice,
  onClearSearch,
  onDietaryChange,
  onPrimaryFilterChange,
  onSearchChange,
  onSortChange,
  onSpiceChange,
}: {
  content: TabletCategoryContent;
  dietary: string;
  isDrinksCategory: boolean;
  primaryFilter: string;
  searchQuery: string;
  sort: string;
  spice: string;
  onClearSearch: () => void;
  onDietaryChange: (value: string) => void;
  onPrimaryFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onSpiceChange: (value: string) => void;
}) {
  return (
    <div className="mt-5 rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.34)]">
      <div
        className={classNames(
          "grid grid-cols-2 gap-3 min-[1080px]:gap-4",
          isDrinksCategory
            ? "lg:grid-cols-[minmax(280px,1fr)_210px_170px]"
            : "lg:grid-cols-[minmax(252px,1.28fr)_repeat(4,minmax(0,1fr))]",
        )}
      >
        <form
          className={classNames(
            "relative col-span-2 flex h-[58px] min-w-0 items-center gap-3 rounded-[13px] border px-4 transition focus-within:border-[var(--sb-gold)] focus-within:ring-2 focus-within:ring-[var(--sb-gold)]/25 lg:col-span-1",
            searchQuery
              ? "border-[var(--sb-gold)] bg-white/[0.06] shadow-[0_0_24px_rgb(215_168_79_/_0.12)]"
              : "border-white/14 bg-black/28 hover:border-[var(--sb-gold)]/34 hover:bg-white/[0.055]",
          )}
          onSubmit={(event) => event.preventDefault()}
        >
          <AssetIcon className="mt-4" size={22} src={icons.search} />
          <label className="sr-only" htmlFor="tablet-category-search">
            Search {content.title}
          </label>
          <span className="pointer-events-none absolute left-[54px] top-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]/72">
            Search
          </span>
          <input
            className="h-full min-w-0 flex-1 bg-transparent pt-4 text-[15px] text-white outline-none placeholder:text-white/44"
            id="tablet-category-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={content.placeholder}
            value={searchQuery}
          />
          {searchQuery ? (
            <button
              aria-label={`Clear ${content.title} search`}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-black/34 text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onClearSearch}
              type="button"
            >
              <ChevronIcon direction="x" size={16} />
            </button>
          ) : null}
        </form>
        <TabletFilterSelect
          label={content.filterLabel}
          options={content.filterOptions}
          value={primaryFilter}
          onChange={onPrimaryFilterChange}
        />
        {isDrinksCategory ? null : (
          <>
            <TabletFilterSelect
              label="Diet"
              options={tabletDietaryOptions}
              value={dietary}
              onChange={onDietaryChange}
            />
            <TabletFilterSelect
              label="Heat"
              options={tabletSpiceOptions}
              value={spice}
              onChange={onSpiceChange}
            />
          </>
        )}
        <TabletFilterSelect
          label="Sort"
          options={tabletSortOptions}
          value={sort}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
}
