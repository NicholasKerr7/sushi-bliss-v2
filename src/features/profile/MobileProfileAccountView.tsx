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
  unreadNotificationCount: number;
  profile: UserProfile;
  onBack: () => void;
  onOpenCart: () => void;
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
}

/** Mobile account details editor backed by shared profile validation. */
export function MobileProfileAccountView({
  cartCount,
  unreadNotificationCount,
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
      <div className="mobile-frame relative z-10 pb-16">
        <MobileProfileHeader
          cartCount={cartCount}
          unreadNotificationCount={unreadNotificationCount}
          onOpenCart={onOpenCart}
        />

        <div className="mt-6 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center min-[390px]:mt-7 min-[390px]:grid-cols-[52px_1fr_52px]">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[21px] uppercase tracking-[0.07em] text-white min-[390px]:text-[25px] min-[390px]:tracking-[0.1em]">
            Account
          </h1>
          <span aria-hidden="true" />
        </div>

        <section className="mt-7 min-[390px]:mt-8">
          <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] min-[390px]:text-[12px] min-[390px]:tracking-[0.14em]">
            Member details
          </p>
          <h2 className="editorial-title mt-3 text-[30px] uppercase leading-[1.03] text-white min-[390px]:text-[38px]">
            Personal
            <span className="block text-[var(--sb-red-bright)]">
              Information
            </span>
          </h2>
          <p className="mt-3 text-[14px] leading-[22px] text-white/62 min-[390px]:mt-4 min-[390px]:text-[16px] min-[390px]:leading-6">
            These details are shared with checkout, reservations, and support.
          </p>
        </section>

        <MobileProfilePanel className="mt-5 p-3 min-[390px]:mt-6 min-[390px]:p-4">
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
              className="red-glow-button mt-2 flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-[14px] text-[13px] uppercase tracking-[0.06em] min-[390px]:min-h-[68px] min-[390px]:gap-3 min-[390px]:text-[16px] min-[390px]:tracking-[0.08em]"
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
      className="grid gap-2 rounded-[14px] border border-white/10 bg-black/34 p-3 min-[390px]:rounded-[15px] min-[390px]:p-4"
      htmlFor={id}
    >
      <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:gap-3 min-[390px]:text-[12px] min-[390px]:tracking-[0.1em]">
        <AssetIcon size={20} src={icon} />
        {label}
      </span>
      <input
        className="min-h-10 bg-transparent text-[15px] text-white outline-none placeholder:text-white/42 min-[390px]:min-h-[42px] min-[390px]:text-[18px]"
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
