"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/visualHomeData";
import type { Chef } from "@/types/chef";

import { MobileChefsCommandCenter } from "./MobileChefsCommandCenter";
import { MobileChefsPanel } from "./MobileChefsPrimitives";

interface MobileChefsListViewProps {
  chefs: Chef[];
  onSelectChef: (chef: Chef) => void;
}

/** Mobile-first chef roster inspired by the master-chefs reference screens. */
export function MobileChefsListView({
  chefs,
  onSelectChef,
}: MobileChefsListViewProps) {
  return (
    <>
      <section className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Master chefs
        </p>
        <h1 className="editorial-title mt-3 text-[37px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
          Chef
          <span className="block text-[var(--sb-red-bright)]">Team</span>
        </h1>
        <p className="mt-4 text-[16px] leading-6 text-white/62">
          Counter-led hospitality across nigiri, sashimi, omakase courses, and
          plated dessert service.
        </p>
      </section>

      <MobileChefsPanel className="mt-6 overflow-hidden">
        <div className="relative min-h-[322px] p-5">
          <Image
            alt="Sushi Bliss master chef team"
            className="absolute inset-0 object-cover opacity-78"
            fill
            loading="eager"
            priority
            sizes="430px"
            src="/assets/chefs/sushi-bliss-master-chef-team.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.82)_100%)]" />
          <div className="relative z-10 flex min-h-[282px] flex-col justify-end">
            <StatusBadge tone="premium">Chef counter</StatusBadge>
            <h2 className="editorial-title mt-4 text-[29px] uppercase leading-none text-white min-[390px]:text-[32px]">
              Four masters, one service
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                className="red-glow-button grid min-h-[52px] place-items-center rounded-[13px] border text-[12px]"
                href="/reservations"
              >
                Reserve
              </Link>
              <Link
                className="grid min-h-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/30 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="/omakase"
              >
                Omakase
              </Link>
            </div>
          </div>
        </div>
      </MobileChefsPanel>

      <MobileChefsCommandCenter chefs={chefs} onSelectChef={onSelectChef} />

      <div className="mt-5 grid gap-3">
        {chefs.map((chef) => (
          <MobileChefCard
            chef={chef}
            key={chef.id}
            onSelectChef={onSelectChef}
          />
        ))}
      </div>
    </>
  );
}

function MobileChefCard({
  chef,
  onSelectChef,
}: {
  chef: Chef;
  onSelectChef: (chef: Chef) => void;
}) {
  return (
    <article className="grid grid-cols-[116px_minmax(0,1fr)] gap-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <button
        aria-label={`View ${chef.name} profile`}
        className="relative min-h-[158px] overflow-hidden rounded-[14px] border border-white/10 bg-black/34 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        onClick={() => onSelectChef(chef)}
        type="button"
      >
        <Image
          alt={chef.standingImage.alt || chef.name}
          className="object-cover"
          fill
          sizes="116px"
          src={chef.standingImage.publicUrl}
        />
      </button>
      <div className="min-w-0 py-1">
        <StatusBadge tone="premium">{chef.position}</StatusBadge>
        <h2 className="editorial-title mt-3 break-words text-[20px] leading-[22px] text-white min-[390px]:text-[23px] min-[390px]:leading-6">
          {chef.name}
        </h2>
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/56">
          {chef.specialty}
        </p>
        <div className="mt-4 grid grid-cols-[1fr_46px] gap-2">
          <button
            className="min-h-[42px] rounded-[12px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => onSelectChef(chef)}
            type="button"
          >
            Profile
          </button>
          <Link
            aria-label={`View omakase for ${chef.name}`}
            className="grid min-h-[42px] place-items-center rounded-[12px] border border-[var(--sb-border)] bg-black/28"
            href="/omakase"
          >
            <AssetIcon size={24} src={icons.crown} />
          </Link>
        </div>
      </div>
    </article>
  );
}
