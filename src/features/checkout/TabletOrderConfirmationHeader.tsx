import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, chefAvatar, icons } from "@/features/home/homeDashboardData";

interface TabletOrderConfirmationHeaderProps {
  cartCount: number;
  query: string;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onSubmitQuery: (event: FormEvent<HTMLFormElement>) => void;
}

export function TabletOrderConfirmationHeader({
  cartCount,
  query,
  onClose,
  onQueryChange,
  onSubmitQuery,
}: TabletOrderConfirmationHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[190px_minmax(0,1fr)_190px] items-center gap-3 lg:grid-cols-[260px_minmax(0,1fr)_268px] lg:gap-5">
      <Link
        className="flex items-center gap-3 lg:gap-8"
        href="/home"
        onClick={onClose}
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

      <form
        className="mx-auto flex h-[54px] w-full max-w-[486px] items-center gap-3 rounded-[20px] border border-white/16 bg-white/[0.035] px-4 lg:h-[58px] lg:gap-4 lg:rounded-[24px] lg:px-6"
        onSubmit={onSubmitQuery}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-confirmation-search">
          Search menu
        </label>
        <input
          className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/58 lg:text-[16px]"
          id="tablet-confirmation-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search dishes, rolls, or more..."
          value={query}
        />
      </form>

      <div className="flex items-center justify-end gap-3 lg:gap-6">
        <Link
          className="relative grid h-11 w-11 place-items-center"
          href="/notifications"
          onClick={onClose}
        >
          <AssetIcon size={32} src={icons.bell} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            2
          </span>
        </Link>
        <Link
          aria-label="Back to menu"
          className="relative grid h-11 w-11 place-items-center"
          href="/menu"
          onClick={onClose}
        >
          <AssetIcon size={32} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </Link>
        <Link
          className="flex items-center gap-5"
          href="/profile"
          onClick={onClose}
        >
          <Image
            alt=""
            className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover lg:h-[58px] lg:w-[58px]"
            height={58}
            loading="eager"
            src={chefAvatar}
            width={58}
          />
          <ChevronIcon className="text-[var(--sb-gold)]" direction="down" />
        </Link>
      </div>
    </header>
  );
}
