import { AssetIcon } from "@/components/icons/AssetIcon";

interface AdminWorkspaceHandoffProps {
  activeTitle: string;
  priorityCount: number;
  reviewedCount: number;
  selectedLabel?: string;
  totalCount: number;
}

const handoffNotes = [
  "Confirm the active record before the next service checkpoint.",
  "Use quick edit for reversible updates before owner approval.",
  "Keep priority records visible until an owner has reviewed them.",
] as const;

export function AdminWorkspaceHandoff({
  activeTitle,
  priorityCount,
  reviewedCount,
  selectedLabel,
  totalCount,
}: AdminWorkspaceHandoffProps) {
  return (
    <div className="mt-4 rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.032),rgba(255,255,255,0.008)),rgba(0,0,0,0.22)] p-3 md:p-4">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_190px] md:items-start">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Service handoff
          </p>
          <h3 className="editorial-title mt-2 text-[20px] leading-tight text-white">
            {activeTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/58">
            {selectedLabel
              ? `${selectedLabel} is the current record in focus.`
              : "Select a record to prepare the service handoff."}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
          <div className="rounded-[13px] border border-white/10 bg-black/22 px-2 py-2 min-[390px]:px-3">
            <p className="text-[8px] uppercase tracking-normal text-white/42 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
              Reviewed
            </p>
            <p className="mt-1 font-mono text-[15px] text-[var(--sb-gold-soft)]">
              {reviewedCount}/{totalCount}
            </p>
          </div>
          <div className="rounded-[13px] border border-white/10 bg-black/22 px-2 py-2 min-[390px]:px-3">
            <p className="text-[8px] uppercase tracking-normal text-white/42 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
              Priority
            </p>
            <p className="mt-1 font-mono text-[15px] text-[var(--sb-red-bright)]">
              {priorityCount}
            </p>
          </div>
          <div className="rounded-[13px] border border-white/10 bg-black/22 px-2 py-2 min-[390px]:px-3">
            <p className="text-[8px] uppercase tracking-normal text-white/42 min-[390px]:text-[10px] min-[390px]:tracking-[0.08em]">
              Mode
            </p>
            <p className="mt-1 truncate font-mono text-[15px] text-[var(--sb-gold-soft)]">
              Ready
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {handoffNotes.map((note, index) => (
          <div
            className="grid grid-cols-[26px_minmax(0,1fr)] gap-2 rounded-[13px] border border-white/10 bg-black/18 p-3"
            key={note}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--sb-gold)]/26 bg-black/32">
              <AssetIcon
                size={14}
                src={
                  index === 0
                    ? "/assets/icons/check-icon.png"
                    : index === 1
                      ? "/assets/icons/user-settings-icon.png"
                      : "/assets/icons/gold-alert-icon.png"
                }
              />
            </span>
            <p className="text-[12px] leading-5 text-white/58">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
