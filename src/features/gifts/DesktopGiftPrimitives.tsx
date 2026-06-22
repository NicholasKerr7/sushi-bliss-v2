"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/money";
import type { GiftExperience } from "@/types/gift";

const conciergeFaq = [
  [
    "Can the recipient pick the date?",
    "Yes, every gift includes concierge scheduling.",
  ],
  [
    "Can I schedule delivery?",
    "Choose send now or a future email delivery date.",
  ],
  [
    "Can gifts be refunded?",
    "Unredeemed gifts can be exchanged for store credit.",
  ],
] as const;

export function DesktopGiftHero({
  copy,
  title,
}: {
  copy: string;
  title: string;
}) {
  return (
    <section className="relative min-h-[204px] border-b border-white/10 px-16 py-6">
      <Image
        alt=""
        className="object-cover object-[56%_45%] opacity-58"
        fill
        loading="eager"
        priority
        sizes="1568px"
        src="/assets/gallery/intimate-upscale-dining-room-setting.webp"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.78)_42%,rgba(3,4,5,0.34)_100%)]" />
      <div className="relative z-10 flex min-h-[152px] max-w-[720px] flex-col justify-center">
        <p className="text-[16px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          Sushi Bliss gifting
        </p>
        <h1 className="editorial-title mt-3 text-[58px] uppercase leading-[0.9] text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-[560px] text-[17px] leading-7 text-white/72">
          {copy}
        </p>
      </div>
    </section>
  );
}

export function GiftPackageCard({
  gift,
  isSelected,
  priority,
  onSelectGift,
}: {
  gift: GiftExperience;
  isSelected: boolean;
  priority: boolean;
  onSelectGift: (giftId: string) => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={
        isSelected
          ? "overflow-hidden rounded-[16px] border border-[var(--sb-gold)]/54 bg-[var(--sb-gold)]/10 text-left shadow-[0_0_24px_rgba(218,179,109,0.12)]"
          : "overflow-hidden rounded-[16px] border border-white/10 bg-black/28 text-left transition hover:border-[var(--sb-gold)]/32"
      }
      onClick={() => onSelectGift(gift.id)}
      type="button"
    >
      <div className="relative h-[136px]">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="320px"
          src={gift.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.76))]" />
        <span className="absolute bottom-3 left-4 rounded-full border border-white/18 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-white/74">
          {gift.category}
        </span>
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[17px] font-semibold leading-6 text-white">
            {gift.title}
          </h3>
          <p className="font-mono text-[14px] text-[var(--sb-gold-soft)]">
            {formatMoney(gift.priceCents)}
          </p>
        </div>
        <p className="mt-2 min-h-[42px] text-[13px] leading-5 text-white/58">
          {gift.description}
        </p>
      </div>
    </button>
  );
}

export function GiftReviewRail({
  buttonLabel,
  gift,
  onAction,
}: {
  buttonLabel: string;
  gift: GiftExperience;
  onAction: () => void;
}) {
  return (
    <aside className="grid content-start gap-4">
      <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88">
        <div className="relative h-[178px]">
          <Image
            alt=""
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="372px"
            src={gift.image.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
        </div>
        <div className="p-4">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
            Selected package
          </p>
          <h2 className="mt-2 text-[22px] font-semibold text-white">
            {gift.title}
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-white/56">
            {gift.deliveryNote}
          </p>
          <div className="mt-3 divide-y divide-white/10 rounded-[12px] border border-white/10">
            {gift.inclusions.map((item) => (
              <p className="px-4 py-2.5 text-[13px] text-white/66" key={item}>
                {item}
              </p>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.1em] text-white/46">
              Total
            </span>
            <span className="font-mono text-[30px] text-white">
              {formatMoney(gift.priceCents)}
            </span>
          </div>
          <Button className="mt-4 w-full" onClick={onAction}>
            {buttonLabel}
          </Button>
        </div>
      </section>

      <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
        <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Gift FAQ
        </h2>
        <div className="mt-3 grid gap-3">
          {conciergeFaq.map(([question, answer]) => (
            <div key={question}>
              <p className="text-[13px] font-semibold text-white/82">
                {question}
              </p>
              <p className="mt-1 text-[12px] leading-5 text-white/52">
                {answer}
              </p>
            </div>
          ))}
        </div>
        <Link
          className="mt-5 inline-flex min-h-10 items-center rounded-full px-3 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/support"
        >
          View help center
        </Link>
      </section>
    </aside>
  );
}

export function CheckoutPanel({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-5">
      <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 py-4 first:pt-0 last:border-b-0">
      <p className="text-[12px] uppercase tracking-[0.1em] text-white/42">
        {label}
      </p>
      <p className="mt-1 text-[14px] text-white/76">{value}</p>
    </div>
  );
}

export function SummaryLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-[13px]">
      <span className="text-white/58">{label}</span>
      <span className="text-white/82">{value}</span>
    </div>
  );
}
