"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { GiftConfirmation, GiftExperience } from "@/types/gift";

import { ReviewRow, SummaryLine } from "./DesktopGiftPrimitives";

export function DesktopGiftConfirmation({
  confirmation,
  gift,
  onSendAnother,
}: {
  confirmation: GiftConfirmation;
  gift: GiftExperience;
  onSendAnother: () => void;
}) {
  const copyConfirmation = async () => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(confirmation.confirmationCode);
    } catch {
      return;
    }
  };

  return (
    <>
      <section className="relative min-h-[246px] border-b border-white/10 px-16 py-8">
        <Image
          alt=""
          className="object-cover object-[56%_45%] opacity-58"
          fill
          loading="eager"
          priority
          sizes="1568px"
          src={gift.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.78)_44%,rgba(3,4,5,0.42)_100%)]" />
        <div className="relative z-10 flex min-h-[182px] max-w-[790px] flex-col justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10">
            <AssetIcon size={34} src="/assets/icons/check-icon.png" />
          </span>
          <h1 className="editorial-title mt-5 text-[58px] uppercase leading-[0.92] text-white">
            Your gift has been confirmed!
          </h1>
          <p className="mt-4 max-w-[620px] text-[17px] leading-7 text-white/72">
            We sent {gift.title} to {confirmation.recipient.name}. The
            confirmation has been saved to your local gift history.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)_396px] gap-5 px-9 py-5">
        <div className="grid grid-cols-2 gap-5">
          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
              Gift order
            </p>
            <h2 className="mt-2 font-mono text-[34px] text-white">
              {confirmation.confirmationCode}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <ReviewRow
                label="Recipient"
                value={confirmation.recipient.name}
              />
              <ReviewRow label="Status" value={confirmation.status} />
              <ReviewRow
                label="Delivery"
                value={formatDateTime(confirmation.deliveryDate)}
              />
              <ReviewRow
                label="Payment"
                value={confirmation.paymentMethodLabel}
              />
            </div>
          </section>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
              Experience details
            </p>
            <div className="mt-4 grid grid-cols-[116px_1fr] gap-4">
              <div className="relative h-[116px] overflow-hidden rounded-[12px]">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="116px"
                  src={confirmation.giftImage.publicUrl}
                />
              </div>
              <div>
                <h2 className="text-[22px] font-semibold text-white">
                  {confirmation.giftTitle}
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-white/56">
                  {confirmation.message || gift.deliveryNote}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <Button onClick={copyConfirmation} size="sm">
                Copy order number
              </Button>
              <Button href="/profile" size="sm" variant="secondary">
                View profile
              </Button>
            </div>
          </section>
        </div>

        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order summary
          </h2>
          <div className="mt-5 divide-y divide-white/10 rounded-[12px] border border-white/10">
            <SummaryLine
              label={confirmation.giftTitle}
              value={formatMoney(confirmation.priceCents)}
            />
            <SummaryLine label="Digital delivery" value="Included" />
            <SummaryLine
              label="Purchased"
              value={formatDateTime(confirmation.createdAt)}
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.1em] text-white/46">
              Total paid
            </span>
            <span className="font-mono text-[38px] text-white">
              {formatMoney(confirmation.priceCents)}
            </span>
          </div>
          <Button className="mt-6 w-full" onClick={onSendAnother}>
            Send another gift
          </Button>
          <Button className="mt-3 w-full" href="/home" variant="secondary">
            Back to home
          </Button>
        </aside>
      </div>
    </>
  );
}
