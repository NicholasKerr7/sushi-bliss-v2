import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { adminKpis, adminTabletMetrics } from "@/data/admin";
import { classNames } from "@/lib/classNames";

import { getSparklinePoints } from "./adminDashboardUtils";

export function AdminTopBar() {
  return (
    <div className="hidden min-h-[72px] items-center justify-between gap-5 border-b border-white/10 px-8 xl:flex 2xl:px-12">
      <a
        aria-label="Jump to admin overview"
        className="grid h-10 w-10 place-items-center rounded-[12px] border border-transparent text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/28 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        href="#overview"
      >
        <span className="grid gap-1.5">
          <span className="h-0.5 w-5 rounded-full bg-current" />
          <span className="h-0.5 w-5 rounded-full bg-current" />
          <span className="h-0.5 w-5 rounded-full bg-current" />
        </span>
      </a>

      <div className="ml-auto flex items-center gap-4">
        <label className="relative hidden w-[min(28vw,340px)] xl:block 2xl:w-[360px]">
          <span className="sr-only">Admin search</span>
          <AssetIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70"
            loading="eager"
            size={18}
            src="/assets/icons/search-icon.png"
          />
          <input
            className="h-11 w-full rounded-[10px] border border-white/12 bg-black/26 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/46 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
            placeholder="Search anything..."
            type="search"
          />
        </label>
        <Link
          aria-label="Open notifications"
          className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/notifications"
        >
          <AssetIcon
            loading="eager"
            size={22}
            src="/assets/icons/notification-bell-icon.png"
          />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red-bright)] px-1 text-[11px] font-bold text-white">
            5
          </span>
        </Link>
        <Link
          className="flex min-w-0 items-center gap-3 rounded-full border border-transparent p-1 pr-3 transition hover:border-[var(--sb-gold)]/24 hover:bg-white/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/chefs/hiroshi-tanaka"
        >
          <Image
            alt="Hiroshi Tanaka"
            className="h-11 w-11 rounded-full border border-[var(--sb-gold)]/30 object-cover"
            height={44}
            priority
            src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
            width={44}
          />
          <span className="hidden min-w-0 2xl:block">
            <span className="block truncate text-sm font-semibold text-white">
              Hiroshi Tanaka
            </span>
            <span className="mt-0.5 block truncate text-[12px] text-white/56">
              Super Admin
            </span>
          </span>
          <ChevronIcon
            className="hidden text-[var(--sb-gold-soft)] 2xl:inline-block"
            direction="down"
            size={18}
          />
        </Link>
      </div>
    </div>
  );
}

function Sparkline({ id, values }: { id: string; values: readonly number[] }) {
  const points = getSparklinePoints(values);
  const gradientId = `admin-spark-${id}`;

  return (
    <svg
      aria-hidden="true"
      className="mt-3 h-[46px] w-full overflow-visible 2xl:h-[52px]"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 180 54"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(239 47 37 / 0.42)" />
          <stop offset="100%" stopColor="rgb(239 47 37 / 0)" />
        </linearGradient>
      </defs>
      <polygon fill={`url(#${gradientId})`} points={`0,54 ${points} 180,54`} />
      <polyline
        fill="none"
        points={points}
        stroke="var(--sb-red-bright)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function AdminKpiCard({
  metric,
}: {
  metric: (typeof adminKpis)[number];
}) {
  const isRevenue = metric.id === "revenue";

  return (
    <article
      className={classNames(
        "relative min-w-0 overflow-hidden rounded-[16px] border bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)),rgba(6,9,10,0.9)] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.34)] 2xl:p-4",
        isRevenue
          ? "border-[var(--sb-red-bright)]/34 shadow-[inset_3px_0_0_rgba(239,47,37,0.82),0_24px_70px_rgba(0,0,0,0.34)]"
          : "border-[var(--sb-border)]",
      )}
    >
      <div className="flex min-w-0 items-start justify-between gap-2 2xl:gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-white/68 2xl:text-[11px] 2xl:tracking-[0.12em]">
            {metric.label}
          </p>
          <p className="mt-3 whitespace-nowrap font-serif text-[22px] leading-none text-white 2xl:text-[25px] min-[1800px]:text-[31px]">
            {metric.value}
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-black/38 2xl:h-10 2xl:w-10">
          <AssetIcon loading="eager" size={20} src={metric.iconUrl} />
        </span>
      </div>
      <p className="mt-3 truncate text-[11px] text-white/58 2xl:text-[12px]">
        <span className="font-semibold text-emerald-300">{metric.delta}</span>{" "}
        {metric.detail}
      </p>
      <Sparkline id={metric.id} values={metric.sparkline} />
    </article>
  );
}

export function TabletMetricCard({
  metric,
}: {
  metric: (typeof adminTabletMetrics)[number];
}) {
  const isRevenue = metric.id === "sales-today";

  return (
    <article
      className={classNames(
        "relative min-w-0 overflow-hidden rounded-[18px] border bg-[linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.014)),rgba(9,11,12,0.88)] p-5 shadow-[0_22px_62px_rgba(0,0,0,0.32)]",
        isRevenue
          ? "border-[var(--sb-red-bright)]/34 shadow-[inset_4px_0_0_rgba(239,47,37,0.88),0_22px_62px_rgba(0,0,0,0.32)]"
          : "border-white/12",
      )}
    >
      <div className="grid gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/45 bg-black/38 md:h-12 md:w-12">
            <AssetIcon loading="eager" size={25} src={metric.iconUrl} />
          </span>
          <p className="line-clamp-2 min-w-0 text-[14px] leading-5 text-white/78 md:text-[15px]">
            {metric.label}
          </p>
        </div>
        <p className="whitespace-nowrap font-serif text-[30px] leading-none text-white md:text-[34px]">
          {metric.value}
        </p>
        <p
          className={classNames(
            "text-[13px] leading-5 md:text-[14px]",
            metric.delta.includes("+")
              ? "text-emerald-300"
              : "text-[var(--sb-gold-soft)]",
          )}
        >
          {metric.delta}
        </p>
      </div>
    </article>
  );
}
