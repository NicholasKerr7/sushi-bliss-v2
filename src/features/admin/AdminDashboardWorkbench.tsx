"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { AdminDomainConsole } from "./AdminDomainConsole";
import { AdminFormStudio } from "./AdminFormStudio";
import { AdminInsightBoard } from "./AdminInsightBoard";
import { AdminOperationsWorkspace } from "./AdminOperationsWorkspace";

type AdminWorkbenchTabId = "command" | "forms" | "manage" | "operations";

const adminWorkbenchTabs: readonly {
  description: string;
  iconUrl: string;
  id: AdminWorkbenchTabId;
  label: string;
  stat: string;
}[] = [
  {
    description: "Live edits, queue review, and owner handoff in one surface.",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "operations",
    label: "Operations",
    stat: "18 active",
  },
  {
    description: "Fast cross-section triage for orders, guests, and locations.",
    iconUrl: "/assets/icons/notification-bell-icon.png",
    id: "command",
    label: "Command",
    stat: "5 open",
  },
  {
    description: "Mock publishing forms for menu, offers, settings, and access.",
    iconUrl: "/assets/icons/user-settings-icon.png",
    id: "forms",
    label: "Forms",
    stat: "5 domains",
  },
  {
    description: "Compact management shortcuts without leaving the dashboard.",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "manage",
    label: "Manage",
    stat: "6 panels",
  },
];

function AdminWorkbenchPanel({
  activeId,
  onOpenForms,
  onOpenOperations,
}: {
  activeId: AdminWorkbenchTabId;
  onOpenForms: () => void;
  onOpenOperations: () => void;
}) {
  if (activeId === "command") {
    return (
      <div className="[&>section]:mt-0">
        <AdminInsightBoard />
      </div>
    );
  }

  if (activeId === "forms") {
    return (
      <div className="[&>section]:mt-0">
        <AdminFormStudio />
      </div>
    );
  }

  if (activeId === "manage") {
    return (
      <AdminDomainConsole
        onOpenForms={onOpenForms}
        onOpenOperations={onOpenOperations}
      />
    );
  }

  return (
    <div className="[&>section]:mt-0">
      <AdminOperationsWorkspace />
    </div>
  );
}

export function AdminDashboardWorkbench() {
  const [activeId, setActiveId] =
    useState<AdminWorkbenchTabId>("operations");
  const activeTab =
    adminWorkbenchTabs.find((tab) => tab.id === activeId) ??
    adminWorkbenchTabs[0];

  return (
    <section
      aria-labelledby="admin-control-deck-title"
      className="mt-6 overflow-hidden rounded-[26px] border border-[var(--sb-border)] bg-[radial-gradient(circle_at_18%_0%,rgba(239,47,37,0.1),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.012)),rgba(4,7,8,0.96)] shadow-[0_34px_110px_rgba(0,0,0,0.5)]"
    >
      <div className="grid gap-4 border-b border-white/10 p-4 md:p-5 2xl:p-6">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Admin control deck
          </p>
          <h2
            className="editorial-title mt-2 text-[28px] leading-none text-white md:text-[34px]"
            id="admin-control-deck-title"
          >
            {activeTab.label} Workbench
          </h2>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/62 md:text-[15px]">
            {activeTab.description}
          </p>
        </div>

        <nav
          aria-label="Admin dashboard workbench"
          className="smooth-scroll-area flex gap-2 overflow-x-auto rounded-[18px] border border-white/10 bg-black/24 p-1.5"
        >
          {adminWorkbenchTabs.map((tab) => {
            const active = tab.id === activeId;

            return (
              <button
                aria-label={`Open ${tab.label} workbench`}
                aria-pressed={active}
                className={classNames(
                  "group relative grid min-h-[74px] min-w-[156px] grid-cols-[34px_minmax(0,1fr)] items-center gap-2.5 overflow-hidden rounded-[14px] border px-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold sm:min-w-[176px]",
                  active
                    ? "border-[var(--sb-red-bright)]/58 bg-[linear-gradient(135deg,rgba(239,47,37,0.32),rgba(239,47,37,0.08),rgba(215,168,79,0.08))] shadow-[0_0_34px_rgba(239,47,37,0.24)]"
                    : "border-transparent bg-white/[0.025] hover:border-[var(--sb-gold)]/28 hover:bg-white/[0.045]",
                )}
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                type="button"
              >
                <span
                  className={classNames(
                    "grid h-9 w-9 place-items-center rounded-full border bg-black/34",
                    active
                      ? "border-[var(--sb-red-bright)]/56 shadow-[0_0_22px_rgba(239,47,37,0.32)]"
                      : "border-[var(--sb-gold)]/26",
                  )}
                >
                  <AssetIcon
                    className={active ? "brightness-125" : "opacity-78"}
                    loading="eager"
                    size={21}
                    src={tab.iconUrl}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className={classNames(
                      "block truncate text-[12px] font-semibold uppercase tracking-[0.08em]",
                      active ? "text-white" : "text-white/68",
                    )}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={classNames(
                      "mt-1 block font-mono text-[15px]",
                      active
                        ? "text-[var(--sb-gold-soft)]"
                        : "text-white/44",
                    )}
                  >
                    {tab.stat}
                  </span>
                </span>
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--sb-red-bright),transparent)] shadow-[0_0_18px_var(--sb-red-glow)]"
                  />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="smooth-scroll-area p-3 md:p-4 xl:max-h-[clamp(540px,calc(100dvh-430px),760px)] xl:overflow-y-auto xl:overscroll-contain 2xl:p-5">
        <AdminWorkbenchPanel
          activeId={activeId}
          onOpenForms={() => setActiveId("forms")}
          onOpenOperations={() => setActiveId("operations")}
        />
      </div>
    </section>
  );
}
