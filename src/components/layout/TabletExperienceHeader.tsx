"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { mockUser } from "@/data/mockUser";
import { brand, icons } from "@/features/home/visualHomeData";

interface TabletExperienceHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  title: string;
}

export function TabletExperienceHeader({
  cartCount,
  onOpenCart,
  title,
}: TabletExperienceHeaderProps) {
  return (
    <header className="mt-1 grid h-[64px] grid-cols-[190px_minmax(0,1fr)_216px] items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.025] px-3 lg:h-[76px] lg:grid-cols-[190px_minmax(0,1fr)_274px] min-[1080px]:grid-cols-[210px_minmax(0,1fr)_300px]">
      <Link className="flex w-[186px] items-center gap-3" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={58}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] uppercase leading-[1.02] tracking-[0.32em] text-white lg:text-[22px]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <p className="mx-auto text-center text-[13px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] lg:text-[16px] lg:tracking-[0.22em]">
        {title}
      </p>

      <div className="flex items-center justify-end gap-3">
        <button
          aria-label={`Open cart with ${cartCount} items`}
          className="relative grid h-10 w-11 place-items-center text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-11 lg:w-11"
          onClick={onOpenCart}
          type="button"
        >
          <AssetIcon size={30} src={icons.cart} />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </button>
        <Link className="flex min-w-11 items-center gap-3" href="/profile">
          <Image
            alt=""
            className="h-10 w-10 rounded-full border border-[var(--sb-border)] object-cover lg:h-[52px] lg:w-[52px]"
            height={52}
            src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
            width={52}
          />
          <span className="hidden text-left min-[1080px]:block">
            <span className="block text-[13px] font-semibold text-white">
              {mockUser.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.12em] text-white/52">
              Bliss member
            </span>
          </span>
        </Link>
        <ChevronIcon
          className="text-[var(--sb-gold-soft)]"
          direction="down"
          size={18}
        />
      </div>
    </header>
  );
}
