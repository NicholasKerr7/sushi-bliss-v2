"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { contactMethods, helpArticles } from "@/data/support";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import type { HelpArticle } from "@/types/support";

const articleSteps = [
  [
    "Choose your experience",
    "Select dining room, chef counter, omakase, or private dining before choosing date and party size.",
  ],
  [
    "Confirm availability",
    "Only future dates and available seating windows can be confirmed from the reservation flow.",
  ],
  [
    "Modify from history",
    "Upcoming bookings can be edited or cancelled from Reservations with the original code preserved.",
  ],
] as const;

function getArticleHeadline(article: HelpArticle) {
  if (article.id === "reservation-changes") {
    return "How do reservations work?";
  }

  return article.title;
}

export function DesktopHelpArticleDetail({
  article,
  onBack,
  onContactSupport,
  onOpenArticle,
}: {
  article: HelpArticle;
  onBack: () => void;
  onContactSupport: () => void;
  onOpenArticle: (article: HelpArticle) => void;
}) {
  const relatedArticles = helpArticles.filter((item) => item.id !== article.id);

  return (
    <main className="mx-auto max-w-[1672px] px-7 pb-6 pt-6">
      <button
        className="text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back to help center
      </button>
      <section className="mt-4 grid grid-cols-[330px_minmax(0,1fr)_360px] gap-5">
        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
          <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Help articles
          </h2>
          <div className="mt-5 overflow-hidden rounded-[12px] border border-white/10">
            {helpArticles.map((item) => (
              <button
                aria-pressed={item.id === article.id}
                className="grid min-h-[58px] w-full grid-cols-[34px_1fr] items-center gap-3 border-b border-white/10 px-4 text-left last:border-b-0 aria-pressed:bg-[var(--sb-red)]/24"
                key={item.id}
                onClick={() => onOpenArticle(item)}
                type="button"
              >
                <AssetIcon
                  size={24}
                  src={
                    item.category === "Reservations"
                      ? "/assets/icons/calendar-icon.png"
                      : item.category === "Orders"
                        ? "/assets/icons/takeaway-bag-icon.png"
                        : "/assets/icons/headset-icon.png"
                  }
                />
                <span>
                  <span className="block text-[14px] text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[12px] text-white/46">
                    {item.category}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <article className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.44)]">
          <p className="text-[14px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            {article.category} guide
          </p>
          <h1 className="editorial-title mt-3 text-[52px] uppercase leading-[0.96] tracking-[0.04em] text-white">
            {getArticleHeadline(article)}
          </h1>
          <p className="mt-4 max-w-[760px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
            {article.summary}
          </p>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {articleSteps.map(([title, copy], index) => (
              <section
                className="rounded-[14px] border border-white/10 bg-black/24 p-5"
                key={title}
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-gold)]/42 text-[13px] text-[var(--sb-gold-soft)]">
                  {index + 1}
                </span>
                <h2 className="mt-4 text-[16px] uppercase tracking-[0.08em] text-white">
                  {title}
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-white/58">
                  {copy}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-7 rounded-[14px] border border-[var(--sb-gold)]/20 bg-black/24 p-5">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Article details
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-white/66">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>

        <aside className="grid gap-4">
          <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
            <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Related articles
            </h2>
            <div className="mt-4 divide-y divide-white/10">
              {relatedArticles.slice(0, 4).map((item) => (
                <button
                  className="w-full py-4 text-left"
                  key={item.id}
                  onClick={() => onOpenArticle(item)}
                  type="button"
                >
                  <span className="block text-[15px] text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-white/50">
                    {item.summary}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[18px] border border-[var(--sb-red)]/34 bg-[#130504] p-5">
            <h2 className="editorial-title text-[22px] uppercase tracking-[0.08em] text-white">
              Still need help?
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-white/62">
              Concierge can review seating, allergy, timing, and occasion
              requests before your visit.
            </p>
            {contactMethods.slice(0, 2).map((method) => (
              <a
                className="mt-4 grid grid-cols-[34px_1fr] items-center gap-3 border-t border-white/10 pt-4"
                href={method.href}
                key={method.id}
              >
                <AssetIcon
                  size={25}
                  src={
                    method.id === "phone"
                      ? "/assets/icons/phone-icon.png"
                      : "/assets/icons/email-icon.png"
                  }
                />
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    {method.label}
                  </span>
                  <span className="block text-[14px] text-white/62">
                    {method.value}
                  </span>
                </span>
              </a>
            ))}
            <Button
              className="mt-5 h-[52px] w-full rounded-[10px] text-[13px] uppercase tracking-[0.08em]"
              onClick={onContactSupport}
            >
              Contact support
            </Button>
          </section>
        </aside>
      </section>

      <div className="mt-5">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
