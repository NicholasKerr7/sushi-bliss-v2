"use client";

import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { MobileProfilePanel } from "./MobileProfilePrimitives";

export interface MobileProfileSummaryMetric {
  label: string;
  value: ReactNode;
}

interface MobileProfileSubflowSummaryProps {
  action?: ReactNode;
  eyebrow: string;
  icon?: string;
  metrics: MobileProfileSummaryMetric[];
  subtitle: string;
  title: string;
}

/** Reusable status panel for mobile profile management subflows. */
export function MobileProfileSubflowSummary({
  action,
  eyebrow,
  icon,
  metrics,
  subtitle,
  title,
}: MobileProfileSubflowSummaryProps) {
  return (
    <MobileProfilePanel className="mt-5 overflow-hidden min-[390px]:mt-6">
      <div className="relative p-3 min-[390px]:p-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_92%_10%,rgba(215,168,79,0.13),transparent_30%),radial-gradient(circle_at_0%_100%,rgba(239,47,37,0.13),transparent_34%)]"
        />
        <div className="relative z-10 flex items-start gap-3 min-[390px]:gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/38 min-[390px]:h-[58px] min-[390px]:w-[58px]">
            <AssetIcon size={26} src={icon} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.11em] text-[var(--sb-gold-soft)] min-[390px]:text-[11px] min-[390px]:tracking-[0.14em]">
              {eyebrow}
            </p>
            <h3 className="mt-2 text-[17px] font-semibold leading-5 text-white min-[390px]:text-[20px] min-[390px]:leading-6">
              {title}
            </h3>
            <p className="mt-2 text-[12px] leading-[18px] text-white/54 min-[390px]:text-[13px] min-[390px]:leading-5">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">
          {metrics.map((metric) => {
            const compactValue =
              typeof metric.value === "string" && metric.value.length > 4;

            return (
              <div
                className="min-w-0 rounded-[13px] border border-white/10 bg-black/34 px-1.5 py-2.5 text-center min-[390px]:rounded-[14px] min-[390px]:px-2 min-[390px]:py-3"
                key={metric.label}
              >
                <p
                  className={classNames(
                    "min-w-0 truncate font-mono leading-none text-[var(--sb-gold-soft)]",
                    compactValue
                      ? "text-[11px] min-[390px]:text-[15px]"
                      : "text-[16px] min-[390px]:text-[20px]",
                  )}
                >
                  {metric.value}
                </p>
                <p className="mt-2 truncate text-[8.5px] uppercase tracking-[0.04em] text-white/42 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
        {action ? <div className="relative z-10 mt-4">{action}</div> : null}
      </div>
    </MobileProfilePanel>
  );
}
