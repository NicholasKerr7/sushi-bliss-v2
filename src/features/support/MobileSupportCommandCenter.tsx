"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { supportTopics } from "@/data/support";
import { classNames } from "@/lib/classNames";
import type { SupportMessage } from "@/types/support";

import { MobileSupportIcon } from "./MobileSupportPrimitives";

interface MobileSupportCommandCenterProps {
  articleCount: number;
  messages: SupportMessage[];
  onOpenRequest: (topicId?: string) => void;
}

/** Presents concierge shortcuts without duplicating support form state. */
export function MobileSupportCommandCenter({
  articleCount,
  messages,
  onOpenRequest,
}: MobileSupportCommandCenterProps) {
  const latestMessage = messages[0] || null;

  return (
    <section className="mt-4" aria-labelledby="mobile-support-command-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            Concierge console
          </p>
          <h2
            className="mt-1 text-[20px] font-semibold text-white"
            id="mobile-support-command-title"
          >
            Fast assistance
          </h2>
        </div>
        <StatusBadge tone="success">Open now</StatusBadge>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <SupportMetric label="Requests" value={messages.length} />
        <SupportMetric label="Articles" value={articleCount} />
        <SupportMetric label="Response" value="Today" />
      </div>

      {latestMessage ? (
        <button
          className="mt-3 w-full rounded-[16px] border border-[var(--sb-border)] bg-black/34 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_48px_rgba(0,0,0,0.28)]"
          onClick={() => onOpenRequest(latestMessage.topicId)}
          type="button"
        >
          <span className="text-[11px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
            Latest request
          </span>
          <span className="mt-2 line-clamp-2 block text-[15px] leading-5 text-white/68">
            {latestMessage.message}
          </span>
        </button>
      ) : null}

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {supportTopics.map((topic) => (
          <button
            className="grid min-h-[84px] min-w-[196px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-white/12 bg-black/30 p-3 text-left text-white/66 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-w-[216px] min-[390px]:rounded-[15px]"
            key={topic.id}
            onClick={() => onOpenRequest(topic.id)}
            type="button"
          >
            <MobileSupportIcon
              className="h-9 w-9"
              icon={getTopicIcon(topic.id)}
              size={22}
            />
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white min-[390px]:text-[13px]">
                {topic.label}
              </span>
              <span className="mt-1 line-clamp-1 block text-[11px] leading-4 text-white/50">
                {topic.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SupportMetric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-[15px] border border-[var(--sb-border)] bg-black/38 p-3 text-center">
      <p
        className={classNames(
          "font-mono text-[20px] leading-none text-[var(--sb-gold-soft)]",
          typeof value === "string" && value.length > 3 ? "text-[15px]" : "",
        )}
      >
        {value}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-white/42">
        {label}
      </p>
    </div>
  );
}

function getTopicIcon(topicId: string) {
  if (topicId === "orders") return "/assets/icons/takeaway-bag-icon.png";
  if (topicId === "reservations") return "/assets/icons/calendar-icon.png";
  if (topicId === "dietary") return "/assets/icons/vegetarian-sushi-icon.webp";

  return "/assets/icons/gift-icon.png";
}
