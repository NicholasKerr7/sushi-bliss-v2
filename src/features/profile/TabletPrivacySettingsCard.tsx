import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import type { UserPreferences } from "@/types/user";

import { tabletPrivacyRows } from "./TabletProfilePreferencesData";
import { TabletSwitch } from "./TabletProfilePreferencesPrimitives";

export function TabletPrivacySettingsCard({
  preferences,
  onAccountAction,
  onLoginAlertsChange,
}: {
  preferences: UserPreferences;
  onAccountAction: (message: string) => void;
  onLoginAlertsChange: (checked: boolean) => void;
}) {
  return (
    <article className="hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4 lg:block">
      <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
        <AssetIcon size={24} src="/assets/icons/chef-crest-icon.png" />
        Privacy & settings
      </h2>
      <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
        {tabletPrivacyRows.map(([label, description, value]) => (
          <button
            className="grid min-h-[40px] w-full grid-cols-[34px_minmax(0,1fr)_80px_18px] items-center gap-3 border-b border-white/10 px-3 text-left last:border-b-0"
            key={label}
            onClick={() => onAccountAction(`${label} opened.`)}
            type="button"
          >
            <AssetIcon size={22} src={icons.profile} />
            <span className="min-w-0">
              <span className="block truncate text-[13px] text-white">
                {label}
              </span>
              <span className="mt-1 block truncate text-[11px] text-white/52">
                {description}
              </span>
            </span>
            <span className="truncate text-right text-[12px] text-white/62">
              {value}
            </span>
            <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </button>
        ))}
        <div className="grid min-h-[40px] grid-cols-[34px_minmax(0,1fr)_58px] items-center gap-3 px-3">
          <AssetIcon size={22} src="/assets/icons/check-icon.png" />
          <span>
            <span className="block text-[13px] text-white">
              Biometric Login
            </span>
            <span className="mt-1 block text-[11px] text-white/52">
              Use Face ID / Touch ID to sign in
            </span>
          </span>
          <TabletSwitch
            checked={preferences.privacy.loginAlerts}
            id="tablet-biometric-login"
            label="Biometric login"
            onCheckedChange={onLoginAlertsChange}
          />
        </div>
      </div>
    </article>
  );
}
