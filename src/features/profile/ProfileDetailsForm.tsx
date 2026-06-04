"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  getProfileDetailsDraft,
  hasProfileDetailsValidationErrors,
  validateProfileDetailsDraft,
  type ProfileDetailsValidation,
} from "@/lib/profile";
import type { ProfileDetailsDraft, UserProfile } from "@/types/user";

interface ProfileDetailsFormProps {
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
  profile: UserProfile;
}

export function ProfileDetailsForm({
  onSaveProfileDetails,
  profile,
}: ProfileDetailsFormProps) {
  const profileKey = `${profile.name}|${profile.email}|${profile.phone}`;
  const profileDraft = getProfileDetailsDraft(profile);
  const [draftState, setDraftState] = useState<{
    draft: ProfileDetailsDraft;
    profileKey: string;
  }>(() => ({
    draft: profileDraft,
    profileKey,
  }));
  const [validation, setValidation] = useState<ProfileDetailsValidation>({});
  const [savedMessage, setSavedMessage] = useState("");
  const draft =
    draftState.profileKey === profileKey ? draftState.draft : profileDraft;
  const activeValidation: ProfileDetailsValidation =
    draftState.profileKey === profileKey ? validation : {};

  const updateDraft = (field: keyof ProfileDetailsDraft, value: string) => {
    setDraftState({
      draft: { ...draft, [field]: value },
      profileKey,
    });
    setValidation((current) => ({ ...current, [field]: undefined }));
    setSavedMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextValidation = validateProfileDetailsDraft(draft);

    if (hasProfileDetailsValidationErrors(nextValidation)) {
      setValidation(nextValidation);
      return;
    }

    onSaveProfileDetails(draft);
    setSavedMessage("Profile saved.");
  };

  return (
    <Card className="p-5 md:p-6">
      <div>
        <h3 className="text-xl font-semibold text-sb-rice">Account settings</h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          Contact details used for checkout receipts, reservations, and support.
        </p>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <Input
          error={activeValidation.name}
          id="profile-name"
          label="Name"
          onChange={(event) => updateDraft("name", event.target.value)}
          value={draft.name}
        />
        <Input
          error={activeValidation.email}
          id="profile-email"
          label="Email"
          onChange={(event) => updateDraft("email", event.target.value)}
          type="email"
          value={draft.email}
        />
        <Input
          error={activeValidation.phone}
          id="profile-phone"
          label="Phone"
          onChange={(event) => updateDraft("phone", event.target.value)}
          value={draft.phone}
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">Save profile</Button>
          {savedMessage ? (
            <p className="text-sm font-semibold text-sb-wasabi">
              {savedMessage}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
