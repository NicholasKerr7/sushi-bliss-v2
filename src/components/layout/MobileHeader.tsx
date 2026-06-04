import Image from "next/image";

import { getBrandContent } from "@/lib/data";

export function MobileHeader() {
  const brand = getBrandContent();

  return (
    <header className="sticky top-0 z-30 border-b border-sb-line bg-sb-ink/92 backdrop-blur md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <a
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="#home"
          aria-label="Go to Sushi Bliss home"
        >
          <Image
            src={brand.icon.publicUrl}
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="text-sm font-semibold uppercase text-sb-rice">
            {brand.name}
          </span>
        </a>
        <a
          className="rounded-control border border-sb-gold/50 px-3 py-1.5 text-xs font-semibold text-sb-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="#menu-preview"
        >
          Order
        </a>
      </div>
    </header>
  );
}
