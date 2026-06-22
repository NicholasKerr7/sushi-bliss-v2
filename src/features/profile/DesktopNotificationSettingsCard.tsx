import type { UserPreferences } from "@/types/user";

import { SettingsCard, SwitchPill } from "./DesktopProfileSettingsPrimitives";

const notificationRows: Array<
  [keyof UserPreferences["notifications"], string, string]
> = [
  [
    "orderUpdates",
    "Order Confirmations",
    "Get notified about your order status",
  ],
  ["reservationReminders", "Reservations", "Reminders and booking updates"],
  ["offerAlerts", "Exclusive Offers", "Receive special offers"],
  ["rewardAlerts", "Loyalty Updates", "Points and rewards updates"],
  ["conciergeMessages", "Newsletter", "Monthly news from Sushi Bliss"],
];

export function DesktopNotificationSettingsCard({
  preferences,
  onNotificationToggle,
}: {
  preferences: UserPreferences["notifications"];
  onNotificationToggle: (key: keyof UserPreferences["notifications"]) => void;
}) {
  return (
    <SettingsCard
      title="Notifications"
      icon="/assets/icons/notification-bell-icon.png"
      id="desktop-profile-notifications"
    >
      {notificationRows.map(([key, label, copy]) => (
        <button
          className="flex min-h-[36px] w-full items-center justify-between border-b border-white/10 text-left last:border-b-0"
          key={key}
          onClick={() => onNotificationToggle(key)}
          type="button"
        >
          <span>
            <span className="block text-[13px] text-white">{label}</span>
            <span className="block text-[12px] text-white/52">{copy}</span>
          </span>
          <SwitchPill checked={preferences[key]} />
        </button>
      ))}
    </SettingsCard>
  );
}
