import Image from "next/image";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";

import type { TabletCategoryContent } from "./TabletMenuCategoryData";

export function TabletMenuCategoryHero({
  content,
}: {
  content: TabletCategoryContent;
}) {
  return (
    <section className="relative mt-[18px] min-h-[280px] overflow-hidden rounded-[14px] border border-white/16 min-[1080px]:min-h-[342px]">
      <Image
        alt={`${content.title} presentation`}
        className={classNames("object-cover", content.heroPosition)}
        fetchPriority="high"
        fill
        loading="eager"
        sizes="1034px"
        src={content.heroImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_43%,rgba(0,0,0,0.16)_100%)]" />
      <div className="relative z-10 flex min-h-[280px] flex-col justify-center px-[64px] min-[1080px]:min-h-[342px] min-[1080px]:px-[86px]">
        <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold)] min-[1080px]:text-[18px]">
          Menu <ChevronIcon direction="right" size={18} /> {content.title}
        </p>
        <h1 className="editorial-title mt-4 text-[64px] uppercase leading-[0.9] tracking-[0.18em] text-white min-[1080px]:mt-5 min-[1080px]:text-[86px]">
          {content.title}
        </h1>
        <p className="mt-4 max-w-[420px] text-[18px] leading-7 text-[var(--sb-gold)] min-[1080px]:mt-5 min-[1080px]:text-[20px] min-[1080px]:leading-8">
          {content.description}
        </p>
      </div>
    </section>
  );
}
