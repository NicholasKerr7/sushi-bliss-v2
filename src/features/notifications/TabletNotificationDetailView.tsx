"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { notificationCategoryLabels } from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import {
  getNotificationActionLabel,
  getNotificationFlowCopy,
} from "./mobileNotificationContent";

interface TabletNotificationDetailViewProps {
  notification: AppNotification;
  onBack: () => void;
}

export function TabletNotificationDetailView({
  notification,
  onBack,
}: TabletNotificationDetailViewProps) {
  const flowCopy = getNotificationFlowCopy(notification.category);

  return (
    <article className="mt-5 max-w-[928px] overflow-hidden rounded-[20px] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]">
      <div className="px-7 py-5">
        <button
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onBack}
          type="button"
        >
          ← Back to notifications
        </button>
        <h1 className="editorial-title mt-6 text-[52px] leading-none text-white min-[1080px]:text-[64px]">
          Notification{" "}
          <span className="text-[var(--sb-red-bright)]">detail</span>
        </h1>
        <p className="mt-3 text-[14px] text-white/48">
          {formatDateTime(notification.createdAt)}
        </p>
      </div>

      <section className="relative min-h-[360px] border-y border-white/10">
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="928px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.96),rgba(5,6,7,0.58)_55%,rgba(5,6,7,0.06))]" />
        <div className="relative z-10 flex min-h-[360px] flex-col justify-between p-8">
          <div>
            <StatusBadge tone={notification.tone}>
              {notificationCategoryLabels[notification.category]}
            </StatusBadge>
            <h2 className="editorial-title mt-5 max-w-[480px] text-[56px] leading-[0.96] text-white">
              {notification.title}
            </h2>
          </div>
          {notification.relatedLabel ? (
            <div className="grid w-[360px] grid-cols-[64px_minmax(0,1fr)] items-center gap-4 rounded-[15px] border border-white/14 bg-black/54 p-4 backdrop-blur-md">
              <span className="grid h-14 w-14 place-items-center rounded-[12px] border border-[var(--sb-border)]">
                <AssetIcon size={34} src="/assets/icons/calendar-icon.png" />
              </span>
              <span>
                <span className="block text-[17px] font-semibold text-white">
                  {notification.relatedLabel}
                </span>
                <span className="mt-1 block text-[14px] text-[var(--sb-gold-soft)]">
                  {flowCopy.title}
                </span>
              </span>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 px-8 py-8 lg:grid-cols-[1fr_290px]">
        <div>
          <h2 className="text-[22px] font-semibold text-[var(--sb-gold-soft)]">
            Hi Hiroshi,
          </h2>
          <p className="mt-4 text-[17px] leading-8 text-white/66">
            {notification.body}
          </p>

          <div className="mt-7 rounded-[16px] border border-white/10 bg-black/26 p-5">
            <h3 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              {flowCopy.title}
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-white/60">
              {flowCopy.body}
            </p>
          </div>
        </div>

        <aside className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-[18px] font-semibold text-white">
            Notification actions
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-white/56">
            Opening this detail marks the notification read locally. Use the
            related action to continue the flow.
          </p>
          <div className="mt-5 grid gap-3">
            {notification.href ? (
              <Link
                className="red-glow-button grid h-[54px] place-items-center rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                href={notification.href}
              >
                {getNotificationActionLabel(notification)}
              </Link>
            ) : (
              <button
                className="h-[54px] rounded-[12px] border border-white/12 text-[12px] uppercase tracking-[0.08em] text-white/34"
                disabled
                type="button"
              >
                No related flow
              </button>
            )}
            <button
              className="h-[54px] rounded-[12px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onBack}
              type="button"
            >
              Back to notifications
            </button>
          </div>
        </aside>
      </section>
    </article>
  );
}
