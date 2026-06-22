import Image from "next/image";

import type { MenuItem } from "@/types/menu";

export function TabletOrderConfirmationHero({
  confirmationCode,
  createdAtLabel,
  heroImage,
  primaryItem,
}: {
  confirmationCode: string;
  createdAtLabel: string;
  heroImage: string;
  primaryItem?: MenuItem;
}) {
  return (
    <section className="relative h-[450px] overflow-hidden rounded-[24px] border border-white/12 bg-[#090b0b] min-[1080px]:h-auto">
      <Image
        alt={primaryItem?.image.alt || "Sushi Bliss confirmed order"}
        className="object-cover object-[72%_48%]"
        fill
        loading="eager"
        priority
        sizes="1034px"
        src={heroImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050607_0%,rgba(5,6,7,0.96)_30%,rgba(5,6,7,0.54)_60%,rgba(5,6,7,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(217,160,74,0.18),transparent_34%)]" />

      <div className="relative flex h-full max-w-[570px] flex-col px-10 pt-8">
        <span className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[#5fee4c]/72 bg-[#5fee4c]/10 text-[34px] leading-none text-[#77ef58] shadow-[0_0_34px_rgba(95,238,76,0.24)]">
          ✓
        </span>
        <p className="mt-5 font-serif text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Order confirmed
        </p>
        <h1
          className="editorial-title mt-3 text-[50px] uppercase leading-[0.92] tracking-[0.08em] text-white min-[1080px]:text-[54px]"
          id="tablet-order-confirmation-title"
        >
          Thank you!
        </h1>
        <p className="mt-2 whitespace-nowrap font-serif text-[28px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)] min-[1080px]:text-[31px]">
          Your order is confirmed
        </p>
        <p className="mt-4 max-w-[430px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
          We appreciate your order and cannot wait to serve you an unforgettable
          experience.
        </p>

        <div className="mt-6 w-[408px] rounded-[12px] border border-[var(--sb-gold)]/22 bg-black/34 p-5 text-center backdrop-blur">
          <p className="font-serif text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Confirmation number
          </p>
          <p className="mt-2 font-mono text-[34px] leading-none text-white">
            #{confirmationCode}
          </p>
          <p className="mt-2 text-[13px] text-white/62">{createdAtLabel}</p>
        </div>
      </div>
    </section>
  );
}
