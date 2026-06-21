"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import {
  getAdminDomainBriefing,
  type AdminDomainTone,
} from "./adminDomainBriefingData";
import { type AdminWorkspaceId } from "./adminOperationsData";

interface AdminDomainBriefingProps {
  activeId: AdminWorkspaceId;
  openCount: number;
  pinnedCount: number;
  recordCount: number;
  reviewedCount: number;
}

const statToneClasses: Record<AdminDomainTone, string> = {
  danger:
    "border-[var(--sb-red-bright)]/26 bg-[var(--sb-red)]/10 text-[var(--sb-red-bright)]",
  gold: "border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/10 text-[var(--sb-gold-soft)]",
  success: "border-emerald-400/22 bg-emerald-400/10 text-emerald-300",
};

export function AdminDomainBriefing({
  activeId,
  openCount,
  pinnedCount,
  recordCount,
  reviewedCount,
}: AdminDomainBriefingProps) {
  const briefing = getAdminDomainBriefing(activeId);
  const [stagedActionIds, setStagedActionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const liveStats = [
    { label: "Records", value: recordCount },
    { label: "Open", value: openCount },
    { label: "Reviewed", value: reviewedCount },
    { label: "Pinned", value: pinnedCount },
  ];

  const toggleStagedAction = (actionId: string) => {
    setStagedActionIds((current) => {
      const next = new Set(current);

      if (next.has(actionId)) {
        next.delete(actionId);
      } else {
        next.add(actionId);
      }

      return next;
    });
  };

  return (
    <section
      aria-labelledby={`admin-domain-briefing-${activeId}`}
      className="grid gap-3 border-b border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(239,47,37,0.1),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.04),transparent)] p-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)] 2xl:p-5"
    >
      <div className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            {briefing.accent}
          </p>
          <h4
            className="editorial-title mt-2 text-[24px] leading-tight text-white md:text-[28px]"
            id={`admin-domain-briefing-${activeId}`}
          >
            {briefing.title}
          </h4>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/62">
            {briefing.insight}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5 min-[520px]:grid-cols-4">
          {liveStats.map((item) => (
            <div
              className="min-w-0 rounded-[13px] border border-white/10 bg-black/28 px-2.5 py-2"
              key={item.label}
            >
              <p className="truncate text-[9px] uppercase tracking-[0.1em] text-white/38">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-[15px] text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 min-[520px]:grid-cols-3">
          {briefing.stats.map((stat) => (
            <div
              className={classNames(
                "rounded-[14px] border px-3 py-2",
                statToneClasses[stat.tone],
              )}
              key={stat.label}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-70">
                {stat.label}
              </p>
              <p className="mt-1 font-mono text-[18px]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Playbook
            </p>
            <h4 className="editorial-title mt-2 text-[22px] leading-tight text-white">
              Next Actions
            </h4>
          </div>
          <span className="rounded-full border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/10 px-2.5 py-1 font-mono text-[12px] text-[var(--sb-gold-soft)]">
            {stagedActionIds.size} staged
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {briefing.actions.map((action) => {
            const staged = stagedActionIds.has(action.id);

            return (
              <button
                aria-pressed={staged}
                className={classNames(
                  "grid min-h-[72px] grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-[14px] border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  staged
                    ? "border-emerald-400/30 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/70 hover:border-[var(--sb-gold)]/32 hover:text-white",
                )}
                key={action.id}
                onClick={() => toggleStagedAction(action.id)}
                type="button"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/26 bg-black/36">
                  <AssetIcon loading="eager" size={20} src={action.iconUrl} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold uppercase tracking-[0.07em]">
                    {staged ? action.label.replace("Stage", "Staged") : action.label}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/50">
                    {action.detail}
                  </span>
                </span>
                <span
                  className={classNames(
                    "rounded-full px-2 py-1 text-[10px] font-semibold uppercase",
                    staged
                      ? "bg-emerald-400/14 text-emerald-300"
                      : "bg-[var(--sb-red)]/16 text-[var(--sb-red-bright)]",
                  )}
                >
                  {staged ? "Staged" : "Stage"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
