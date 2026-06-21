"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import {
  buildAdminDomainActionContent,
  type AdminDomainActionContext,
  type DomainAction,
  type DomainStatTone,
} from "./adminDomainActions";

type AdminDomainActionPanelProps = AdminDomainActionContext;

const statToneClasses: Record<DomainStatTone, string> = {
  danger:
    "border-[var(--sb-red-bright)]/24 bg-[var(--sb-red)]/10 text-[var(--sb-red-bright)]",
  gold: "border-[var(--sb-gold)]/26 bg-[var(--sb-gold)]/10 text-[var(--sb-gold-soft)]",
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
};

export function AdminDomainActionPanel(props: AdminDomainActionPanelProps) {
  const [completedActionIds, setCompletedActionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const content = buildAdminDomainActionContent(props);

  const handleAction = (action: DomainAction) => {
    if (action.disabled) {
      return;
    }

    action.run();
    setCompletedActionIds((current) => new Set(current).add(action.id));
  };

  return (
    <section
      aria-labelledby={`admin-domain-actions-${props.activeId}`}
      className="border-b border-white/10 p-4 2xl:p-5"
    >
      <div className="grid gap-3 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01)),rgba(0,0,0,0.2)] p-3 md:p-4 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            {content.accent}
          </p>
          <h4
            className="editorial-title mt-2 text-[23px] leading-tight text-white md:text-[27px]"
            id={`admin-domain-actions-${props.activeId}`}
          >
            {content.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {content.insight}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {content.stats.map((stat) => (
              <div
                className={classNames(
                  "min-w-0 rounded-[13px] border px-2.5 py-2",
                  statToneClasses[stat.tone],
                )}
                key={stat.label}
              >
                <p className="truncate text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">
                  {stat.label}
                </p>
                <p className="mt-1 truncate font-mono text-[15px]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          {content.actions.map((action) => {
            const completed = completedActionIds.has(action.id);

            return (
              <button
                aria-pressed={completed}
                className={classNames(
                  "grid min-h-[76px] grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 rounded-[14px] border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  completed
                    ? "border-emerald-400/30 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-black/22 text-white/70 hover:border-[var(--sb-gold)]/34 hover:text-white",
                  action.disabled &&
                    "cursor-not-allowed border-white/8 bg-black/12 text-white/34 hover:border-white/8 hover:text-white/34",
                )}
                disabled={action.disabled}
                key={action.id}
                onClick={() => handleAction(action)}
                type="button"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/26 bg-black/38">
                  <AssetIcon
                    className={action.disabled ? "opacity-40" : "brightness-110"}
                    loading="eager"
                    size={21}
                    src={action.iconUrl}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-semibold uppercase tracking-[0.07em]">
                    {action.label}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/50">
                    {action.detail}
                  </span>
                </span>
                <span
                  className={classNames(
                    "rounded-full px-2 py-1 text-[10px] font-semibold uppercase",
                    completed
                      ? "bg-emerald-400/14 text-emerald-300"
                      : "bg-[var(--sb-gold)]/12 text-[var(--sb-gold-soft)]",
                  )}
                >
                  {completed ? "Done" : action.metric}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
