import Image from "next/image";
import type { ReactNode } from "react";

import {
  adminAnalyticsSummary,
  adminRecentOrders,
  adminReservationQueue,
  adminRevenueSeries,
  adminTopMenuItems,
} from "@/data/admin";
import { classNames } from "@/lib/classNames";

import {
  getSparklinePoints,
  getStatusTone,
  statusToneClasses,
} from "./adminDashboardUtils";
import { AdminHashLink } from "./AdminHashLink";

function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={classNames(
        "inline-flex min-h-6 items-center rounded-full px-2.5 text-[11px] font-semibold",
        statusToneClasses[getStatusTone(value)],
      )}
    >
      {value}
    </span>
  );
}

function AdminIntelligenceList({
  actionHref,
  actionLabel,
  children,
  title,
}: {
  actionHref: string;
  actionLabel: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.038),rgba(255,255,255,0.012)),rgba(7,10,11,0.9)] shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
      <div className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-4">
        <h3 className="editorial-title truncate text-[16px] tracking-[0.04em] text-white">
          {title}
        </h3>
        <AdminHashLink
          className="shrink-0 text-[12px] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href={actionHref}
        >
          {actionLabel}
        </AdminHashLink>
      </div>
      {children}
    </section>
  );
}

function MiniRevenueChart() {
  const points = getSparklinePoints(adminRevenueSeries);

  return (
    <AdminIntelligenceList
      actionHref="#manage-analytics-admin"
      actionLabel="Open Analytics"
      title="Revenue Signal"
    >
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {adminAnalyticsSummary.slice(0, 2).map((item) => (
            <div
              className="min-w-0 rounded-[13px] border border-white/10 bg-black/24 px-3 py-2"
              key={item.label}
            >
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                {item.label}
              </p>
              <p className="mt-1 truncate font-serif text-[20px] text-white">
                {item.value}
              </p>
              <p className="mt-1 truncate text-[11px] text-emerald-300">
                {item.delta}
              </p>
            </div>
          ))}
        </div>
        <svg
          aria-label="Weekly revenue signal"
          className="mt-4 h-[118px] w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          viewBox="0 0 180 54"
        >
          <defs>
            <linearGradient
              id="admin-intelligence-revenue"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="rgb(239 47 37 / 0.48)" />
              <stop offset="100%" stopColor="rgb(239 47 37 / 0.02)" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#admin-intelligence-revenue)"
            points={`0,54 ${points} 180,54`}
          />
          <polyline
            fill="none"
            points={points}
            stroke="var(--sb-red-bright)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
        </svg>
      </div>
    </AdminIntelligenceList>
  );
}

function RecentOrdersPanel() {
  return (
    <AdminIntelligenceList
      actionHref="#operations-orders-admin"
      actionLabel="Open Queue"
      title="Recent Orders"
    >
      <div className="grid gap-1 p-3">
        {adminRecentOrders
          .slice(0, 4)
          .map(([id, customer, type, amount, status]) => (
            <AdminHashLink
              className="grid min-h-[48px] grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 rounded-[11px] px-2 text-[13px] text-white/76 transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href="#operations-orders-admin"
              key={id}
            >
              <span className="font-mono text-[var(--sb-gold-soft)]">{id}</span>
              <span className="min-w-0">
                <span className="block truncate text-white">{customer}</span>
                <span className="mt-0.5 block truncate text-[11px] text-white/46">
                  {type} / {amount}
                </span>
              </span>
              <StatusPill value={status} />
            </AdminHashLink>
          ))}
      </div>
    </AdminIntelligenceList>
  );
}

function ReservationQueuePanel() {
  return (
    <AdminIntelligenceList
      actionHref="#operations-reservations-admin"
      actionLabel="Seat Plan"
      title="Reservation Queue"
    >
      <div className="grid gap-1 p-3">
        {adminReservationQueue
          .slice(0, 4)
          .map(([time, customer, party, table, status]) => (
            <AdminHashLink
              className="grid min-h-[48px] grid-cols-[70px_minmax(0,1fr)_auto] items-center gap-3 rounded-[11px] px-2 text-[13px] text-white/76 transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href="#operations-reservations-admin"
              key={`${time}-${customer}`}
            >
              <span className="font-mono text-[var(--sb-gold-soft)]">
                {time}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-white">{customer}</span>
                <span className="mt-0.5 block truncate text-[11px] text-white/46">
                  {party} guests / Table {table}
                </span>
              </span>
              <StatusPill value={status} />
            </AdminHashLink>
          ))}
      </div>
    </AdminIntelligenceList>
  );
}

function TopItemsMiniPanel() {
  return (
    <AdminIntelligenceList
      actionHref="#manage-menu-admin"
      actionLabel="Manage Menu"
      title="Top Menu Items"
    >
      <div className="grid gap-1 p-3">
        {adminTopMenuItems.slice(0, 4).map((item) => (
          <AdminHashLink
            className="grid min-h-[48px] grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-[11px] px-2 text-[13px] text-white/76 transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href="#manage-menu-admin"
            key={item.item}
          >
            <Image
              alt=""
              className="h-9 w-11 rounded-[8px] object-cover"
              height={36}
              src={item.imageUrl}
              width={44}
            />
            <span className="min-w-0">
              <span className="block truncate text-white">{item.item}</span>
              <span className="mt-0.5 block truncate text-[11px] text-white/46">
                {item.sold} sold
              </span>
            </span>
            <span className="font-mono text-[12px] text-[var(--sb-gold-soft)]">
              {item.revenue}
            </span>
          </AdminHashLink>
        ))}
      </div>
    </AdminIntelligenceList>
  );
}

export function AdminOperationsIntelligence() {
  return (
    <section
      aria-label="Admin operations intelligence"
      className="mt-5 hidden gap-3 xl:grid xl:grid-cols-[1.05fr_1fr_1fr] 2xl:grid-cols-[1.1fr_1fr_1fr_1fr] 2xl:gap-4"
    >
      <MiniRevenueChart />
      <RecentOrdersPanel />
      <TopItemsMiniPanel />
      <div className="xl:hidden 2xl:block">
        <ReservationQueuePanel />
      </div>
    </section>
  );
}
