"use client";

import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { dietaryPreferenceOptions } from "@/data/profile";
import { classNames } from "@/lib/classNames";
import { togglePreferenceTag } from "@/lib/profile";
import type { FulfillmentMode } from "@/types/common";
import type { UserPreferences } from "@/types/user";

import { ProfileToggle } from "./ProfileToggle";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface PreferencesPanelProps {
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
  preferences: UserPreferences;
}

const fulfillmentOptions = [
  { label: "Pickup", value: "pickup" },
  { label: "Delivery", value: "delivery" },
];

export function PreferencesPanel({
  onUpdatePreferences,
  preferences,
}: PreferencesPanelProps) {
  return (
    <Card className="p-5 md:p-6">
      <div>
        <h3 className="text-xl font-semibold text-sb-rice">Preferences</h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          Dining preferences personalize checkout, reservations, and rewards.
        </p>
      </div>

      <div className="mt-5 grid gap-5">
        <Select
          id="profile-fulfillment-mode"
          label="Preferred fulfillment"
          onChange={(event) =>
            onUpdatePreferences({
              fulfillmentMode: event.target.value as FulfillmentMode,
            })
          }
          options={fulfillmentOptions}
          value={preferences.fulfillmentMode}
        />

        <section>
          <h4 className="text-sm font-semibold text-sb-rice">
            Dietary preferences
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {dietaryPreferenceOptions.map((option) => {
              const selected = preferences.dietaryTags.includes(option);

              return (
                <button
                  aria-pressed={selected}
                  className={classNames(
                    "rounded-control border px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    selected
                      ? "border-sb-gold bg-sb-gold/15 text-sb-gold-soft"
                      : "border-sb-line bg-sb-ink/50 text-sb-muted hover:bg-sb-rice/5 hover:text-sb-rice",
                  )}
                  key={option}
                  onClick={() =>
                    onUpdatePreferences((current) => ({
                      ...current,
                      dietaryTags: togglePreferenceTag(
                        current.dietaryTags,
                        option,
                      ),
                    }))
                  }
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3">
          <h4 className="text-sm font-semibold text-sb-rice">Notifications</h4>
          <ProfileToggle
            checked={preferences.notifications.orderUpdates}
            description="Pickup, delivery, and receipt updates."
            id="profile-order-updates"
            label="Order updates"
            onCheckedChange={(checked) =>
              onUpdatePreferences({
                notifications: {
                  ...preferences.notifications,
                  orderUpdates: checked,
                },
              })
            }
          />
          <ProfileToggle
            checked={preferences.notifications.reservationReminders}
            description="Reservation confirmations and reminders."
            id="profile-reservation-reminders"
            label="Reservation reminders"
            onCheckedChange={(checked) =>
              onUpdatePreferences({
                notifications: {
                  ...preferences.notifications,
                  reservationReminders: checked,
                },
              })
            }
          />
          <ProfileToggle
            checked={preferences.notifications.rewardAlerts}
            description="Reward balance and redemption updates."
            id="profile-reward-alerts"
            label="Reward alerts"
            onCheckedChange={(checked) =>
              onUpdatePreferences({
                notifications: {
                  ...preferences.notifications,
                  rewardAlerts: checked,
                },
              })
            }
          />
          <ProfileToggle
            checked={preferences.notifications.offerAlerts}
            description="Seasonal offers and member dining drops."
            id="profile-offer-alerts"
            label="Offer alerts"
            onCheckedChange={(checked) =>
              onUpdatePreferences({
                marketingOptIn: checked,
                notifications: {
                  ...preferences.notifications,
                  offerAlerts: checked,
                },
              })
            }
          />
          <ProfileToggle
            checked={preferences.notifications.conciergeMessages}
            description="Messages about support, allergies, and private dining."
            id="profile-concierge-messages"
            label="Concierge messages"
            onCheckedChange={(checked) =>
              onUpdatePreferences({
                notifications: {
                  ...preferences.notifications,
                  conciergeMessages: checked,
                },
              })
            }
          />
        </section>
      </div>
    </Card>
  );
}
