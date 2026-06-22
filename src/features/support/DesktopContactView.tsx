"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { helpArticles, socialLinks, supportTopics } from "@/data/support";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import type { HelpArticle, SupportMessageDraft } from "@/types/support";

import { desktopSupportContactCards } from "./DesktopSupportData";
import {
  DesktopSupportCardTitle,
  DesktopSupportInput,
} from "./DesktopSupportPrimitives";

export function DesktopContactView({
  draft,
  messagesCount,
  status,
  onDraftChange,
  onOpenArticle,
  onOpenHelp,
  onSubmit,
}: {
  draft: SupportMessageDraft;
  messagesCount: number;
  status: string;
  onDraftChange: (draft: SupportMessageDraft) => void;
  onOpenArticle: (article: HelpArticle) => void;
  onOpenHelp: () => void;
  onSubmit: () => void;
}) {
  return (
    <main className="mx-auto max-w-[1672px] px-7 pb-4 pt-4">
      <section className="grid grid-cols-[minmax(0,1fr)_430px] gap-8">
        <div>
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            We&apos;d love to hear from you
          </p>
          <h1 className="editorial-title mt-2 text-[54px] uppercase leading-none tracking-[0.08em]">
            Contact
            <span className="block text-[var(--sb-red-bright)]">
              Sushi Bliss
            </span>
          </h1>
          <p className="mt-2 max-w-[410px] text-[17px] leading-7 text-[var(--sb-gold-soft)]">
            Have a question, special request, or want to book a private dining
            experience? Our team is here to help.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            className="red-glow-button grid h-[60px] grid-cols-[48px_1fr_24px] items-center rounded-[12px] px-7 text-[17px] uppercase tracking-[0.06em]"
            href="/reservations"
          >
            <AssetIcon size={28} src="/assets/icons/calendar-icon.png" />
            Reserve a table
            <ChevronIcon direction="right" size={18} />
          </Link>
          <Link
            className="grid h-[60px] grid-cols-[48px_1fr_24px] items-center rounded-[12px] border border-[var(--sb-gold)]/36 bg-black/38 px-7 text-[17px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
            href="/menu"
          >
            <AssetIcon size={28} src="/assets/icons/takeaway-bag-icon.png" />
            Order now
            <ChevronIcon direction="right" size={18} />
          </Link>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.45fr)] gap-4">
        {desktopSupportContactCards.map((card) => (
          <article
            className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
            key={card.title}
          >
            <DesktopSupportCardTitle icon={card.icon} title={card.title} />
            <p className="mt-3 min-h-[60px] text-[14px] leading-6 text-white/68">
              {card.body}
            </p>
            <Link
              className="mt-2 inline-flex min-h-11 items-center rounded-full border border-[var(--sb-gold)]/32 px-5 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href={card.href}
            >
              {card.cta}
              <span className="ml-4" aria-hidden="true">
                <ChevronIcon direction="right" size={18} />
              </span>
            </Link>
          </article>
        ))}
        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
          <DesktopSupportCardTitle
            icon="/assets/icons/floral-emblem-icon.png"
            title="Follow us"
          />
          <p className="mt-3 min-h-[60px] text-[14px] leading-6 text-white/68">
            Seasonal offers, chef notes, and behind-the-scenes service updates.
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="grid h-11 min-w-0 place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-black/24 text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/58 hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href={link.href}
                key={link.id}
                rel="noopener noreferrer"
                target="_blank"
                title={link.platform}
              >
                <AssetIcon size={20} src={link.icon} />
              </a>
            ))}
          </div>
        </article>
        <div className="relative overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/48">
          <Image
            alt="Map to Sushi Bliss Tokyo"
            className="object-cover"
            fill
            loading="eager"
            sizes="500px"
            src="/assets/maps/map-location.webp"
          />
        </div>
      </section>

      <section className="mt-4 grid grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] gap-4">
        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
          <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Send us a message
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <DesktopSupportInput
              label="Full Name"
              value={draft.name}
              onChange={(value) => onDraftChange({ ...draft, name: value })}
            />
            <DesktopSupportInput
              label="Email Address"
              value={draft.email}
              onChange={(value) => onDraftChange({ ...draft, email: value })}
            />
            <label className="relative col-span-2 block">
              <span className="sr-only">Support topic</span>
              <select
                className="h-11 w-full appearance-none rounded-[8px] border border-white/10 bg-black/28 px-4 pr-11 text-[14px] font-semibold text-white outline-none transition focus:border-[var(--sb-gold)]/58 focus:ring-2 focus:ring-[var(--sb-gold)]/18"
                onChange={(event) =>
                  onDraftChange({ ...draft, topicId: event.target.value })
                }
                value={draft.topicId}
              >
                {supportTopics.map((topic) => (
                  <option
                    className="bg-[#080a0b] text-white"
                    key={topic.id}
                    value={topic.id}
                  >
                    {topic.label}
                  </option>
                ))}
              </select>
              <ChevronIcon
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sb-gold)]"
                direction="down"
                size={18}
              />
            </label>
            <textarea
              className="col-span-2 min-h-[64px] resize-none rounded-[8px] border border-white/10 bg-black/28 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/36"
              onChange={(event) =>
                onDraftChange({ ...draft, message: event.target.value })
              }
              placeholder="Your Message"
              value={draft.message}
            />
          </div>
          {status ? (
            <p className="mt-3 text-[13px] text-[var(--sb-gold-soft)]">
              {status}
            </p>
          ) : (
            <p className="mt-3 text-[13px] text-white/46">
              Previous requests in this session: {messagesCount}
            </p>
          )}
          <Button
            className="mt-2 h-[48px] w-full rounded-[10px] text-[14px] uppercase tracking-[0.08em]"
            onClick={onSubmit}
          >
            Send message
            <ChevronIcon direction="right" size={18} />
          </Button>
        </article>

        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Frequently asked questions
            </h2>
            <button
              className="inline-flex min-h-10 items-center rounded-full px-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onOpenHelp}
              type="button"
            >
              View all FAQs
            </button>
          </div>
          <div className="mt-3 overflow-hidden rounded-[10px] border border-white/10">
            {helpArticles.slice(0, 5).map((article) => (
              <button
                className="flex min-h-10 w-full items-center justify-between border-b border-white/10 px-4 text-left last:border-b-0"
                key={article.id}
                onClick={() => onOpenArticle(article)}
                type="button"
              >
                <span className="text-[14px] text-white/78">
                  {article.title}
                </span>
                <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
                  +
                </span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <div className="mt-3">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
