"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";

const sakuraOffer = {
  code: "SAKURA20",
  description:
    "Enjoy a seasonal Sakura Dragon Roll credit on qualifying orders and tasting reservations.",
  imageUrl: "/assets/menu/sushi/dragon-roll.webp",
  title: "Sakura Dragon Roll",
};

const offerTerms = [
  "Valid for one checkout or one dine-in reservation per member profile.",
  "Offer applies before tax, service fee, and delivery fee.",
  "Cannot be combined with another item-level promotion.",
  "Seasonal availability may vary by location and service window.",
] as const;

export function DesktopOfferDetail({
  cartCount,
  onBack,
}: {
  cartCount: number;
  onBack: () => void;
}) {
  const [shareMessage, setShareMessage] = useState("");

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="offers"
    >
      <div className="mx-auto min-h-dvh max-w-[1550px] border-x border-[var(--sb-border)] bg-[#050607]">
        <DesktopMenuHeader activeId="offers" cartCount={cartCount} />
        <main className="px-7 pb-6 pt-5">
          <button
            className="text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            Back to offers
          </button>
          <section className="mt-4 grid min-h-[490px] grid-cols-[minmax(0,0.96fr)_430px] overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
            <div className="relative min-h-[490px]">
              <Image
                alt=""
                className="object-cover"
                fill
                loading="eager"
                priority
                sizes="1030px"
                src={sakuraOffer.imageUrl}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.12),rgba(7,9,10,0.24)_48%,rgba(7,9,10,0.84))]" />
              <div className="absolute bottom-8 left-8 rounded-[16px] border border-[var(--sb-border)] bg-black/60 p-5 backdrop-blur-md">
                <p className="text-[13px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                  Limited seasonal offer
                </p>
                <h1 className="editorial-title mt-2 text-[52px] uppercase leading-none text-white">
                  {sakuraOffer.title}
                </h1>
                <p className="mt-3 max-w-[540px] text-[17px] leading-7 text-white/70">
                  {sakuraOffer.description}
                </p>
              </div>
            </div>

            <aside className="p-7">
              <p className="text-[14px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                Offer detail
              </p>
              <div className="mt-5 rounded-[16px] border border-[var(--sb-gold)]/34 bg-black/28 p-5">
                <p className="text-[13px] uppercase tracking-[0.1em] text-white/48">
                  Offer code
                </p>
                <p className="mt-3 inline-flex h-14 items-center gap-3 rounded-full border border-[var(--sb-gold)]/42 px-5 font-mono text-[22px] text-[var(--sb-gold-soft)]">
                  <AssetIcon
                    size={24}
                    src="/assets/icons/golden-ticket-icon.png"
                  />
                  {sakuraOffer.code}
                </p>
                <p className="mt-4 text-[14px] leading-6 text-white/58">
                  Apply the code during checkout or show it to your server
                  before ordering.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button
                  className="h-[56px] rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
                  href="/menu"
                >
                  Redeem offer
                </Button>
                <button
                  className="h-[56px] rounded-[10px] border border-[var(--sb-gold)]/34 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  onClick={() =>
                    setShareMessage(`${sakuraOffer.code} is ready to share.`)
                  }
                  type="button"
                >
                  Share offer
                </button>
              </div>
              {shareMessage ? (
                <p
                  aria-live="polite"
                  className="mt-3 text-[13px] text-[var(--sb-gold-soft)]"
                >
                  {shareMessage}
                </p>
              ) : null}

              <section className="mt-6 rounded-[16px] border border-white/10 bg-black/24 p-5">
                <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Terms & conditions
                </h2>
                <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/62">
                  {offerTerms.map((term) => (
                    <li className="flex gap-3" key={term}>
                      <AssetIcon
                        className="mt-1"
                        size={16}
                        src="/assets/icons/check-icon.png"
                      />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </section>
          <div className="mt-4">
            <DesktopBenefitStrip />
          </div>
        </main>
      </div>
    </section>
  );
}
