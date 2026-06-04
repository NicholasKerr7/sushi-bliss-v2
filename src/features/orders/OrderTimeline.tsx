import { StatusBadge } from "@/components/ui/StatusBadge";
import { getOrderTimeline } from "@/lib/orders";
import type { Order } from "@/types/order";

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const steps = getOrderTimeline(order);

  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Timeline</h3>
      <div className="mt-3 space-y-3">
        {steps.map((step) => (
          <div
            className="grid grid-cols-[1rem_1fr] gap-3 rounded-card border border-sb-line bg-sb-ink/45 p-3"
            key={step.id}
          >
            <span
              className={
                step.completed
                  ? "mt-1 h-3 w-3 rounded-full bg-sb-gold"
                  : "mt-1 h-3 w-3 rounded-full border border-sb-line"
              }
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-sb-rice">
                  {step.label}
                </p>
                {step.completed ? (
                  <StatusBadge tone="success">Done</StatusBadge>
                ) : null}
              </div>
              <p className="mt-1 text-xs leading-5 text-sb-muted">
                {step.description}
              </p>
              {step.timestamp ? (
                <p className="mt-1 font-mono text-xs text-sb-dim">
                  {step.timestamp}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
