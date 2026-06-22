import Link from "next/link";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import type { UserPreferences } from "@/types/user";

import { desktopProfilePrivacyRows } from "./DesktopProfileSettingsData";
import { SettingsCard, SwitchPill } from "./DesktopProfileSettingsPrimitives";

export function DesktopPrivacySecurityCard({
  preferences,
  onPrivacyToggle,
}: {
  preferences: UserPreferences;
  onPrivacyToggle: (key: keyof UserPreferences["privacy"]) => void;
}) {
  return (
    <SettingsCard
      title="Privacy & Security"
      icon="/assets/icons/chef-crest-icon.png"
      id="desktop-profile-privacy"
    >
      {desktopProfilePrivacyRows.map((row) => (
        <button
          aria-pressed={preferences.privacy[row.key]}
          className="flex min-h-[48px] w-full items-center justify-between gap-4 border-b border-white/10 text-left last:border-b-0"
          key={row.key}
          onClick={() => onPrivacyToggle(row.key)}
          type="button"
        >
          <span className="min-w-0">
            <span className="block text-[13px] uppercase tracking-[0.04em] text-white">
              {row.label}
            </span>
            <span className="mt-1 block text-[12px] leading-5 text-white/52">
              {row.description}
            </span>
          </span>
          <SwitchPill checked={preferences.privacy[row.key]} />
        </button>
      ))}
      <Link
        className="mt-3 flex min-h-[42px] w-full items-center justify-between rounded-[9px] border border-[var(--sb-gold)]/30 px-3 text-left text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/support"
      >
        Data & privacy request
        <ChevronIcon direction="right" size={18} />
      </Link>
    </SettingsCard>
  );
}
