import Image from "next/image";
import Link from "next/link";

import { DesktopNav } from "@/components/layout/DesktopNav";
import { getBrandContent } from "@/lib/data";

export function DesktopHeader() {
  const brand = getBrandContent();

  return (
    <header className="sticky top-0 z-30 hidden border-b border-sb-line bg-sb-ink/90 backdrop-blur lg:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          aria-label="Go to Sushi Bliss home"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <Image
            src={brand.assets.floralEmblem.publicUrl}
            alt=""
            width={48}
            height={48}
            loading="eager"
            priority
            className="h-12 w-12 rounded-full object-contain"
          />
          <span className="editorial-title text-[22px] uppercase leading-[0.9] tracking-[0.28em] text-white">
            Sushi
            <br />
            Bliss
          </span>
        </Link>
        <DesktopNav />
      </div>
    </header>
  );
}
