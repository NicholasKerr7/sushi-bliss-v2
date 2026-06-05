import Link from "next/link";
import type { ReactNode } from "react";

import { adminNavigation } from "@/data/admin";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-sb-ink text-sb-rice">
      <header className="sticky top-0 z-30 border-b border-sb-line bg-sb-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Link
              className="text-sm font-semibold text-sb-gold-soft transition hover:text-sb-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
              href="/"
            >
              Sushi Bliss
            </Link>
            <p className="mt-1 text-xs font-semibold uppercase text-sb-dim">
              Admin foundation
            </p>
          </div>
          <nav aria-label="Admin navigation">
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end lg:pb-0">
              {adminNavigation.map((item) => (
                <li key={item.id}>
                  <a
                    className="block rounded-control border border-sb-line bg-sb-panel/70 px-3 py-2 text-sm font-semibold text-sb-muted transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
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
      <main>{children}</main>
    </div>
  );
}
