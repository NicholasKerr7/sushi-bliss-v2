"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { OmakasePackage } from "@/types/omakase";

interface TabletOmakasePackageTileProps {
  isSelected: boolean;
  omakasePackage: OmakasePackage;
  onSelectPackage: (packageId: string) => void;
}

export function TabletOmakasePackageTile({
  isSelected,
  omakasePackage,
  onSelectPackage,
}: TabletOmakasePackageTileProps) {
  return (
    <button
      aria-pressed={isSelected}
      className={classNames(
        "relative min-h-[154px] overflow-hidden rounded-[12px] border bg-black/30 p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:min-h-[176px]",
        isSelected
          ? "border-[var(--sb-red-bright)] shadow-[0_0_28px_rgba(226,23,29,0.25)]"
          : "border-[var(--sb-gold)]/24 hover:border-[var(--sb-gold)]/50",
      )}
      onClick={() => onSelectPackage(omakasePackage.id)}
      type="button"
    >
      <Image
        alt=""
        className="object-cover opacity-64"
        fill
        sizes="320px"
        src={omakasePackage.image.publicUrl}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.92)_0%,rgba(5,6,7,0.62)_52%,rgba(5,6,7,0.18)_100%)]" />
      <div className="relative z-10 flex min-h-[130px] flex-col justify-between min-[1080px]:min-h-[152px]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            {omakasePackage.subtitle}
          </p>
          <h3 className="editorial-title mt-2 text-[21px] uppercase leading-none text-white min-[1080px]:text-[25px]">
            {omakasePackage.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-[180px] text-[12px] leading-5 text-white/74">
            {omakasePackage.description}
          </p>
        </div>
        <div>
          <p className="font-mono text-[21px] text-[var(--sb-gold-soft)] min-[1080px]:text-[24px]">
            {formatMoney(omakasePackage.priceCents)}
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/64">
            Per person
          </p>
        </div>
      </div>
      {isSelected ? (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--sb-red)]">
          <AssetIcon size={16} src="/assets/icons/check-icon.png" />
        </span>
      ) : null}
    </button>
  );
}
