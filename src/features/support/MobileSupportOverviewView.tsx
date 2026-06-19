"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { contactMethods, helpArticles, socialLinks } from "@/data/support";
import { formatDateTime } from "@/lib/dates";
import { getSupportTopicLabel } from "@/lib/support";
import type {
  ContactMethod,
  HelpArticle,
  SupportMessage,
} from "@/types/support";

import {
  MobileSupportIcon,
  MobileSupportPanel,
} from "./MobileSupportPrimitives";
import { MobileSupportCommandCenter } from "./MobileSupportCommandCenter";

interface MobileSupportOverviewViewProps {
  messages: SupportMessage[];
  onOpenArticle: (article: HelpArticle) => void;
  onOpenRequest: (topicId?: string) => void;
}

const contactIcons: Record<string, string> = {
  email: "/assets/icons/email-icon.png",
  form: "/assets/icons/headset-icon.png",
  phone: "/assets/icons/phone-icon.png",
};

export function MobileSupportOverviewView({
  messages,
  onOpenArticle,
  onOpenRequest,
}: MobileSupportOverviewViewProps) {
  return (
    <>
      <section className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Concierge support
        </p>
        <h1 className="editorial-title mt-3 text-[37px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
          Support
          <span className="block text-[var(--sb-red-bright)]">& Help</span>
        </h1>
        <p className="mt-4 text-[16px] leading-6 text-white/62">
          Reach concierge for orders, reservations, allergy care, gifts, and
          loyalty help.
        </p>
      </section>

      <MobileSupportPanel className="mt-6 overflow-hidden">
        <div className="relative min-h-[206px] p-5">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp')] bg-cover bg-center opacity-46"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.88)_100%)]" />
          <div className="relative z-10 flex min-h-[166px] flex-col justify-between">
            <div>
              <StatusBadge tone="premium">Same-day help</StatusBadge>
              <h2 className="editorial-title mt-4 text-[29px] uppercase leading-none text-white min-[390px]:text-[32px]">
                Concierge desk
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                className="grid min-h-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/30 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="tel:+15550100"
              >
                Call
              </a>
              <button
                className="red-glow-button min-h-[52px] rounded-[13px] border text-[12px]"
                onClick={() => onOpenRequest()}
                type="button"
              >
                Send request
              </button>
            </div>
          </div>
        </div>
      </MobileSupportPanel>

      <MobileSupportCommandCenter
        articleCount={helpArticles.length}
        messages={messages}
        onOpenRequest={onOpenRequest}
      />

      <section className="mt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Contact methods
            </p>
            <p className="mt-1 text-[13px] text-white/46">
              Choose the fastest path
            </p>
          </div>
          <button
            className="rounded-full border border-[var(--sb-border)] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => onOpenRequest()}
            type="button"
          >
            Form
          </button>
        </div>

        <div className="mt-3 grid gap-3">
          {contactMethods.map((method) => (
            <MobileContactMethodCard
              key={method.id}
              method={method}
              onOpenRequest={onOpenRequest}
            />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Follow us
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {socialLinks.map((link) => (
            <a
              aria-label={link.label}
              className="grid min-h-[74px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border border-[var(--sb-border)] bg-black/30 px-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_48px_rgba(0,0,0,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href={link.href}
              key={link.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MobileSupportIcon icon={link.icon} />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                  {link.platform}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]">
                  Open platform
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Recent requests
            </p>
            <p className="mt-1 text-[13px] text-white/46">
              {messages.length} stored
            </p>
          </div>
          <button
            className="rounded-full border border-[var(--sb-border)] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => onOpenRequest()}
            type="button"
          >
            New
          </button>
        </div>

        <div className="mt-3 grid gap-3">
          {messages.length > 0 ? (
            messages.slice(0, 3).map((message) => (
              <MobileSupportPanel className="p-4" key={message.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-semibold text-white">
                      {getSupportTopicLabel(message.topicId)}
                    </p>
                    <p className="mt-1 text-[12px] text-white/42">
                      {formatDateTime(message.createdAt)}
                    </p>
                  </div>
                  <StatusBadge tone="success">Received</StatusBadge>
                </div>
                <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-white/56">
                  {message.message}
                </p>
              </MobileSupportPanel>
            ))
          ) : (
            <MobileSupportPanel className="p-5 text-center">
              <MobileSupportIcon
                className="mx-auto"
                icon="/assets/icons/headset-icon.png"
              />
              <h2 className="mt-4 text-[18px] font-semibold text-white">
                No requests yet
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-white/54">
                Validated concierge messages will appear here after submission.
              </p>
            </MobileSupportPanel>
          )}
        </div>
      </section>

      <section className="mt-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Help articles
        </p>
        <div className="mt-3 grid gap-3">
          {helpArticles.map((article) => (
            <MobileSupportPanel className="p-4" key={article.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <StatusBadge tone="neutral">{article.category}</StatusBadge>
                  <h2 className="mt-3 text-[17px] font-semibold leading-5 text-white">
                    {article.title}
                  </h2>
                </div>
                <button
                  className="rounded-full border border-[var(--sb-border)] px-3 py-2 text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
                  onClick={() => onOpenArticle(article)}
                  type="button"
                >
                  Read
                </button>
              </div>
              <p className="mt-3 text-[13px] leading-5 text-white/56">
                {article.summary}
              </p>
            </MobileSupportPanel>
          ))}
        </div>
      </section>
    </>
  );
}

function MobileContactMethodCard({
  method,
  onOpenRequest,
}: {
  method: ContactMethod;
  onOpenRequest: (topicId?: string) => void;
}) {
  const icon = contactIcons[method.id] || "/assets/icons/headset-icon.png";
  const content = (
    <>
      <MobileSupportIcon icon={icon} />
      <div className="min-w-0">
        <StatusBadge tone={method.tone}>{method.label}</StatusBadge>
        <p className="mt-3 break-all text-[16px] font-semibold text-white">
          {method.value}
        </p>
        <p className="mt-2 text-[13px] leading-5 text-white/56">
          {method.description}
        </p>
      </div>
    </>
  );

  if (method.id === "form") {
    return (
      <button
        className="grid grid-cols-[58px_minmax(0,1fr)] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
        onClick={() => onOpenRequest()}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      className="grid grid-cols-[58px_minmax(0,1fr)] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
      href={method.href}
    >
      {content}
    </Link>
  );
}
