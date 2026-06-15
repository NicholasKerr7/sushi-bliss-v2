"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { mockUser } from "@/data/mockUser";
import { brand, chefAvatar, icons } from "@/features/home/visualHomeData";

interface TabletOrdersHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function TabletOrdersHeader({
  cartCount,
  onOpenCart,
}: TabletOrdersHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[180px_minmax(0,1fr)_190px] items-center gap-3 lg:grid-cols-[260px_minmax(0,1fr)_292px] lg:gap-5">
      <Link
        className="flex w-[186px] items-center gap-3 lg:w-[260px] lg:gap-8"
        href="/home"
      >
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          loading="eager"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="font-serif text-[22px] font-normal uppercase leading-[0.98] tracking-[0.36em] lg:text-[27px] lg:tracking-[0.43em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <p className="mx-auto text-[13px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] lg:text-[16px] lg:tracking-[0.22em]">
        Orders
      </p>
      <div className="flex items-center justify-end gap-3 lg:gap-6">
        <button
          aria-label="Open cart"
          className="relative grid h-11 w-11 place-items-center"
          onClick={onOpenCart}
          type="button"
        >
          <AssetIcon size={32} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </button>
        <Link className="flex items-center gap-4" href="/profile">
          <Image
            alt=""
            className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover lg:h-[58px] lg:w-[58px]"
            height={58}
            loading="eager"
            src={chefAvatar}
            width={58}
          />
          <span className="hidden text-left lg:block">
            <span className="block text-[15px] font-semibold text-white">
              {mockUser.name}
            </span>
            <span className="block text-[12px] uppercase tracking-[0.12em] text-white/52">
              Bliss member
            </span>
          </span>
          <ChevronIcon className="text-[var(--sb-gold)]" direction="down" />
        </Link>
        <Link
          className="relative grid h-11 w-11 place-items-center"
          href="/notifications"
        >
          <AssetIcon size={32} src={icons.bell} />
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[var(--sb-red)]" />
        </Link>
      </div>
    </header>
  );
}
