"use client";

import Image from "next/image";
import { useState } from "react";

import {
  getProfileDetailsDraft,
  hasProfileDetailsValidationErrors,
  validateProfileDetailsDraft,
  type ProfileDetailsValidation,
} from "@/lib/profile";
import type { ProfileDetailsDraft, UserProfile } from "@/types/user";

import { CardTitle, SettingLine } from "./DesktopProfileSettingsPrimitives";

export function DesktopPersonalInformationCard({
  profile,
  onSaveProfileDetails,
  onStatus,
}: {
  profile: UserProfile;
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
  onStatus: (message: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
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
  const draft =
    draftState.profileKey === profileKey ? draftState.draft : profileDraft;
  const activeValidation: ProfileDetailsValidation =
    draftState.profileKey === profileKey ? validation : {};

  const updateDraft = (key: keyof ProfileDetailsDraft, value: string) => {
    setDraftState({
      draft: { ...draft, [key]: value },
      profileKey,
    });
    setValidation((current) => ({ ...current, [key]: undefined }));
  };

  const handleSave = () => {
    const nextValidation = validateProfileDetailsDraft(draft);

    if (hasProfileDetailsValidationErrors(nextValidation)) {
      setValidation(nextValidation);
      onStatus("Review the highlighted profile fields.");
      return;
    }

    onSaveProfileDetails(draft);
    setIsEditing(false);
    onStatus("Personal information saved locally.");
  };

  return (
    <article
      className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
      id="desktop-profile-personal"
    >
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/floral-emblem-icon.png"
          title="Personal information"
        />
        <button
          className="h-8 rounded-[8px] border border-[var(--sb-gold)]/36 px-4 text-[11px] uppercase text-[var(--sb-gold-soft)]"
          onClick={() => setIsEditing((current) => !current)}
          type="button"
        >
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-[104px_1fr] gap-5">
        <Image
          alt=""
          className="rounded-full border border-[var(--sb-border)] object-cover"
          height={96}
          src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
          width={96}
        />
        {isEditing ? (
          <form
            className="grid gap-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            {(
              [
                ["name", "Full name"],
                ["email", "Email address"],
                ["phone", "Phone number"],
              ] as const
            ).map(([key, label]) => (
              <label className="grid gap-1" key={key}>
                <span className="text-[10px] uppercase tracking-[0.08em] text-white/46">
                  {label}
                </span>
                <input
                  className="h-9 rounded-[8px] border border-white/10 bg-black/24 px-3 text-[13px] text-white outline-none focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/22"
                  onChange={(event) => updateDraft(key, event.target.value)}
                  type={key === "email" ? "email" : "text"}
                  value={draft[key]}
                />
                {activeValidation[key] ? (
                  <span className="text-[11px] text-[var(--sb-red-bright)]">
                    {activeValidation[key]}
                  </span>
                ) : null}
              </label>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                className="h-9 rounded-[8px] border border-white/10 text-[11px] uppercase tracking-[0.08em] text-white/68"
                onClick={() => {
                  setDraftState({
                    draft: profileDraft,
                    profileKey,
                  });
                  setValidation({});
                  setIsEditing(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-9 rounded-[8px] border border-[var(--sb-red-bright)]/60 bg-[var(--sb-red)]/22 text-[11px] uppercase tracking-[0.08em] text-white"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2.5 text-[13px]">
            <SettingLine label="Full name" value={draft.name} />
            <SettingLine label="Email address" value={draft.email} />
            <SettingLine label="Phone number" value={draft.phone} />
          </div>
        )}
      </div>
    </article>
  );
}
