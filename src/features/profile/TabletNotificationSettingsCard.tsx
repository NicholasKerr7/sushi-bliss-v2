import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import type { UserPreferences } from "@/types/user";

import { tabletNotificationRows } from "./TabletProfilePreferencesData";
import { TabletSwitch } from "./TabletProfilePreferencesPrimitives";

export function TabletNotificationSettingsCard({
  preferences,
  onNotificationChange,
}: {
  preferences: UserPreferences;
  onNotificationChange: (
    key: keyof UserPreferences["notifications"],
    checked: boolean,
  ) => void;
}) {
  return (
    <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
      <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
        <AssetIcon size={24} src={icons.bell} />
        Notifications
      </h2>
      <div className="mt-4 grid overflow-hidden rounded-[12px] border border-white/10">
        {tabletNotificationRows.map((row) => {
          const checked = preferences.notifications[row.key];

          return (
            <div
              className="grid min-h-[46px] grid-cols-[minmax(0,1fr)_58px] items-center gap-3 border-b border-white/10 px-3 py-2 last:border-b-0 min-[1080px]:min-h-[50px]"
              key={row.key}
            >
              <label htmlFor={`tablet-${row.key}`} className="min-w-0">
                <span className="block truncate text-[13px] text-white min-[1080px]:text-[14px]">
                  {row.label}
                </span>
                <span className="mt-1 block truncate text-[11px] text-white/52 min-[1080px]:text-[12px]">
                  {row.description}
                </span>
              </label>
              <TabletSwitch
                checked={checked}
                id={`tablet-${row.key}`}
                label={row.label}
                onCheckedChange={(nextChecked) =>
                  onNotificationChange(row.key, nextChecked)
                }
              />
            </div>
          );
        })}
      </div>
    </article>
  );
}
