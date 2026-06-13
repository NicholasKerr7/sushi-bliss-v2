"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { helpArticles, supportTopics } from "@/data/support";
import { classNames } from "@/lib/classNames";
import type { HelpArticle } from "@/types/support";

interface TabletSupportHelpViewProps {
  onOpenArticle: (article: HelpArticle) => void;
  onOpenContact: () => void;
}

const topicIcons = [
  "/assets/icons/takeaway-bag-icon.png",
  "/assets/icons/calendar-icon.png",
  "/assets/icons/credit-card-icon.png",
  "/assets/icons/delivery-scooter-icon.png",
  "/assets/icons/golden-ticket-icon.png",
  "/assets/icons/user-settings-icon.png",
];

export function TabletSupportHelpView({
  onOpenArticle,
  onOpenContact,
}: TabletSupportHelpViewProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleArticles = useMemo(() => {
    if (!normalizedQuery) {
      return helpArticles;
    }

    return helpArticles.filter((article) =>
      [article.title, article.summary, article.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  return (
    <>
      <section className="relative mt-3 overflow-hidden rounded-[18px] border border-white/10 bg-black/42 min-[1080px]:mt-5">
        <Image
          alt=""
          className="object-cover opacity-68"
          fill
          loading="eager"
          priority
          sizes="1034px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.72)_48%,rgba(5,6,7,0.12))]" />
        <div className="relative z-10 grid min-h-[270px] grid-cols-[minmax(0,1fr)_280px] gap-8 px-7 py-6 min-[1080px]:min-h-[330px] min-[1080px]:px-9 min-[1080px]:py-8">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--sb-gold-soft)]">
              Help center
            </p>
            <h1 className="editorial-title mt-3 text-[58px] leading-[0.9] text-white min-[1080px]:text-[74px]">
              How can we
              <span className="block text-[var(--sb-red-bright)]">
                help you?
              </span>
            </h1>
            <p className="mt-4 max-w-[490px] text-[16px] leading-6 text-white/62 min-[1080px]:text-[18px]">
              Search for answers or browse curated topics for orders,
              reservations, payments, delivery, rewards, and account care.
            </p>
            <div className="mt-6 flex h-[58px] items-center gap-3 rounded-full border border-[var(--sb-border)] bg-black/38 px-5">
              <AssetIcon size={27} src="/assets/icons/search-icon.png" />
              <label className="sr-only" htmlFor="tablet-help-search">
                Search help articles
              </label>
              <input
                className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/38"
                id="tablet-help-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for help articles, topics or keywords..."
                value={query}
              />
            </div>
          </div>

          <div className="self-end rounded-[16px] border border-[var(--sb-border)] bg-black/44 p-5 backdrop-blur-md">
            <AssetIcon size={52} src="/assets/icons/headset-icon.png" />
            <h2 className="mt-4 text-[20px] font-semibold uppercase tracking-[0.08em] text-white">
              Contact support
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-white/58">
              Can&apos;t find what you need? Concierge is available every day.
            </p>
            <button
              className="red-glow-button mt-5 h-[50px] w-full rounded-[11px] text-[12px] uppercase tracking-[0.08em]"
              onClick={onOpenContact}
              type="button"
            >
              Contact support
            </button>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="tablet-help-topic-title"
        className="mt-3 min-[1080px]:mt-4"
      >
        <h2 className="sr-only" id="tablet-help-topic-title">
          Help topics
        </h2>
        <div className="grid grid-cols-3 gap-3 min-[1080px]:gap-4">
          {[...supportTopics, ...supportTopics.slice(0, 2)].map(
            (topic, index) => (
              <button
                className="min-h-[166px] rounded-[16px] border border-white/10 bg-white/[0.04] p-5 text-center transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:min-h-[198px]"
                key={`${topic.id}-${index}`}
                onClick={() => {
                  setQuery(topic.label);
                }}
                type="button"
              >
                <span className="mx-auto grid h-[58px] w-[58px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/26">
                  <AssetIcon
                    size={31}
                    src={topicIcons[index] || "/assets/icons/headset-icon.png"}
                  />
                </span>
                <span className="mt-4 block text-[18px] font-semibold uppercase tracking-[0.08em] text-white">
                  {index === 2 ? "Payments" : topic.label}
                </span>
                <span className="mt-2 line-clamp-2 block text-[14px] leading-6 text-white/54">
                  {index === 2
                    ? "Payment methods, refunds, billing, and cards."
                    : topic.description}
                </span>
              </button>
            ),
          )}
        </div>
      </section>

      <section className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.54fr] min-[1080px]:mt-4 min-[1080px]:gap-4">
        <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--sb-red-bright)]">
                Popular topics
              </p>
              <h2 className="mt-1 text-[22px] font-semibold text-white">
                Help articles
              </h2>
            </div>
            <button
              className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
              onClick={() => setQuery("")}
              type="button"
            >
              View all articles
            </button>
          </div>
          <div className="mt-4 grid gap-2">
            {visibleArticles.map((article, index) => (
              <button
                className={classNames(
                  "grid min-h-[62px] grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-4 rounded-[12px] border border-white/10 bg-black/24 px-4 text-left transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  index === 0 && "border-[var(--sb-border)]",
                )}
                key={article.id}
                onClick={() => onOpenArticle(article)}
                type="button"
              >
                <AssetIcon
                  size={27}
                  src={topicIcons[index] || "/assets/icons/headset-icon.png"}
                />
                <span className="min-w-0">
                  <span className="block truncate text-[16px] font-semibold text-white">
                    {article.title}
                  </span>
                  <span className="mt-1 line-clamp-1 block text-[12px] text-white/44">
                    {article.summary}
                  </span>
                </span>
                <span
                  className="text-[24px] leading-none text-white/54"
                  aria-hidden="true"
                >
                  <ChevronIcon direction="right" size={18} />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-white/[0.04]">
          <div className="relative min-h-[180px]">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="340px"
              src="/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.88))]" />
          </div>
          <div className="p-5">
            <StatusBadge tone="premium">Need more help?</StatusBadge>
            <p className="mt-3 text-[14px] leading-6 text-white/58">
              Our support team is available seven days a week for urgent dining
              requests.
            </p>
            <button
              className="mt-5 h-[48px] w-full rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onOpenContact}
              type="button"
            >
              Contact support
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
