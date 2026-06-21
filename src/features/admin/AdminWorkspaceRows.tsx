import { classNames } from "@/lib/classNames";

import { type WorkspaceRow } from "./adminOperationsData";
import { AdminWorkspaceStatusPill } from "./AdminWorkspaceStatusPill";

interface AdminWorkspaceRowsProps {
  onSelectRow: (rowId: string) => void;
  priorityRowIds: ReadonlySet<string>;
  reviewedRowIds: ReadonlySet<string>;
  rows: WorkspaceRow[];
  savedRowIds: ReadonlySet<string>;
  selectedRowId?: string;
}

export function AdminWorkspaceRows({
  onSelectRow,
  priorityRowIds,
  reviewedRowIds,
  rows,
  savedRowIds,
  selectedRowId,
}: AdminWorkspaceRowsProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-white/14 bg-black/18 p-6 text-center">
        <p className="font-serif text-[20px] text-white">No records found</p>
        <p className="mt-2 text-sm text-white/52">
          Adjust the search or status filter to restore the list.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {rows.map((row) => {
        const selected = selectedRowId === row.id;
        const priority = priorityRowIds.has(row.id);
        const reviewed = reviewedRowIds.has(row.id);
        const saved = savedRowIds.has(row.id);

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
            onClick={() => onSelectRow(row.id)}
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
                {saved ? (
                  <span className="shrink-0 rounded-full border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--sb-gold-soft)]">
                    Saved
                  </span>
                ) : null}
                {priority ? (
                  <span className="shrink-0 rounded-full border border-[var(--sb-red-bright)]/32 bg-[var(--sb-red)]/12 px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--sb-red-bright)]">
                    Priority
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
              <AdminWorkspaceStatusPill value={row.status} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
