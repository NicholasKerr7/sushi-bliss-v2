"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";

const contactIcons: Record<string, string> = {
  email: "/assets/icons/email-icon.png",
  form: "/assets/icons/headset-icon.png",
  phone: "/assets/icons/phone-icon.png",
};

interface TabletSupportContactTileProps {
  description: string;
  href: string;
  label: string;
  methodId: string;
  value: string;
}

export function TabletSupportContactTile({
  description,
  href,
  label,
  methodId,
  value,
}: TabletSupportContactTileProps) {
  const icon =
    contactIcons[methodId] ||
    (methodId === "location"
      ? "/assets/icons/map-pin-icon.png"
      : "/assets/icons/headset-icon.png");

  return (
    <a
      className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4 text-center transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
      href={href}
    >
      <span className="mx-auto grid h-[58px] w-[58px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/24">
        <AssetIcon size={30} src={icon} />
      </span>
      <span className="mt-3 block text-[15px] font-semibold uppercase tracking-[0.08em] text-white">
        {label}
      </span>
      <span className="mt-2 block text-[14px] font-semibold text-[var(--sb-red-bright)]">
        {value}
      </span>
      <span className="mt-2 line-clamp-2 block text-[12px] leading-5 text-white/48">
        {description}
      </span>
    </a>
  );
}
