import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";

import type { TabletSavedExperience } from "./tabletFavoritesContent";

interface TabletSavedExperienceCardProps {
  eagerImage: boolean;
  experience: TabletSavedExperience;
}

/** Displays one saved reservation or premium experience in the tablet layout. */
export function TabletSavedExperienceCard({
  eagerImage,
  experience,
}: TabletSavedExperienceCardProps) {
  return (
    <article className="grid min-h-[156px] grid-cols-[258px_minmax(0,1fr)_222px] overflow-hidden rounded-[9px] border border-[var(--sb-border)] bg-white/[0.035] shadow-[0_18px_45px_rgb(0_0_0_/_0.22)]">
      <div className="relative bg-black/30">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="280px"
          src={experience.image}
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-[22px] leading-tight text-white">
          {experience.title}
        </h3>
        <p className="mt-2 text-[14px] leading-5 text-white/66">
          {experience.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-white/70">
          <ExperienceMeta icon="/assets/icons/calendar-icon.png">
            {experience.date}
          </ExperienceMeta>
          <ExperienceMeta icon="/assets/icons/clock-icon.png">
            {experience.time}
          </ExperienceMeta>
          <ExperienceMeta icon="/assets/icons/group-icon.png">
            {experience.partySize}
          </ExperienceMeta>
        </div>
        <p className="mt-3 text-[13px] text-white/60">{experience.location}</p>
      </div>
      <div className="grid content-center gap-3 p-4">
        <AssetIcon
          className="justify-self-center drop-shadow-[0_0_10px_rgb(239_47_37_/_0.45)]"
          loading={eagerImage ? "eager" : "lazy"}
          size={25}
          src="/assets/icons/heart-icon.png"
        />
        <Button
          className="red-glow-button h-[46px] min-h-0 rounded-[8px] text-[12px] uppercase tracking-[0.06em]"
          href="/reservations"
          size="sm"
        >
          Reserve again
        </Button>
        <Button
          className="h-[46px] min-h-0 rounded-[8px] border-[var(--sb-gold)]/45 text-[12px] uppercase tracking-[0.06em]"
          href={experience.href}
          size="sm"
          variant="secondary"
        >
          View details
        </Button>
      </div>
    </article>
  );
}

function ExperienceMeta({
  children,
  icon,
}: {
  children: string;
  icon: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <AssetIcon size={17} src={icon} />
      {children}
    </span>
  );
}
