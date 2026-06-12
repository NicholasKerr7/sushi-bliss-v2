"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { appContent, brandContent } from "@/data/brand";
import { featuredAssets } from "@/data/assets";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";

const storyValues = [
  {
    copy: "We source the finest seasonal ingredients and treat each one with the respect it deserves.",
    icon: "/assets/icons/lotus-icon.png",
    title: "Respect the ingredient",
  },
  {
    copy: "Rooted in Japanese heritage, our techniques reflect generations of mastery and discipline.",
    icon: "/assets/icons/chef-crest-icon.png",
    title: "Honor the tradition",
  },
  {
    copy: "Every piece is crafted with intention, balance, and deep love for the art of sushi.",
    icon: "/assets/icons/heart-icon.png",
    title: "Create with heart",
  },
  {
    copy: "Every experience is designed to delight, connect, and inspire.",
    icon: "/assets/icons/group-icon.png",
    title: "Connect through experience",
  },
] as const;

const journey = [
  ["2012", "The beginning", "Sushi Bliss opened its first humble location."],
  ["2014", "Growing community", "A loyal community of sushi lovers grew."],
  ["2017", "Raising the bar", "We set new sourcing and service standards."],
  ["2020", "Award recognition", "Culinary experts recognized the craft."],
  ["Today", "Beyond tomorrow", "We keep evolving while staying true."],
] as const;

export function TabletAboutSection() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const primaryAmbience =
    featuredAssets.heroSushi || featuredAssets.ambience[0]?.image;
  const detailAmbience =
    featuredAssets.ambience[1]?.image || featuredAssets.heroSushi;

  return (
    <section
      className="flex min-h-dvh flex-col overflow-x-hidden bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="about"
    >
      <TabletExperienceHeader
        cartCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        title="About / Our Story"
      />

      <main className="mx-auto w-full max-w-[1034px] min-w-0 overflow-hidden">
        <section className="relative mt-3 overflow-hidden rounded-[18px] border border-white/10 bg-black/42 min-[1080px]:mt-5">
          <Image
            alt={primaryAmbience.alt || "Sushi Bliss otoro nigiri"}
            className="object-cover object-right opacity-78"
            fill
            loading="eager"
            priority
            sizes="1034px"
            src={primaryAmbience.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.76)_44%,rgba(5,6,7,0.12))]" />
          <div className="relative z-10 min-h-[420px] px-7 py-7 min-[1080px]:min-h-[510px] min-[1080px]:px-10 min-[1080px]:py-9">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              About / Our Story
            </p>
            <h1 className="editorial-title mt-8 max-w-[520px] text-[58px] leading-[0.94] text-white min-[1080px]:text-[78px]">
              Our Story.
              <span className="block">Our Passion.</span>
            </h1>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-red-bright)]">
              Crafted with purpose.
            </p>
            <p className="mt-5 max-w-[400px] text-[17px] leading-7 text-white/66">
              {brandContent.name} was born from a simple belief: extraordinary
              sushi begins with respect for tradition, ingredients, and you.
            </p>
            <div className="mt-7 flex max-w-full flex-wrap gap-4">
              <Link
                className="red-glow-button grid h-[52px] w-[250px] max-w-full place-items-center rounded-[11px] text-[13px] uppercase tracking-[0.1em]"
                href="/chefs"
              >
                Meet the chefs
              </Link>
              <Link
                className="grid h-[52px] w-[200px] max-w-full place-items-center rounded-[11px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
                href="/menu"
              >
                Explore menu
              </Link>
            </div>
          </div>
        </section>

        <section className="-mt-[112px] grid min-w-0 grid-cols-4 gap-3 px-6 min-[1080px]:-mt-[124px] min-[1080px]:gap-4">
          {storyValues.map((value) => (
            <article
              className="relative z-10 min-h-[190px] min-w-0 rounded-[14px] border border-white/10 bg-[#0b1011]/90 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-md min-[1080px]:min-h-[218px]"
              key={value.title}
            >
              <AssetIcon size={38} src={value.icon} />
              <h2 className="mt-4 text-[15px] font-semibold uppercase leading-5 tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {value.title}
              </h2>
              <p className="mt-3 text-[13px] leading-6 text-white/58">
                {value.copy}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-7">
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Our journey
          </h2>
          <div className="relative mt-5 grid min-w-0 grid-cols-5 gap-4">
            <span className="absolute left-8 right-8 top-[21px] h-px bg-[var(--sb-border)]" />
            {journey.map(([year, title, copy]) => (
              <article className="relative min-w-0 text-center" key={year}>
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-border)] bg-black">
                  <AssetIcon
                    size={24}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                </span>
                <p className="mt-3 text-[16px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
                  {year}
                </p>
                <h3 className="mt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[12px] leading-5 text-white/52">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid min-w-0 grid-cols-[0.72fr_1fr] gap-5 border-t border-[var(--sb-border)] pt-5">
          <div className="min-w-0">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              The Sushi Bliss experience
            </h2>
            <div className="relative mt-4 min-h-[214px] overflow-hidden rounded-[12px] border border-[var(--sb-border)]">
              <Image
                alt={detailAmbience.alt || "Chef preparing sushi"}
                className="object-cover"
                fill
                sizes="420px"
                src={detailAmbience.publicUrl}
              />
            </div>
          </div>
          <div className="grid min-w-0 content-center gap-5">
            <p className="text-[17px] leading-7 text-white/64">
              At {brandContent.name}, dining is more than a meal. We curate
              every detail to awaken your senses and leave you inspired.
            </p>
            <div className="grid min-w-0 grid-cols-4 gap-3">
              {appContent.benefits.map((benefit) => (
                <div
                  className="min-w-0 border-l border-white/10 pl-4 first:border-l-0 first:pl-0"
                  key={benefit.id}
                >
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    {benefit.title}
                  </p>
                  <p className="mt-2 text-[12px] leading-5 text-white/50">
                    {benefit.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <TabletBottomNavigation
        activeId="home"
        ariaLabel="Tablet about navigation"
        fixed={false}
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
