"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { UserPreferences } from "@/types/user";

import { ProfileToggle } from "./ProfileToggle";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface SecurityPanelProps {
  onResetProfile: () => void;
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
  preferences: UserPreferences;
}

export function SecurityPanel({
  onResetProfile,
  onUpdatePreferences,
  preferences,
}: SecurityPanelProps) {
  const [statusMessage, setStatusMessage] = useState("");

  const updatePrivacyPreference = (
    field: keyof UserPreferences["privacy"],
    checked: boolean,
  ) => {
    onUpdatePreferences({
      privacy: {
        ...preferences.privacy,
        [field]: checked,
      },
    });
    setStatusMessage("");
  };

  const handleLogout = () => {
    setStatusMessage("Signed out for this mock session.");
  };

  const handleReset = () => {
    onResetProfile();
    setStatusMessage("Profile reset.");
  };

  return (
    <Card className="p-5 md:p-6">
      <div>
        <h3 className="text-xl font-semibold text-sb-rice">
          Privacy and security
        </h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          Privacy defaults for account activity and dining history.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        <ProfileToggle
          checked={preferences.privacy.twoFactorEnabled}
          description="Require an additional verification step on future sign-ins."
          id="profile-two-factor"
          label="Two-step verification"
          onCheckedChange={(checked) =>
            updatePrivacyPreference("twoFactorEnabled", checked)
          }
        />
        <ProfileToggle
          checked={preferences.privacy.loginAlerts}
          description="Notify this profile when a new session starts."
          id="profile-login-alerts"
          label="Login alerts"
          onCheckedChange={(checked) =>
            updatePrivacyPreference("loginAlerts", checked)
          }
        />
        <ProfileToggle
          checked={preferences.privacy.personalizedRecommendations}
          description="Use dining history for menu and reward suggestions."
          id="profile-personalized-recommendations"
          label="Personalized recommendations"
          onCheckedChange={(checked) =>
            updatePrivacyPreference("personalizedRecommendations", checked)
          }
        />
        <ProfileToggle
          checked={preferences.privacy.shareDiningHistory}
          description="Let concierge staff view recent preferences during support."
          id="profile-share-dining-history"
          label="Share dining history"
          onCheckedChange={(checked) =>
            updatePrivacyPreference("shareDiningHistory", checked)
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={handleLogout} variant="secondary">
          Log out
        </Button>
        <Button onClick={handleReset} variant="danger">
          Reset profile
        </Button>
      </div>
      {statusMessage ? (
        <p className="mt-3 text-sm font-semibold text-sb-wasabi">
          {statusMessage}
        </p>
      ) : null}
    </Card>
  );
}
