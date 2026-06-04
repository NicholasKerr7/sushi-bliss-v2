import Image from "next/image";

import { primaryNavigation } from "@/data/navigation";

export function BottomNavigation() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-sb-line bg-sb-ink/94 backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 px-2 py-2">
        {primaryNavigation.map((item) => (
          <li key={item.id}>
            <a
              className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-card px-1 text-[0.68rem] font-medium text-sb-dim transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href={item.href}
            >
              {item.iconUrl ? (
                <span className="flex h-5 w-5 items-center justify-center">
                  <Image
                    src={item.iconUrl}
                    alt=""
                    width={24}
                    height={24}
                    className="max-h-5 w-auto object-contain"
                  />
                </span>
              ) : null}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
