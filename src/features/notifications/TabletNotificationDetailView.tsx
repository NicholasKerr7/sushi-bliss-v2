"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { formatFullDateTime } from "@/lib/dates";
import {
  notificationCategoryIcons,
  notificationCategoryLabels,
} from "@/lib/notifications";
import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";

import {
  getNotificationActionLabel,
  getNotificationFlowCopy,
} from "./notificationContent";

interface TabletNotificationDetailViewProps {
  notification: AppNotification;
  onBack: () => void;
}

export function TabletNotificationDetailView({
  notification,
  onBack,
}: TabletNotificationDetailViewProps) {
  const flowCopy = getNotificationFlowCopy(notification.category);
  const detail = getTabletNotificationDetailData(notification);
  const formattedDate = formatFullDateTime(notification.createdAt).replace(
    /, (?=\d{1,2}:)/,
    " • ",
  );

  return (
    <>
      <section className="px-8 pb-7 pt-8">
        <button
          className="inline-flex items-center gap-3 text-[16px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onBack}
          type="button"
        >
          <ChevronIcon direction="left" size={20} /> Back to notifications
        </button>
        <h1 className="editorial-title mt-7 text-[43px] uppercase leading-none tracking-[0.08em] text-white min-[1080px]:text-[49px]">
          Notification{" "}
          <span className="text-[var(--sb-red-bright)]">detail</span>
        </h1>
        <p className="mt-4 flex items-center gap-3 text-[15px] text-white/50">
          <AssetIcon
            className="opacity-55"
            size={19}
            src="/assets/icons/calendar-icon.png"
          />
          {formattedDate}
        </p>
      </section>

      <article className="mx-6 overflow-hidden rounded-[17px] border border-white/13 bg-[linear-gradient(145deg,rgba(11,19,20,0.96),rgba(5,6,7,0.98))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_22px_80px_rgba(0,0,0,0.34)] min-[1080px]:mx-6">
        <section className="relative min-h-[420px] overflow-hidden border-b border-white/12">
          <Image
            alt=""
            className="object-cover object-[70%_50%]"
            fill
            loading="eager"
            priority
            sizes="(max-width: 1086px) 86vw, 928px"
            src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
            unoptimized
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.78)_32%,rgba(5,6,7,0.2)_58%,rgba(5,6,7,0.02)_82%),linear-gradient(180deg,rgba(5,6,7,0.16),rgba(5,6,7,0.02)_48%,rgba(5,6,7,0.62))]" />
          <div className="relative z-10 flex min-h-[420px] flex-col justify-between p-11">
            <div>
              <p className="text-[26px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {detail.eyebrow}
              </p>
              <h2 className="editorial-title mt-3 max-w-[520px] text-[56px] uppercase leading-[0.96] tracking-[0.08em] text-white">
                {notification.title}
              </h2>
              <p className="mt-5 max-w-[370px] text-[25px] leading-[1.35] text-white/82">
                {detail.lede}
              </p>
            </div>
            <div className="grid w-[330px] grid-cols-[76px_minmax(0,1fr)] items-center gap-4 rounded-[15px] border border-white/14 bg-black/50 p-3.5 shadow-[0_18px_52px_rgba(0,0,0,0.32)] backdrop-blur-md">
              <span className="grid h-[62px] w-[62px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/36">
                <AssetIcon
                  size={38}
                  src={notificationCategoryIcons[notification.category]}
                />
              </span>
              <span>
                <span className="block text-[20px] font-semibold text-white">
                  {detail.chipTitle}
                </span>
                <span className="mt-1 block text-[16px] text-[var(--sb-gold-soft)]">
                  {detail.chipSubtitle}
                </span>
              </span>
            </div>
          </div>
        </section>

        <section className="px-11 py-9">
          <h2 className="text-[24px] font-semibold text-[var(--sb-gold-soft)]">
            Hi Hiroshi,
          </h2>
          <p className="mt-5 max-w-[740px] text-[20px] leading-9 text-white/75">
            {notification.body}
          </p>

          <div className="my-8 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.52),transparent)]" />

          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-red-bright)]/50 bg-[var(--sb-red)]/18">
              <AssetIcon
                size={22}
                src={notificationCategoryIcons[notification.category]}
              />
            </span>
            <h3 className="text-[19px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Your {notificationCategoryLabels[notification.category]} details
            </h3>
          </div>

          <dl className="mt-7 grid grid-cols-4 gap-5">
            {detail.rows.map((row) => (
              <div key={row.label}>
                <dt className="text-[16px] text-white/44">{row.label}</dt>
                <dd className="mt-2 text-[20px] leading-6 text-white">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 grid grid-cols-[1.05fr_0.88fr] gap-8">
            {notification.href ? (
              <Link
                className="red-glow-button grid h-[76px] grid-cols-[auto_auto] place-content-center items-center gap-5 rounded-[11px] text-[18px] uppercase tracking-[0.08em]"
                href={notification.href}
              >
                <AssetIcon
                  className="relative z-10"
                  size={29}
                  src={notificationCategoryIcons[notification.category]}
                />
                <span className="relative z-10">
                  {getNotificationActionLabel(notification)}
                </span>
              </Link>
            ) : (
              <button
                className="h-[76px] rounded-[11px] border border-white/12 text-[15px] uppercase tracking-[0.1em] text-white/34"
                disabled
                type="button"
              >
                Action unavailable
              </button>
            )}
            <button
              className="h-[76px] rounded-[11px] border border-[var(--sb-gold)]/55 bg-black/18 text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onBack}
              type="button"
            >
              Back to notifications
            </button>
          </div>

          <div className="mt-9 grid grid-cols-[42px_minmax(0,1fr)] gap-5 text-white/47">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/24 bg-black/20">
              <AssetIcon size={20} src="/assets/icons/gold-alert-icon.png" />
            </span>
            <p className="text-[17px] leading-7">
              {detail.note} {flowCopy.body}
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

interface TabletNotificationDetailData {
  chipSubtitle: string;
  chipTitle: string;
  eyebrow: string;
  lede: string;
  note: string;
  rows: Array<{ label: string; value: string }>;
}

const notificationDetailCopy: Record<
  NotificationCategory,
  Omit<TabletNotificationDetailData, "chipTitle">
> = {
  offer: {
    chipSubtitle: "Seasonal offer",
    eyebrow: "Offer",
    lede: "A limited Sushi Bliss experience is waiting for you.",
    note: "Offer availability is validated again during checkout.",
    rows: [
      { label: "Code", value: "OMAKASE15" },
      { label: "Credit", value: "$15" },
      { label: "Applies To", value: "Omakase" },
      { label: "Status", value: "Ready" },
    ],
  },
  order: {
    chipSubtitle: "Kitchen follow-up",
    eyebrow: "Order Update",
    lede: "Your chefs are preparing the next course for dispatch.",
    note: "Courier assignment will appear before dispatch.",
    rows: [
      { label: "Order", value: "SB-260604-LIVE" },
      { label: "Status", value: "Preparing" },
      { label: "Delivery", value: "5:25 PM" },
      { label: "Location", value: "Downtown" },
    ],
  },
  reservation: {
    chipSubtitle: "Table for 2",
    eyebrow: "Reservation",
    lede: "We cannot wait to welcome you for an exceptional evening.",
    note: "Please modify or cancel reservations at least 2 hours in advance.",
    rows: [
      { label: "Date", value: "Jun 9, 2026" },
      { label: "Time", value: "7:30 PM" },
      { label: "Party Size", value: "2 Guests" },
      { label: "Location", value: "Sushi Bliss - Ginza" },
    ],
  },
  reward: {
    chipSubtitle: "Gold member",
    eyebrow: "Reward",
    lede: "Your rewards are ready for the next tasting experience.",
    note: "Points are adjusted only after a valid reward redemption.",
    rows: [
      { label: "Tier", value: "Gold" },
      { label: "Balance", value: "4,820 pts" },
      { label: "Reward", value: "$20 credit" },
      { label: "Status", value: "Available" },
    ],
  },
  support: {
    chipSubtitle: "Concierge",
    eyebrow: "Support",
    lede: "Our team has an update connected to your request.",
    note: "Concierge messages are stored with your profile preferences.",
    rows: [
      { label: "Case", value: "SB-CX-104" },
      { label: "Topic", value: "Dining help" },
      { label: "Priority", value: "Standard" },
      { label: "Status", value: "Open" },
    ],
  },
};

/** Normalizes category copy with live notification labels for the tablet detail card. */
function getTabletNotificationDetailData(
  notification: AppNotification,
): TabletNotificationDetailData {
  const copy = notificationDetailCopy[notification.category];

  return {
    ...copy,
    chipTitle:
      notification.relatedLabel ||
      notificationCategoryLabels[notification.category],
  };
}
