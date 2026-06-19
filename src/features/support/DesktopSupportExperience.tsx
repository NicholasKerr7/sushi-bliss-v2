"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import {
  contactMethods,
  helpArticles,
  socialLinks,
  supportTopics,
} from "@/data/support";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useProfile } from "@/hooks/useProfile";
import { useSupport } from "@/hooks/useSupport";
import type { HelpArticle, SupportMessageDraft } from "@/types/support";

import { DesktopHelpArticleDetail } from "./DesktopHelpArticleDetail";

type SupportView = "contact" | "help";

const contactCards = [
  {
    body: "123 Kai Street, Tokyo, 100-0001, Japan",
    cta: "View on map",
    href: "/locations",
    icon: "/assets/icons/map-pin-icon.png",
    title: "Location",
  },
  {
    body: "+81 3-1234-5678. Call us anytime.",
    cta: "Call now",
    href: "tel:+81312345678",
    icon: "/assets/icons/phone-icon.png",
    title: "Contact info",
  },
  {
    body: "Mon - Sun 11:30 AM - 11:00 PM. Last order 10:30 PM.",
    cta: "Open now",
    href: "/locations",
    icon: "/assets/icons/clock-icon.png",
    title: "Hours",
  },
] as const;

const helpCategories = [
  [
    "Orders",
    "Track orders, changes, cancellations & more",
    "/assets/icons/takeaway-bag-icon.png",
  ],
  [
    "Reservations",
    "Manage bookings, changes & policies",
    "/assets/icons/calendar-icon.png",
  ],
  [
    "Loyalty",
    "Points, rewards, benefits & tiers",
    "/assets/icons/floral-emblem-icon.png",
  ],
  [
    "Account",
    "Profile, preferences, payment & security",
    "/assets/icons/user-icon.png",
  ],
  [
    "Delivery",
    "Fees, areas, timing, and routing",
    "/assets/icons/delivery-scooter-icon.png",
  ],
  [
    "Omakase Experience",
    "Private dining, chef counter & events",
    "/assets/icons/sushi-menu-icon.png",
  ],
] as const;

export function DesktopSupportExperience() {
  const { itemCount } = useCart();
  const { profile } = useProfile();
  const { messages, submitSupportMessage } = useSupport();
  const [view, setView] = useState<SupportView>("contact");
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState<SupportMessageDraft>({
    email: profile.email,
    message: "",
    name: profile.name,
    topicId: supportTopics[0]?.id || "orders",
  });
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );

  const handleSubmit = () => {
    const result = submitSupportMessage(draft);

    if (Object.keys(result.validation).length > 0) {
      setStatus(result.statusMessage);
      return;
    }

    setStatus(result.statusMessage);
    setDraft((current) => ({ ...current, message: "" }));
  };

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="support"
    >
      <DesktopMenuHeader
        activeId={view === "help" ? "help" : "contact"}
        cartCount={itemCount}
      />
      {view === "help" && selectedArticle ? (
        <DesktopHelpArticleDetail
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onContactSupport={() => {
            setSelectedArticle(null);
            setView("contact");
          }}
          onOpenArticle={setSelectedArticle}
        />
      ) : view === "help" ? (
        <DesktopHelpCenter
          selectedArticle={selectedArticle}
          onOpenArticle={setSelectedArticle}
          onOpenContact={() => {
            setSelectedArticle(null);
            setView("contact");
          }}
        />
      ) : (
        <DesktopContactView
          draft={draft}
          messagesCount={messages.length}
          status={status}
          onDraftChange={setDraft}
          onOpenHelp={() => setView("help")}
          onOpenArticle={(article) => {
            setSelectedArticle(article);
            setView("help");
          }}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}

function DesktopContactView({
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
        {contactCards.map((card) => (
          <article
            className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
            key={card.title}
          >
            <CardTitle icon={card.icon} title={card.title} />
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
          <CardTitle
            icon="/assets/icons/floral-emblem-icon.png"
            title="Follow us"
          />
          <p className="mt-3 min-h-[60px] text-[14px] leading-6 text-white/68">
            Seasonal offers, chef notes, and behind-the-scenes service updates.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--sb-gold)]/32 bg-black/24 px-3 text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href={link.href}
                key={link.id}
                rel="noreferrer"
                target="_blank"
              >
                <AssetIcon size={18} src={link.icon} />
                {link.platform}
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
            <ContactInput
              label="Full Name"
              value={draft.name}
              onChange={(value) => onDraftChange({ ...draft, name: value })}
            />
            <ContactInput
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

function DesktopHelpCenter({
  selectedArticle,
  onOpenArticle,
  onOpenContact,
}: {
  selectedArticle: HelpArticle | null;
  onOpenArticle: (article: HelpArticle | null) => void;
  onOpenContact: () => void;
}) {
  return (
    <main className="mx-auto max-w-[1672px] px-7 pb-4 pt-4">
      <section className="relative min-h-[220px] overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[#07090a] p-6">
        <Image
          alt=""
          className="object-cover object-[80%_44%] opacity-72"
          fill
          loading="eager"
          priority
          sizes="1672px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.98),rgba(7,9,10,0.82)_42%,rgba(7,9,10,0.22)_80%)]" />
        <div className="relative z-10">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            We&apos;re here to help
          </p>
          <h1 className="editorial-title mt-2 text-[52px] uppercase leading-none tracking-[0.08em]">
            How can{" "}
            <span className="text-[var(--sb-red-bright)]">we help?</span>
          </h1>
          <p className="mt-2 max-w-[620px] text-[17px] leading-7 text-[var(--sb-gold-soft)]">
            Find answers, get support, and discover everything you need for an
            exceptional Sushi Bliss experience.
          </p>
          <label className="relative mt-4 block w-[640px]">
            <span className="sr-only">Search help articles</span>
            <AssetIcon
              className="absolute left-5 top-1/2 -translate-y-1/2"
              size={22}
              src="/assets/icons/search-icon.png"
            />
            <input
              className="h-[48px] w-full rounded-[10px] border border-[var(--sb-gold)]/26 bg-black/36 pl-14 pr-4 text-[16px] text-white outline-none placeholder:text-white/42"
              placeholder="Search for help articles, topics, or questions..."
            />
          </label>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-6 gap-4">
        {helpCategories.map(([title, copy, icon]) => (
          <button
            className="min-h-[146px] rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4 text-center"
            key={title}
            onClick={() => onOpenArticle(helpArticles[0] || null)}
            type="button"
          >
            <AssetIcon className="mx-auto" size={46} src={icon} />
            <span className="editorial-title mt-3 block text-[17px] uppercase text-white">
              {title}
            </span>
            <span className="mt-2 block text-[13px] leading-5 text-white/62">
              {copy}
            </span>
            <span
              className="mt-3 block text-[var(--sb-gold-soft)]"
              aria-hidden="true"
            >
              <ChevronIcon direction="right" size={18} />
            </span>
          </button>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_500px] gap-4">
        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Popular help topics
            </h2>
            <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              {helpArticles.length} articles
            </span>
          </div>
          <div className="mt-3 overflow-hidden rounded-[10px] border border-white/10">
            {helpArticles.map((article) => (
              <button
                className="grid min-h-[45px] w-full grid-cols-[220px_1fr_24px] items-center gap-5 border-b border-white/10 px-4 text-left last:border-b-0"
                key={article.id}
                onClick={() => onOpenArticle(article)}
                type="button"
              >
                <span className="text-[15px] text-white">{article.title}</span>
                <span className="text-[14px] text-white/54">
                  {article.summary}
                </span>
                <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
                  <ChevronIcon direction="right" size={18} />
                </span>
              </button>
            ))}
          </div>
          {selectedArticle ? (
            <div className="mt-4 rounded-[12px] border border-[var(--sb-gold)]/20 bg-black/24 p-4">
              <h3 className="text-[16px] text-white">
                {selectedArticle.title}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-white/58">
                {selectedArticle.body[0]}
              </p>
            </div>
          ) : null}
        </article>

        <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Need more help?
          </h2>
          <p className="mt-2 text-[15px] text-white/62">
            Our support team is here for you.
          </p>
          {contactMethods.map((method) => (
            <div
              className="mt-4 grid grid-cols-[50px_1fr] border-b border-white/10 pb-3 last:border-b-0"
              key={method.id}
            >
              <AssetIcon
                size={34}
                src={
                  method.id === "phone"
                    ? "/assets/icons/phone-icon.png"
                    : method.id === "email"
                      ? "/assets/icons/email-icon.png"
                      : "/assets/icons/headset-icon.png"
                }
              />
              <p>
                <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
                  {method.label} us
                </span>
                <span className="mt-1 block text-[16px] text-white">
                  {method.value}
                </span>
                <span className="mt-1 block text-[14px] text-white/54">
                  {method.description}
                </span>
              </p>
            </div>
          ))}
          <Button
            className="mt-4 h-[50px] w-full rounded-[10px] text-[15px] uppercase tracking-[0.08em]"
            onClick={onOpenContact}
          >
            Contact support
          </Button>
        </article>
      </section>

      <div className="mt-4">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}

function ContactInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <input
        className="h-11 w-full rounded-[8px] border border-white/10 bg-black/28 px-4 text-[14px] text-white outline-none placeholder:text-white/36"
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        value={value}
      />
    </label>
  );
}

function CardTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
      <AssetIcon size={28} src={icon} />
      {title}
    </h2>
  );
}
