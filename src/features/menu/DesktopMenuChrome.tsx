import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { chefAvatar, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { getBrandContent } from "@/lib/data";

const baseNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

const omakaseNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["omakase", "Omakase", "/omakase"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

const ordersNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
  ["orders", "Orders", "/orders"],
] as const;

const helpNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
  ["help", "Help Center", "/support"],
] as const;

const notificationsNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
  ["notifications", "Notifications", "/notifications"],
] as const;

const offersNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["offers", "Special Offers", "/offers"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

const locationsNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["locations", "Locations", "/locations"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

const giftsNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["gifts", "Gift an Experience", "/gifts"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

const sourcingNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["sourcing", "Sourcing & Ingredients", "/about"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

const chefsNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["chefs", "Master Chefs", "/chefs"],
  ["about", "About Us", "/about"],
  ["contact", "Contact", "/support"],
] as const;

interface DesktopMenuHeaderProps {
  activeId?: string;
  cartCount: number;
}

export function DesktopMenuHeader({
  activeId = "menu",
  cartCount,
}: DesktopMenuHeaderProps) {
  const brand = getBrandContent();
  const navItems =
    activeId === "orders"
      ? ordersNavItems
      : activeId === "help"
        ? helpNavItems
        : activeId === "notifications"
          ? notificationsNavItems
          : activeId === "offers"
            ? offersNavItems
            : activeId === "locations"
              ? locationsNavItems
              : activeId === "gifts"
                ? giftsNavItems
                : activeId === "sourcing"
                  ? sourcingNavItems
                  : activeId === "chefs"
                    ? chefsNavItems
                    : activeId === "omakase"
                      ? omakaseNavItems
                      : baseNavItems;

  return (
    <header className="border-b border-white/[0.08] bg-[#07090a]/96 px-6 min-[1500px]:px-0">
      <div className="mx-auto flex h-[76px] w-full max-w-[1328px] items-center">
        <Link
          className="flex min-w-[270px] items-center gap-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <AssetIcon
            className="rounded-full"
            loading="eager"
            size={50}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="editorial-title text-[23px] uppercase leading-[0.92] tracking-[0.34em]">
            Sushi
            <br />
            Bliss
          </span>
        </Link>
        <nav
          aria-label="Desktop primary"
          className="flex flex-1 items-center justify-center gap-5 min-[1500px]:gap-7"
        >
          {navItems.map(([id, label, href]) => {
            const active = id === activeId;

            return (
              <Link
                className={classNames(
                  "relative flex h-[76px] items-center text-[12px] font-semibold uppercase text-white transition hover:text-[var(--sb-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold min-[1500px]:text-[13px]",
                  active && "text-[var(--sb-red-bright)]",
                )}
                href={href}
                key={id}
              >
                {label}
                {active ? (
                  <span className="absolute inset-x-0 bottom-[14px] h-px bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex min-w-[300px] items-center justify-end gap-5">
          <Link
            aria-label="Open cart"
            className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold)]"
            href="/menu"
          >
            <AssetIcon size={31} src={icons.cart} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <Link className="flex items-center gap-3" href="/profile">
            <Image
              alt=""
              className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover"
              height={48}
              src={chefAvatar}
              width={48}
            />
            <span>
              <span className="block text-sm font-semibold text-white">
                Hiroshi Tanaka
              </span>
              <span className="block text-xs uppercase tracking-[0.12em] text-white/62">
                Bliss Member
              </span>
            </span>
            <ChevronIcon
              className="text-[var(--sb-gold)]"
              direction="down"
              size={16}
            />
          </Link>
        </div>
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
