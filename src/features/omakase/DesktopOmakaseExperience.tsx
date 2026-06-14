"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { premiumReservationCards } from "@/data/omakase";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useOmakase } from "@/hooks/useOmakase";
import { formatMoney } from "@/lib/money";

import { DesktopOmakaseReview } from "./DesktopOmakaseReview";
import {
  DesktopCourseJourney,
  DesktopOmakaseBenefit,
  DesktopOmakasePanel,
  DesktopPackageButton,
  desktopOmakaseBenefits,
  desktopOmakaseHeroImage,
  desktopOmakaseSakeImage,
} from "./DesktopOmakasePrimitives";

export function DesktopOmakaseExperience() {
  const [reviewVisible, setReviewVisible] = useState(false);
  const { itemCount } = useCart();
  const {
    guestCount,
    omakasePackages,
    review,
    sakePairingId,
    sakePairingOptions,
    selectedPackage,
    selectPackage,
    setSakePairingId,
    updateGuestCount,
  } = useOmakase();
  const selectedPairing = sakePairingOptions[0];

  const openReview = () => {
    if (!sakePairingId && selectedPairing) {
      setSakePairingId(selectedPairing.id);
    }

    updateGuestCount(Math.max(2, selectedPackage.guestRange.min));
    setReviewVisible(true);
  };

  if (reviewVisible) {
    return (
      <DesktopOmakaseReview
        cartCount={itemCount}
        guestCount={guestCount}
        omakasePackages={omakasePackages}
        review={review}
        sakePairingId={sakePairingId}
        sakePairingOptions={sakePairingOptions}
        selectedPackageId={selectedPackage.id}
        onBack={() => setReviewVisible(false)}
        onGuestCountChange={updateGuestCount}
        onPackageChange={selectPackage}
        onSakePairingChange={setSakePairingId}
      />
    );
  }

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="omakase"
    >
      <DesktopMenuHeader activeId="omakase" cartCount={itemCount} />
      <main className="mx-auto max-w-[1672px] px-5 pb-3 pt-3">
        <div className="overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          <section className="relative min-h-[326px] overflow-hidden border-b border-[var(--sb-border)]">
            <Image
              alt=""
              className="object-cover object-[58%_42%]"
              fill
              loading="eager"
              priority
              sizes="1672px"
              src={desktopOmakaseHeroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,0.96)_0%,rgba(4,4,4,0.72)_28%,rgba(4,4,4,0.16)_68%,rgba(4,4,4,0.78)_100%)]" />
            <div className="relative z-10 grid min-h-[326px] grid-cols-[minmax(0,1fr)_244px] gap-10 px-[8.6vw] py-8">
              <div className="flex max-w-[560px] flex-col justify-center">
                <p className="editorial-title text-[28px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  The art of
                </p>
                <h1 className="editorial-title mt-1 text-[62px] uppercase leading-[0.9] text-white">
                  Omakase
                </h1>
                <p className="mt-4 text-[20px] leading-7 text-[var(--sb-gold-soft)]">
                  An intimate, chef-curated journey where every bite tells a
                  story.
                </p>
                <p className="mt-4 max-w-[430px] text-[15px] leading-6 text-white/62">
                  Hand-selected ingredients. Masterful technique. A
                  one-of-a-kind experience crafted just for you.
                </p>
                <div className="mt-6 flex gap-4">
                  <button
                    className="red-glow-button flex h-[50px] w-[230px] items-center justify-center gap-4 rounded-[10px] text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                    onClick={openReview}
                    type="button"
                  >
                    Reserve omakase
                    <ChevronIcon direction="right" size={18} />
                  </button>
                  <Link
                    className="flex h-[50px] w-[230px] items-center justify-center gap-4 rounded-[10px] border border-[var(--sb-border)] bg-black/42 text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                    href="/gifts"
                  >
                    Gift an experience
                    <AssetIcon size={18} src="/assets/icons/gift-icon.png" />
                  </Link>
                </div>
              </div>
              <aside className="self-center rounded-[18px] border border-[var(--sb-border)] bg-black/50 p-5 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <AssetIcon
                    size={36}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                  <div>
                    <p className="editorial-title text-[16px] uppercase leading-5 text-white">
                      Only 8 seats
                      <br />
                      per service
                    </p>
                    <p className="mt-4 text-[13px] leading-5 text-white/62">
                      An exclusive experience designed for a select few.
                    </p>
                  </div>
                </div>
                <div className="my-5 h-px bg-white/10" />
                <p className="flex items-center gap-3 text-[14px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]">
                  <AssetIcon size={24} src="/assets/icons/clock-icon.png" />
                  Experience length
                </p>
                <p className="mt-2 text-[13px] leading-6 text-white/62">
                  90-120 minutes
                  <br />
                  Starts at {formatMoney(selectedPackage.priceCents)} per guest
                  <br />
                  Sake pairing available
                </p>
              </aside>
            </div>
          </section>

          <div className="grid grid-cols-[0.36fr_0.36fr_0.28fr] border-b border-[var(--sb-border)]">
            <DesktopOmakasePanel className="rounded-none border-y-0 border-l-0 p-5">
              <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
                <AssetIcon
                  size={24}
                  src="/assets/icons/floral-emblem-icon.png"
                />
                Omakase packages
              </h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {omakasePackages.map((omakasePackage) => (
                  <DesktopPackageButton
                    compact
                    isSelected={selectedPackage.id === omakasePackage.id}
                    key={omakasePackage.id}
                    omakasePackage={omakasePackage}
                    onSelect={selectPackage}
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-[12px] text-white/54">
                All packages require full table participation.
              </p>
            </DesktopOmakasePanel>

            <DesktopOmakasePanel className="rounded-none border-y-0 p-5">
              <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
                <AssetIcon
                  size={24}
                  src="/assets/icons/floral-emblem-icon.png"
                />
                A journey of flavor
              </h2>
              <div className="mt-4">
                <DesktopCourseJourney courses={selectedPackage.courses} />
              </div>
              <p className="mt-4 text-center text-[12px] text-white/54">
                Each experience is unique and evolves with the seasons.
              </p>
            </DesktopOmakasePanel>

            <DesktopOmakasePanel className="rounded-none border-y-0 border-r-0 p-5">
              <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
                <AssetIcon
                  size={24}
                  src="/assets/icons/floral-emblem-icon.png"
                />
                Sake pairing
              </h2>
              <div className="mt-4 grid grid-cols-[0.47fr_0.53fr] gap-4">
                <div className="relative min-h-[158px] overflow-hidden rounded-[10px] border border-[var(--sb-border)]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="220px"
                    src={desktopOmakaseSakeImage}
                  />
                </div>
                <div>
                  <p className="text-[13px] uppercase tracking-[0.08em] text-white">
                    Elevate your experience
                  </p>
                  <p className="mt-2 text-[13px] leading-5 text-white/60">
                    Our sommeliers curate premium sake pairings to complement
                    each course, enhancing every flavor and nuance.
                  </p>
                  <p className="mt-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    {selectedPairing?.label || "Seasonal sake flight"}
                  </p>
                  <p className="text-[12px] text-white/54">
                    {selectedPairing
                      ? `${formatMoney(selectedPairing.priceCents)} per guest`
                      : "Pairing available"}
                  </p>
                  <button
                    className="mt-3 flex h-9 w-full items-center justify-center rounded-[8px] border border-[var(--sb-gold)]/44 px-2 text-[10px] uppercase tracking-[0.04em] text-[var(--sb-gold-soft)]"
                    onClick={() => {
                      if (selectedPairing) {
                        setSakePairingId(selectedPairing.id);
                      }
                    }}
                    type="button"
                  >
                    {sakePairingId ? "Pairing added" : "Add to reservation +"}
                  </button>
                </div>
              </div>
            </DesktopOmakasePanel>
          </div>

          <section className="grid grid-cols-[1fr_0.3fr] border-b border-[var(--sb-border)]">
            <div className="p-5">
              <h2 className="mb-5 flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
                <AssetIcon
                  size={24}
                  src="/assets/icons/floral-emblem-icon.png"
                />
                What&apos;s included
              </h2>
              <div className="grid grid-cols-5 gap-5">
                {desktopOmakaseBenefits.map(([title, copy, icon]) => (
                  <DesktopOmakaseBenefit
                    copy={copy}
                    icon={icon}
                    key={title}
                    title={title}
                  />
                ))}
              </div>
            </div>
            <div className="grid content-center gap-3 border-l border-white/10 p-5">
              {premiumReservationCards.map((card) => (
                <Link
                  className="grid min-h-[86px] grid-cols-[78px_1fr] gap-4 rounded-[12px] border border-[var(--sb-border)] bg-white/[0.035] p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                  href={card.href}
                  key={card.id}
                >
                  <span className="relative overflow-hidden rounded-[8px]">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="86px"
                      src={card.image.publicUrl}
                    />
                  </span>
                  <span>
                    <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
                      {card.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-5 text-white/64">
                      {card.title}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="p-4">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>
    </section>
  );
}
