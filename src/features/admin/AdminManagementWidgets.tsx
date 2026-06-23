import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import {
  adminAnalyticsSummary,
  adminCustomerSegments,
  adminManagementSections,
  adminRevenueSeries,
  adminTopMenuItems,
} from "@/data/admin";
import { classNames } from "@/lib/classNames";

import {
  getSparklinePoints,
  getStatusTone,
  isStatusValue,
  statusToneClasses,
} from "./adminDashboardUtils";
import { AdminHashLink } from "./AdminHashLink";

export function SectionAction({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <AdminHashLink
      className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-[9px] border border-[var(--sb-gold)]/48 bg-black/24 px-3 text-[12px] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-red-bright)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold md:h-10 md:gap-2 md:rounded-[10px] md:px-4 md:text-sm"
      href={href}
    >
      <span>{label}</span>
      <ChevronIcon direction="right" size={17} />
    </AdminHashLink>
  );
}

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

export function ManagementCard({
  section,
}: {
  section: (typeof adminManagementSections)[number];
}) {
  return (
    <section
      aria-labelledby={`${section.id}-title`}
      className="relative min-w-0 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.042),rgba(255,255,255,0.01)),rgba(6,9,10,0.9)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.36)] min-[390px]:p-4 md:p-5"
      id={section.id}
    >
      <div className="flex min-w-0 items-start gap-3 md:gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-black/38 md:h-12 md:w-12">
          <AssetIcon loading="eager" size={25} src={section.iconUrl} />
        </span>
        <div className="min-w-0 flex-1">
          <h2
            className="editorial-title line-clamp-2 text-[17px] leading-5 text-white md:text-[20px] md:leading-tight"
            id={`${section.id}-title`}
          >
            {section.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/62 md:text-sm">
            {section.description}
          </p>
        </div>
        <SectionAction href={section.href} label={section.action} />
      </div>

      <div className="mt-5 overflow-hidden rounded-[14px] border border-white/10">
        {section.rows.map((row) => (
          <AdminHashLink
            className="grid min-h-[46px] grid-cols-[minmax(0,1fr)_auto_16px] items-center gap-2 border-t border-white/10 px-2.5 text-[13px] text-white/84 transition first:border-t-0 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-sb-gold min-[390px]:gap-3 min-[390px]:px-3 md:min-h-[48px] md:text-sm"
            href={section.href}
            key={`${section.id}-${row.label}`}
          >
            <span className="flex min-w-0 items-center gap-3">
              {"thumbnail" in row ? (
                <Image
                  alt=""
                  className="h-8 w-11 shrink-0 rounded-[8px] object-cover min-[390px]:h-9 min-[390px]:w-12"
                  height={36}
                  src={row.thumbnail}
                  width={48}
                />
              ) : null}
              <span className="min-w-0 truncate">{row.label}</span>
              {"status" in row ? (
                <span className="rounded-full bg-[var(--sb-red)]/34 px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--sb-red-bright)]">
                  {row.status}
                </span>
              ) : null}
            </span>
            <span className="shrink-0 rounded-full bg-[var(--sb-gold)]/12 px-2 py-1 text-[11px] text-[var(--sb-gold-soft)] min-[390px]:px-2.5 min-[390px]:text-[12px]">
              {row.meta}
            </span>
            <ChevronIcon
              className="text-[var(--sb-gold-soft)]"
              direction="right"
              size={17}
            />
          </AdminHashLink>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--sb-gold-soft)]">
          {section.footerLabel}
        </span>
        <span className="rounded-full border border-[var(--sb-gold)]/34 bg-black/28 px-3 py-1 text-[var(--sb-gold-soft)]">
          {section.footerValue}
        </span>
      </div>
    </section>
  );
}

export function AdminPanel({
  action,
  actionHref = "#overview",
  children,
  className,
  id,
  title,
}: {
  action?: string;
  actionHref?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  title: string;
}) {
  return (
    <section
      aria-labelledby={id ? `${id}-title` : undefined}
      className={classNames(
        "min-w-0 overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.038),rgba(255,255,255,0.012)),rgba(7,10,11,0.9)] shadow-[0_24px_80px_rgba(0,0,0,0.36)]",
        className,
      )}
      id={id}
    >
      <div className="flex min-h-[58px] items-center justify-between gap-4 border-b border-white/10 px-4">
        <h2
          className="editorial-title truncate text-[17px] tracking-[0.04em] text-white"
          id={id ? `${id}-title` : undefined}
        >
          {title}
        </h2>
        {action ? (
          <AdminHashLink
            className="shrink-0 text-[13px] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href={actionHref}
          >
            {action}
          </AdminHashLink>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function CompactTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[12px] text-white/50">
            {headers.map((header) => (
              <th className="px-4 py-3 font-medium" key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {rows.map((row) => (
            <tr className="text-white/78" key={row.join("-")}>
              {row.map((cell) => (
                <td className="px-4 py-3" key={`${row[0]}-${cell}`}>
                  {isStatusValue(cell) ? <StatusPill value={cell} /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TopMenuPanel() {
  return (
    <AdminPanel
      action="Manage Menu"
      actionHref="#manage-menu-admin"
      id="top-menu-admin"
      title="Top Menu Items"
    >
      <div className="grid gap-1 p-3">
        {adminTopMenuItems.map((item) => (
          <AdminHashLink
            className="grid min-h-[54px] grid-cols-[48px_minmax(0,1fr)_58px_84px] items-center gap-3 rounded-[10px] px-2 text-sm text-white/78 transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href="#manage-menu-admin"
            key={item.item}
          >
            <Image
              alt=""
              className="h-10 w-12 rounded-[8px] object-cover"
              height={40}
              src={item.imageUrl}
              width={48}
            />
            <span className="truncate">{item.item}</span>
            <span className="text-right">{item.sold}</span>
            <span className="text-right">{item.revenue}</span>
          </AdminHashLink>
        ))}
      </div>
    </AdminPanel>
  );
}

export function ManagementTable({
  actionLabel,
  headers,
  id,
  rows,
  title,
}: {
  actionLabel: string;
  headers: readonly string[];
  id: string;
  rows: readonly (readonly string[])[];
  title: string;
}) {
  return (
    <AdminPanel action="View All" id={id} title={title}>
      <CompactTable headers={headers} rows={rows} />
      <div className="px-4 pb-4">
        <AdminHashLink
          className="inline-flex min-h-10 min-w-[190px] items-center justify-center gap-2 rounded-[9px] border border-[var(--sb-gold)]/52 bg-black/24 px-4 text-sm text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-red-bright)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href={`#${id}`}
        >
          <AssetIcon
            loading="lazy"
            size={15}
            src="/assets/icons/plus-icon.png"
          />
          {actionLabel}
        </AdminHashLink>
      </div>
    </AdminPanel>
  );
}

export function RevenueOverview() {
  const points = getSparklinePoints(adminRevenueSeries);

  return (
    <AdminPanel
      action="This Week"
      actionHref="#manage-analytics-admin"
      className="2xl:col-span-2"
      id="analytics-admin"
      title="Revenue Overview"
    >
      <div className="p-4">
        <svg
          aria-label="Revenue trend from May 18 to May 24"
          className="h-[250px] w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          viewBox="0 0 180 54"
        >
          <defs>
            <linearGradient id="admin-revenue-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(239 47 37 / 0.46)" />
              <stop offset="100%" stopColor="rgb(239 47 37 / 0.03)" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#admin-revenue-area)"
            points={`0,54 ${points} 180,54`}
          />
          <polyline
            fill="none"
            points={points}
            stroke="var(--sb-red-bright)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.1"
          />
          {[0, 25, 50, 75, 100].map((tick) => (
            <line
              key={tick}
              stroke="rgb(255 255 255 / 0.1)"
              strokeWidth="0.45"
              x1="0"
              x2="180"
              y1={54 - (tick / 100) * 49}
              y2={54 - (tick / 100) * 49}
            />
          ))}
        </svg>
        <div className="mt-2 grid grid-cols-7 text-center text-[12px] text-white/46">
          {[
            "May 18",
            "May 19",
            "May 20",
            "May 21",
            "May 22",
            "May 23",
            "May 24",
          ].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </AdminPanel>
  );
}

export function CustomerOverviewPanel() {
  return (
    <AdminPanel id="customer-chart-admin" title="Customer Overview">
      <div className="grid gap-5 p-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
        <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full bg-[conic-gradient(var(--sb-red-bright)_0_86deg,var(--sb-gold)_86deg_282deg,rgba(255,255,255,0.28)_282deg_360deg)] p-5">
          <div className="grid h-full w-full place-items-center rounded-full bg-[#07090a] text-center">
            <span>
              <span className="block font-serif text-[26px] text-white">
                5,248
              </span>
              <span className="mt-1 block text-[11px] text-white/52">
                Total Customers
              </span>
            </span>
          </div>
        </div>
        <div className="grid gap-3">
          {adminCustomerSegments.map((segment, index) => (
            <div
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"
              key={segment.label}
            >
              <p className="min-w-0 truncate text-sm text-white/78">
                <span
                  className={classNames(
                    "mr-2 inline-block h-2.5 w-2.5 rounded-full",
                    index === 0
                      ? "bg-[var(--sb-red-bright)]"
                      : index === 1
                        ? "bg-[var(--sb-gold)]"
                        : "bg-white/36",
                  )}
                />
                {segment.label}
              </p>
              <p className="text-right text-sm text-white">
                {segment.value}
                <span className="ml-2 text-white/46">{segment.percent}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminPanel>
  );
}

export function CustomerSummaryPanel() {
  return (
    <AdminPanel
      action="View All"
      actionHref="#manage-customers-admin"
      id="customers-admin"
      title="Customer Summary"
    >
      <div className="grid gap-4 p-5">
        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/48">
              Total Customers
            </p>
            <p className="mt-2 font-serif text-[34px] text-white">5,248</p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/48">
              New This Week
            </p>
            <p className="mt-2 font-serif text-[34px] text-white">186</p>
            <p className="mt-1 text-sm text-emerald-300">+10.3%</p>
          </div>
        </div>
        <div className="grid grid-cols-[48px_minmax(0,1fr)] gap-3">
          <Image
            alt="Alex Johnson"
            className="h-12 w-12 rounded-full border border-[var(--sb-gold)]/32 object-cover"
            height={48}
            src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
            width={48}
          />
          <div className="min-w-0">
            <p className="truncate text-sm text-white">Alex Johnson</p>
            <p className="mt-1 text-[12px] text-white/52">
              Top customer by spend
            </p>
            <p className="mt-2 text-[18px] text-white">$1,248.50</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/48">
              Avg. Visits
            </p>
            <p className="mt-2 font-serif text-[25px] text-white">6.4</p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/48">
              Avg. Spend
            </p>
            <p className="mt-2 font-serif text-[25px] text-white">$92.35</p>
          </div>
        </div>
      </div>
    </AdminPanel>
  );
}

export function AnalyticsSummary() {
  return (
    <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.042),rgba(255,255,255,0.01)),rgba(7,10,11,0.9)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <AssetIcon
            loading="eager"
            size={34}
            src="/assets/icons/gold-alert-icon.png"
          />
          <div className="min-w-0">
            <h2 className="editorial-title truncate text-[22px] text-white">
              Analytics Summary
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-white/58">
              Track performance and key business metrics
            </p>
          </div>
        </div>
        <SectionAction href="#analytics-admin" label="View All" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        {adminAnalyticsSummary.map((item) => (
          <article
            className="min-w-0 rounded-[14px] border border-white/10 bg-black/24 p-4"
            key={item.label}
          >
            <p className="truncate text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              {item.label}
            </p>
            <p className="mt-3 line-clamp-2 font-serif text-[24px] leading-tight text-white">
              {item.value}
            </p>
            <p className="mt-2 truncate text-sm text-[var(--sb-gold-soft)]/82">
              {item.delta}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
