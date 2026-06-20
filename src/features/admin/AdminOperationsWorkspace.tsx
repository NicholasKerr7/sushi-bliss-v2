"use client";

import { useEffect, useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { adminTopMenuItems } from "@/data/admin";
import { classNames } from "@/lib/classNames";

import {
  defaultWorkspaceId,
  getWorkspaceFromHash,
  getWorkspaceSection,
  workspaceSections,
  type AdminWorkspaceId,
  type WorkspaceSection,
} from "./adminOperationsData";
import { getStatusTone, statusToneClasses } from "./adminDashboardUtils";

function setWorkspaceHash(section: WorkspaceSection) {
  window.history.replaceState(null, "", section.hash);
  window.dispatchEvent(new Event("hashchange"));
}

function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={classNames(
        "inline-flex min-h-6 items-center rounded-full px-2.5 text-[11px] font-semibold",
        statusToneClasses[getStatusTone(value)],
      )}
    >
      {value}
    </span>
  );
}

export function AdminOperationsWorkspace() {
  const [activeId, setActiveId] =
    useState<AdminWorkspaceId>(defaultWorkspaceId);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [reviewedRowIds, setReviewedRowIds] = useState<Set<string>>(
    () => new Set(),
  );
  const activeSection = getWorkspaceSection(activeId);
  const statusOptions = useMemo(
    () => [
      "All statuses",
      ...Array.from(new Set(activeSection.rows.map((row) => row.status))),
    ],
    [activeSection.rows],
  );
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activeSection.rows.filter((row) => {
      const matchesStatus =
        statusFilter === "All statuses" || row.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${row.label} ${row.meta} ${row.detail} ${row.status} ${row.value}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeSection.rows, query, statusFilter]);
  const [selectedRowId, setSelectedRowId] = useState(
    activeSection.rows[0]?.id ?? "",
  );
  const selectedRow =
    filteredRows.find((row) => row.id === selectedRowId) ??
    filteredRows[0] ??
    activeSection.rows[0];

  useEffect(() => {
    const applyWorkspaceId = (nextId: AdminWorkspaceId) => {
      const nextSection = getWorkspaceSection(nextId);

      setActiveId(nextId);
      setQuery("");
      setStatusFilter("All statuses");
      setSelectedRowId(nextSection.rows[0]?.id ?? "");
    };
    const syncFromHash = () =>
      applyWorkspaceId(getWorkspaceFromHash(window.location.hash));

    queueMicrotask(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  const handleWorkspaceChange = (section: WorkspaceSection) => {
    setActiveId(section.id);
    setQuery("");
    setStatusFilter("All statuses");
    setSelectedRowId(section.rows[0]?.id ?? "");
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

          <div className="mt-4 grid gap-2">
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => {
                const selected = selectedRow?.id === row.id;
                const reviewed = reviewedRowIds.has(row.id);

                return (
                  <button
                    aria-pressed={selected}
                    className={classNames(
                      "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-[14px] border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold md:grid-cols-[minmax(0,1.2fr)_minmax(120px,0.7fr)_auto]",
                      selected
                        ? "border-[var(--sb-red-bright)]/52 bg-[var(--sb-red)]/12 shadow-[inset_3px_0_0_var(--sb-red-bright)]"
                        : "border-white/10 bg-black/18 hover:border-[var(--sb-gold)]/30 hover:bg-white/[0.035]",
                    )}
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    type="button"
                  >
                    <span className="min-w-0">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-sm font-semibold text-white md:text-[15px]">
                          {row.label}
                        </span>
                        {reviewed ? (
                          <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/12 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
                            Reviewed
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/52">
                        {row.detail}
                      </span>
                    </span>
                    <span className="hidden min-w-0 text-sm text-white/68 md:block">
                      <span className="block truncate">{row.meta}</span>
                      <span className="mt-1 block truncate font-mono text-[var(--sb-gold-soft)]">
                        {row.value}
                      </span>
                    </span>
                    <span className="justify-self-end">
                      <StatusPill value={row.status} />
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="rounded-[14px] border border-dashed border-white/14 bg-black/18 p-6 text-center">
                <p className="font-serif text-[20px] text-white">
                  No records found
                </p>
                <p className="mt-2 text-sm text-white/52">
                  Adjust the search or status filter to restore the list.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
          {selectedRow ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                    Selected record
                  </p>
                  <h3 className="editorial-title mt-2 line-clamp-2 text-[23px] leading-tight text-white">
                    {selectedRow.label}
                  </h3>
                </div>
                <StatusPill value={selectedRow.status} />
              </div>

              <div className="mt-5 grid gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
                    Owner / Type
                  </p>
                  <p className="mt-1 text-sm text-white/78">
                    {selectedRow.meta}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
                    Value
                  </p>
                  <p className="mt-1 font-mono text-[20px] text-[var(--sb-gold-soft)]">
                    {selectedRow.value}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
                    Notes
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    {selectedRow.detail}
                  </p>
                </div>
              </div>

              <button
                className={classNames(
                  "mt-5 h-12 w-full rounded-[12px] border px-4 text-sm font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  reviewedRowIds.has(selectedRow.id)
                    ? "border-emerald-400/38 bg-emerald-400/12 text-emerald-300"
                    : "red-glow-button border-[#ef3326]/70 text-[#e2dcda]",
                )}
                onClick={handleToggleReviewed}
                type="button"
              >
                {reviewedRowIds.has(selectedRow.id)
                  ? "Marked reviewed"
                  : "Mark reviewed"}
              </button>
            </>
          ) : null}

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
              Top signal
            </p>
            <div className="mt-3 grid gap-2">
              {adminTopMenuItems.slice(0, 3).map((item) => (
                <div
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-[12px] border border-white/10 bg-white/[0.025] px-3 py-2"
                  key={`${activeSection.id}-${item.item}`}
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
      </div>
    </section>
  );
}
