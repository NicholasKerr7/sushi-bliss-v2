"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { contactMethods, socialLinks, supportHeroImages } from "@/data/support";
import { formatDateTime } from "@/lib/dates";
import {
  getSupportTopicLabel,
  type SubmitSupportMessageResult,
} from "@/lib/support";
import type { SupportMessage, SupportMessageDraft } from "@/types/support";
import type { UserProfile } from "@/types/user";

import { TabletSupportContactForm } from "./TabletSupportContactForm";
import { TabletSupportContactTile } from "./TabletSupportContactTile";

interface TabletSupportContactViewProps {
  messages: SupportMessage[];
  profile: UserProfile;
  onOpenHelp: () => void;
  onSubmitSupportMessage: (
    draft: SupportMessageDraft,
  ) => SubmitSupportMessageResult;
}

export function TabletSupportContactView({
  messages,
  profile,
  onOpenHelp,
  onSubmitSupportMessage,
}: TabletSupportContactViewProps) {
  return (
    <>
      <section className="relative mt-3 overflow-hidden rounded-[18px] border border-white/10 bg-black/42 min-[1080px]:mt-5">
        <Image
          alt=""
          className="object-cover object-[58%_50%] opacity-82"
          fill
          loading="eager"
          priority
          sizes="1034px"
          src={supportHeroImages.contact}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.76)_44%,rgba(5,6,7,0.1))]" />
        <div className="relative z-10 grid min-h-[234px] grid-cols-[minmax(0,0.9fr)_minmax(280px,0.72fr)] items-center gap-6 px-7 py-6 min-[1080px]:min-h-[286px] min-[1080px]:px-9 min-[1080px]:py-8">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              We&apos;re here for you
            </p>
            <h1 className="editorial-title mt-3 text-[58px] leading-[0.9] text-white min-[1080px]:text-[74px]">
              Contact
            </h1>
            <p className="mt-4 max-w-[410px] text-[16px] leading-6 text-white/62 min-[1080px]:text-[18px]">
              Have a question, feedback, allergy note, or special request? Our
              concierge team is ready to assist.
            </p>
          </div>

          <div className="rounded-[16px] border border-[var(--sb-border)] bg-black/42 p-5 backdrop-blur-md">
            <p className="text-[12px] uppercase tracking-[0.16em] text-white/48">
              Recent requests
            </p>
            <p className="mt-2 text-[32px] font-semibold leading-none text-[var(--sb-gold-soft)]">
              {messages.length}
            </p>
            <p className="mt-3 text-[14px] leading-6 text-white/58">
              Valid messages stay in request history for concierge follow-up.
            </p>
            <button
              className="mt-4 h-11 w-full rounded-[12px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onOpenHelp}
              type="button"
            >
              Help center
            </button>
          </div>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-4 gap-3 min-[1080px]:mt-4 min-[1080px]:gap-4">
        {contactMethods.map((method) => (
          <TabletSupportContactTile
            key={method.id}
            methodId={method.id}
            href={method.href}
            label={method.label}
            value={method.value}
            description={method.description}
          />
        ))}
        <TabletSupportContactTile
          description="Open daily for lunch, dinner, and late pickup windows."
          href="/locations"
          label="Our location"
          methodId="location"
          value="Sushi Bliss Ginza"
        />
      </section>

      <section className="mt-3 grid gap-3 lg:grid-cols-[0.72fr_1fr] min-[1080px]:mt-4 min-[1080px]:gap-4">
        <div className="grid gap-3 min-[1080px]:gap-4">
          <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <AssetIcon size={28} src="/assets/icons/clock-icon.png" />
              <h2 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Restaurant hours
              </h2>
            </div>
            <dl className="mt-5 grid gap-3 text-[14px] text-white/62 min-[1080px]:text-[15px]">
              {[
                ["Monday - Thursday", "11:00 AM - 10:00 PM"],
                ["Friday - Saturday", "11:00 AM - 11:00 PM"],
                ["Sunday", "11:00 AM - 10:00 PM"],
              ].map(([day, hours]) => (
                <div
                  className="flex items-center justify-between gap-4"
                  key={day}
                >
                  <dt>{day}</dt>
                  <dd className="font-semibold text-white/74">{hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-white/10 pt-4 text-[13px] leading-5 text-[var(--sb-gold-soft)]">
              Holiday hours are updated through concierge and location details.
            </p>
          </div>

          <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Follow us
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-white/58">
              Stay connected for seasonal offers, chef notes, and behind the
              scenes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  aria-label={link.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-gold)]/24 bg-black/24 transition hover:border-[var(--sb-gold)]/52 hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                  href={link.href}
                  key={link.id}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={link.platform}
                >
                  <AssetIcon size={23} src={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 min-[1080px]:gap-4">
          <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
            <div className="relative min-h-[190px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black min-[1080px]:min-h-[224px]">
              <Image
                alt="Map to Sushi Bliss Ginza"
                className="object-cover"
                fill
                loading="eager"
                sizes="640px"
                src="/assets/maps/map-ginza.webp"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-black/70 p-4 backdrop-blur-md">
                <p className="text-[14px] text-white/72">
                  Ginza, Tokyo. Private dining and pickup entrance.
                </p>
                <Link
                  className="shrink-0 rounded-[10px] border border-[var(--sb-border)] px-5 py-3 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                  href="/locations"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>

          <TabletSupportContactForm
            profile={profile}
            onOpenHelp={onOpenHelp}
            onSubmitSupportMessage={onSubmitSupportMessage}
          />
        </div>
      </section>

      {messages.length > 0 ? (
        <section className="mt-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            Latest support request
          </h2>
          <div className="mt-3 flex items-start justify-between gap-5">
            <div>
              <StatusBadge tone="success">
                {getSupportTopicLabel(messages[0].topicId)}
              </StatusBadge>
              <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-white/62">
                {messages[0].message}
              </p>
            </div>
            <time
              className="shrink-0 font-mono text-[12px] text-white/38"
              dateTime={messages[0].createdAt}
            >
              {formatDateTime(messages[0].createdAt)}
            </time>
          </div>
        </section>
      ) : null}
    </>
  );
}
