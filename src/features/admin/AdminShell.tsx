import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { adminNavigation } from "@/data/admin";
import { classNames } from "@/lib/classNames";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-[#050607] text-sb-rice">
      <header className="sticky top-0 z-30 border-b border-[var(--sb-border)] bg-[#050607]/96 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[minmax(230px,0.62fr)_minmax(0,1.38fr)] lg:items-center lg:px-8">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <Link
              className="flex min-w-0 items-center gap-3 rounded-[14px] text-white transition hover:text-sb-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
              href="/"
            >
              <AssetIcon
                alt="Sushi Bliss"
                className="rounded-full drop-shadow-[0_0_16px_rgba(215,168,79,0.28)]"
                loading="eager"
                size={48}
                src="/assets/icons/floral-emblem-icon.png"
              />
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold leading-tight text-sb-rice">
                  Sushi Bliss
                </span>
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-sb-gold-soft/78">
                  Admin foundation
                </span>
              </span>
            </Link>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[var(--sb-gold)]/24 bg-black/34 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-gold-soft sm:flex lg:hidden xl:flex">
              <span className="h-2 w-2 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_12px_rgba(239,47,37,0.75)]" />
              Mock data
            </div>
          </div>

          <nav
            aria-label="Admin navigation"
            className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black/34 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,47,37,0.8),transparent)] shadow-[0_0_18px_rgba(239,47,37,0.7)]"
            />
            <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {adminNavigation.map((item) => (
                <li className="min-w-0" key={item.id}>
                  <a
                    aria-current={item.id === "overview" ? "page" : undefined}
                    className={classNames(
                      "relative grid h-11 min-w-0 grid-cols-[24px_minmax(0,1fr)] items-center gap-2 rounded-[14px] border px-3 text-[12px] font-semibold uppercase tracking-[0.04em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                      item.id === "overview"
                        ? "red-glow-button border-[#ef3326]/70 text-[#e2dcda]"
                        : "border-white/10 bg-white/[0.035] text-sb-muted hover:border-[var(--sb-gold)]/38 hover:bg-white/[0.065] hover:text-sb-rice",
                    )}
                    href={item.href}
                  >
                    <AssetIcon loading="eager" size={22} src={item.iconUrl} />
                    <span className="truncate">{item.label}</span>
                    {item.id === "overview" ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-5 bottom-1 h-px rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_12px_rgba(239,47,37,0.95)]"
                      />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
