import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

interface AdminWorkspaceQueueProps {
  canReset: boolean;
  canReviewNext: boolean;
  canShowPriority: boolean;
  onResetWorkspace: () => void;
  onReviewNext: () => void;
  onShowPriority: () => void;
  priorityCount: number;
  reviewedCount: number;
  savedCount: number;
  sectionTitle: string;
  totalCount: number;
}

export function AdminWorkspaceQueue({
  canReset,
  canReviewNext,
  canShowPriority,
  onResetWorkspace,
  onReviewNext,
  onShowPriority,
  priorityCount,
  reviewedCount,
  savedCount,
  sectionTitle,
  totalCount,
}: AdminWorkspaceQueueProps) {
  const reviewLabel =
    reviewedCount === totalCount
      ? "All reviewed"
      : `${Math.max(totalCount - reviewedCount, 0)} remaining`;

  return (
    <div className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-3 md:p-4">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-[var(--sb-gold-soft)] min-[420px]:text-[11px] min-[420px]:tracking-[0.1em] min-[1500px]:tracking-[0.14em]">
            Workspace queue
          </p>
          <p className="mt-1 max-w-full break-words text-sm leading-6 text-white/58">
            Keep {sectionTitle.toLowerCase()} moving without leaving the
            dashboard.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-[13px] border border-white/10 bg-white/[0.025] px-2 py-2 min-[390px]:px-3">
            <p className="text-[8px] uppercase tracking-normal text-white/58 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
              Review
            </p>
            <p className="mt-1 truncate font-mono text-[15px] text-[var(--sb-gold-soft)]">
              {reviewLabel}
            </p>
          </div>
          <div className="rounded-[13px] border border-white/10 bg-white/[0.025] px-2 py-2 min-[390px]:px-3">
            <p className="text-[8px] uppercase tracking-normal text-white/58 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
              Saved
            </p>
            <p className="mt-1 font-mono text-[15px] text-[var(--sb-gold-soft)]">
              {savedCount}
            </p>
          </div>
          <div className="rounded-[13px] border border-white/10 bg-white/[0.025] px-2 py-2 min-[390px]:px-3">
            <p className="text-[8px] uppercase tracking-normal text-white/58 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
              Priority
            </p>
            <p className="mt-1 font-mono text-[15px] text-[var(--sb-red-bright)]">
              {priorityCount}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-2 min-[520px]:grid-cols-3">
        <button
          className={classNames(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border px-3 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45",
            canReviewNext
              ? "border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8 text-[var(--sb-gold-soft)] hover:bg-[var(--sb-gold)]/13"
              : "border-white/10 bg-white/[0.025] text-white/42",
          )}
          disabled={!canReviewNext}
          onClick={onReviewNext}
          type="button"
        >
          <AssetIcon size={16} src="/assets/icons/check-icon.png" />
          Review next
        </button>
        <button
          className={classNames(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border px-3 text-[12px] font-semibold uppercase tracking-[0.07em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45",
            canShowPriority
              ? "border-[var(--sb-red-bright)]/40 bg-[var(--sb-red)]/12 text-[var(--sb-red-bright)] hover:bg-[var(--sb-red)]/18"
              : "border-white/10 bg-white/[0.025] text-white/42",
          )}
          disabled={!canShowPriority}
          onClick={onShowPriority}
          type="button"
        >
          <AssetIcon size={16} src="/assets/icons/gold-alert-icon.png" />
          Show priority
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border border-white/10 bg-black/20 px-3 text-[12px] font-semibold uppercase tracking-[0.07em] text-white/58 transition hover:border-[var(--sb-gold)]/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!canReset}
          onClick={onResetWorkspace}
          type="button"
        >
          <AssetIcon size={16} src="/assets/icons/clock-icon.png" />
          Reset queue
        </button>
      </div>
    </div>
  );
}
