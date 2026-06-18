import { AssetIcon } from "@/components/icons/AssetIcon";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getOrderStatusCounts, getReservationStatusCounts } from "@/lib/admin";
import { titleCase } from "@/lib/format";
import type { StatusTone } from "@/types/common";
import type { OrderStatus } from "@/types/order";
import type { ReservationStatus } from "@/types/reservation";

const orderStatusCounts = getOrderStatusCounts();
const reservationStatusCounts = getReservationStatusCounts();

const orderToneByStatus: Record<OrderStatus, StatusTone> = {
  cancelled: "danger",
  completed: "success",
  confirmed: "neutral",
  draft: "neutral",
  "out-for-delivery": "warning",
  preparing: "warning",
  ready: "success",
};

const reservationToneByStatus: Record<ReservationStatus, StatusTone> = {
  cancelled: "danger",
  confirmed: "success",
  modified: "premium",
};

export function AdminOperationsAnalytics() {
  const totalOrders = Object.values(orderStatusCounts).reduce(
    (total, count) => total + count,
    0,
  );
  const activeOrders =
    orderStatusCounts.confirmed +
    orderStatusCounts.preparing +
    orderStatusCounts.ready +
    orderStatusCounts["out-for-delivery"];
  const totalReservations = Object.values(reservationStatusCounts).reduce(
    (total, count) => total + count,
    0,
  );
  const analyticsSummary = [
    {
      detail: "Mock order records",
      icon: "/assets/icons/takeaway-bag-icon.png",
      label: "Orders",
      value: totalOrders,
    },
    {
      detail: "Needs attention",
      icon: "/assets/icons/chef-hat-icon.png",
      label: "Active",
      value: activeOrders,
    },
    {
      detail: "Reservation records",
      icon: "/assets/icons/calendar-icon.png",
      label: "RSV",
      value: totalReservations,
    },
  ] as const;

  return (
    <Card className="overflow-hidden p-0" id="analytics-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(215,168,79,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.7),transparent)]"
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-gold/30 bg-sb-gold/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/gold-alert-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Reporting
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Operations analytics
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Compact status reporting for the current mock order queue and
              reservation board.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {analyticsSummary.map((item) => (
              <div
                className="min-w-0 border-l border-white/10 px-3 py-3 first:border-l-0 sm:px-4"
                key={item.label}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon size={18} src={item.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {item.label}
                  </p>
                </div>
                <p className="mt-1 font-mono text-lg font-semibold text-sb-rice">
                  {item.value}
                </p>
                <p className="mt-0.5 hidden truncate text-[11px] text-sb-dim sm:block">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-2">
        <div className="rounded-[14px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/10 bg-black/32">
                <AssetIcon
                  size={22}
                  src="/assets/icons/takeaway-bag-icon.png"
                />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sb-gold-soft">
                Order status
              </h3>
            </div>
            <StatusBadge tone="neutral">{totalOrders} total</StatusBadge>
          </div>
          <dl className="mt-4 grid gap-2">
            {Object.entries(orderStatusCounts).map(([status, count]) => {
              const typedStatus = status as OrderStatus;

              return (
                <div
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[12px] border border-white/10 bg-black/22 px-3 py-2.5"
                  key={status}
                >
                  <dt className="min-w-0 text-sm text-sb-muted">
                    {titleCase(status)}
                  </dt>
                  <dd className="flex items-center gap-3">
                    <StatusBadge tone={orderToneByStatus[typedStatus]}>
                      {count > 0 ? "Tracked" : "Clear"}
                    </StatusBadge>
                    <span className="min-w-6 text-right font-mono font-semibold text-sb-rice">
                      {count}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="rounded-[14px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/10 bg-black/32">
                <AssetIcon size={22} src="/assets/icons/calendar-icon.png" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sb-gold-soft">
                Reservation status
              </h3>
            </div>
            <StatusBadge tone="neutral">{totalReservations} total</StatusBadge>
          </div>
          <dl className="mt-4 grid gap-2">
            {Object.entries(reservationStatusCounts).map(([status, count]) => {
              const typedStatus = status as ReservationStatus;

              return (
                <div
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[12px] border border-white/10 bg-black/22 px-3 py-2.5"
                  key={status}
                >
                  <dt className="min-w-0 text-sm text-sb-muted">
                    {titleCase(status)}
                  </dt>
                  <dd className="flex items-center gap-3">
                    <StatusBadge tone={reservationToneByStatus[typedStatus]}>
                      {count > 0 ? "Tracked" : "Clear"}
                    </StatusBadge>
                    <span className="min-w-6 text-right font-mono font-semibold text-sb-rice">
                      {count}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </Card>
  );
}
