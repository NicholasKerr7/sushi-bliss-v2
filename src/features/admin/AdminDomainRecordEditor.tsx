"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { classNames } from "@/lib/classNames";

import { AdminWorkspaceStatusPill } from "./AdminWorkspaceStatusPill";
import type { AdminWorkspaceId, WorkspaceRow } from "./adminOperationsData";

type EditableRecordDraft = Pick<WorkspaceRow, "detail" | "meta" | "status" | "value">;

interface EditorLabels {
  detail: string;
  meta: string;
  status: string;
  value: string;
}

interface AdminDomainRecordEditorProps {
  domainId: AdminWorkspaceId;
  hasSavedEdit: boolean;
  onClose: () => void;
  onReset: (rowId: string) => void;
  onSave: (rowId: string, updates: EditableRecordDraft) => void;
  originalRow: WorkspaceRow;
  row: WorkspaceRow;
}

const statusOptions = [
  "Active",
  "Completed",
  "Confirmed",
  "Expired",
  "Inactive",
  "Maintenance",
  "Out for Delivery",
  "Pending",
  "Preparing",
  "Scheduled",
];

const editorLabels: Record<AdminWorkspaceId, EditorLabels> = {
  activity: {
    detail: "Activity note",
    meta: "Timestamp",
    status: "Activity status",
    value: "Activity domain",
  },
  analytics: {
    detail: "Insight note",
    meta: "Reporting period",
    status: "Metric status",
    value: "Metric value",
  },
  customers: {
    detail: "Guest note",
    meta: "Guest segment",
    status: "Account status",
    value: "Guest value",
  },
  locations: {
    detail: "Location note",
    meta: "Branch manager",
    status: "Branch status",
    value: "Daily volume",
  },
  menu: {
    detail: "Catalog note",
    meta: "Category",
    status: "Menu status",
    value: "Price",
  },
  offers: {
    detail: "Offer note",
    meta: "Discount",
    status: "Offer status",
    value: "Valid until",
  },
  orders: {
    detail: "Fulfillment note",
    meta: "Guest",
    status: "Order status",
    value: "Amount",
  },
  reservations: {
    detail: "Seating note",
    meta: "Reservation time",
    status: "Reservation status",
    value: "Table",
  },
  settings: {
    detail: "Setting note",
    meta: "Current setting",
    status: "Setting status",
    value: "Setting area",
  },
  users: {
    detail: "Access note",
    meta: "Role",
    status: "User status",
    value: "Permission scope",
  },
};

function toDraft(row: WorkspaceRow): EditableRecordDraft {
  return {
    detail: row.detail,
    meta: row.meta,
    status: row.status,
    value: row.value,
  };
}

function isDraftDirty(draft: EditableRecordDraft, row: WorkspaceRow) {
  return (
    draft.detail !== row.detail ||
    draft.meta !== row.meta ||
    draft.status !== row.status ||
    draft.value !== row.value
  );
}

export function AdminDomainRecordEditor({
  domainId,
  hasSavedEdit,
  onClose,
  onReset,
  onSave,
  originalRow,
  row,
}: AdminDomainRecordEditorProps) {
  const [draft, setDraft] = useState<EditableRecordDraft>(() => toDraft(row));
  const [saved, setSaved] = useState(false);
  const labels = editorLabels[domainId];
  const dirty = isDraftDirty(draft, row);
  const canReset = dirty || hasSavedEdit;
  const dialogTitleId = `admin-record-editor-${row.id}`;
  const availableStatuses = useMemo(
    () =>
      statusOptions.includes(draft.status)
        ? statusOptions
        : [draft.status, ...statusOptions],
    [draft.status],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateDraft = (field: keyof EditableRecordDraft, value: string) => {
    setSaved(false);
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dirty) {
      return;
    }

    onSave(row.id, draft);
    setSaved(true);
  };

  const handleReset = () => {
    setDraft(toDraft(originalRow));
    setSaved(false);
    onReset(row.id);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/72 p-3 backdrop-blur-sm md:place-items-center md:p-6">
      <button
        aria-label="Close record editor"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />

      <section
        aria-labelledby={dialogTitleId}
        aria-modal="true"
        className="relative z-10 flex max-h-[calc(100svh-24px)] w-full max-w-[720px] flex-col overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)),#050708] shadow-[0_34px_110px_rgba(0,0,0,0.72)]"
        role="dialog"
      >
        <header className="grid gap-4 border-b border-white/10 p-4 min-[520px]:grid-cols-[minmax(0,1fr)_auto] min-[520px]:items-start md:p-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Record editor
            </p>
            <h3
              className="editorial-title mt-2 line-clamp-2 text-[26px] leading-tight text-white md:text-[32px]"
              id={dialogTitleId}
            >
              {row.label}
            </h3>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-white/58">
              Update the focused record, then push it into the active admin
              briefing without leaving the dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2 min-[520px]:justify-end">
            <AdminWorkspaceStatusPill value={draft.status} />
            <button
              aria-label="Close record editor panel"
              className="h-10 rounded-full border border-white/12 bg-black/26 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/62 transition hover:border-[var(--sb-gold)]/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </header>

        <form
          className="smooth-scroll-area grid gap-4 overflow-y-auto p-4 md:p-5"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/44">
                {labels.meta}
              </span>
              <input
                autoFocus
                className="h-12 min-w-0 rounded-[13px] border border-white/12 bg-black/28 px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                onChange={(event) => updateDraft("meta", event.target.value)}
                value={draft.meta}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/44">
                {labels.value}
              </span>
              <input
                className="h-12 min-w-0 rounded-[13px] border border-white/12 bg-black/28 px-4 font-mono text-sm text-[var(--sb-gold-soft)] outline-none transition placeholder:text-white/34 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                onChange={(event) => updateDraft("value", event.target.value)}
                value={draft.value}
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/44">
              {labels.status}
            </span>
            <select
              className="h-12 min-w-0 appearance-none rounded-[13px] border border-white/12 bg-black/28 px-4 text-sm text-white outline-none transition focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
              onChange={(event) => updateDraft("status", event.target.value)}
              value={draft.status}
            >
              {availableStatuses.map((status) => (
                <option className="bg-[#050607] text-white" key={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/44">
              {labels.detail}
            </span>
            <textarea
              className="min-h-[120px] min-w-0 resize-none rounded-[13px] border border-white/12 bg-black/28 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/34 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
              onChange={(event) => updateDraft("detail", event.target.value)}
              value={draft.detail}
            />
          </label>

          <div className="grid gap-2 border-t border-white/10 pt-4 min-[360px]:grid-cols-2 min-[520px]:grid-cols-[1fr_auto_auto]">
            <p
              aria-live="polite"
              className={classNames(
                "min-h-11 rounded-[13px] border px-4 py-3 text-sm leading-5 min-[360px]:col-span-2 min-[520px]:col-span-1",
                saved
                  ? "border-emerald-400/24 bg-emerald-400/10 text-emerald-300"
                  : dirty
                    ? "border-[var(--sb-gold)]/22 bg-[var(--sb-gold)]/[0.05] text-[var(--sb-gold-soft)]"
                    : "border-white/10 bg-black/20 text-white/46",
              )}
            >
              {saved
                ? "Saved to this dashboard session."
                : dirty
                  ? "Unsaved edits are ready to apply."
                  : "No unsaved record changes."}
            </p>
            <button
              className="h-11 rounded-[12px] border border-white/12 bg-black/24 px-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-white/68 transition hover:border-[var(--sb-gold)]/34 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!canReset}
              onClick={handleReset}
              type="button"
            >
              Reset record
            </button>
            <button
              className="red-glow-button h-11 rounded-[12px] px-5 text-[12px] font-semibold uppercase tracking-[0.07em] text-[#e2dcda] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!dirty}
              type="submit"
            >
              {saved ? "Saved" : "Save record"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
