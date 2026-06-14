"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

export type TabletReferralShareAction =
  | "email"
  | "facebook"
  | "more"
  | "sms"
  | "whatsapp";

export type TabletReferralShareIcon = "chat" | "email" | "facebook" | "more";

interface TabletReferralShareButtonProps {
  action: TabletReferralShareAction;
  colorClass: string;
  icon: TabletReferralShareIcon;
  label: string;
  referralLink: string;
}

/** Share target control for the tablet referral screen. */
export function TabletReferralShareButton({
  action,
  colorClass,
  icon,
  label,
  referralLink,
}: TabletReferralShareButtonProps) {
  const encodedLink = encodeURIComponent(referralLink);
  const commonClassName = classNames(
    "grid h-[50px] w-[50px] place-items-center rounded-full border border-white/12 text-white shadow-[0_10px_26px_rgba(0,0,0,0.35)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
    colorClass,
  );
  const handleMoreShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          text: "Join me at Sushi Bliss.",
          title: "Sushi Bliss invitation",
          url: referralLink,
        });
        return;
      }

      await navigator.clipboard?.writeText(referralLink);
    } catch {
      await navigator.clipboard?.writeText(referralLink);
    }
  };

  if (action === "email") {
    return (
      <a
        aria-label={`Share referral by ${label}`}
        className={commonClassName}
        href={`mailto:?subject=Sushi Bliss invitation&body=${encodedLink}`}
      >
        <ShareGlyph icon={icon} />
      </a>
    );
  }

  if (action === "sms") {
    return (
      <a
        aria-label={`Share referral by ${label}`}
        className={commonClassName}
        href={`sms:?body=${encodedLink}`}
      >
        <ShareGlyph icon={icon} />
      </a>
    );
  }

  if (action === "whatsapp") {
    return (
      <a
        aria-label={`Share referral by ${label}`}
        className={commonClassName}
        href={`https://wa.me/?text=${encodedLink}`}
        rel="noreferrer"
        target="_blank"
      >
        <ShareGlyph icon={icon} />
      </a>
    );
  }

  if (action === "facebook") {
    return (
      <a
        aria-label={`Share referral by ${label}`}
        className={commonClassName}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`}
        rel="noreferrer"
        target="_blank"
      >
        <ShareGlyph icon={icon} />
      </a>
    );
  }

  return (
    <button
      aria-label="Open more sharing options"
      className={commonClassName}
      onClick={handleMoreShare}
      type="button"
    >
      <ShareGlyph icon={icon} />
    </button>
  );
}

function ShareGlyph({ icon }: { icon: TabletReferralShareIcon }) {
  if (icon === "email") {
    return (
      <AssetIcon
        className="brightness-0 invert"
        size={25}
        src="/assets/icons/email-icon.png"
      />
    );
  }

  if (icon === "facebook") {
    return (
      <AssetIcon
        className="brightness-0 invert"
        size={25}
        src="/assets/icons/facebook-icon.png"
      />
    );
  }

  if (icon === "more") {
    return (
      <span aria-hidden="true" className="text-[25px] leading-none">
        ...
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-[26px] w-[26px] fill-none stroke-current stroke-[2]"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M5 17.2V8.4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4.2a4 4 0 0 1-4 4H9.2L5 20z" />
      <path d="M8.5 10.5h7" />
      <path d="M8.5 13.5h4.8" />
    </svg>
  );
}
