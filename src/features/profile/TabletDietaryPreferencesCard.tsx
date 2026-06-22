import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { tabletDietaryOptions } from "./TabletProfilePreferencesData";

export function TabletDietaryPreferencesCard({
  selectedDietaryTags,
  onDietaryToggle,
}: {
  selectedDietaryTags: string[];
  onDietaryToggle: (option: string) => void;
}) {
  return (
    <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
      <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
        <AssetIcon size={24} src="/assets/icons/vegetarian-sushi-icon.webp" />
        Dietary preferences
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-2 min-[1080px]:gap-3">
        {tabletDietaryOptions.map((option) => {
          const selected = selectedDietaryTags.includes(option);

          return (
            <button
              aria-pressed={selected}
              className={classNames(
                "flex h-[38px] items-center justify-center rounded-[9px] border px-2 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:h-[44px] min-[1080px]:text-[13px]",
                selected
                  ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/80 text-black"
                  : "border-white/10 bg-black/24 text-white/76 hover:border-[var(--sb-gold)]/28",
              )}
              key={option}
              onClick={() => onDietaryToggle(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
      <p className="mt-3 rounded-[12px] border border-white/10 bg-black/24 p-3 text-[12px] leading-5 text-white/58 min-[1080px]:mt-4 min-[1080px]:text-[13px]">
        We personalize menu recommendations from your current selections.
      </p>
    </article>
  );
}
