"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/visualHomeData";
import {
  getProfileDetailsDraft,
  hasProfileDetailsValidationErrors,
  validateProfileDetailsDraft,
  type ProfileDetailsValidation,
} from "@/lib/profile";
import type { ProfileDetailsDraft, UserProfile } from "@/types/user";

import {
  MobileProfileBackButton,
  MobileProfileHeader,
  MobileProfilePanel,
} from "./MobileProfilePrimitives";

interface MobileProfileAccountViewProps {
  cartCount: number;
  profile: UserProfile;
  onBack: () => void;
  onOpenCart: () => void;
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
}

/** Mobile account details editor backed by shared profile validation. */
export function MobileProfileAccountView({
  cartCount,
  profile,
  onBack,
  onOpenCart,
  onSaveProfileDetails,
}: MobileProfileAccountViewProps) {
  const [draft, setDraft] = useState(() => getProfileDetailsDraft(profile));
  const [validation, setValidation] = useState<ProfileDetailsValidation>({});
  const [message, setMessage] = useState("");

  const updateDraft = (field: keyof ProfileDetailsDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidation((current) => ({ ...current, [field]: undefined }));
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextValidation = validateProfileDetailsDraft(draft);

    if (hasProfileDetailsValidationErrors(nextValidation)) {
      setValidation(nextValidation);
      return;
    }

    onSaveProfileDetails(draft);
    setMessage("Profile saved.");
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px] pb-16">
        <MobileProfileHeader cartCount={cartCount} onOpenCart={onOpenCart} />

        <div className="mt-7 grid grid-cols-[52px_1fr_52px] items-center">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[25px] uppercase tracking-[0.1em] text-white">
            Account
          </h1>
          <span aria-hidden="true" />
        </div>

        <section className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            Member details
          </p>
          <h2 className="editorial-title mt-3 text-[38px] uppercase leading-[1.03] text-white">
            Personal
            <span className="block text-[var(--sb-red-bright)]">
              Information
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-white/62">
            These details are shared with checkout, reservations, and support.
          </p>
        </section>

        <MobileProfilePanel className="mt-6 p-4">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <MobileProfileField
              error={validation.name}
              icon={icons.profile}
              id="mobile-profile-name"
              label="Name"
              onChange={(value) => updateDraft("name", value)}
              value={draft.name}
            />
            <MobileProfileField
              error={validation.email}
              icon="/assets/icons/email-icon.png"
              id="mobile-profile-email"
              label="Email"
              onChange={(value) => updateDraft("email", value)}
              type="email"
              value={draft.email}
            />
            <MobileProfileField
              error={validation.phone}
              icon="/assets/icons/phone-icon.png"
              id="mobile-profile-phone"
              label="Phone"
              onChange={(value) => updateDraft("phone", value)}
              value={draft.phone}
            />

            <button
              className="red-glow-button mt-2 flex min-h-[68px] w-full items-center justify-center gap-3 rounded-[14px] text-[16px] uppercase tracking-[0.08em]"
              type="submit"
            >
              <AssetIcon size={25} src={icons.profile} />
              Save profile
            </button>
            {message ? (
              <p className="text-center text-[14px] font-semibold text-[var(--sb-gold-soft)]">
                {message}
              </p>
            ) : null}
          </form>
        </MobileProfilePanel>
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile profile navigation"
      />
    </>
  );
}

function MobileProfileField({
  error,
  icon,
  id,
  label,
  onChange,
  type = "text",
  value,
}: {
  error?: string;
  icon?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label
      className="grid gap-2 rounded-[15px] border border-white/10 bg-black/34 p-4"
      htmlFor={id}
    >
      <span className="flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
        <AssetIcon size={22} src={icon} />
        {label}
      </span>
      <input
        className="min-h-[42px] bg-transparent text-[18px] text-white outline-none placeholder:text-white/42"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? (
        <span className="text-[12px] text-[var(--sb-red-bright)]">{error}</span>
      ) : null}
    </label>
  );
}
