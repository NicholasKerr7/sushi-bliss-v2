"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { adminNavigation, adminSystemNavigation } from "@/data/admin";
import { classNames } from "@/lib/classNames";

import { workspaceSections } from "./adminOperationsData";

interface AdminShellProps {
  children: ReactNode;
}

function AdminBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={classNames(
        "group flex min-w-0 items-center gap-3 rounded-[18px] text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold",
        compact ? "justify-center" : "justify-center xl:justify-start",
      )}
      href="/"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)] bg-black/52 shadow-[0_0_26px_rgba(215,168,79,0.18)]">
        <AssetIcon
          alt="Sushi Bliss"
          loading="eager"
          size={32}
          src="/assets/brand/sushi-bliss-floral-emblem-icon.png"
        />
      </span>
      {compact ? null : (
        <span className="hidden min-w-0 xl:block">
          <span className="editorial-title block truncate text-[16px] leading-none tracking-[0.28em] text-white">
            Sushi
          </span>
          <span className="editorial-title mt-1 block truncate text-[16px] leading-none tracking-[0.28em] text-[var(--sb-red-bright)]">
            Bliss
          </span>
          <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sb-gold-soft)]">
            Admin
          </span>
        </span>
      )}
    </Link>
  );
}

function AdminNavLink({
  activeId,
  compact = false,
  item,
}: {
  activeId: string;
  compact?: boolean;
  item: (typeof adminNavigation)[number];
}) {
  const isActive = item.id === activeId;

  return (
    <a
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        "group relative flex min-h-12 min-w-0 items-center rounded-[12px] border text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
        compact
          ? "justify-center px-2"
          : "justify-center px-2 xl:justify-start xl:gap-3 xl:px-3 2xl:px-4",
        isActive
          ? "border-[var(--sb-red-bright)]/42 bg-[linear-gradient(90deg,rgba(239,47,37,0.28),rgba(239,47,37,0.08),transparent)] text-white shadow-[inset_4px_0_0_var(--sb-red-bright),0_0_34px_rgba(239,47,37,0.18)]"
          : "border-transparent text-white/72 hover:border-[var(--sb-gold)]/24 hover:bg-white/[0.045] hover:text-[var(--sb-gold-soft)]",
      )}
      href={item.href}
    >
      <span
        className={classNames(
          "grid h-9 w-9 shrink-0 place-items-center rounded-[10px]",
          isActive
            ? "text-[var(--sb-red-bright)]"
            : "text-[var(--sb-gold-soft)]",
        )}
      >
        <AssetIcon
          className={isActive ? "brightness-125" : "opacity-88"}
          loading="eager"
          size={22}
          src={item.iconUrl}
        />
      </span>
      {compact ? null : (
        <>
          <span className="hidden min-w-0 flex-1 truncate xl:block">
            {item.label}
          </span>
          {item.badge ? (
            <span className="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red-bright)] px-1.5 text-[11px] font-bold leading-none text-white xl:static">
              {item.badge}
            </span>
          ) : null}
        </>
      )}
    </a>
  );
}

export function AdminShell({ children }: AdminShellProps) {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const syncActiveId = () => {
      const hash = window.location.hash;
      const allItems = [...adminNavigation, ...adminSystemNavigation];
      const match = allItems.find((item) => item.href === hash);

      if (match) {
        setActiveId(match.id);
        return;
      }

      if (hash === "#top-menu-admin") {
        setActiveId("menu");
        return;
      }

      if (hash === "#customer-chart-admin") {
        setActiveId("customers");
        return;
      }

      const workspaceMatch = workspaceSections.find(
        (section) => section.hash === hash,
      );

      if (workspaceMatch) {
        setActiveId(workspaceMatch.id);
        return;
      }

      setActiveId("overview");
    };

    syncActiveId();
    window.addEventListener("hashchange", syncActiveId);
    window.addEventListener("popstate", syncActiveId);

    return () => {
      window.removeEventListener("hashchange", syncActiveId);
      window.removeEventListener("popstate", syncActiveId);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-[#040607] text-sb-rice">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#040607]/96 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden">
        <div className="grid h-[74px] grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3 px-4">
          <a
            aria-label="Jump to admin navigation"
            className="grid h-11 w-11 place-items-center rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/32 text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href="#admin-mobile-nav"
          >
            <span className="grid gap-1">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </a>
          <Link
            className="flex min-w-0 items-center justify-center gap-3 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href="/"
          >
            <AssetIcon
              alt="Sushi Bliss"
              className="rounded-full"
              loading="eager"
              size={38}
              src="/assets/brand/sushi-bliss-floral-emblem-icon.png"
            />
            <span className="editorial-title truncate text-[17px] uppercase tracking-[0.24em]">
              Sushi <span className="text-[var(--sb-red-bright)]">Bliss</span>
            </span>
          </Link>
          <Link
            aria-label="Open notifications"
            className="relative grid h-11 w-11 place-items-center rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/32 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href="/notifications"
          >
            <AssetIcon
              loading="eager"
              size={23}
              src="/assets/icons/notification-bell-icon.png"
            />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red-bright)] px-1 text-[11px] font-bold text-white">
              3
            </span>
          </Link>
        </div>
        <nav
          aria-label="Admin quick navigation"
          className="smooth-scroll-area flex gap-2 overflow-x-auto px-4 pb-3"
          id="admin-mobile-nav"
        >
          {adminNavigation.slice(0, 5).map((item) => (
            <a
              className={classNames(
                "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-[12px] text-white/76 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                item.id === activeId
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-white"
                  : "border-white/10 bg-black/34",
              )}
              href={item.href}
              key={item.id}
            >
              <AssetIcon loading="eager" size={18} src={item.iconUrl} />
              <span className="whitespace-nowrap">{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[92px] flex-col border-r border-[var(--sb-border)] bg-[linear-gradient(180deg,#050708_0%,#070909_46%,#030404_100%)] px-3 py-5 shadow-[26px_0_80px_rgba(0,0,0,0.46)] md:flex xl:w-[252px] xl:px-6 xl:py-7 2xl:w-[286px] 2xl:px-7">
        <div className="pb-8">
          <AdminBrand />
        </div>

        <nav aria-label="Admin sidebar navigation" className="min-h-0 flex-1">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)] xl:text-left xl:text-[11px]">
            Main
          </p>
          <ul className="grid gap-2">
            {adminNavigation.map((item) => (
              <li key={item.id}>
                <AdminNavLink activeId={activeId} item={item} />
              </li>
            ))}
          </ul>

          <div className="mt-9 hidden 2xl:block">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              System
            </p>
            <ul className="grid gap-2">
              {adminSystemNavigation.map((item) => (
                <li key={item.id}>
                  <AdminNavLink activeId={activeId} item={item} />
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-8 grid gap-4">
          <div className="hidden rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-4 2xl:block">
            <div className="flex items-start gap-3">
              <AssetIcon
                loading="lazy"
                size={26}
                src="/assets/icons/headset-icon.png"
              />
              <div>
                <p className="text-sm text-white">Need Help?</p>
                <p className="mt-1 text-[12px] leading-5 text-white/58">
                  Contact support for assistance.
                </p>
              </div>
            </div>
            <Link
              className="red-glow-button mt-4 grid h-10 place-items-center rounded-[10px] border text-[11px] uppercase tracking-[0.06em]"
              href="/support"
            >
              Contact Support
            </Link>
          </div>

          <Link
            className="flex min-h-12 items-center justify-center gap-3 border-t border-white/10 pt-5 text-sm text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold xl:justify-start"
            href="/"
          >
            <ChevronIcon direction="left" size={20} />
            <span className="hidden xl:inline">Back to website</span>
          </Link>
        </div>
      </aside>

      <main className="min-h-dvh md:pl-[92px] xl:pl-[252px] 2xl:pl-[286px]">
        {children}
      </main>
    </div>
  );
}
