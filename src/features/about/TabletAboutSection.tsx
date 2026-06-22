"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brandContent } from "@/data/brand";
import { useNotifications } from "@/hooks/useNotifications";

import { TabletAboutBottomNav } from "./TabletAboutBottomNav";
import { TabletAboutHeader } from "./TabletAboutHeader";

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
    copy: "Every piece is crafted with intention, balance, and a deep love for the art of sushi.",
    icon: "/assets/icons/heart-icon.png",
    title: "Create with heart",
  },
  {
    copy: "We believe sushi brings people together. Every experience is designed to delight and inspire.",
    icon: "/assets/icons/group-icon.png",
    title: "Connect through experience",
  },
] as const;

const journey = [
  [
    "2012",
    "The beginning",
    "Sushi Bliss opened its first humble location with a passion for authentic sushi.",
  ],
  [
    "2014",
    "Growing community",
    "Word spread, and a community of sushi lovers began to grow with us.",
  ],
  [
    "2017",
    "Raising the bar",
    "We set new standards for quality, sourcing, and the guest experience.",
  ],
  [
    "2020",
    "Award recognition",
    "Honored by culinary experts and guests for excellence in sushi craftsmanship.",
  ],
  [
    "Today",
    "Beyond tomorrow",
    "We continue to evolve while staying true to our roots and our promise to you.",
  ],
] as const;

const experienceBenefits = [
  [
    "Ambiance",
    "Elegant spaces designed for comfort, connection, and calm.",
    "/assets/icons/lotus-icon.png",
  ],
  [
    "Ingredients",
    "Premium, sustainable ingredients delivered fresh, always.",
    "/assets/icons/sashimi-icon.png",
  ],
  [
    "Craftsmanship",
    "Skilled chefs, precise techniques, and artful presentation.",
    "/assets/icons/crossed-knives-icon.png",
  ],
  [
    "Hospitality",
    "Warm, attentive service that makes you feel at home.",
    "/assets/icons/miso-soup-icon.png",
  ],
] as const;

const heroImage = "/assets/editorial/hero-otoro-nigiri-no-red-moon.webp";
const experienceImage = "/assets/chefs/hiroshi-tanaka-head-chef-plating.webp";

export function TabletAboutSection() {
  const { unreadCount } = useNotifications();
  const firstSentence =
    "Sushi Bliss was born from a simple belief: extraordinary sushi begins with respect for tradition, for ingredients, and for you.";
  const secondSentence =
    "From intimate beginnings to a growing community of sushi lovers, the story continues with every piece we serve.";

  return (
    <section className="min-h-dvh bg-[#050607] text-white" id="about">
      <TabletAboutHeader unreadCount={unreadCount} />

      <main className="mx-auto w-full max-w-[1008px] px-5 pb-[112px] min-[900px]:px-0">
        <section className="relative h-[470px] overflow-hidden border-b border-white/[0.06]">
          <Image
            alt="Otoro nigiri presented on a dark luxury surface"
            className="object-cover object-[72%_50%] opacity-90"
            fill
            loading="eager"
            priority
            sizes="1008px"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,1)_0%,rgba(5,6,7,0.9)_36%,rgba(5,6,7,0.08)_75%,rgba(5,6,7,0.52)),linear-gradient(180deg,rgba(5,6,7,0.03),rgba(5,6,7,0.96))]" />
          <div className="relative z-10 flex h-full flex-col px-0 pt-7">
            <Link
              className="flex min-h-10 w-fit items-center gap-5 rounded-full pr-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
              href="/home"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/24">
                <ChevronIcon direction="left" size={17} />
              </span>
              About / Our Story
            </Link>

            <div className="mt-6 max-w-[512px]">
              <h1 className="editorial-title text-[50px] uppercase leading-[0.98] tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Our Story.
                <span className="block text-white">Our Passion.</span>
              </h1>
              <p className="mt-4 flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-red-bright)]">
                <span className="h-0.5 w-10 bg-[var(--sb-red-bright)]" />
                Crafted with purpose.
              </p>
              <p className="mt-3 max-w-[390px] text-[16px] leading-6 text-white/72">
                {firstSentence}
              </p>
              <p className="mt-2 max-w-[390px] text-[16px] leading-6 text-white/72">
                {secondSentence}
              </p>
              <div className="mt-4 flex gap-4">
                <Link
                  className="red-glow-button flex h-[50px] w-[268px] items-center justify-center gap-8 rounded-[8px] text-[13px] uppercase tracking-[0.12em]"
                  href="/chefs"
                >
                  <span>Meet the chefs</span>
                  <ChevronIcon direction="right" size={18} />
                </Link>
                <Link
                  className="flex h-[50px] w-[210px] items-center justify-center gap-8 rounded-[8px] border border-[var(--sb-gold)]/42 bg-black/18 text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                  href="/menu"
                >
                  <span>Explore menu</span>
                  <ChevronIcon direction="right" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3">
          {storyValues.map((value) => (
            <article
              className="h-[218px] overflow-hidden rounded-[5px] border border-white/10 bg-[linear-gradient(145deg,rgba(14,22,23,0.95),rgba(7,8,9,0.98))] p-5"
              key={value.title}
            >
              <span className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[var(--sb-gold)]/44 bg-black/18">
                <AssetIcon size={30} src={value.icon} />
              </span>
              <span className="mt-3 block h-0.5 w-10 bg-[var(--sb-red-bright)]" />
              <h2 className="editorial-title mt-3 text-[13px] uppercase leading-5 tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {value.title}
              </h2>
              <p className="mt-3 text-[12px] leading-[18px] text-white/60">
                {value.copy}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-7">
          <h2 className="editorial-title text-[18px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Our journey
          </h2>
          <div className="relative mt-5 grid grid-cols-5 gap-4">
            <span className="absolute left-8 right-8 top-[17px] h-px bg-[var(--sb-gold)]/38" />
            {journey.map(([year, title, copy]) => (
              <article className="relative text-center" key={year}>
                <span className="mx-auto grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-gold)]/48 bg-[#080909] shadow-[0_0_16px_rgba(215,168,79,0.18)]">
                  <AssetIcon
                    size={20}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                </span>
                <p className="mt-3 font-mono text-[16px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
                  {year}
                </p>
                <h3 className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[12px] leading-[18px] text-white/58">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 border-t border-[var(--sb-gold)]/24 pt-4">
          <h2 className="editorial-title text-[18px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            The Sushi Bliss Experience
          </h2>
          <div className="mt-4 grid gap-5 lg:grid-cols-[364px_minmax(0,1fr)] lg:gap-7">
            <div className="relative h-[214px] overflow-hidden rounded-[5px] border border-[var(--sb-gold)]/34">
              <Image
                alt="Chef preparing sushi at Sushi Bliss"
                className="object-cover object-center"
                fill
                sizes="364px"
                src={experienceImage}
              />
            </div>
            <div className="grid content-center gap-5">
              <p className="max-w-[530px] text-[17px] leading-6 text-white/68">
                At {brandContent.name}, dining is more than a meal. It&apos;s a
                journey. From the first bite to the last, we curate every detail
                to awaken your senses and leave you inspired.
              </p>
              <div className="grid grid-cols-2 gap-y-5 lg:grid-cols-4 lg:gap-y-0">
                {experienceBenefits.map(([title, copy, icon]) => (
                  <article
                    className="border-l border-[var(--sb-gold)]/24 px-4 odd:border-l-0 odd:pl-0 lg:odd:border-l lg:odd:pl-4 lg:first:border-l-0 lg:first:pl-0"
                    key={title}
                  >
                    <AssetIcon size={34} src={icon} />
                    <h3 className="mt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                      {title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-5 text-white/56">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <TabletAboutBottomNav />
    </section>
  );
}
