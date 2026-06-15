"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import type { HelpArticle } from "@/types/support";

interface TabletSupportArticleDetailViewProps {
  article: HelpArticle;
  onBack: () => void;
  onOpenContact: () => void;
}

export function TabletSupportArticleDetailView({
  article,
  onBack,
  onOpenContact,
}: TabletSupportArticleDetailViewProps) {
  const isOrderArticle = article.id === "order-tracking";
  const title = isOrderArticle ? "Tracking your order" : article.title;

  return (
    <article className="mt-3 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] min-[1080px]:mt-5">
      <div className="border-b border-white/10 px-7 py-5">
        <button
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onBack}
          type="button"
        >
          <ChevronIcon direction="left" size={18} /> Back to help center
        </button>
      </div>

      <section className="relative mx-7 mt-6 overflow-hidden rounded-[16px] border border-white/10 bg-black/38">
        <Image
          alt=""
          className="object-cover opacity-76"
          fill
          loading="eager"
          priority
          sizes="980px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.76)_52%,rgba(5,6,7,0.12))]" />
        <div className="relative z-10 min-h-[288px] px-8 py-8 min-[1080px]:min-h-[340px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-red-bright)]">
            {article.category}
          </p>
          <h1 className="editorial-title mt-5 max-w-[560px] text-[56px] leading-[0.95] text-white min-[1080px]:text-[70px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[460px] text-[17px] leading-7 text-white/64">
            {article.summary}
          </p>
        </div>
      </section>

      <div className="grid gap-7 px-8 py-7 lg:grid-cols-[1fr_320px] min-[1080px]:px-10 min-[1080px]:py-9">
        <section>
          <h2 className="text-[22px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
            {isOrderArticle ? "How to track your order" : "Article details"}
          </h2>
          <ol className="mt-5 grid gap-4">
            {article.body.map((paragraph, index) => (
              <li
                className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 text-[16px] leading-7 text-white/66"
                key={paragraph}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)] bg-black/28 font-mono text-[18px] text-[var(--sb-red-bright)]">
                  {index + 1}
                </span>
                <span>{paragraph}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-[16px] border border-[var(--sb-border)] bg-black/24 p-5">
            <div className="grid grid-cols-[58px_minmax(0,1fr)] gap-4">
              <span className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[var(--sb-border)]">
                <AssetIcon size={34} src="/assets/icons/gold-alert-icon.png" />
              </span>
              <div>
                <h3 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Helpful tip
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-white/60">
                  Turn on notifications for order stage updates, reservation
                  reminders, and concierge replies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-[19px] font-semibold text-white">
            Still need help?
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-white/58">
            Concierge can review order numbers, allergy notes, booking
            questions, gift timing, and loyalty concerns.
          </p>
          <div className="mt-5 grid gap-3">
            <button
              className="red-glow-button h-[54px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={onOpenContact}
              type="button"
            >
              Start chat
            </button>
            <button
              className="h-[54px] rounded-[12px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onBack}
              type="button"
            >
              Back to help center
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
}
