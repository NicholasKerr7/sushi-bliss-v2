"use client";

import Image from "next/image";

import { ChevronIcon } from "@/components/icons/ChevronIcon";

export function TabletProfilePreferencesHero({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="relative h-[181px] shrink-0 overflow-hidden bg-black/30">
      <Image
        alt=""
        className="object-cover object-[70%_52%] opacity-82"
        fill
        loading="eager"
        priority
        sizes="1086px"
        src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.99)_0%,rgba(5,6,7,0.9)_36%,rgba(5,6,7,0.28)_70%,rgba(5,6,7,0.08)_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-[992px] pt-10">
        <button
          className="mb-5 flex items-center gap-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onBack}
          type="button"
        >
          <ChevronIcon direction="left" size={18} />
          Account settings
        </button>
        <h1 className="editorial-title text-[54px] uppercase leading-none tracking-[0.06em] text-white">
          Preferences
        </h1>
        <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)]">
          Manage your account, preferences, and privacy settings.
        </p>
      </div>
    </section>
  );
}
