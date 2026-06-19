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
    <MobileProfilePanel className="mt-6 overflow-hidden">
      <div className="relative p-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_92%_10%,rgba(215,168,79,0.13),transparent_30%),radial-gradient(circle_at_0%_100%,rgba(239,47,37,0.13),transparent_34%)]"
        />
        <div className="relative z-10 flex items-start gap-4">
          <span className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/38">
            <AssetIcon size={30} src={icon} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              {eyebrow}
            </p>
            <h3 className="mt-2 text-[20px] font-semibold leading-6 text-white">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-white/54">
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
                className="min-w-0 rounded-[14px] border border-white/10 bg-black/34 px-2 py-3 text-center"
                key={metric.label}
              >
                <p
                  className={classNames(
                    "min-w-0 truncate font-mono leading-none text-[var(--sb-gold-soft)]",
                    compactValue
                      ? "text-[13px] min-[390px]:text-[15px]"
                      : "text-[19px] min-[390px]:text-[20px]",
                  )}
                >
                  {metric.value}
                </p>
                <p className="mt-2 truncate text-[9px] uppercase tracking-[0.06em] text-white/42 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
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
