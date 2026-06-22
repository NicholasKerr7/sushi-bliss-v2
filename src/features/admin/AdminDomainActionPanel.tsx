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

interface DomainActionLedgerEntry {
  detail: string;
  id: number;
  label: string;
  metric: string;
}

interface DomainActionLedgerState {
  entries: DomainActionLedgerEntry[];
  sequence: number;
}

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
  const [ledgerState, setLedgerState] = useState<DomainActionLedgerState>({
    entries: [],
    sequence: 0,
  });
  const content = buildAdminDomainActionContent(props);
  const ledgerEntries = ledgerState.entries;

  const handleAction = (action: DomainAction) => {
    if (action.disabled) {
      return;
    }

    action.run();
    setCompletedActionIds((current) => new Set(current).add(action.id));
    setLedgerState((current) => {
      const nextSequence = current.sequence + 1;

      return {
        entries: [
          {
            detail: action.detail,
            id: nextSequence,
            label: `${action.label} routed`,
            metric: action.metric,
          },
          ...current.entries,
        ].slice(0, 4),
        sequence: nextSequence,
      };
    });
  };

  const clearLedger = () => {
    setLedgerState((current) => ({ ...current, entries: [] }));
  };

  return (
    <section
      aria-labelledby={`admin-domain-actions-${props.activeId}`}
      className="border-b border-white/10 p-3 2xl:p-4"
    >
      <div className="grid gap-3 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01)),rgba(0,0,0,0.2)] p-3 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] 2xl:p-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            {content.accent}
          </p>
          <h4
            className="editorial-title mt-2 text-[22px] leading-tight text-white md:text-[25px] 2xl:text-[27px]"
            id={`admin-domain-actions-${props.activeId}`}
          >
            {content.title}
          </h4>
          <p className="mt-2 text-[13px] leading-5 text-white/60 2xl:text-sm 2xl:leading-6">
            {content.insight}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-1.5 2xl:mt-4">
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

        <div className="grid gap-3">
          <div className="grid gap-2">
            {content.actions.map((action) => {
              const completed = completedActionIds.has(action.id);

              return (
                <button
                  aria-pressed={completed}
                  className={classNames(
                    "grid min-h-[64px] grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2 rounded-[13px] border px-2.5 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold 2xl:min-h-[70px] 2xl:grid-cols-[38px_minmax(0,1fr)_auto] 2xl:gap-3 2xl:px-3",
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
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-gold)]/26 bg-black/38 2xl:h-10 2xl:w-10">
                    <AssetIcon
                      className={
                        action.disabled ? "opacity-40" : "brightness-110"
                      }
                      loading="eager"
                      size={19}
                      src={action.iconUrl}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-semibold uppercase tracking-[0.07em]">
                      {action.label}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[12px] leading-4 text-white/50 2xl:leading-5">
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

          <div
            aria-live="polite"
            className="rounded-[14px] border border-white/10 bg-black/24 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Command ledger
              </p>
              <button
                className="rounded-full border border-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/54 transition hover:border-[var(--sb-gold)]/34 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-35"
                disabled={ledgerEntries.length === 0}
                onClick={clearLedger}
                type="button"
              >
                Clear
              </button>
            </div>

            {ledgerEntries.length > 0 ? (
              <ol className="mt-3 grid gap-2">
                {ledgerEntries.map((entry) => (
                  <li
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-[11px] border border-white/[0.07] bg-white/[0.025] px-3 py-2"
                    key={entry.id}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-semibold text-white">
                        {entry.label}
                      </span>
                      <span className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-white/45">
                        {entry.detail}
                      </span>
                    </span>
                    <span className="self-center rounded-full bg-[var(--sb-gold)]/12 px-2 py-1 font-mono text-[11px] text-[var(--sb-gold-soft)]">
                      {entry.metric}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 rounded-[11px] border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[12px] leading-5 text-white/48">
                Action history will appear here as managers route records.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
