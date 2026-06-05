import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getOrderStatusCounts, getReservationStatusCounts } from "@/lib/admin";

const orderStatusCounts = getOrderStatusCounts();
const reservationStatusCounts = getReservationStatusCounts();

function formatStatusLabel(status: string): string {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AdminOperationsAnalytics() {
  return (
    <Card className="p-5 md:p-6" id="analytics-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Operations analytics
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Status totals for orders and reservations.
          </p>
        </div>
        <StatusBadge tone="neutral">Reporting</StatusBadge>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase text-sb-dim">
            Order status
          </h3>
          <dl className="mt-3 grid gap-2">
            {Object.entries(orderStatusCounts).map(([status, count]) => (
              <div
                className="flex items-center justify-between rounded-control border border-sb-line bg-sb-ink/50 px-3 py-2"
                key={status}
              >
                <dt className="text-sm text-sb-muted">
                  {formatStatusLabel(status)}
                </dt>
                <dd className="font-mono font-semibold text-sb-rice">
                  {count}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-sb-dim">
            Reservation status
          </h3>
          <dl className="mt-3 grid gap-2">
            {Object.entries(reservationStatusCounts).map(([status, count]) => (
              <div
                className="flex items-center justify-between rounded-control border border-sb-line bg-sb-ink/50 px-3 py-2"
                key={status}
              >
                <dt className="text-sm text-sb-muted">
                  {formatStatusLabel(status)}
                </dt>
                <dd className="font-mono font-semibold text-sb-rice">
                  {count}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Card>
  );
}
