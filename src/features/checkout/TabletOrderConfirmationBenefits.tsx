import { AssetIcon } from "@/components/icons/AssetIcon";

import { tabletConfirmationBenefits } from "./TabletOrderConfirmationUtils";

export function TabletOrderConfirmationBenefits() {
  return (
    <ol className="relative grid grid-cols-4 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035]">
      <span
        aria-hidden="true"
        className="absolute left-[12.5%] right-[12.5%] top-1/2 h-[6px] -translate-y-1/2 overflow-hidden rounded-full border border-white/[0.045] bg-black/54 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]"
      >
        <span className="absolute inset-y-[2px] left-2 right-2 rounded-full bg-white/10" />
        <span className="absolute inset-y-[1px] left-0 w-[14%] rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.64)]" />
      </span>
      {tabletConfirmationBenefits.map((benefit) => (
        <li
          aria-current={benefit.active ? "step" : undefined}
          className="relative flex items-center justify-center gap-3 border-r border-white/10 px-4 last:border-r-0"
          key={benefit.label}
        >
          <span
            className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-black/62 ${
              benefit.active
                ? "border-[var(--sb-red-bright)] shadow-[0_0_20px_rgba(238,43,36,0.35)]"
                : "border-white/18"
            }`}
          >
            <AssetIcon size={22} src={benefit.icon} />
          </span>
          <p>
            <span
              className={`block text-[11px] uppercase tracking-[0.08em] ${
                benefit.active ? "text-[var(--sb-red-bright)]" : "text-white/62"
              }`}
            >
              {benefit.label}
            </span>
            <span className="mt-0.5 block text-[12px] text-white/48">
              {benefit.value}
            </span>
          </p>
        </li>
      ))}
    </ol>
  );
}
