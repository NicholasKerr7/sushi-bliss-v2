import { SettingsCard } from "./DesktopProfileSettingsPrimitives";

export function DesktopMemberSinceCard() {
  return (
    <SettingsCard
      title="Member since"
      icon="/assets/icons/calendar-icon.png"
      id="desktop-profile-member"
    >
      <p className="editorial-title text-[30px] uppercase text-white">
        Jan 15, 2024
      </p>
      <p className="mt-2 text-[13px] text-white/58">Member for 4 months</p>
    </SettingsCard>
  );
}
