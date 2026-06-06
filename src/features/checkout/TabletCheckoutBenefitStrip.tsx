"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";

const benefitItems = [
  { icon: icons.flower, label: "Premium ingredients", value: "Sourced Daily" },
  {
    icon: icons.crown,
    label: "Expert craftsmanship",
    value: "By Master Chefs",
  },
  {
    icon: icons.chef,
    label: "Authentic experience",
    value: "Traditional. Refined.",
  },
  {
    icon: icons.bag,
    label: "Exclusive reservations",
    value: "Priority for Members",
  },
] as const;

export function TabletCheckoutBenefitStrip() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-y-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-3 lg:grid-cols-4 lg:gap-y-0">
      {benefitItems.map((benefit) => (
        <div
          className="flex items-center gap-3 px-3 lg:border-r lg:border-white/10 lg:last:border-r-0"
          key={benefit.label}
        >
          <AssetIcon size={28} src={benefit.icon} />
          <p>
            <span className="block text-[11px] uppercase tracking-[0.08em] text-white/62">
              {benefit.label}
            </span>
            <span className="mt-0.5 block text-[12px] text-white/48">
              {benefit.value}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
