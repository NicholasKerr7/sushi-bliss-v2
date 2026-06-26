import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";

import {
  type AdminWorkspaceId,
  type WorkspaceRow,
} from "./adminOperationsData";
import { AdminWorkspaceStatusPill } from "./AdminWorkspaceStatusPill";

type EditableRecordField = "detail" | "meta" | "status" | "value";

interface AdminSignalItem {
  item: string;
  sold: string;
}

interface AdminRecordEditorProps {
  activeId: AdminWorkspaceId;
  hasChanges: boolean;
  isPriority: boolean;
  isReviewed: boolean;
  isSaved: boolean;
  onApply: () => void;
  onFieldChange: (field: EditableRecordField, value: string) => void;
  onReset: () => void;
  onTogglePriority: () => void;
  onToggleReviewed: () => void;
  row?: WorkspaceRow;
  sectionTitle: string;
  signalItems: readonly AdminSignalItem[];
  statusOptions: readonly string[];
}

const adminActionCopy: Record<AdminWorkspaceId, string> = {
  activity: "Audit the event, confirm the operational owner, then archive it.",
  analytics: "Validate the metric source before sending the daily summary.",
  customers: "Check loyalty history and add a hospitality note when needed.",
  locations: "Review branch status, manager ownership, and service volume.",
  menu: "Confirm pricing, category placement, and availability before service.",
  offers: "Check eligibility rules and expiration timing before publishing.",
  orders: "Update status, flag timing risks, and confirm guest communication.",
  reservations: "Confirm table assignment, party notes, and seating readiness.",
  settings: "Keep service toggles documented before broader release updates.",
  users: "Review permissions before granting broader operational access.",
};

export function AdminRecordEditor({
  activeId,
  hasChanges,
  isPriority,
  isReviewed,
  isSaved,
  onApply,
  onFieldChange,
  onReset,
  onTogglePriority,
  onToggleReviewed,
  row,
  sectionTitle,
  signalItems,
  statusOptions,
}: AdminRecordEditorProps) {
  return (
    <aside className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
      {row ? (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Selected record
              </p>
              <h3 className="editorial-title mt-2 line-clamp-2 text-[23px] leading-tight text-white">
                {row.label}
              </h3>
            </div>
            <AdminWorkspaceStatusPill value={row.status} />
          </div>

          <div className="mt-5 grid gap-3 border-t border-white/10 pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/58">
                Owner / Type
              </p>
              <p className="mt-1 text-sm text-white/78">{row.meta}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/58">
                Value
              </p>
              <p className="mt-1 font-mono text-[20px] text-[var(--sb-gold-soft)]">
                {row.value}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/58">
                Notes
              </p>
              <p className="mt-1 text-sm leading-6 text-white/68">
                {row.detail}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[16px] border border-white/10 bg-white/[0.025] p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Quick edit
              </p>
              {isSaved ? (
                <span className="rounded-full border border-emerald-400/26 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
                  Saved
                </span>
              ) : null}
            </div>

            <div className="mt-3 grid gap-3">
              <label className="relative block">
                <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
                  Status
                </span>
                <select
                  aria-label="Record status"
                  className="h-11 w-full appearance-none rounded-[11px] border border-white/12 bg-black/28 px-3 pr-9 text-sm text-white outline-none focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                  onChange={(event) =>
                    onFieldChange("status", event.target.value)
                  }
                  value={row.status}
                >
                  {statusOptions.map((option) => (
                    <option className="bg-[#050607] text-white" key={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronIcon
                  className="pointer-events-none absolute bottom-3.5 right-3 text-[var(--sb-gold-soft)]"
                  direction="down"
                  size={16}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
                  Owner / type
                </span>
                <input
                  aria-label="Record owner or type"
                  className="h-11 w-full rounded-[11px] border border-white/12 bg-black/28 px-3 text-sm text-white outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                  onChange={(event) =>
                    onFieldChange("meta", event.target.value)
                  }
                  value={row.meta}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
                  Value
                </span>
                <input
                  aria-label="Record value"
                  className="h-11 w-full rounded-[11px] border border-white/12 bg-black/28 px-3 font-mono text-sm text-[var(--sb-gold-soft)] outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                  onChange={(event) =>
                    onFieldChange("value", event.target.value)
                  }
                  value={row.value}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/46">
                  Operations note
                </span>
                <textarea
                  aria-label="Operations note"
                  className="min-h-24 w-full resize-none rounded-[11px] border border-white/12 bg-black/28 px-3 py-2 text-sm leading-6 text-white outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                  onChange={(event) =>
                    onFieldChange("detail", event.target.value)
                  }
                  value={row.detail}
                />
              </label>
            </div>

            <div className="mt-3 grid gap-2 min-[420px]:grid-cols-2 xl:grid-cols-1">
              <button
                className={classNames(
                  "h-11 rounded-[11px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45",
                  hasChanges
                    ? "red-glow-button border-[#ef3326]/70 text-[#e2dcda]"
                    : "border-white/12 bg-white/[0.03] text-white/44",
                )}
                disabled={!hasChanges}
                onClick={onApply}
                type="button"
              >
                {isSaved ? "Update saved" : "Apply update"}
              </button>
              <button
                className="h-11 rounded-[11px] border border-[var(--sb-gold)]/32 bg-black/20 px-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!hasChanges && !isSaved}
                onClick={onReset}
                type="button"
              >
                Reset draft
              </button>
            </div>
          </div>

          <div className="mt-3 grid gap-2 min-[420px]:grid-cols-2 xl:grid-cols-1">
            <button
              className={classNames(
                "h-11 rounded-[11px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                isReviewed
                  ? "border-emerald-400/38 bg-emerald-400/12 text-emerald-300"
                  : "border-white/12 bg-black/22 text-white/72 hover:border-[var(--sb-gold)]/34 hover:text-white",
              )}
              onClick={onToggleReviewed}
              type="button"
            >
              {isReviewed ? "Marked reviewed" : "Mark reviewed"}
            </button>
            <button
              className={classNames(
                "h-11 rounded-[11px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                isPriority
                  ? "border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/16 text-[var(--sb-red-bright)]"
                  : "border-white/12 bg-black/22 text-white/72 hover:border-[var(--sb-red-bright)]/46 hover:text-white",
              )}
              onClick={onTogglePriority}
              type="button"
            >
              {isPriority ? "Priority set" : "Set priority"}
            </button>
          </div>

          <div className="mt-5 rounded-[16px] border border-[var(--sb-gold)]/18 bg-[var(--sb-gold)]/[0.045] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Suggested action
            </p>
            <p className="mt-2 text-sm leading-6 text-white/64">
              {adminActionCopy[activeId]}
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-[16px] border border-dashed border-white/14 bg-black/20 p-4 text-center">
          <p className="font-serif text-[20px] text-white">
            No record selected
          </p>
          <p className="mt-2 text-sm text-white/52">
            Select a {sectionTitle.toLowerCase()} row to review it.
          </p>
        </div>
      )}

      <div className="mt-5 border-t border-white/10 pt-4 xl:hidden">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/58">
          Top signal
        </p>
        <div className="mt-3 grid gap-2">
          {signalItems.map((item) => (
            <div
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-[12px] border border-white/10 bg-white/[0.025] px-3 py-2"
              key={`${activeId}-${item.item}`}
            >
              <span className="truncate text-sm text-white/72">
                {item.item}
              </span>
              <span className="font-mono text-sm text-[var(--sb-gold-soft)]">
                {item.sold}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
