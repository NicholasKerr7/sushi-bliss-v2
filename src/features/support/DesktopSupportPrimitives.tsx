"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";

export function DesktopSupportInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <input
        className="h-11 w-full rounded-[8px] border border-white/10 bg-black/28 px-4 text-[14px] text-white outline-none placeholder:text-white/36"
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        value={value}
      />
    </label>
  );
}

export function DesktopSupportCardTitle({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
      <AssetIcon size={28} src={icon} />
      {title}
    </h2>
  );
}
