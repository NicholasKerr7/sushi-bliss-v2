import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

export function TabletOrderConfirmationInfoCard({
  actionHref,
  actionLabel,
  icon,
  label,
  title,
  titleClassName = "text-white",
  value,
  onAction,
}: {
  actionHref?: string;
  actionLabel?: string;
  icon?: string;
  label: string;
  title: string;
  titleClassName?: string;
  value: string;
  onAction?: () => void;
}) {
  return (
    <article className="grid grid-cols-[76px_1fr] items-center gap-5 rounded-[14px] border border-white/12 bg-white/[0.035] px-7">
      <AssetIcon size={52} src={icon} />
      <div>
        <p className="font-serif text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {label}
        </p>
        <p
          className={`mt-2 font-serif text-[28px] uppercase ${titleClassName}`}
        >
          {title}
        </p>
        <p className="mt-2 max-w-[330px] text-[14px] leading-5 text-white/62">
          {value}
        </p>
        {actionHref && actionLabel ? (
          <Link
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            href={actionHref}
            onClick={onAction}
          >
            {actionLabel}
            <ChevronIcon direction="right" size={18} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
