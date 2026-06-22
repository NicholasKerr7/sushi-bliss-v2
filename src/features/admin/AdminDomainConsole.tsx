"use client";

import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { AdminDomainActionPanel } from "./AdminDomainActionPanel";
import { AdminDomainBriefing } from "./AdminDomainBriefing";
import { AdminDomainRecordEditor } from "./AdminDomainRecordEditor";
import { AdminWorkspaceStatusPill } from "./AdminWorkspaceStatusPill";
import {
  getWorkspaceSection,
  type AdminWorkspaceId,
  type WorkspaceRow,
} from "./adminOperationsData";

interface AdminDomainConsoleProps {
  initialDomainId?: AdminWorkspaceId;
  onDomainChange?: (domainId: AdminWorkspaceId) => void;
  onOpenForms: (domainId: AdminWorkspaceId) => void;
  onOpenOperations: (domainId: AdminWorkspaceId) => void;
}

const primaryDomainIds: readonly AdminWorkspaceId[] = [
  "menu",
  "orders",
  "reservations",
  "offers",
  "locations",
  "customers",
  "analytics",
];

const domainCardCopy: Partial<
  Record<AdminWorkspaceId, { label: string; metric: string }>
> = {
  analytics: { label: "Analytics", metric: "+12.4%" },
  customers: { label: "Guests", metric: "5.2k" },
  locations: { label: "Locations", metric: "4 sites" },
  menu: { label: "Menu", metric: "60 items" },
  offers: { label: "Offers", metric: "12 offers" },
  orders: { label: "Orders", metric: "18 active" },
  reservations: { label: "Reservations", metric: "42 today" },
};

const formActionLabels: Partial<Record<AdminWorkspaceId, string>> = {
  locations: "Open location form",
  menu: "Open menu form",
  offers: "Open offer form",
  settings: "Open settings form",
  users: "Open user form",
};

type EditableRecordFields = Pick<
  WorkspaceRow,
  "detail" | "meta" | "status" | "value"
>;

type DomainRecordEdits = Record<string, Partial<EditableRecordFields>>;

function applyRecordEdits(
  rows: WorkspaceRow[],
  edits: DomainRecordEdits,
): WorkspaceRow[] {
  return rows.map((row) => ({ ...row, ...edits[row.id] }));
}

function getPrimaryRecord(sectionId: AdminWorkspaceId, rows: WorkspaceRow[]) {
  if (sectionId === "analytics") {
    return rows.find((row) => row.label === "Average Order Value") ?? rows[0];
  }

  if (sectionId === "locations") {
    return rows.find((row) => row.status !== "Active") ?? rows[0];
  }

  return rows[0];
}

export function AdminDomainConsole({
  initialDomainId = "menu",
  onDomainChange,
  onOpenForms,
  onOpenOperations,
}: AdminDomainConsoleProps) {
  const [activeId, setActiveId] = useState<AdminWorkspaceId>(initialDomainId);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(() => new Set());
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(() => new Set());
  const [recordEdits, setRecordEdits] = useState<DomainRecordEdits>({});
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const activeSection = getWorkspaceSection(activeId);
  const rowsWithEdits = useMemo(
    () => applyRecordEdits(activeSection.rows, recordEdits),
    [activeSection.rows, recordEdits],
  );
  const initialRecord = getPrimaryRecord(activeId, rowsWithEdits);
  const [selectedRecordId, setSelectedRecordId] = useState(
    initialRecord?.id ?? "",
  );
  const selectedRecord =
    rowsWithEdits.find((row) => row.id === selectedRecordId) ??
    initialRecord ??
    rowsWithEdits[0];
  const editingRecord = rowsWithEdits.find(
    (row) => row.id === editingRecordId,
  );
  const originalEditingRecord = activeSection.rows.find(
    (row) => row.id === editingRecordId,
  );
  const domainSections = useMemo(
    () =>
      primaryDomainIds.map((id) => {
        const section = getWorkspaceSection(id);
        const rows = applyRecordEdits(section.rows, recordEdits);
        const openCount = rows.filter(
          (row) => !["Active", "Completed", "Confirmed"].includes(row.status),
        ).length;

        return { openCount, section };
      }),
    [recordEdits],
  );
  const activeOpenCount = rowsWithEdits.filter(
    (row) => !["Active", "Completed", "Confirmed"].includes(row.status),
  ).length;
  const reviewedCount = rowsWithEdits.filter((row) =>
    reviewedIds.has(row.id),
  ).length;
  const pinnedCount = rowsWithEdits.filter((row) =>
    pinnedIds.has(row.id),
  ).length;
  const isSelectedReviewed = selectedRecord
    ? reviewedIds.has(selectedRecord.id)
    : false;
  const isSelectedPinned = selectedRecord
    ? pinnedIds.has(selectedRecord.id)
    : false;
  const formActionLabel = formActionLabels[activeSection.id];

  const handleDomainChange = (nextId: AdminWorkspaceId) => {
    const nextSection = getWorkspaceSection(nextId);
    const nextRows = applyRecordEdits(nextSection.rows, recordEdits);
    const nextRecord = getPrimaryRecord(nextId, nextRows);

    setActiveId(nextId);
    setSelectedRecordId(nextRecord?.id ?? "");
    setEditingRecordId(null);
    onDomainChange?.(nextId);
  };

  const handleSaveRecord = (
    rowId: string,
    updates: Partial<EditableRecordFields>,
  ) => {
    setRecordEdits((current) => ({
      ...current,
      [rowId]: { ...current[rowId], ...updates },
    }));
  };

  const handleResetRecord = (rowId: string) => {
    setRecordEdits((current) => {
      const next = { ...current };

      delete next[rowId];

      return next;
    });
  };

  const toggleReviewed = () => {
    if (!selectedRecord) {
      return;
    }

    setReviewedIds((current) => {
      const next = new Set(current);

      if (next.has(selectedRecord.id)) {
        next.delete(selectedRecord.id);
      } else {
        next.add(selectedRecord.id);
      }

      return next;
    });
  };

  const markRecordReviewed = (rowId: string) => {
    setReviewedIds((current) => new Set(current).add(rowId));
  };

  const togglePinned = () => {
    if (!selectedRecord) {
      return;
    }

    setPinnedIds((current) => {
      const next = new Set(current);

      if (next.has(selectedRecord.id)) {
        next.delete(selectedRecord.id);
      } else {
        next.add(selectedRecord.id);
      }

      return next;
    });
  };

  const pinRecord = (rowId: string) => {
    setPinnedIds((current) => new Set(current).add(rowId));
  };

  return (
    <section
      aria-labelledby="admin-domain-console-title"
      className="grid gap-3 xl:grid-cols-[286px_minmax(0,1fr)] 2xl:grid-cols-[318px_minmax(0,1fr)]"
    >
      <aside className="min-w-0 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-black/24">
        <div className="border-b border-white/10 p-3 2xl:p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Management domains
          </p>
          <h3
            className="editorial-title mt-2 text-[23px] leading-none text-white 2xl:text-[24px]"
            id="admin-domain-console-title"
          >
            Control Rooms
          </h3>
          <p className="mt-2 text-[13px] leading-5 text-white/58 2xl:text-sm 2xl:leading-6">
            Open each admin domain without leaving the dashboard.
          </p>
        </div>

        <nav
          aria-label="Admin management domains"
          className="smooth-scroll-area flex gap-2 overflow-x-auto p-3 xl:grid xl:overflow-visible"
        >
          {domainSections.map(({ openCount, section }) => {
            const active = section.id === activeId;
            const cardCopy = domainCardCopy[section.id] ?? {
              label: section.title,
              metric: section.accent,
            };

            return (
              <button
                aria-label={`Open ${section.title} detail`}
                aria-pressed={active}
                className={classNames(
                  "grid min-h-[70px] min-w-[210px] grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-[15px] border px-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold xl:min-h-[62px] xl:min-w-0 xl:grid-cols-[34px_minmax(0,1fr)_auto] xl:gap-2 xl:px-2.5 2xl:min-h-[66px]",
                  active
                    ? "border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/16 text-white shadow-[inset_3px_0_0_var(--sb-red-bright),0_0_28px_rgba(239,47,37,0.18)]"
                    : "border-white/10 bg-white/[0.025] text-white/62 hover:border-[var(--sb-gold)]/28 hover:text-white",
                )}
                key={section.id}
                onClick={() => handleDomainChange(section.id)}
                type="button"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-black/34 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9">
                  <AssetIcon
                    className={active ? "brightness-125" : "opacity-75"}
                    loading="eager"
                    size={20}
                    src={section.iconUrl}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.08em] 2xl:text-[12px]">
                    {cardCopy.label}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[13px] text-[var(--sb-gold-soft)] 2xl:mt-1 2xl:text-[14px]">
                    {cardCopy.metric}
                  </span>
                </span>
                <span
                  className={classNames(
                    "rounded-full px-2 py-1 text-[10px] font-semibold 2xl:text-[11px]",
                    openCount
                      ? "bg-[var(--sb-red)]/22 text-[var(--sb-red-bright)]"
                      : "bg-emerald-400/12 text-emerald-300",
                  )}
                >
                  {openCount || "OK"}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)),rgba(5,8,9,0.92)]">
        <div className="grid gap-3 border-b border-white/10 p-3 md:grid-cols-[minmax(0,1fr)_minmax(260px,330px)] md:items-start 2xl:p-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Active domain
            </p>
            <h3 className="editorial-title mt-2 text-[27px] leading-none text-white md:text-[30px] 2xl:text-[32px]">
              {activeSection.title}
            </h3>
            <p className="mt-2 max-w-[760px] text-[13px] leading-5 text-white/62 2xl:text-sm 2xl:leading-6">
              {activeSection.description}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-[13px] border border-white/10 bg-black/28 px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Records
              </p>
              <p className="mt-1 font-mono text-[16px] text-[var(--sb-gold-soft)]">
                {rowsWithEdits.length}
              </p>
            </div>
            <div className="rounded-[13px] border border-white/10 bg-black/28 px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Open
              </p>
              <p className="mt-1 font-mono text-[16px] text-[var(--sb-red-bright)]">
                {activeOpenCount}
              </p>
            </div>
            <div className="rounded-[13px] border border-white/10 bg-black/28 px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Reviewed
              </p>
              <p className="mt-1 font-mono text-[16px] text-[var(--sb-gold-soft)]">
                {reviewedCount}
              </p>
            </div>
          </div>
        </div>

        <AdminDomainBriefing
          activeId={activeSection.id}
          openCount={activeOpenCount}
          pinnedCount={pinnedCount}
          recordCount={rowsWithEdits.length}
          reviewedCount={reviewedCount}
        />

        <AdminDomainActionPanel
          activeId={activeSection.id}
          onMarkReviewed={markRecordReviewed}
          onOpenForms={onOpenForms}
          onOpenOperations={onOpenOperations}
          onPatchRecord={handleSaveRecord}
          onPinRecord={pinRecord}
          onSelectRecord={setSelectedRecordId}
          rows={rowsWithEdits}
          selectedRecord={selectedRecord}
        />

        <div className="grid gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_330px] 2xl:p-4">
          <div className="min-w-0">
            <div className="grid gap-2">
              {rowsWithEdits.map((row) => {
                const selected = row.id === selectedRecord?.id;

                return (
                  <button
                    aria-pressed={selected}
                    className={classNames(
                      "grid min-h-[58px] grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-[13px] border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold 2xl:min-h-[62px]",
                      selected
                        ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/16 shadow-[0_0_24px_rgba(239,47,37,0.2)]"
                        : "border-white/10 bg-black/18 hover:border-[var(--sb-gold)]/24 hover:bg-white/[0.04]",
                    )}
                    key={row.id}
                    onClick={() => setSelectedRecordId(row.id)}
                    type="button"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-semibold text-white">
                        {row.label}
                      </span>
                      <span className="mt-1 line-clamp-2 text-[12px] leading-4 text-white/54">
                        {row.detail}
                      </span>
                    </span>
                    <span className="grid justify-items-end gap-1">
                      <AdminWorkspaceStatusPill value={row.status} />
                      <span className="font-mono text-[13px] text-[var(--sb-gold-soft)]">
                        {row.value}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/28 p-3 2xl:p-4">
            {selectedRecord ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                      Focus record
                    </p>
                    <h4 className="editorial-title mt-2 line-clamp-2 text-[22px] leading-tight text-white 2xl:text-[24px]">
                      {selectedRecord.label}
                    </h4>
                  </div>
                  <AdminWorkspaceStatusPill value={selectedRecord.status} />
                </div>

                <div className="mt-3 grid gap-3 border-t border-white/10 pt-3 2xl:mt-4 2xl:pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/38">
                      Owner / category
                    </p>
                    <p className="mt-1 text-sm text-white/76">
                      {selectedRecord.meta}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/38">
                      Value
                    </p>
                    <p className="mt-1 font-mono text-[18px] text-[var(--sb-gold-soft)]">
                      {selectedRecord.value}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/38">
                      Readout
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/66">
                      {selectedRecord.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 2xl:mt-5">
                  <button
                    className="h-10 rounded-[12px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/[0.06] px-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold 2xl:h-11"
                    onClick={() => setEditingRecordId(selectedRecord.id)}
                    type="button"
                  >
                    Open record editor
                  </button>
                  <button
                    className={classNames(
                      "h-10 rounded-[12px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold 2xl:h-11",
                      isSelectedReviewed
                        ? "border-emerald-400/34 bg-emerald-400/12 text-emerald-300"
                        : "red-glow-button border-[#ef3326]/70 text-[#e2dcda]",
                    )}
                    onClick={toggleReviewed}
                    type="button"
                  >
                    {isSelectedReviewed ? "Reviewed" : "Mark reviewed"}
                  </button>
                  <button
                    className={classNames(
                      "h-10 rounded-[12px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold 2xl:h-11",
                      isSelectedPinned
                        ? "border-[var(--sb-gold)]/48 bg-[var(--sb-gold)]/12 text-[var(--sb-gold-soft)]"
                        : "border-white/12 bg-black/20 text-white/72 hover:border-[var(--sb-gold)]/34",
                    )}
                    onClick={togglePinned}
                    type="button"
                  >
                    {isSelectedPinned ? "Pinned" : "Pin record"}
                  </button>
                  <button
                    className="h-10 rounded-[12px] border border-[var(--sb-gold)]/34 bg-black/20 px-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-black/20 2xl:h-11"
                    disabled={!formActionLabel}
                    onClick={() => onOpenForms(activeSection.id)}
                    type="button"
                  >
                    {formActionLabel ?? "Form coming soon"}
                  </button>
                  <button
                    className="h-10 rounded-[12px] border border-white/12 bg-black/20 px-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-white/68 transition hover:border-[var(--sb-red-bright)]/42 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold 2xl:h-11"
                    onClick={() => onOpenOperations(activeSection.id)}
                    type="button"
                  >
                    Open live workspace
                  </button>
                </div>

                <div className="mt-4 rounded-[16px] border border-[var(--sb-gold)]/18 bg-[var(--sb-gold)]/[0.045] p-3 2xl:mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                    Domain pulse
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {pinnedCount} pinned, {reviewedCount} reviewed,{" "}
                    {activeOpenCount} records needing attention.
                  </p>
                </div>
              </>
            ) : null}
          </aside>
        </div>
      </div>

      {editingRecord && originalEditingRecord ? (
        <AdminDomainRecordEditor
          domainId={activeSection.id}
          hasSavedEdit={Boolean(recordEdits[editingRecord.id])}
          key={editingRecord.id}
          onClose={() => setEditingRecordId(null)}
          onReset={handleResetRecord}
          onSave={handleSaveRecord}
          originalRow={originalEditingRecord}
          row={editingRecord}
        />
      ) : null}
    </section>
  );
}
