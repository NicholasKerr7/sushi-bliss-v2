import { StatusBadge } from "@/components/ui/StatusBadge";
import { getOrderTimeline } from "@/lib/orders";
import type { Order } from "@/types/order";

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const steps = getOrderTimeline(order);
  const completedSteps = steps.filter((step) => step.completed).length;

  return (
    <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.062),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(0,0,0,0.36)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Kitchen flow
          </p>
          <h3 className="mt-1 text-sm font-semibold text-sb-rice">Timeline</h3>
        </div>
        <span className="rounded-full border border-white/12 bg-black/34 px-3 py-1 font-mono text-xs text-sb-gold-soft">
          {completedSteps}/{steps.length}
        </span>
      </div>

      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li
            className="relative grid grid-cols-[2rem_1fr] gap-3"
            key={step.id}
          >
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={
                  step.completed
                    ? "absolute left-[15px] top-8 h-[calc(100%+0.75rem)] w-px bg-[linear-gradient(180deg,var(--sb-red-bright),rgba(239,47,37,0.18))] shadow-[0_0_12px_rgba(239,47,37,0.36)]"
                    : "absolute left-[15px] top-8 h-[calc(100%+0.75rem)] w-px bg-white/10"
                }
              />
            ) : null}
            <span
              className={
                step.completed
                  ? "relative z-10 grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-red-bright)] bg-black/62 shadow-[0_0_24px_rgba(239,47,37,0.38)]"
                  : "relative z-10 grid h-8 w-8 place-items-center rounded-full border border-white/16 bg-black/48"
              }
            >
              <span
                className={
                  step.completed
                    ? "h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)]"
                    : "h-2.5 w-2.5 rounded-full bg-white/18"
                }
              />
            </span>
            <div className="rounded-[15px] border border-white/10 bg-black/26 p-3">
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
          </li>
        ))}
      </ol>
    </section>
  );
}
