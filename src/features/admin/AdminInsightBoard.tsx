"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";

import {
  adminInsightSections,
  defaultInsightId,
  getInsightSection,
  type AdminInsightId,
} from "./adminInsightData";
import { AdminWorkspaceStatusPill } from "./AdminWorkspaceStatusPill";

export function AdminInsightBoard() {
  const [activeId, setActiveId] = useState<AdminInsightId>(defaultInsightId);
  const [actionedIds, setActionedIds] = useState<Set<string>>(() => new Set());
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(() => new Set());
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const activeSection = getInsightSection(activeId);
  const statusOptions = useMemo(
    () => [
      "All statuses",
      ...Array.from(
        new Set(activeSection.records.map((record) => record.status)),
      ),
    ],
    [activeSection.records],
  );
  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activeSection.records.filter((record) => {
      const matchesStatus =
        statusFilter === "All statuses" || record.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${record.label} ${record.meta} ${record.value} ${record.detail} ${record.status}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeSection.records, query, statusFilter]);
  const [selectedRecordId, setSelectedRecordId] = useState(
    activeSection.records[0]?.id ?? "",
  );
  const selectedRecord =
    filteredRecords.find((record) => record.id === selectedRecordId) ??
    filteredRecords[0] ??
    activeSection.records[0];
  const unresolvedCount = activeSection.records.filter(
    (record) => !actionedIds.has(record.id),
  ).length;
  const pinnedCount = activeSection.records.filter((record) =>
    pinnedIds.has(record.id),
  ).length;

  const handleSectionChange = (nextId: AdminInsightId) => {
    const nextSection = getInsightSection(nextId);

    setActiveId(nextId);
    setQuery("");
    setStatusFilter("All statuses");
    setSelectedRecordId(nextSection.records[0]?.id ?? "");
  };

  const handleToggleActioned = () => {
    if (!selectedRecord) {
      return;
    }

    setActionedIds((current) => {
      const next = new Set(current);

      if (next.has(selectedRecord.id)) {
        next.delete(selectedRecord.id);
      } else {
        next.add(selectedRecord.id);
      }

      return next;
    });
  };

  const handleTogglePinned = () => {
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

  const handleReset = () => {
    setQuery("");
    setStatusFilter("All statuses");
    setSelectedRecordId(activeSection.records[0]?.id ?? "");
  };

  return (
    <section
      aria-labelledby="admin-insight-board-title"
      className="mt-6 overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.046),rgba(255,255,255,0.012)),rgba(5,8,9,0.94)] shadow-[0_30px_92px_rgba(0,0,0,0.44)]"
    >
      <div className="border-b border-white/10 p-4 md:p-5 2xl:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Command center
            </p>
            <h2
              className="editorial-title mt-2 text-[26px] leading-none text-white md:text-[32px]"
              id="admin-insight-board-title"
            >
              {activeSection.title}
            </h2>
            <p className="mt-2 max-w-[790px] text-sm leading-6 text-white/62 md:text-[15px]">
              {activeSection.description}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:min-w-[420px]">
            <div className="rounded-[14px] border border-white/10 bg-black/28 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Records
              </p>
              <p className="mt-1 font-mono text-[18px] text-[var(--sb-gold-soft)]">
                {activeSection.records.length}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/10 bg-black/28 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Open
              </p>
              <p className="mt-1 font-mono text-[18px] text-[var(--sb-gold-soft)]">
                {unresolvedCount}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/10 bg-black/28 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
                Pinned
              </p>
              <p className="mt-1 font-mono text-[18px] text-[var(--sb-red-bright)]">
                {pinnedCount}
              </p>
            </div>
          </div>
        </div>

        <nav
          aria-label="Admin command center sections"
          className="smooth-scroll-area mt-5 flex gap-2 overflow-x-auto"
        >
          {adminInsightSections.map((section) => {
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
                onClick={() => handleSectionChange(section.id)}
                type="button"
              >
                <AssetIcon loading="eager" size={17} src={section.iconUrl} />
                {section.title}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="grid gap-4 p-4 md:p-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:p-6">
        <div className="min-w-0">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <label className="relative block min-w-0">
              <span className="sr-only">Search command center records</span>
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
              <span className="sr-only">Command center status filter</span>
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
              onClick={handleReset}
              type="button"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => {
                const selected = selectedRecord?.id === record.id;
                const actioned = actionedIds.has(record.id);
                const pinned = pinnedIds.has(record.id);

                return (
                  <button
                    aria-pressed={selected}
                    className={classNames(
                      "grid min-h-[132px] min-w-0 grid-rows-[auto_1fr_auto] gap-3 rounded-[16px] border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                      selected
                        ? "border-[var(--sb-red-bright)]/52 bg-[var(--sb-red)]/12 shadow-[inset_3px_0_0_var(--sb-red-bright)]"
                        : "border-white/10 bg-black/18 hover:border-[var(--sb-gold)]/30 hover:bg-white/[0.035]",
                    )}
                    key={record.id}
                    onClick={() => setSelectedRecordId(record.id)}
                    type="button"
                  >
                    <span className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                      <span className="min-w-0">
                        <span className="flex min-w-0 items-center gap-2">
                          {record.imageUrl ? (
                            <Image
                              alt=""
                              className="h-9 w-11 shrink-0 rounded-[9px] object-cover"
                              height={36}
                              src={record.imageUrl}
                              width={44}
                            />
                          ) : null}
                          <span className="min-w-0 truncate text-sm font-semibold text-white md:text-[15px]">
                            {record.label}
                          </span>
                        </span>
                        <span className="mt-2 block truncate text-[12px] text-white/50">
                          {record.meta}
                        </span>
                      </span>
                      <AdminWorkspaceStatusPill value={record.status} />
                    </span>
                    <span className="line-clamp-2 text-[12px] leading-5 text-white/56">
                      {record.detail}
                    </span>
                    <span className="flex min-w-0 items-center justify-between gap-3">
                      <span className="truncate font-mono text-sm text-[var(--sb-gold-soft)]">
                        {record.value}
                      </span>
                      <span className="flex shrink-0 items-center gap-1">
                        {actioned ? (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/12 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
                            Actioned
                          </span>
                        ) : null}
                        {pinned ? (
                          <span className="rounded-full border border-[var(--sb-red-bright)]/32 bg-[var(--sb-red)]/12 px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--sb-red-bright)]">
                            Pinned
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="rounded-[16px] border border-dashed border-white/14 bg-black/18 p-6 text-center md:col-span-2 2xl:col-span-3">
                <p className="font-serif text-[22px] text-white">
                  No records found
                </p>
                <p className="mt-2 text-sm text-white/52">
                  Adjust the search or status filter to restore the board.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
          {selectedRecord ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                    Focus record
                  </p>
                  <h3 className="editorial-title mt-2 line-clamp-2 text-[23px] leading-tight text-white">
                    {selectedRecord.label}
                  </h3>
                </div>
                <AdminWorkspaceStatusPill value={selectedRecord.status} />
              </div>

              <div className="mt-5 grid gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
                    Owner / category
                  </p>
                  <p className="mt-1 text-sm text-white/78">
                    {selectedRecord.meta}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
                    Value
                  </p>
                  <p className="mt-1 font-mono text-[20px] text-[var(--sb-gold-soft)]">
                    {selectedRecord.value}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/42">
                    Readout
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    {selectedRecord.detail}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2 min-[420px]:grid-cols-2 xl:grid-cols-1">
                <button
                  className={classNames(
                    "h-11 rounded-[11px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    actionedIds.has(selectedRecord.id)
                      ? "border-emerald-400/38 bg-emerald-400/12 text-emerald-300"
                      : "red-glow-button border-[#ef3326]/70 text-[#e2dcda]",
                  )}
                  onClick={handleToggleActioned}
                  type="button"
                >
                  {actionedIds.has(selectedRecord.id)
                    ? "Actioned"
                    : "Mark actioned"}
                </button>
                <button
                  className={classNames(
                    "h-11 rounded-[11px] border px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    pinnedIds.has(selectedRecord.id)
                      ? "border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/16 text-[var(--sb-red-bright)]"
                      : "border-white/12 bg-black/22 text-white/72 hover:border-[var(--sb-red-bright)]/46 hover:text-white",
                  )}
                  onClick={handleTogglePinned}
                  type="button"
                >
                  {pinnedIds.has(selectedRecord.id) ? "Pinned" : "Pin record"}
                </button>
              </div>
            </>
          ) : null}

          <div className="mt-5 rounded-[16px] border border-[var(--sb-gold)]/18 bg-[var(--sb-gold)]/[0.045] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Board rhythm
            </p>
            <p className="mt-2 text-sm leading-6 text-white/64">
              Use this board for fast cross-section triage. The upper workspace
              handles record edits; this lower board keeps management signals in
              one scan-friendly place.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
