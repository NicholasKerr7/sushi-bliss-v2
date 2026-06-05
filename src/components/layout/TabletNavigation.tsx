import Image from "next/image";

import { primaryNavigation } from "@/data/navigation";
import { getBrandContent } from "@/lib/data";

export function TabletNavigation() {
  const brand = getBrandContent();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 flex-col border-r border-sb-line bg-sb-ink/94 backdrop-blur md:flex lg:hidden">
      <a
        aria-label="Go to Sushi Bliss home"
        className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-card border border-sb-line bg-sb-rice/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        href="#home"
      >
        <Image
          alt=""
          className="h-9 w-9"
          height={36}
          priority
          src={brand.assets.icon.publicUrl}
          width={36}
        />
      </a>
      <nav aria-label="Tablet navigation" className="mt-8 flex-1 px-2">
        <ul className="space-y-2">
          {primaryNavigation.map((item) => (
            <li key={item.id}>
              <a
                aria-disabled={item.disabled}
                className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-card px-1 text-[0.68rem] font-medium text-sb-dim transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href={item.href}
              >
                {item.iconUrl ? (
                  <span className="flex h-6 w-6 items-center justify-center">
                    <Image
                      alt=""
                      className="h-6 w-6 object-contain"
                      height={24}
                      src={item.iconUrl}
                      width={24}
                    />
                  </span>
                ) : null}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className="mx-2 mb-4 rounded-card border border-sb-gold/40 px-2 py-3 text-center text-[0.68rem] font-semibold text-sb-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        href="#menu"
      >
        Order
      </a>
    </aside>
  );
}
