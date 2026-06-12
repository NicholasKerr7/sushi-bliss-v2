"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import type { Chef } from "@/types/chef";

import { MobileChefIcon, MobileChefsPanel } from "./MobileChefsPrimitives";

interface MobileChefsCommandCenterProps {
  chefs: Chef[];
  onSelectChef: (chef: Chef) => void;
}

/** Provides compact chef roster shortcuts without duplicating chef detail state. */
export function MobileChefsCommandCenter({
  chefs,
  onSelectChef,
}: MobileChefsCommandCenterProps) {
  const featuredChef = chefs[0];

  return (
    <MobileChefsPanel className="mt-4 overflow-hidden p-4">
      <div className="grid grid-cols-[58px_1fr] gap-4">
        <span className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[var(--sb-gold)]/44 bg-black/34">
          <AssetIcon size={31} src={icons.crown} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/48">
            Chef Command
          </p>
          <h2 className="editorial-title mt-2 text-[24px] leading-[1.02] text-white">
            Counter team
          </h2>
          <p className="mt-2 text-[14px] leading-5 text-white/58">
            {featuredChef
              ? `${featuredChef.name} anchors tonight's tasting rhythm.`
              : "Meet the chefs behind tonight's tasting rhythm."}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-[14px] border border-white/10 bg-black/30">
        <ChefMetric label="Chefs" value={String(chefs.length)} />
        <ChefMetric label="Service" value="Nigiri" />
        <ChefMetric label="Flow" value="Omakase" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <ChefSignal icon={icons.nigiri} label="Nigiri" />
        <ChefSignal icon={icons.sashimi} label="Sashimi" />
        <ChefSignal icon={icons.crown} label="Omakase" />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_0.78fr_0.78fr] gap-2">
        <button
          className="red-glow-button min-h-[56px] rounded-[13px] border text-[12px]"
          disabled={!featuredChef}
          onClick={() => {
            if (featuredChef) {
              onSelectChef(featuredChef);
            }
          }}
          type="button"
        >
          Meet chef
        </button>
        <Link
          className="grid min-h-[56px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/34 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          href="/reservations"
        >
          Reserve
        </Link>
        <Link
          className="grid min-h-[56px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/34 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          href="/omakase"
        >
          Omakase
        </Link>
      </div>
    </MobileChefsPanel>
  );
}

function ChefMetric({ label, value }: { label: string; value: string }) {
  return (
    <p className="min-w-0 px-2 py-3 text-center">
      <span className="block truncate font-mono text-[15px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/44">
        {label}
      </span>
    </p>
  );
}

function ChefSignal({ icon, label }: { icon?: string; label: string }) {
  return (
    <div className="rounded-[15px] border border-white/10 bg-black/28 p-3 text-center">
      <MobileChefIcon className="mx-auto h-11 w-11" icon={icon} size={23} />
      <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-white/46">
        {label}
      </p>
    </div>
  );
}
