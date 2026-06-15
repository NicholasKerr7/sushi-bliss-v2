"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { premiumReservationCards } from "@/data/omakase";
import { icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";
import type { OmakasePackage } from "@/types/omakase";

import { MobileOmakasePanel } from "./MobileOmakasePrimitives";
import { MobileOmakaseCommandCenter } from "./MobileOmakaseCommandCenter";

interface MobileOmakaseLandingViewProps {
  packages: OmakasePackage[];
  selectedPackage: OmakasePackage;
  onOpenReview: () => void;
  onSelectPackage: (packageId: string) => void;
}

/** Mobile omakase package selector with course preview and reservation entry points. */
export function MobileOmakaseLandingView({
  packages,
  selectedPackage,
  onOpenReview,
  onSelectPackage,
}: MobileOmakaseLandingViewProps) {
  const previewItems = [
    ...selectedPackage.courses.map((course) => ({
      alt: course.image.alt || course.title,
      id: course.id,
      image: course.image.publicUrl,
      subtitle: course.description,
      title: course.label,
    })),
    ...packages
      .filter((omakasePackage) => omakasePackage.id !== selectedPackage.id)
      .map((omakasePackage) => ({
        alt: omakasePackage.image.alt || omakasePackage.title,
        id: omakasePackage.id,
        image: omakasePackage.image.publicUrl,
        subtitle: omakasePackage.subtitle,
        title: omakasePackage.title,
      })),
  ].slice(0, 5);

  return (
    <>
      <div className="mt-7 grid grid-cols-[minmax(0,1fr)_72px] gap-3">
        <Link
          aria-label="Search sushi, rolls, or dishes"
          className="grid min-h-[72px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[13px] border border-[var(--sb-border)] bg-black/44 px-5 text-[16px] text-white/64 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_38px_rgba(0,0,0,0.36)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          href="/menu"
        >
          <AssetIcon
            loading="eager"
            size={27}
            src="/assets/icons/search-icon.png"
          />
          <span className="truncate">Search sushi, rolls, or dishes...</span>
        </Link>
        <Link
          aria-label="Open menu filters"
          className="grid min-h-[72px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/44 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_38px_rgba(0,0,0,0.36)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          href="/menu"
        >
          <AssetIcon
            loading="eager"
            size={29}
            src="/assets/icons/user-settings-icon.png"
          />
        </Link>
      </div>

      <section className="relative -mx-4 -mt-1 min-h-[318px] overflow-hidden px-4 pb-4 pt-0">
        <Image
          alt="Chef preparing omakase nigiri at the Sushi Bliss counter"
          className="absolute inset-y-0 right-[-120px] h-full w-[520px] object-cover opacity-82"
          height={1200}
          loading="eager"
          priority
          sizes="520px"
          src="/assets/chefs/hiroshi-tanaka-head-chef-plating.webp"
          width={900}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_34%,rgba(0,0,0,0.08),rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.9)_74%),linear-gradient(90deg,#050607_0%,rgba(5,6,7,0.94)_36%,rgba(5,6,7,0.38)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[96px] bg-[linear-gradient(180deg,transparent,#050607_86%)]" />
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-0 h-[120px] w-[190px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(215,168,79,0.14),transparent_68%)] blur-[2px]"
        />
        <div className="relative z-10 max-w-[310px] pt-7">
          <p className="editorial-title text-[22px] leading-none text-[var(--sb-gold-soft)]">
            The Art Of
          </p>
          <h1 className="editorial-title mt-3 text-[52px] leading-[0.88] text-white">
            Omakase
            <span className="mt-2 block text-[34px] leading-[0.98] text-[var(--sb-red-bright)]">
              The Chef&apos;s Journey
            </span>
          </h1>
          <p className="mt-5 max-w-[270px] text-[16px] leading-6 text-white/74">
            Trust the Chef. Surrender to excellence.
          </p>
          <p className="mt-4 max-w-[285px] text-[14px] leading-6 text-white/64">
            An intimate culinary journey, crafted in the moment with precision,
            passion, and the finest seasonal ingredients.
          </p>
        </div>
      </section>

      <section
        aria-label="Omakase experience qualities"
        className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 bg-black/24 py-3"
      >
        <MobileOmakaseFeature
          icon="/assets/icons/chef-hat-icon.png"
          label="Chef-Led Experience"
        />
        <MobileOmakaseFeature
          icon="/assets/icons/lotus-icon.png"
          label="Seasonal & Exclusive"
        />
        <MobileOmakaseFeature
          icon="/assets/icons/dining-setting-icon.png"
          label="Limited Seats"
        />
      </section>

      <section className="mt-7 overflow-x-clip">
        <div className="flex items-center justify-between gap-4">
          <p className="editorial-title text-[22px] text-[var(--sb-gold-soft)]">
            Experience Preview
          </p>
          <Link
            className="flex items-center gap-2 text-[14px] text-[var(--sb-red-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
            href="/menu"
          >
            View Full Menu
            <span aria-hidden="true" className="text-[23px] leading-none">
              <ChevronIcon direction="right" size={18} />
            </span>
          </Link>
        </div>

        <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1 smooth-scroll-area">
          {previewItems.map((item, index) => (
            <MobileOmakasePreviewCard
              alt={item.alt}
              image={item.image}
              index={index + 1}
              key={item.id}
              priority={index < 3}
              subtitle={item.subtitle}
              title={item.title}
            />
          ))}
        </div>
      </section>

      <MobileOmakasePanel className="mt-6 overflow-hidden p-4">
        <div className="grid min-h-[142px] grid-cols-[1fr_152px] items-center gap-3">
          <div className="space-y-4">
            <MobileOmakaseHighlight
              icon="/assets/icons/floral-emblem-icon.png"
              label="Personalized chef interaction"
            />
            <MobileOmakaseHighlight
              icon="/assets/icons/lotus-icon.png"
              label="Premium seasonal ingredients"
            />
            <MobileOmakaseHighlight
              icon="/assets/icons/crossed-knives-icon.png"
              label="Traditional Edomae techniques"
            />
          </div>
          <div className="relative min-h-[132px] overflow-hidden rounded-[13px]">
            <Image
              alt={selectedPackage.image.alt || selectedPackage.title}
              className="object-cover"
              fill
              loading="eager"
              sizes="152px"
              src={selectedPackage.image.publicUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.66),transparent)]" />
          </div>
        </div>
      </MobileOmakasePanel>

      <button
        className="red-glow-button mt-5 flex min-h-[76px] w-full items-center justify-center gap-8 rounded-[14px] border text-[16px]"
        onClick={onOpenReview}
        type="button"
      >
        Choose Experience
        <span aria-hidden="true" className="text-[30px] leading-none">
          <ChevronIcon direction="right" size={18} />
        </span>
      </button>

      <Link
        className="mt-5 flex min-h-[58px] items-center justify-center gap-3 rounded-[13px] border border-transparent text-[16px] uppercase tracking-[0.04em] text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/reservations"
      >
        <AssetIcon size={24} src={icons.calendar} />
        Reserve for a special occasion
      </Link>

      <div className="mt-5 grid gap-3">
        {packages.map((omakasePackage) => (
          <MobileOmakasePackageCard
            isSelected={selectedPackage.id === omakasePackage.id}
            key={omakasePackage.id}
            omakasePackage={omakasePackage}
            onSelectPackage={onSelectPackage}
          />
        ))}
      </div>

      <MobileOmakaseCommandCenter
        packageCount={packages.length}
        selectedPackage={selectedPackage}
        onOpenReview={onOpenReview}
      />

      <section className="mt-6">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Premium reservations
        </p>
        <div className="mt-3 grid gap-3">
          {premiumReservationCards.map((card) => (
            <Link
              className="grid min-h-[112px] grid-cols-[92px_minmax(0,1fr)] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
              href={card.href}
              key={card.id}
            >
              <span className="relative min-h-[88px] overflow-hidden rounded-[13px] border border-white/10 bg-black/34">
                <Image
                  alt={card.image.alt || card.title}
                  className="object-cover"
                  fill
                  sizes="92px"
                  src={card.image.publicUrl}
                />
              </span>
              <span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                  {card.label}
                </span>
                <span className="mt-2 block text-[17px] font-semibold text-white">
                  {card.title}
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-white/52">
                  {card.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function MobileOmakaseFeature({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="grid min-h-[78px] place-items-center px-2 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/54 bg-black/32">
        <AssetIcon loading="eager" size={22} src={icon} />
      </span>
      <span className="editorial-title mt-2 block text-[12px] leading-[1.14] text-white/82">
        {label}
      </span>
    </div>
  );
}

function MobileOmakasePreviewCard({
  alt,
  image,
  index,
  priority = false,
  subtitle,
  title,
}: {
  alt: string;
  image: string;
  index: number;
  priority?: boolean;
  subtitle: string;
  title: string;
}) {
  return (
    <article className="relative h-[170px] w-[188px] shrink-0 overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/42 shadow-[0_18px_50px_rgba(0,0,0,0.34)]">
      <Image
        alt={alt}
        className="object-cover"
        fill
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="188px"
        src={image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.34)_42%,rgba(0,0,0,0.9)_100%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-3">
        <span className="grid h-[26px] w-[26px] place-items-center rounded-full border border-[var(--sb-red-bright)] bg-black/60 font-mono text-[13px] text-[var(--sb-gold-soft)]">
          {index}
        </span>
        <span>
          <span className="editorial-title block text-[19px] leading-none text-white">
            {title}
          </span>
          <span className="mt-2 line-clamp-2 block text-[12px] leading-4 text-white/68">
            {subtitle}
          </span>
        </span>
      </div>
    </article>
  );
}

function MobileOmakaseHighlight({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <p className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-3 text-[14px] leading-5 text-white/76">
      <AssetIcon size={22} src={icon} />
      <span>{label}</span>
    </p>
  );
}

function MobileOmakasePackageCard({
  isSelected,
  omakasePackage,
  onSelectPackage,
}: {
  isSelected: boolean;
  omakasePackage: OmakasePackage;
  onSelectPackage: (packageId: string) => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className="grid min-h-[126px] w-full grid-cols-[92px_minmax(0,1fr)_26px] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
      onClick={() => onSelectPackage(omakasePackage.id)}
      type="button"
    >
      <span className="relative min-h-[102px] overflow-hidden rounded-[14px] border border-white/10 bg-black/34">
        <Image
          alt={omakasePackage.image.alt || omakasePackage.title}
          className="object-cover"
          fill
          loading={isSelected ? "eager" : "lazy"}
          sizes="92px"
          src={omakasePackage.image.publicUrl}
        />
      </span>
      <span className="min-w-0 py-1">
        <StatusBadge tone={omakasePackage.accent}>
          {omakasePackage.subtitle}
        </StatusBadge>
        <span className="mt-3 block text-[18px] font-semibold leading-6 text-white">
          {omakasePackage.title}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-white/52">
          {omakasePackage.durationMinutes} min ·{" "}
          {formatMoney(omakasePackage.priceCents)}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="mt-2 grid h-[26px] w-[26px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70"
      >
        {isSelected ? (
          <span className="h-[12px] w-[12px] rounded-full bg-[var(--sb-red-bright)]" />
        ) : null}
      </span>
    </button>
  );
}
