import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/homeDashboardData";
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

      <div className="relative flex h-full max-w-[590px] flex-col px-10 pt-8">
        <span className="relative grid h-[64px] w-[64px] place-items-center rounded-full border border-[var(--sb-gold)]/62 bg-[radial-gradient(circle,rgba(215,168,79,0.16),rgba(0,0,0,0.58)_68%)] shadow-[0_0_34px_rgba(215,168,79,0.24),inset_0_0_22px_rgba(215,168,79,0.08)]">
          <AssetIcon
            className="rounded-full"
            loading="eager"
            size={42}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border border-[var(--sb-red-bright)] bg-black shadow-[0_0_18px_rgba(239,47,37,0.56)]">
            <AssetIcon size={15} src="/assets/icons/check-icon.png" />
          </span>
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

        <div className="mt-5 grid w-[448px] grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 rounded-[12px] border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
          <span className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--sb-gold)]/24 bg-black/34">
            <AssetIcon size={23} src={icons.chef} />
          </span>
          <p className="min-w-0">
            <span className="block text-[12px] uppercase tracking-[0.1em] text-white/46">
              Kitchen ticket
            </span>
            <span className="mt-1 block truncate text-[15px] text-white">
              {primaryItem
                ? `${primaryItem.name} is queued with the chef counter.`
                : "Your order is queued with the chef counter."}
            </span>
          </p>
          <span className="rounded-full border border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/20 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
            Live
          </span>
        </div>

        <div className="mt-5 w-[408px] rounded-[12px] border border-[var(--sb-gold)]/22 bg-black/34 p-5 text-center backdrop-blur">
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
