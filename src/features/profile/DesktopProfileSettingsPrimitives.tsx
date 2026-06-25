import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

export function SettingsCard({
  children,
  icon,
  id,
  title,
}: {
  children: ReactNode;
  icon: string;
  id?: string;
  title: string;
}) {
  return (
    <article
      className="scroll-mt-6 rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.058),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_18px_42px_rgba(0,0,0,0.22)]"
      id={id}
    >
      <CardTitle icon={icon} title={title} />
      <div className="mt-3">{children}</div>
    </article>
  );
}

export function CardTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
      <AssetIcon size={22} src={icon} />
      {title}
    </h2>
  );
}

export function SettingLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <p>
      <span className="block text-[11px] uppercase tracking-[0.08em] text-white/46">
        {label}
      </span>
      <span className="mt-1 block text-white">{value}</span>
    </p>
  );
}

export function SwitchPill({ checked }: { checked: boolean }) {
  return (
    <span
      className={classNames(
        "relative h-[25px] w-[48px] rounded-full transition",
        checked ? "bg-[var(--sb-red)]" : "bg-white/18",
      )}
    >
      <span
        className={classNames(
          "absolute top-[3px] h-[19px] w-[19px] rounded-full bg-white transition",
          checked ? "left-[25px]" : "left-[4px]",
        )}
      />
    </span>
  );
}
