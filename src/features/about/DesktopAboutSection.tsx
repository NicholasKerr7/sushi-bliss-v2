"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { featuredAssets } from "@/data/assets";
import { appContent, brandContent } from "@/data/brand";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { classNames } from "@/lib/classNames";

type DesktopAboutSurface = "atmosphere" | "sourcing" | "story";

const philosophyCards = [
  [
    "Premium Ingredients",
    "Daily selections from trusted fish markets, rice millers, and seasonal farms.",
    "/assets/icons/floral-emblem-icon.png",
  ],
  [
    "Master Craft",
    "Every piece is shaped around texture, temperature, balance, and timing.",
    "/assets/icons/chef-crest-icon.png",
  ],
  [
    "Warm Hospitality",
    "Quiet luxury, thoughtful pacing, and details remembered before arrival.",
    "/assets/icons/dining-setting-icon.png",
  ],
] as const;

const sourcingCards = [
  [
    "Bluefin Tuna",
    "Line-caught, temperature controlled, and selected for clean marbling.",
    "/assets/editorial/sourcing-bluefin-tuna-on-ice.webp",
  ],
  [
    "Koshihikari Rice",
    "Polished in small batches and seasoned while warm for precise texture.",
    "/assets/food/steaming-bowl-of-rice-on-rustic-surface.webp",
  ],
  [
    "Wasabi & Herbs",
    "Fresh aromatics chosen daily to support, not cover, the seafood.",
    "/assets/editorial/premium-ingredients-wasabi-herbs.webp",
  ],
  [
    "Sake Pairings",
    "Sommelier-led bottles matched to fat, salinity, smoke, and citrus.",
    "/assets/editorial/luxurious-japanese-sake-still-life.webp",
  ],
] as const;

const atmosphereCards = [
  [
    "Chef Counter",
    "Front-row pacing, knife work, and direct pairing conversation.",
    "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
  ],
  [
    "Private Dining",
    "Soft light, low music, and concierge service for celebrations.",
    "/assets/gallery/intimate-upscale-dining-room-setting.webp",
  ],
  [
    "Courtyard Glow",
    "Lanterns, red blossoms, and a calm garden room after dark.",
    "/assets/gallery/serene-illuminated-courtyard-with-red-blossoms.webp",
  ],
  [
    "Arrival Ritual",
    "A warm entrance, quiet welcome, and prepared table notes.",
    "/assets/gallery/warm-glow-at-the-japanese-entrance.webp",
  ],
] as const;

export function DesktopAboutSection() {
  const { itemCount } = useCart();
  const [surface, setSurface] = useState<DesktopAboutSurface>("story");
  const primaryAmbience =
    featuredAssets.ambience[0]?.image || featuredAssets.heroSushi;
  const detailAmbience = featuredAssets.ambience[2]?.image || primaryAmbience;

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="about"
    >
      <DesktopMenuHeader
        activeId={surface === "sourcing" ? "sourcing" : "about"}
        cartCount={itemCount}
      />
      <main className="mx-auto max-w-[1672px] px-7 pb-6 pt-6">
        <DesktopAboutTabs
          activeSurface={surface}
          onSurfaceChange={setSurface}
        />
        {surface === "sourcing" ? (
          <DesktopSourcingView onSurfaceChange={setSurface} />
        ) : surface === "atmosphere" ? (
          <DesktopAtmosphereView onSurfaceChange={setSurface} />
        ) : (
          <DesktopStoryView
            detailImage={detailAmbience.publicUrl}
            detailImageAlt={detailAmbience.alt || "Sushi Bliss dining room"}
            heroImage={primaryAmbience.publicUrl}
            heroImageAlt={primaryAmbience.alt || "Sushi Bliss dining room"}
            onSurfaceChange={setSurface}
          />
        )}
        <div className="mt-4">
          <DesktopBenefitStrip />
        </div>
      </main>
    </section>
  );
}

function DesktopAboutTabs({
  activeSurface,
  onSurfaceChange,
}: {
  activeSurface: DesktopAboutSurface;
  onSurfaceChange: (surface: DesktopAboutSurface) => void;
}) {
  const tabs: Array<[DesktopAboutSurface, string]> = [
    ["story", "Our story"],
    ["sourcing", "Sourcing & Ingredients"],
    ["atmosphere", "Atmosphere"],
  ];

  return (
    <nav
      aria-label="About desktop sections"
      className="mb-4 grid w-[760px] grid-cols-3 overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035]"
    >
      {tabs.map(([id, label]) => {
        const active = activeSurface === id;

        return (
          <button
            aria-pressed={active}
            className={classNames(
              "min-h-[46px] border-r border-white/10 px-5 text-[12px] uppercase tracking-[0.08em] last:border-r-0",
              active
                ? "bg-[var(--sb-red)]/42 text-white shadow-[0_0_22px_rgba(238,43,36,0.24)]"
                : "text-white/62 hover:bg-white/[0.045] hover:text-white",
            )}
            key={id}
            onClick={() => onSurfaceChange(id)}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function DesktopStoryView({
  detailImage,
  detailImageAlt,
  heroImage,
  heroImageAlt,
  onSurfaceChange,
}: {
  detailImage: string;
  detailImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  onSurfaceChange: (surface: DesktopAboutSurface) => void;
}) {
  return (
    <>
      <section className="grid min-h-[430px] grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
        <div className="flex flex-col justify-center px-12 py-8">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Our Story
          </p>
          <h1 className="editorial-title mt-4 text-[56px] uppercase leading-[0.94] tracking-[0.04em] text-white">
            Crafted with Passion.
            <span className="block text-[var(--sb-red-bright)]">
              Served with Purpose.
            </span>
          </h1>
          <p className="mt-5 max-w-[560px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
            {brandContent.name} began as a chef counter devoted to daily
            sourcing, careful rice, and a calm dining room where every course
            lands at the right moment.
          </p>
          <div className="mt-8 grid max-w-[690px] grid-cols-[230px_210px_210px] gap-4">
            <Button
              className="h-[58px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={() => onSurfaceChange("sourcing")}
            >
              Explore sourcing
            </Button>
            <button
              className="h-[58px] rounded-[12px] border border-[var(--sb-gold)]/38 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={() => onSurfaceChange("atmosphere")}
              type="button"
            >
              View gallery
            </button>
            <Button
              className="h-[58px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              href="/chefs"
              variant="secondary"
            >
              Meet chefs
            </Button>
          </div>
        </div>
        <div className="relative min-h-[430px]">
          <Image
            alt={heroImageAlt}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="900px"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.08),rgba(7,9,10,0.38)_72%,rgba(7,9,10,0.72))]" />
          <div className="absolute bottom-7 left-7 rounded-[14px] border border-[var(--sb-border)] bg-black/62 p-5 backdrop-blur-md">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Tokyo dining room
            </p>
            <p className="mt-2 max-w-[330px] text-[15px] leading-6 text-white/72">
              {appContent.location.label} pairs traditional omakase discipline
              with modern member service.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_390px] gap-4">
        <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[23px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Our Philosophy
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {philosophyCards.map(([title, copy, icon]) => (
              <div
                className="min-h-[150px] rounded-[14px] border border-white/10 bg-black/28 p-5"
                key={title}
              >
                <AssetIcon size={36} src={icon} />
                <h3 className="mt-4 text-[18px] uppercase tracking-[0.06em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-white/58">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]">
          <div className="relative h-[154px]">
            <Image
              alt={detailImageAlt}
              className="object-cover"
              fill
              loading="eager"
              sizes="390px"
              src={detailImage}
            />
          </div>
          <div className="p-5">
            <h2 className="editorial-title text-[22px] uppercase text-white">
              Hospitality standard
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-white/62">
              Reservations, preferences, gifts, and support all reflect the same
              quiet rhythm as the dining room.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

function DesktopSourcingView({
  onSurfaceChange,
}: {
  onSurfaceChange: (surface: DesktopAboutSurface) => void;
}) {
  return (
    <>
      <section className="grid min-h-[334px] grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#07090a]">
        <div className="flex flex-col justify-center px-12 py-8">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Sourcing & Ingredients
          </p>
          <h1 className="editorial-title mt-4 text-[54px] uppercase leading-[0.94] tracking-[0.04em] text-white">
            Premium Ingredients.
            <span className="block text-[var(--sb-red-bright)]">
              Trusted Sourcing.
            </span>
          </h1>
          <p className="mt-5 max-w-[570px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
            Every menu choice starts with trusted purveyors, strict temperature
            control, and a chef review before service.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 p-5">
          {sourcingCards.map(([title, copy, image], index) => (
            <article
              className="relative min-h-[142px] overflow-hidden rounded-[14px] border border-white/10"
              key={title}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                sizes="360px"
                src={image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/48 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h2 className="text-[18px] uppercase tracking-[0.06em] text-white">
                  {title}
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-white/64">
                  {copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_400px] gap-4">
        <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[24px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Chef sourcing note
          </h2>
          <p className="mt-4 text-[18px] leading-8 text-white/74">
            &quot;Luxury is restraint. We choose fewer ingredients, handle them
            carefully, and let the best fish carry the course.&quot;
          </p>
          <p className="mt-4 text-[13px] uppercase tracking-[0.12em] text-white/46">
            Hiroshi Tanaka, Head Chef
          </p>
        </article>
        <article className="rounded-[18px] border border-[var(--sb-red)]/34 bg-[#130504] p-6">
          <h2 className="editorial-title text-[24px] uppercase tracking-[0.08em] text-white">
            Our commitment
          </h2>
          <ul className="mt-5 space-y-3 text-[14px] leading-6 text-white/66">
            {[
              "Daily receiving logs before service.",
              "Seasonal menu adjustments by availability.",
              "Allergy-aware prep and clearly stored preferences.",
            ].map((item) => (
              <li className="flex gap-3" key={item}>
                <AssetIcon
                  className="mt-1"
                  size={16}
                  src="/assets/icons/check-icon.png"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-6 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => onSurfaceChange("atmosphere")}
            type="button"
          >
            View atmosphere <ChevronIcon direction="right" size={18} />
          </button>
        </article>
      </section>
    </>
  );
}

function DesktopAtmosphereView({
  onSurfaceChange,
}: {
  onSurfaceChange: (surface: DesktopAboutSurface) => void;
}) {
  return (
    <>
      <section className="grid min-h-[360px] grid-cols-[480px_1fr] gap-4">
        <article className="flex flex-col justify-center rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-10">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Gallery
          </p>
          <h1 className="editorial-title mt-4 text-[58px] uppercase leading-[0.94] tracking-[0.04em] text-white">
            Our
            <span className="block text-[var(--sb-red-bright)]">
              Atmosphere
            </span>
          </h1>
          <p className="mt-5 text-[18px] leading-7 text-[var(--sb-gold-soft)]">
            Dim lighting, chef-led pacing, warm wood, and just enough theater
            for a memorable night.
          </p>
          <Button
            className="mt-8 h-[56px] w-[250px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
            href="/reservations"
          >
            Reserve a table
          </Button>
        </article>
        <div className="grid grid-cols-4 gap-3">
          {atmosphereCards.map(([title, copy, image], index) => (
            <article
              className={classNames(
                "relative overflow-hidden rounded-[18px] border border-white/10 bg-black/32",
                index === 0 && "col-span-2 row-span-2",
              )}
              key={title}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                loading={index < 2 ? "eager" : "lazy"}
                priority={index === 0}
                sizes={index === 0 ? "520px" : "260px"}
                src={image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/32 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h2 className="text-[17px] uppercase tracking-[0.06em] text-white">
                  {title}
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-white/62">
                  {copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_360px] gap-4">
        <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[24px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            What to expect
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {[
              ["Arrival", "Concierge welcome and confirmed preference notes."],
              ["Service", "Courses paced around the table, not the clock."],
              ["Departure", "Saved favorites, rewards, and visit history."],
            ].map(([title, copy]) => (
              <div
                className="rounded-[14px] border border-white/10 bg-black/24 p-5"
                key={title}
              >
                <h3 className="text-[16px] uppercase tracking-[0.08em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-white/58">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a] p-6">
          <h2 className="editorial-title text-[24px] uppercase tracking-[0.08em] text-white">
            Behind the room
          </h2>
          <p className="mt-4 text-[14px] leading-6 text-white/62">
            The same detail system powers the app: orders, reservations,
            loyalty, notifications, and concierge support.
          </p>
          <button
            className="mt-6 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => onSurfaceChange("story")}
            type="button"
          >
            Return to story <ChevronIcon direction="right" size={18} />
          </button>
        </article>
      </section>
    </>
  );
}
