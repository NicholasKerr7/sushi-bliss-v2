"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { OmakasePackage, OmakasePackageCourse } from "@/types/omakase";

export const desktopOmakaseHeroImage =
  "/assets/chefs/hiroshi-tanaka-head-chef-plating.webp";
export const desktopOmakaseSakeImage =
  "/assets/editorial/luxurious-japanese-sake-still-life.webp";

export const desktopOmakaseBenefits = [
  [
    "Chef-curated experience",
    "Personalized tasting menu crafted in real-time.",
    "/assets/icons/chef-hat-icon.png",
  ],
  [
    "Premium ingredients",
    "The finest seasonal ingredients, sourced globally.",
    "/assets/icons/floral-emblem-icon.png",
  ],
  [
    "Intimate setting",
    "Exclusive counter seating for a personal connection.",
    "/assets/icons/dining-setting-icon.png",
  ],
  [
    "Expert hospitality",
    "Dedicated service from our sushi masters.",
    "/assets/icons/user-icon.png",
  ],
  [
    "Memorable finish",
    "A perfect finale to your extraordinary journey.",
    "/assets/icons/gift-icon.png",
  ],
] as const;

export const desktopOmakaseInfo = [
  [
    "Exclusive experience",
    "Limited seats per service",
    "floral-emblem-icon.png",
  ],
  ["Advanced reservations", "Reservations recommended", "calendar-icon.png"],
  ["24-hour cancellation", "Policy applies", "clock-icon.png"],
  ["Dietary accommodations", "Please inform us in advance", "phone-icon.png"],
] as const;

export function DesktopOmakasePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function DesktopPackageButton({
  isSelected,
  imagePriority = false,
  omakasePackage,
  onSelect,
  compact = false,
}: {
  compact?: boolean;
  imagePriority?: boolean;
  isSelected: boolean;
  omakasePackage: OmakasePackage;
  onSelect: (packageId: string) => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={classNames(
        "relative overflow-hidden rounded-[12px] border bg-black/38 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
        compact ? "min-h-[198px]" : "min-h-[190px]",
        isSelected
          ? "border-[var(--sb-red-bright)] shadow-[0_0_28px_rgba(239,47,37,0.28)]"
          : "border-[var(--sb-gold)]/28 hover:border-[var(--sb-gold)]/54",
      )}
      onClick={() => onSelect(omakasePackage.id)}
      type="button"
    >
      <div
        className={classNames("relative", compact ? "h-[88px]" : "h-[84px]")}
      >
        <Image
          alt=""
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority}
          sizes="230px"
          src={omakasePackage.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.74))]" />
      </div>
      <div className={classNames(compact ? "p-3" : "p-3.5")}>
        <h3
          className={classNames(
            "editorial-title uppercase text-white",
            compact ? "line-clamp-2 min-h-[44px] text-[18px]" : "text-[18px]",
          )}
        >
          {omakasePackage.title}
        </h3>
        <p className="mt-1 text-[12px] text-white/62">
          {omakasePackage.subtitle}
        </p>
        {compact ? (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <span className="min-w-0 rounded-[7px] border border-white/10 bg-white/[0.035] px-1.5 py-1 min-[1500px]:px-2">
              <span className="block text-[9px] uppercase tracking-[0.02em] text-white/40 min-[1500px]:text-[10px] min-[1500px]:tracking-[0.08em]">
                Length
              </span>
              <span className="mt-0.5 block text-[11px] text-white/72">
                {omakasePackage.durationMinutes} min
              </span>
            </span>
            <span className="min-w-0 rounded-[7px] border border-white/10 bg-white/[0.035] px-1.5 py-1 min-[1500px]:px-2">
              <span className="block text-[9px] uppercase tracking-[0.02em] text-white/40 min-[1500px]:text-[10px] min-[1500px]:tracking-[0.08em]">
                Guests
              </span>
              <span className="mt-0.5 block text-[11px] text-white/72">
                {omakasePackage.guestRange.min}-{omakasePackage.guestRange.max}
              </span>
            </span>
          </div>
        ) : (
          <p className="mt-2 line-clamp-2 min-h-9 text-[12px] leading-[18px] text-white/58">
            {omakasePackage.description}
          </p>
        )}
        <p className="mt-2 font-mono text-[19px] text-[var(--sb-gold-soft)]">
          {formatMoney(omakasePackage.priceCents)}
          <span className="ml-1 font-sans text-[12px] text-white/58">
            per guest
          </span>
        </p>
      </div>
      {isSelected ? (
        <span className="absolute right-3 top-3 rounded-[6px] bg-[var(--sb-red)] px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-white">
          Chef&apos;s pick
        </span>
      ) : null}
    </button>
  );
}

export function DesktopCourseJourney({
  courses,
}: {
  courses: OmakasePackageCourse[];
}) {
  const journey = [
    ...courses,
    {
      description: "Daily nigiri progression chosen at the counter.",
      id: "chef-nigiri-selection",
      image: {
        alt: "Chef nigiri selection",
        publicUrl: "/assets/menu/sushi/salmon-nigiri.webp",
      },
      label: "Nigiri",
      title: "Chef selection",
    },
    {
      description: "Seasonal sweet close with tea service.",
      id: "tea-finale",
      image: {
        alt: "Seasonal dessert",
        publicUrl: "/assets/omakase/desserts/matcha-mousse-dessert.webp",
      },
      label: "Dessert",
      title: "Seasonal finish",
    },
  ].slice(0, 5);

  return (
    <div className="grid grid-cols-3 gap-3 min-[1500px]:grid-cols-5">
      {journey.map((course, index) => (
        <article className="relative" key={course.id}>
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="absolute -left-3 top-[58px] z-10 hidden text-[var(--sb-gold-soft)] min-[1500px]:block"
            >
              <ChevronIcon direction="right" size={18} />
            </span>
          ) : null}
          <div className="overflow-hidden rounded-[10px] border border-[var(--sb-border)] bg-black/36">
            <div className="relative h-[92px]">
              <Image
                alt=""
                className="object-cover"
                fill
                loading="lazy"
                sizes="160px"
                src={course.image.publicUrl}
              />
            </div>
            <div className="p-2.5 text-center">
              <p className="editorial-title text-[15px] text-white">
                {course.label}
              </p>
              <p className="mt-1 line-clamp-2 min-h-[34px] text-[11px] leading-[17px] text-white/56">
                {course.title}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function DesktopOmakaseBenefit({
  copy,
  icon,
  title,
}: {
  copy: string;
  icon: string;
  title: string;
}) {
  return (
    <article className="grid grid-cols-[48px_1fr] items-center gap-3">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--sb-gold)]/44 bg-black/28">
        <AssetIcon size={24} src={icon} />
      </span>
      <div>
        <p className="text-[12px] uppercase tracking-[0.08em] text-white">
          {title}
        </p>
        <p className="mt-1 text-[12px] leading-5 text-white/58">{copy}</p>
      </div>
    </article>
  );
}
