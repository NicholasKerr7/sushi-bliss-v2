"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { formatDateTime } from "@/lib/dates";
import type {
  GiftCheckoutDraft,
  GiftConfirmation,
  GiftExperience,
} from "@/types/gift";

import { TABLET_GIFT_QUANTITY } from "./tabletGiftMath";

interface TabletGiftConfirmationProps {
  confirmation: GiftConfirmation;
  draft: GiftCheckoutDraft;
  gift: GiftExperience;
  onViewDetails: () => void;
}

const confirmationBenefits = [
  [
    "Premium ingredients",
    "Sourced Daily",
    "/assets/icons/floral-emblem-icon.png",
  ],
  [
    "Expert craftsmanship",
    "By Master Chefs",
    "/assets/icons/chef-hat-icon.png",
  ],
  [
    "Authentic experience",
    "Traditional. Refined.",
    "/assets/icons/star-icon.png",
  ],
  [
    "Exclusive reservations",
    "Priority for Members",
    "/assets/icons/chef-crest-icon.png",
  ],
] as const;

export function TabletGiftConfirmation({
  confirmation,
  draft,
  gift,
  onViewDetails,
}: TabletGiftConfirmationProps) {
  const location = locations[2] || locations[0];
  const initials = confirmation.recipient.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="mx-auto w-full max-w-[1034px]">
      <section className="relative mt-0 min-h-[1238px] overflow-hidden rounded-b-[18px] border-x border-b border-white/10 p-6">
        <Image
          alt=""
          className="object-cover opacity-42"
          fill
          priority
          sizes="1034px"
          src="/assets/gallery/cozy-night-at-sushi-bliss.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,0.36),rgba(5,6,7,0.94)_38%,rgba(5,6,7,0.98)_100%)]" />
        <div className="relative z-10">
          <div className="mx-auto grid h-[112px] w-[112px] place-items-center rounded-full border border-[var(--sb-gold)]/50 bg-black/36 shadow-[0_0_70px_rgba(215,160,75,0.24)]">
            <span className="text-[60px] text-[var(--sb-gold-soft)]">✓</span>
          </div>
          <div className="mt-4 text-center">
            <h1 className="editorial-title text-[44px] uppercase tracking-[0.12em] text-white">
              Gift confirmed
            </h1>
            <p className="mt-2 text-[18px] text-[var(--sb-gold-soft)]">
              Your gift experience has been purchased successfully.
            </p>
            <p className="mx-auto mt-2 max-w-[520px] text-[15px] leading-6 text-white/62">
              A beautifully crafted experience is on its way. Thank you for
              sharing the art of Sushi Bliss.
            </p>
          </div>

          <section className="mx-auto mt-5 grid max-w-[860px] grid-cols-2 rounded-[12px] border border-[var(--sb-gold)]/26 bg-black/30 p-4">
            <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-4 border-r border-white/10">
              <AssetIcon size={42} src="/assets/icons/gift-icon.png" />
              <span>
                <span className="block text-[12px] uppercase text-white/54">
                  Order reference
                </span>
                <span className="mt-2 block font-mono text-[20px] text-white">
                  {confirmation.confirmationCode}
                </span>
              </span>
            </div>
            <div className="pl-8">
              <span className="block text-[12px] uppercase text-white/54">
                Order date
              </span>
              <span className="mt-2 block text-[18px] text-white">
                {formatDateTime(confirmation.createdAt)}
              </span>
            </div>
          </section>

          <section className="mx-auto mt-4 max-w-[860px] rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.035] p-4">
            <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Gift summary
            </h2>
            <div className="mt-4 grid grid-cols-[230px_minmax(0,1fr)] gap-5">
              <div className="relative h-[148px] overflow-hidden rounded-[10px] border border-white/10">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="260px"
                  src={gift.image.publicUrl}
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-[24px] font-semibold text-white">
                    Chef&apos;s Omakase Experience
                  </h3>
                  <span className="rounded-[6px] border border-[var(--sb-gold)]/30 px-3 py-1 text-[11px] uppercase text-[var(--sb-gold-soft)]">
                    Gift experience
                  </span>
                </div>
                <p className="mt-2 max-w-[520px] text-[14px] leading-6 text-white/62">
                  An immersive multi-course journey crafted by our master chefs.
                  A celebration of the finest ingredients and Japanese artistry.
                </p>
                <div className="mt-5 grid grid-cols-4 gap-4 text-center">
                  {[
                    [
                      `${TABLET_GIFT_QUANTITY}`,
                      "Guests",
                      "/assets/icons/group-icon.png",
                    ],
                    [
                      "Omakase",
                      "Experience",
                      "/assets/icons/dining-setting-icon.png",
                    ],
                    [
                      "May 24, 2024",
                      "7:00 PM",
                      "/assets/icons/calendar-icon.png",
                    ],
                    [
                      location.name,
                      location.address,
                      "/assets/icons/map-pin-icon.png",
                    ],
                  ].map(([title, subtitle, icon]) => (
                    <div key={title}>
                      <AssetIcon className="mx-auto" size={30} src={icon} />
                      <p className="mt-2 text-[12px] uppercase text-white/68">
                        {title}
                      </p>
                      <p className="mt-1 text-[11px] text-white/46">
                        {subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-4 grid max-w-[860px] grid-cols-2 rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.035] p-4">
            <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-5 border-r border-white/10">
              <span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-[var(--sb-gold)]/40 text-[26px] text-[var(--sb-gold-soft)]">
                {initials}
              </span>
              <span>
                <span className="block text-[22px] text-white">
                  {confirmation.recipient.name}
                </span>
                <span className="mt-2 block text-[14px] text-white/58">
                  {confirmation.recipient.email}
                </span>
                <span className="mt-2 block text-[14px] text-white/58">
                  +1 415-555-0284
                </span>
              </span>
            </div>
            <div className="pl-8">
              <h2 className="flex items-center gap-3 text-[15px] uppercase text-[var(--sb-gold-soft)]">
                <AssetIcon size={26} src="/assets/icons/email-icon.png" />
                Gift message
              </h2>
              <p className="mt-4 whitespace-pre-line text-[15px] italic leading-6 text-white/62">
                {draft.message}
              </p>
            </div>
          </section>

          <section className="mx-auto mt-4 grid max-w-[860px] grid-cols-[1fr_1fr_290px] rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.035] p-4">
            <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-4 border-r border-white/10">
              <AssetIcon size={34} src="/assets/icons/email-icon.png" />
              <span>
                <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
                  Delivery method
                </span>
                <span className="mt-2 block text-[15px] text-white/70">
                  Email Delivery
                </span>
              </span>
            </div>
            <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-4 border-r border-white/10 pl-6">
              <AssetIcon size={34} src="/assets/icons/calendar-icon.png" />
              <span>
                <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
                  Send date
                </span>
                <span className="mt-2 block text-[15px] text-white/70">
                  {confirmation.status === "scheduled"
                    ? formatDateTime(confirmation.deliveryDate)
                    : "Immediately"}
                </span>
              </span>
            </div>
            <div className="ml-6 rounded-[12px] border border-[var(--sb-gold)]/18 bg-[var(--sb-wasabi)]/10 p-4">
              <p className="flex items-center gap-3 text-[14px] text-[var(--sb-gold-soft)]">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--sb-gold)]">
                  ✓
                </span>
                Email sent
              </p>
              <p className="mt-2 text-[13px] leading-5 text-white/58">
                Your gift has been sent to {confirmation.recipient.email}
              </p>
            </div>
          </section>

          <div className="mx-auto mt-5 grid max-w-[740px] gap-3">
            <Button
              className="red-glow-button h-[52px] rounded-[10px] text-[17px] uppercase tracking-[0.08em]"
              onClick={onViewDetails}
            >
              <AssetIcon size={26} src="/assets/icons/gift-icon.png" />
              View gift details
            </Button>
            <Button
              className="h-[48px] rounded-[10px] text-[16px] uppercase tracking-[0.08em]"
              href="/home"
              variant="secondary"
            >
              <AssetIcon size={24} src="/assets/icons/home-icon.png" />
              Back to home
            </Button>
          </div>

          <section className="mt-5 grid grid-cols-4 rounded-[14px] border border-white/10 bg-white/[0.035]">
            {confirmationBenefits.map(([title, subtitle, icon]) => (
              <div
                className="grid min-h-[62px] grid-cols-[36px_minmax(0,1fr)] items-center gap-3 border-r border-white/10 px-4 last:border-r-0"
                key={title}
              >
                <AssetIcon size={30} src={icon} />
                <span>
                  <span className="block text-[12px] uppercase text-white/70">
                    {title}
                  </span>
                  <span className="mt-1 block text-[12px] text-white/46">
                    {subtitle}
                  </span>
                </span>
              </div>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
