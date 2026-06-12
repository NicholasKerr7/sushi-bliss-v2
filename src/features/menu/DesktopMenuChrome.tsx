import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { chefAvatar, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

const navItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
  ["orders", "Orders", "/orders"],
] as const;

interface DesktopMenuHeaderProps {
  activeId?: string;
  cartCount: number;
}

export function DesktopMenuHeader({
  activeId = "menu",
  cartCount,
}: DesktopMenuHeaderProps) {
  return (
    <header className="flex h-[88px] items-center border-b border-white/[0.08] bg-[#07090a]/96 px-[3vw]">
      <Link
        className="flex min-w-[300px] items-center gap-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
        href="/home"
      >
        <AssetIcon
          className="rounded-full"
          size={56}
          src="/assets/icons/floral-emblem-icon.png"
        />
        <span className="editorial-title text-[25px] uppercase leading-[0.92] tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <nav
        aria-label="Desktop primary"
        className="flex flex-1 items-center justify-center gap-[1.85vw]"
      >
        {navItems.map(([id, label, href]) => {
          const active = id === activeId;

          return (
            <Link
              className={classNames(
                "relative py-8 text-[13px] font-semibold uppercase text-white transition hover:text-[var(--sb-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold",
                active && "text-[var(--sb-red-bright)]",
              )}
              href={href}
              key={id}
            >
              {label}
              {active ? (
                <span className="absolute inset-x-0 bottom-[18px] h-px bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]" />
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="flex min-w-[330px] items-center justify-end gap-5">
        <Link
          aria-label="Open cart"
          className="relative grid h-12 w-12 place-items-center text-[var(--sb-gold)]"
          href="/menu"
        >
          <AssetIcon size={34} src={icons.cart} />
          {cartCount > 0 ? (
            <span className="absolute right-0 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </Link>
        <Link className="flex items-center gap-3" href="/profile">
          <Image
            alt=""
            className="h-14 w-14 rounded-full border border-[var(--sb-border)] object-cover"
            height={56}
            src={chefAvatar}
            width={56}
          />
          <span>
            <span className="block text-sm font-semibold text-white">
              Hiroshi Tanaka
            </span>
            <span className="block text-xs uppercase tracking-[0.12em] text-white/62">
              Bliss Member
            </span>
          </span>
          <span className="text-[var(--sb-gold)]" aria-hidden="true">
            v
          </span>
        </Link>
      </div>
    </header>
  );
}

export function DesktopBenefitStrip() {
  const benefits = [
    ["floral-emblem-icon.png", "Premium Ingredients", "Sourced Daily"],
    ["lotus-crown-icon.png", "Expert Craftsmanship", "By Master Chefs"],
    ["chef-crest-icon.png", "Authentic Experience", "Traditional. Refined."],
    ["takeaway-bag-icon.png", "Exclusive Reservations", "Priority for Members"],
  ] as const;

  return (
    <section className="grid grid-cols-4 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] px-10 py-4">
      {benefits.map(([icon, title, copy]) => (
        <article
          className="grid grid-cols-[54px_1fr] items-center gap-4 border-l border-white/10 pl-9 first:border-l-0 first:pl-0"
          key={title}
        >
          <AssetIcon size={38} src={`/assets/icons/${icon}`} />
          <div>
            <p className="editorial-title text-[16px] uppercase tracking-[0.08em] text-white/82">
              {title}
            </p>
            <p className="mt-1 text-[14px] text-white/56">{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
