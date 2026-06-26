"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { adminTopMenuItems } from "@/data/admin";
import { classNames } from "@/lib/classNames";

import { AdminRecordEditor } from "./AdminRecordEditor";
import { AdminWorkspaceHandoff } from "./AdminWorkspaceHandoff";
import { AdminWorkspaceQueue } from "./AdminWorkspaceQueue";
import { AdminWorkspaceRows } from "./AdminWorkspaceRows";
import {
  defaultWorkspaceId,
  getWorkspaceSection,
  workspaceSections,
  type AdminWorkspaceId,
  type WorkspaceSection,
  type WorkspaceRow,
} from "./adminOperationsData";

type EditableRecordField = "detail" | "meta" | "status" | "value";
type RowEdits = Record<
  string,
  Partial<Pick<WorkspaceRow, EditableRecordField>>
>;

interface AdminOperationsWorkspaceProps {
  initialWorkspaceId?: AdminWorkspaceId;
}

function setWorkspaceHash(section: WorkspaceSection) {
  window.history.replaceState(null, "", section.hash);
  window.dispatchEvent(new Event("hashchange"));
}

export function AdminOperationsWorkspace({
  initialWorkspaceId = defaultWorkspaceId,
}: AdminOperationsWorkspaceProps) {
  const [activeId, setActiveId] =
    useState<AdminWorkspaceId>(initialWorkspaceId);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [priorityRowIds, setPriorityRowIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [reviewedRowIds, setReviewedRowIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [rowEdits, setRowEdits] = useState<RowEdits>({});
  const [savedRowIds, setSavedRowIds] = useState<Set<string>>(() => new Set());
  const activeSection = getWorkspaceSection(activeId);
  const rowsWithEdits = useMemo(
    () =>
      activeSection.rows.map((row) => ({
        ...row,
        ...rowEdits[row.id],
      })),
    [activeSection.rows, rowEdits],
  );
  const statusOptions = useMemo(
    () => [
      "All statuses",
      ...Array.from(new Set(rowsWithEdits.map((row) => row.status))),
    ],
    [rowsWithEdits],
  );
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rowsWithEdits.filter((row) => {
      const matchesStatus =
        statusFilter === "All statuses" || row.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${row.label} ${row.meta} ${row.detail} ${row.status} ${row.value}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, rowsWithEdits, statusFilter]);
  const [selectedRowId, setSelectedRowId] = useState(
    activeSection.rows[0]?.id ?? "",
  );
  const selectedRow =
    filteredRows.find((row) => row.id === selectedRowId) ??
    filteredRows[0] ??
    rowsWithEdits[0];
  const hasSelectedChanges = selectedRow
    ? Boolean(rowEdits[selectedRow.id])
    : false;
  const signalItems = adminTopMenuItems.slice(0, 3);
  const reviewedCount = rowsWithEdits.filter((row) =>
    reviewedRowIds.has(row.id),
  ).length;
  const savedCount = rowsWithEdits.filter((row) =>
    savedRowIds.has(row.id),
  ).length;
  const priorityCount = rowsWithEdits.filter((row) =>
    priorityRowIds.has(row.id),
  ).length;
  const nextReviewRow = rowsWithEdits.find(
    (row) => !reviewedRowIds.has(row.id),
  );
  const nextPriorityRow = rowsWithEdits.find((row) =>
    priorityRowIds.has(row.id),
  );

  const applyWorkspaceId = useCallback((nextId: AdminWorkspaceId) => {
    const nextSection = getWorkspaceSection(nextId);

    setActiveId(nextId);
    setQuery("");
    setStatusFilter("All statuses");
    setSelectedRowId(nextSection.rows[0]?.id ?? "");
  }, []);

  useEffect(() => {
    const getHashWorkspaceId = () =>
      workspaceSections.find((section) => section.hash === window.location.hash)
        ?.id;
    const syncFromHash = () =>
      applyWorkspaceId(getHashWorkspaceId() ?? initialWorkspaceId);

    queueMicrotask(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, [applyWorkspaceId, initialWorkspaceId]);

  const handleWorkspaceChange = (section: WorkspaceSection) => {
    applyWorkspaceId(section.id);
    setWorkspaceHash(section);
  };

  const handleToggleReviewed = () => {
    if (!selectedRow) {
      return;
    }

    setReviewedRowIds((current) => {
      const next = new Set(current);

      if (next.has(selectedRow.id)) {
        next.delete(selectedRow.id);
      } else {
        next.add(selectedRow.id);
      }

      return next;
    });
  };

  const handleTogglePriority = () => {
    if (!selectedRow) {
      return;
    }

    setPriorityRowIds((current) => {
      const next = new Set(current);

      if (next.has(selectedRow.id)) {
        next.delete(selectedRow.id);
      } else {
        next.add(selectedRow.id);
      }

      return next;
    });
  };

  const handleSelectedRowFieldChange = (
    field: EditableRecordField,
    value: string,
  ) => {
    if (!selectedRow) {
      return;
    }

    setRowEdits((current) => ({
      ...current,
      [selectedRow.id]: {
        ...current[selectedRow.id],
        [field]: value,
      },
    }));
    setSavedRowIds((current) => {
      const next = new Set(current);

      next.delete(selectedRow.id);

      return next;
    });
  };

  const handleApplyUpdate = () => {
    if (!selectedRow || !hasSelectedChanges) {
      return;
    }

    setSavedRowIds((current) => new Set(current).add(selectedRow.id));
  };

  const handleResetSelectedRow = () => {
    if (!selectedRow) {
      return;
    }

    setRowEdits((current) => {
      const next = { ...current };

      delete next[selectedRow.id];

      return next;
    });
    setSavedRowIds((current) => {
      const next = new Set(current);

      next.delete(selectedRow.id);

      return next;
    });
  };

  const handleReviewNext = () => {
    if (!nextReviewRow) {
      return;
    }

    setQuery("");
    setStatusFilter("All statuses");
    setSelectedRowId(nextReviewRow.id);
  };

  const handleShowPriority = () => {
    if (!nextPriorityRow) {
      return;
    }

    setQuery("");
    setStatusFilter("All statuses");
    setSelectedRowId(nextPriorityRow.id);
  };

  const handleResetWorkspaceQueue = () => {
    const activeRowIds = new Set(rowsWithEdits.map((row) => row.id));

    setRowEdits((current) =>
      Object.fromEntries(
        Object.entries(current).filter(([rowId]) => !activeRowIds.has(rowId)),
      ),
    );
    setSavedRowIds((current) => {
      const next = new Set(current);

      activeRowIds.forEach((rowId) => next.delete(rowId));

      return next;
    });
    setReviewedRowIds((current) => {
      const next = new Set(current);

      activeRowIds.forEach((rowId) => next.delete(rowId));

      return next;
    });
    setPriorityRowIds((current) => {
      const next = new Set(current);

      activeRowIds.forEach((rowId) => next.delete(rowId));

      return next;
    });
    setSelectedRowId(rowsWithEdits[0]?.id ?? "");
  };

  return (
    <section
      aria-labelledby="admin-operations-workspace-title"
      className="mt-6 overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012)),rgba(5,8,9,0.95)] shadow-[0_30px_92px_rgba(0,0,0,0.44)]"
    >
      <div className="border-b border-white/10 p-4 md:p-5 2xl:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Operations workspace
            </p>
            <h2
              className="editorial-title mt-2 text-[26px] leading-none text-white md:text-[32px]"
              id="admin-operations-workspace-title"
            >
              {activeSection.title}
            </h2>
            <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/62 md:text-[15px]">
              {activeSection.description}
            </p>
          </div>
          <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-[16px] border border-[var(--sb-gold)]/24 bg-black/28 p-3 md:min-w-[310px]">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-black/42">
              <AssetIcon
                loading="eager"
                size={24}
                src={activeSection.iconUrl}
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] uppercase tracking-[0.1em] text-white/48">
                Snapshot
              </span>
              <span className="mt-1 block truncate font-serif text-[24px] text-[var(--sb-gold-soft)]">
                {activeSection.accent}
              </span>
            </span>
          </div>
        </div>

        <nav
          aria-label="Admin workspace sections"
          className="smooth-scroll-area mt-5 flex gap-2 overflow-x-auto"
        >
          {workspaceSections.map((section) => {
            const active = section.id === activeSection.id;

            return (
              <button
                aria-label={`Open ${section.title}`}
                aria-pressed={active}
                className={classNames(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold uppercase tracking-[0.06em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold md:px-4",
                  active
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-white shadow-[0_0_26px_rgba(239,47,37,0.24)]"
                    : "border-white/10 bg-black/24 text-white/62 hover:border-[var(--sb-gold)]/32 hover:text-[var(--sb-gold-soft)]",
                )}
                key={section.id}
                onClick={() => handleWorkspaceChange(section)}
                type="button"
              >
                <AssetIcon loading="eager" size={17} src={section.iconUrl} />
                {section.title.replace(" Management", "")}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="grid gap-4 p-4 md:p-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:p-6">
        <div className="min-w-0">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <label className="relative block min-w-0">
              <span className="sr-only">Search admin workspace rows</span>
              <AssetIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-65"
                loading="eager"
                size={18}
                src="/assets/icons/search-icon.png"
              />
              <input
                aria-label="Search admin workspace rows"
                className="h-12 w-full rounded-[12px] border border-white/12 bg-black/24 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/42 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${activeSection.title.toLowerCase()}...`}
                type="search"
                value={query}
              />
            </label>
            <label className="relative block">
              <span className="sr-only">Filter by status</span>
              <select
                aria-label="Filter admin workspace rows by status"
                className="h-12 w-full appearance-none rounded-[12px] border border-white/12 bg-black/24 px-4 pr-10 text-sm text-white outline-none focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                onChange={(event) => setStatusFilter(event.target.value)}
                value={statusFilter}
              >
                {statusOptions.map((option) => (
                  <option className="bg-[#050607] text-white" key={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronIcon
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sb-gold-soft)]"
                direction="down"
                size={17}
              />
            </label>
            <button
              className="h-12 rounded-[12px] border border-[var(--sb-gold)]/36 bg-black/22 px-4 text-sm text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-red-bright)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!query && statusFilter === "All statuses"}
              onClick={() => {
                setQuery("");
                setStatusFilter("All statuses");
              }}
              type="button"
            >
              Clear
            </button>
          </div>

          <div className="mt-4">
            <AdminWorkspaceRows
              onSelectRow={setSelectedRowId}
              priorityRowIds={priorityRowIds}
              reviewedRowIds={reviewedRowIds}
              rows={filteredRows}
              savedRowIds={savedRowIds}
              selectedRowId={selectedRow?.id}
            />
          </div>

          <AdminWorkspaceQueue
            canReset={reviewedCount > 0 || savedCount > 0 || priorityCount > 0}
            canReviewNext={Boolean(nextReviewRow)}
            canShowPriority={Boolean(nextPriorityRow)}
            onResetWorkspace={handleResetWorkspaceQueue}
            onReviewNext={handleReviewNext}
            onShowPriority={handleShowPriority}
            priorityCount={priorityCount}
            reviewedCount={reviewedCount}
            savedCount={savedCount}
            sectionTitle={activeSection.title}
            totalCount={rowsWithEdits.length}
          />

          <AdminWorkspaceHandoff
            activeTitle={activeSection.title}
            priorityCount={priorityCount}
            reviewedCount={reviewedCount}
            selectedLabel={selectedRow?.label}
            totalCount={rowsWithEdits.length}
          />
        </div>

        <AdminRecordEditor
          activeId={activeId}
          hasChanges={hasSelectedChanges}
          isPriority={selectedRow ? priorityRowIds.has(selectedRow.id) : false}
          isReviewed={selectedRow ? reviewedRowIds.has(selectedRow.id) : false}
          isSaved={selectedRow ? savedRowIds.has(selectedRow.id) : false}
          onApply={handleApplyUpdate}
          onFieldChange={handleSelectedRowFieldChange}
          onReset={handleResetSelectedRow}
          onTogglePriority={handleTogglePriority}
          onToggleReviewed={handleToggleReviewed}
          row={selectedRow}
          sectionTitle={activeSection.title}
          signalItems={signalItems}
          statusOptions={statusOptions.filter(
            (option) => option !== "All statuses",
          )}
        />
      </div>
    </section>
  );
}
