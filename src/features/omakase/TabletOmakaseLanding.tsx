"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import {
  tabletOmakaseBenefits,
  tabletOmakaseHighlights,
} from "@/features/omakase/tabletOmakaseContent";
import type { OmakasePackage } from "@/types/omakase";

import { TabletOmakasePackageTile } from "./TabletOmakasePackageTile";

interface TabletOmakaseLandingProps {
  omakasePackages: OmakasePackage[];
  selectedPackageId: string;
  onOpenReview: () => void;
  onSelectPackage: (packageId: string) => void;
}

export function TabletOmakaseLanding({
  omakasePackages,
  selectedPackageId,
  onOpenReview,
  onSelectPackage,
}: TabletOmakaseLandingProps) {
  return (
    <main className="smooth-scroll-area mx-auto min-h-0 w-full max-w-[1034px] flex-1 overflow-x-hidden overflow-y-auto pb-[104px]">
      <section className="relative mt-0 min-h-[318px] overflow-hidden rounded-b-[18px] border-x border-b border-white/10 bg-black/30 lg:min-h-[346px] min-[1080px]:min-h-[350px]">
        <Image
          alt=""
          className="object-cover object-[68%_46%] opacity-82"
          fill
          loading="eager"
          priority
          sizes="1034px"
          src="/assets/chefs/hiroshi-tanaka-head-chef-plating.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.82)_35%,rgba(5,6,7,0.18)_72%,rgba(5,6,7,0.12)_100%)]" />
        <div className="relative z-10 flex min-h-[318px] max-w-[390px] flex-col justify-center px-8 lg:min-h-[346px] min-[1080px]:min-h-[350px]">
          <p className="text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[15px]">
            Exclusive. Intimate. Unforgettable.
          </p>
          <h1 className="editorial-title mt-3 text-[50px] uppercase leading-[0.88] text-white min-[1080px]:text-[60px]">
            The Art of
            <span className="block text-[var(--sb-gold-soft)]">Omakase</span>
          </h1>
          <p className="mt-4 text-[14px] leading-6 text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
            Surrender to the chef&apos;s artistry. Each Omakase experience is a
            curated journey of the finest seasonal ingredients.
          </p>
          <Button
            className="red-glow-button mt-5 h-[64px] w-[304px] rounded-[10px] uppercase tracking-[0.08em]"
            onClick={onOpenReview}
          >
            <AssetIcon size={22} src="/assets/icons/calendar-icon.png" />
            Reserve your experience
          </Button>
          <p className="mt-3 flex items-center gap-2 text-[12px] text-[var(--sb-gold-soft)]">
            <AssetIcon size={18} src="/assets/icons/takeaway-bag-icon.png" />
            Limited seats available daily
          </p>
        </div>
      </section>

      <section className="mt-3 rounded-[14px] border border-white/10 bg-white/[0.04] p-3 min-[1080px]:p-4">
        <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Choose your experience
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-3 min-[1080px]:gap-4">
          {omakasePackages.map((omakasePackage) => (
            <TabletOmakasePackageTile
              isSelected={selectedPackageId === omakasePackage.id}
              key={omakasePackage.id}
              omakasePackage={omakasePackage}
              onSelectPackage={onSelectPackage}
            />
          ))}
        </div>
        <p className="mt-2 flex justify-center gap-2 text-[12px] text-white/60">
          <AssetIcon size={18} src="/assets/icons/floral-emblem-icon.png" />
          Prices are exclusive of tax and service charge.
        </p>
      </section>

      <section className="mt-3 grid gap-3 lg:grid-cols-[1fr_314px] min-[1080px]:gap-4">
        <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3 min-[1080px]:p-4">
          <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Experience highlights
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-3 lg:grid-cols-3">
            {tabletOmakaseHighlights.map((highlight) => (
              <div
                className="grid grid-cols-[36px_minmax(0,1fr)] gap-3"
                key={highlight.title}
              >
                <AssetIcon size={30} src={highlight.icon} />
                <div>
                  <h3 className="text-[11px] uppercase leading-4 tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    {highlight.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-[11px] leading-5 text-white/58">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
          <div className="relative h-[112px] overflow-hidden rounded-[10px] min-[1080px]:h-[124px]">
            <Image
              alt=""
              className="object-cover"
              fill
              loading="eager"
              sizes="324px"
              src="/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp"
            />
          </div>
          <h2 className="mt-3 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            An intimate journey
          </h2>
          <p className="mt-2 text-[12px] leading-5 text-white/62">
            Our omakase counter seats only 8 guests per seating to ensure an
            intimate, unrushed, and unforgettable dining experience.
          </p>
          <Link
            className="mt-3 flex min-h-10 items-center justify-center gap-2 rounded-[9px] border border-[var(--sb-gold)]/30 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            href="/locations"
          >
            <AssetIcon size={18} src="/assets/icons/calendar-icon.png" />
            View our space
          </Link>
        </article>
      </section>

      <section className="mt-3 grid grid-cols-[1fr_1fr] gap-3 min-[1080px]:gap-4">
        <article className="relative min-h-[108px] overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
          <Image
            alt=""
            className="object-cover object-right opacity-34"
            fill
            loading="eager"
            sizes="500px"
            src="/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp"
          />
          <div className="relative z-10 max-w-[280px]">
            <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              What guests say
            </h2>
            <p className="mt-3 text-[13px] leading-5 text-white/70">
              “The best omakase experience I&apos;ve ever had. Every piece was a
              masterpiece.”
            </p>
            <p className="mt-2 text-[14px] text-[var(--sb-gold-soft)]">
              ★ ★ ★ ★ ★
            </p>
          </div>
        </article>

        <article className="relative min-h-[108px] overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
          <Image
            alt=""
            className="object-cover object-right opacity-34"
            fill
            sizes="500px"
            src="/assets/editorial/sake-vase-set-black-gold-floral.webp"
          />
          <div className="relative z-10 max-w-[360px]">
            <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Omakase etiquette
            </h2>
            <p className="mt-3 text-[13px] leading-5 text-white/66">
              To fully enjoy your omakase experience, please arrive on time and
              refrain from using phones at the counter.
            </p>
          </div>
        </article>
      </section>

      <section className="mt-3 grid grid-cols-2 rounded-[14px] border border-white/10 bg-white/[0.035] lg:grid-cols-5">
        {tabletOmakaseBenefits.map(([title, subtitle, icon]) => (
          <div
            className="grid min-h-[58px] grid-cols-[30px_minmax(0,1fr)] items-center gap-2 border-r border-white/10 px-3 last:border-r-0"
            key={title}
          >
            <AssetIcon size={26} src={icon} />
            <span>
              <span className="block text-[11px] uppercase text-white/76">
                {title}
              </span>
              <span className="mt-1 block text-[11px] text-white/48">
                {subtitle}
              </span>
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
