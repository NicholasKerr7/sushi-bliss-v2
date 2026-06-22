import { classNames } from "@/lib/classNames";
import type { LoyaltyAccount } from "@/types/loyalty";

import { getDesktopProfileProgressWidthClass } from "./DesktopProfileSettingsData";
import { SettingsCard } from "./DesktopProfileSettingsPrimitives";

export function DesktopLoyaltyCompactCard({
  account,
  progress,
}: {
  account: LoyaltyAccount;
  progress: number;
}) {
  return (
    <SettingsCard
      title="Loyalty status"
      icon="/assets/icons/floral-emblem-icon.png"
      id="desktop-profile-loyalty"
    >
      <p className="font-mono text-[26px] text-white">
        {account.points.toLocaleString()} PTS
      </p>
      <p className="mt-1 text-[13px] text-white/58">
        750 pts to reach Platinum
      </p>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <span
          className={classNames(
            "block h-full rounded-full bg-[var(--sb-gold)]",
            getDesktopProfileProgressWidthClass(progress),
          )}
        />
      </div>
    </SettingsCard>
  );
}
