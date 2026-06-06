"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { mockUser } from "@/data/mockUser";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

interface TabletExperienceHeaderProps {
  active?:
    | "home"
    | "menu"
    | "reservations"
    | "omakase"
    | "order"
    | "loyalty"
    | "about"
    | "contact";
  cartCount: number;
  navVariant?: "gifts" | "omakase";
  onOpenCart: () => void;
  showContact?: boolean;
}

const omakaseLinks = [
  { activeKey: "home", href: "/home", label: "Home" },
  { activeKey: "menu", href: "/menu", label: "Menu" },
  { activeKey: "reservations", href: "/reservations", label: "Reservations" },
  { activeKey: "omakase", href: "/omakase", label: "Omakase" },
  { activeKey: "loyalty", href: "/loyalty", label: "Loyalty" },
  { activeKey: "about", href: "/about", label: "About Us" },
] as const;

const giftLinks = [
  { activeKey: "home", href: "/home", label: "Home" },
  { activeKey: "menu", href: "/menu", label: "Menu" },
  { activeKey: "reservations", href: "/reservations", label: "Reservations" },
  { activeKey: "order", href: "/menu", label: "Order Online" },
  { activeKey: "loyalty", href: "/loyalty", label: "Loyalty" },
  { activeKey: "about", href: "/about", label: "About Us" },
  { activeKey: "contact", href: "/support", label: "Contact" },
] as const;

export function TabletExperienceHeader({
  active,
  cartCount,
  navVariant = "omakase",
  onOpenCart,
  showContact = false,
}: TabletExperienceHeaderProps) {
  const tabletLinks =
    navVariant === "gifts"
      ? showContact
        ? giftLinks
        : giftLinks.filter((link) => link.activeKey !== "contact")
      : omakaseLinks;

  return (
    <header className="mt-1 grid h-[64px] grid-cols-[160px_minmax(0,1fr)_238px] items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.025] px-3 lg:h-[76px] lg:grid-cols-[190px_minmax(0,1fr)_274px] min-[1080px]:grid-cols-[210px_minmax(0,1fr)_300px]">
      <Link className="flex items-center gap-3" href="/home">
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

      <nav
        aria-label="Tablet premium navigation"
        className={classNames(
          "mx-auto grid w-full items-center text-center text-[10px] uppercase tracking-[0.02em] text-white/84 lg:text-[12px]",
          navVariant === "gifts" && showContact
            ? "max-w-[690px] grid-cols-7"
            : "max-w-[620px] grid-cols-6",
        )}
      >
        {tabletLinks.map((item) => {
          const current = item.activeKey === active;

          return (
            <Link
              aria-current={current ? "page" : undefined}
              className={classNames(
                "relative flex h-[56px] items-center justify-center transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-[68px]",
                current ? "text-[var(--sb-red-bright)]" : "",
              )}
              href={item.href}
              key={item.label}
            >
              {item.label}
              {current ? (
                <span className="absolute bottom-0 h-px w-10 bg-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(226,23,29,0.9)]" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-end gap-3">
        <button
          aria-label={`Open cart with ${cartCount} items`}
          className="relative grid h-10 w-10 place-items-center text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-11 lg:w-11"
          onClick={onOpenCart}
          type="button"
        >
          <AssetIcon size={30} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        </button>
        <Link className="flex items-center gap-3" href="/profile">
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
        <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
          v
        </span>
      </div>
    </header>
  );
}
