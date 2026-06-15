import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { customerExploreSections } from "@/data/explore";
import { classNames } from "@/lib/classNames";

interface DesktopExploreMenuProps {
  activeId?: string;
}

/** Desktop-only route discovery menu for secondary customer destinations. */
export function DesktopExploreMenu({ activeId }: DesktopExploreMenuProps) {
  const activeInMenu = customerExploreSections.some((section) =>
    section.items.some((item) => isExploreItemActive(item.id, activeId)),
  );

  return (
    <details className="group relative">
      <summary
        className={classNames(
          "relative flex h-[76px] cursor-pointer list-none items-center gap-2 text-[12px] font-semibold uppercase text-white transition hover:text-[var(--sb-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold min-[1500px]:text-[13px] [&::-webkit-details-marker]:hidden",
          activeInMenu && "text-[var(--sb-red-bright)]",
        )}
      >
        Explore
        <ChevronIcon
          className="text-[var(--sb-gold)] transition group-open:rotate-180"
          direction="down"
          size={15}
        />
        {activeInMenu ? (
          <span className="absolute inset-x-0 bottom-[14px] h-px bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]" />
        ) : null}
      </summary>

      <div className="absolute left-1/2 top-[76px] z-50 w-[760px] -translate-x-1/2 pt-3">
        <div className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#060708]/98 shadow-[0_28px_90px_rgba(0,0,0,0.66),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
          <div className="grid grid-cols-[230px_minmax(0,1fr)]">
            <div className="border-r border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(239,47,37,0.18),transparent_46%),linear-gradient(180deg,rgba(215,168,79,0.08),transparent)] p-5">
              <AssetIcon
                loading="eager"
                size={44}
                src="/assets/icons/floral-emblem-icon.png"
              />
              <p className="mt-5 text-[12px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                Sushi Bliss
              </p>
              <p className="editorial-title mt-2 text-[29px] uppercase leading-none tracking-[0.08em] text-white">
                Complete
                <br />
                Directory
              </p>
              <p className="mt-4 text-[13px] leading-6 text-white/56">
                Reach every customer screen without crowding the main
                navigation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4">
              {customerExploreSections.map((section) => (
                <div key={section.id}>
                  <p className="px-2 text-[11px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                    {section.label}
                  </p>
                  <div className="mt-2 grid gap-1.5">
                    {section.items.map((item) => {
                      const active = isExploreItemActive(item.id, activeId);

                      return (
                        <Link
                          className={classNames(
                            "grid min-h-[58px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[10px] border px-2.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                            active
                              ? "border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/18 text-white"
                              : "border-transparent bg-white/[0.025] text-white/74 hover:border-[var(--sb-gold)]/30 hover:text-white",
                          )}
                          href={item.href}
                          key={item.id}
                        >
                          <AssetIcon
                            loading="eager"
                            size={25}
                            src={item.iconUrl}
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-semibold">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] text-white/44">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}

function isExploreItemActive(itemId: string, activeId?: string) {
  if (itemId === activeId) {
    return true;
  }

  return (
    itemId === "support" && (activeId === "contact" || activeId === "help")
  );
}
