import Image from "next/image";

import { desktopNavigation } from "@/data/navigation";
import { getBrandContent } from "@/lib/data";

export function DesktopHeader() {
  const brand = getBrandContent();

  return (
    <header className="sticky top-0 z-30 hidden border-b border-sb-line bg-sb-ink/90 backdrop-blur md:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="#home"
        >
          <Image
            src={brand.logo.publicUrl}
            alt={brand.logo.alt || brand.name}
            width={152}
            height={44}
            priority
            className="h-10 w-auto"
          />
        </a>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1">
            {desktopNavigation.map((item) => (
              <li key={item.id}>
                <a
                  className="rounded-control px-4 py-2 text-sm font-medium text-sb-muted transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
