import Image from "next/image";

import { DesktopNav } from "@/components/layout/DesktopNav";
import { getBrandContent } from "@/lib/data";

export function DesktopHeader() {
  const brand = getBrandContent();

  return (
    <header className="sticky top-0 z-30 hidden border-b border-sb-line bg-sb-ink/90 backdrop-blur lg:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="#home"
        >
          <Image
            src={brand.assets.logo.publicUrl}
            alt={brand.assets.logo.alt || brand.name}
            width={152}
            height={44}
            priority
            className="h-10 w-auto"
          />
        </a>
        <DesktopNav />
      </div>
    </header>
  );
}
