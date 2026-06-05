"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";

interface TabletCheckoutHeaderProps {
  cartCount: number;
  onBackToCart: () => void;
}

export function TabletCheckoutHeader({
  cartCount,
  onBackToCart,
}: TabletCheckoutHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[260px_1fr_268px] items-center gap-5">
      <Link className="flex items-center gap-8" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[27px] uppercase leading-[0.98] tracking-[0.35em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <button
        className="mx-auto text-[16px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]"
        onClick={onBackToCart}
        type="button"
      >
        Checkout
      </button>
      <div className="flex items-center justify-end gap-6">
        <Link
          className="relative grid h-11 w-11 place-items-center"
          href="/notifications"
        >
          <AssetIcon size={32} src={icons.bell} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            2
          </span>
        </Link>
        <button
          aria-label="Back to cart"
          className="relative grid h-11 w-11 place-items-center"
          onClick={onBackToCart}
          type="button"
        >
          <AssetIcon size={32} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </button>
        <Link className="flex items-center gap-5" href="/profile">
          <Image
            alt=""
            className="h-[58px] w-[58px] rounded-full border border-[var(--sb-border)] object-cover"
            height={58}
            src="/assets/chefs/aiko-nakamura-pastry-chef-standing.webp"
            width={58}
          />
          <span className="text-[var(--sb-gold)]" aria-hidden="true">
            v
          </span>
        </Link>
      </div>
    </header>
  );
}
