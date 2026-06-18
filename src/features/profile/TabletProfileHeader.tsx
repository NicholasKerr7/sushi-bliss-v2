"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import type { UserProfile } from "@/types/user";

interface TabletProfileHeaderProps {
  cartCount: number;
  profile: UserProfile;
  section: "dashboard" | "account";
  onOpenCart: () => void;
}

export function TabletProfileHeader({
  cartCount,
  profile,
  section,
  onOpenCart,
}: TabletProfileHeaderProps) {
  return (
    <header className="mt-1 grid h-[64px] grid-cols-[150px_minmax(0,1fr)_146px] items-center gap-2 lg:h-[82px] lg:grid-cols-[190px_minmax(0,1fr)_252px] min-[1080px]:grid-cols-[210px_minmax(0,1fr)_300px]">
      <Link className="flex items-center gap-3" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={section === "account" ? 58 : 66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[17px] uppercase leading-[1.02] tracking-[0.32em] text-white lg:text-[21px] min-[1080px]:text-[24px]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <p className="mx-auto text-center text-[13px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] lg:text-[16px] lg:tracking-[0.22em]">
        {section === "dashboard" ? "Profile" : "Account settings"}
      </p>

      <div className="flex items-center justify-end gap-2 lg:gap-4">
        <button
          aria-label={`Open cart with ${cartCount} items`}
          className="relative grid h-10 w-11 place-items-center text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-11 lg:w-11"
          onClick={onOpenCart}
          type="button"
        >
          <AssetIcon size={30} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
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
              {profile.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.12em] text-white/52">
              Bliss member
            </span>
          </span>
        </Link>
        <ChevronIcon
          className="hidden text-[var(--sb-gold-soft)] lg:inline-block"
          direction="down"
          size={18}
        />
      </div>
    </header>
  );
}
