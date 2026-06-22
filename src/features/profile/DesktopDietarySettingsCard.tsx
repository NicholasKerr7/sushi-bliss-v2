import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { CardTitle } from "./DesktopProfileSettingsPrimitives";

export function DesktopDietarySettingsCard({
  options,
  selected,
  onDietaryToggle,
}: {
  options: readonly string[];
  selected: string[];
  onDietaryToggle: (option: string) => void;
}) {
  return (
    <article
      className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
      id="desktop-profile-dietary"
    >
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/vegetarian-sushi-icon.webp"
          title="Dietary preferences"
        />
        <span className="rounded-full border border-[var(--sb-gold)]/28 px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Active
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              aria-pressed={active}
              className={classNames(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px]",
                active
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-white"
                  : "border-[var(--sb-gold)]/28 text-white/72",
              )}
              key={option}
              onClick={() => onDietaryToggle(option)}
              type="button"
            >
              {option}
              {active ? (
                <AssetIcon
                  className="brightness-125"
                  size={13}
                  src="/assets/icons/check-icon.png"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <button
        className="mt-5 h-[50px] w-full rounded-[10px] border border-dashed border-[var(--sb-gold)]/26 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={() => onDietaryToggle("Chef Notes")}
        type="button"
      >
        + Add preference
      </button>
    </article>
  );
}
