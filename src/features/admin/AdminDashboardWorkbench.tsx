"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { AdminDomainConsole } from "./AdminDomainConsole";
import { AdminFormStudio } from "./AdminFormStudio";
import { type AdminFormId } from "./adminFormData";
import { AdminInsightBoard } from "./AdminInsightBoard";
import { AdminOperationsWorkspace } from "./AdminOperationsWorkspace";
import {
  defaultWorkspaceId,
  getWorkspaceSection,
  workspaceSections,
  type AdminWorkspaceId,
} from "./adminOperationsData";

type AdminWorkbenchTabId = "command" | "forms" | "manage" | "operations";

const formIdByWorkspaceId: Partial<Record<AdminWorkspaceId, AdminFormId>> = {
  locations: "locations",
  menu: "menu",
  offers: "offers",
  settings: "settings",
  users: "users",
};

const managedWorkspaceIds: readonly AdminWorkspaceId[] = [
  "analytics",
  "customers",
  "locations",
  "menu",
  "offers",
  "orders",
  "reservations",
];

interface AdminWorkbenchIntent {
  formId?: AdminFormId;
  tabId: AdminWorkbenchTabId;
  workspaceId?: AdminWorkspaceId;
}

function getWorkspaceIdFromSlug(slug: string) {
  return workspaceSections.find((section) => section.id === slug)?.id;
}

function getWorkbenchIntentFromHash(hash: string): AdminWorkbenchIntent | null {
  if (!hash || hash === "#overview") {
    return { tabId: "operations", workspaceId: defaultWorkspaceId };
  }

  const manageMatch = /^#manage-(.+)-admin$/.exec(hash);
  const operationsMatch = /^#operations-(.+)-admin$/.exec(hash);
  const formsMatch = /^#forms-(.+)-admin$/.exec(hash);

  if (manageMatch) {
    const workspaceId = getWorkspaceIdFromSlug(manageMatch[1]);

    if (workspaceId && managedWorkspaceIds.includes(workspaceId)) {
      return { tabId: "manage", workspaceId };
    }
  }

  if (operationsMatch) {
    const workspaceId = getWorkspaceIdFromSlug(operationsMatch[1]);

    if (workspaceId) {
      return { tabId: "operations", workspaceId };
    }
  }

  if (formsMatch) {
    const workspaceId = getWorkspaceIdFromSlug(formsMatch[1]);
    const formId = workspaceId ? formIdByWorkspaceId[workspaceId] : undefined;

    if (workspaceId && formId) {
      return { formId, tabId: "forms", workspaceId };
    }
  }

  const legacyWorkspace = workspaceSections.find(
    (section) => section.hash === hash,
  );

  if (legacyWorkspace) {
    return { tabId: "operations", workspaceId: legacyWorkspace.id };
  }

  return null;
}

const adminWorkbenchTabs: readonly {
  description: string;
  iconUrl: string;
  id: AdminWorkbenchTabId;
  label: string;
  shortLabel: string;
  shortStat: string;
  stat: string;
}[] = [
  {
    description: "Live edits, queue review, and owner handoff in one surface.",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "operations",
    label: "Operations",
    shortLabel: "Ops",
    shortStat: "18 live",
    stat: "18 active",
  },
  {
    description: "Fast cross-section triage for orders, guests, and locations.",
    iconUrl: "/assets/icons/notification-bell-icon.png",
    id: "command",
    label: "Command",
    shortLabel: "Cmd",
    shortStat: "5 open",
    stat: "5 open",
  },
  {
    description: "Publishing controls for menu, offers, settings, and access.",
    iconUrl: "/assets/icons/user-settings-icon.png",
    id: "forms",
    label: "Forms",
    shortLabel: "Forms",
    shortStat: "5 forms",
    stat: "5 domains",
  },
  {
    description: "Compact management shortcuts without leaving the dashboard.",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "manage",
    label: "Manage",
    shortLabel: "Manage",
    shortStat: "6 tools",
    stat: "6 panels",
  },
];

function AdminWorkbenchPanel({
  activeId,
  onOpenForms,
  onOpenOperations,
  onTargetDomainChange,
  targetDomainId,
  targetFormId,
  targetWorkspaceId,
}: {
  activeId: AdminWorkbenchTabId;
  onTargetDomainChange: (domainId: AdminWorkspaceId) => void;
  onOpenForms: (domainId: AdminWorkspaceId) => void;
  onOpenOperations: (domainId: AdminWorkspaceId) => void;
  targetDomainId: AdminWorkspaceId;
  targetFormId: AdminFormId;
  targetWorkspaceId: AdminWorkspaceId;
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
        <AdminFormStudio initialFormId={targetFormId} />
      </div>
    );
  }

  if (activeId === "manage") {
    return (
      <AdminDomainConsole
        initialDomainId={targetDomainId}
        key={targetDomainId}
        onDomainChange={onTargetDomainChange}
        onOpenForms={onOpenForms}
        onOpenOperations={onOpenOperations}
      />
    );
  }

  return (
    <div className="[&>section]:mt-0">
      <AdminOperationsWorkspace initialWorkspaceId={targetWorkspaceId} />
    </div>
  );
}

export function AdminDashboardWorkbench() {
  const [activeId, setActiveId] = useState<AdminWorkbenchTabId>("operations");
  const [targetDomainId, setTargetDomainId] =
    useState<AdminWorkspaceId>("menu");
  const [targetFormId, setTargetFormId] = useState<AdminFormId>("menu");
  const [targetWorkspaceId, setTargetWorkspaceId] =
    useState<AdminWorkspaceId>(defaultWorkspaceId);
  const workbenchPanelRef = useRef<HTMLDivElement>(null);
  const activeTab =
    adminWorkbenchTabs.find((tab) => tab.id === activeId) ??
    adminWorkbenchTabs[0];
  const resetWorkbenchPanelScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      workbenchPanelRef.current?.scrollTo({ top: 0 });
    });
  }, []);

  useEffect(() => {
    const scrollDeckIntoView = () => {
      document.getElementById("admin-control-deck")?.scrollIntoView({
        block: "start",
      });
    };
    const applyHashIntent = () => {
      const intent = getWorkbenchIntentFromHash(window.location.hash);

      if (!intent) {
        return;
      }

      if (intent.workspaceId) {
        setTargetWorkspaceId(intent.workspaceId);

        if (managedWorkspaceIds.includes(intent.workspaceId)) {
          setTargetDomainId(intent.workspaceId);
        }
      }

      if (intent.formId) {
        setTargetFormId(intent.formId);
      }

      setActiveId(intent.tabId);
      resetWorkbenchPanelScroll();

      if (window.location.hash && window.location.hash !== "#overview") {
        window.requestAnimationFrame(scrollDeckIntoView);
      }
    };

    queueMicrotask(applyHashIntent);
    window.addEventListener("hashchange", applyHashIntent);
    window.addEventListener("popstate", applyHashIntent);

    return () => {
      window.removeEventListener("hashchange", applyHashIntent);
      window.removeEventListener("popstate", applyHashIntent);
    };
  }, [resetWorkbenchPanelScroll]);

  const handleWorkbenchTabChange = (tabId: AdminWorkbenchTabId) => {
    setActiveId(tabId);
    resetWorkbenchPanelScroll();
  };

  const handleTargetDomainChange = (domainId: AdminWorkspaceId) => {
    setTargetDomainId(domainId);
    resetWorkbenchPanelScroll();
  };

  const openFormsForDomain = (domainId: AdminWorkspaceId) => {
    const nextFormId = formIdByWorkspaceId[domainId];

    if (!nextFormId) {
      return;
    }

    setTargetDomainId(domainId);
    setTargetFormId(nextFormId);
    setActiveId("forms");
    resetWorkbenchPanelScroll();
  };
  const openOperationsForDomain = (domainId: AdminWorkspaceId) => {
    const nextSection = getWorkspaceSection(domainId);

    setTargetDomainId(domainId);
    setTargetWorkspaceId(domainId);
    window.history.replaceState(null, "", nextSection.hash);
    window.dispatchEvent(new Event("hashchange"));
    setActiveId("operations");
    resetWorkbenchPanelScroll();
  };

  return (
    <section
      aria-labelledby="admin-control-deck-title"
      id="admin-control-deck"
      className="mt-6 overflow-hidden rounded-[26px] border border-[var(--sb-border)] bg-[radial-gradient(circle_at_18%_0%,rgba(239,47,37,0.1),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.012)),rgba(4,7,8,0.96)] shadow-[0_34px_110px_rgba(0,0,0,0.5)] xl:mt-5"
    >
      <div className="grid gap-4 border-b border-white/10 p-4 md:p-5 xl:grid-cols-[minmax(280px,0.5fr)_minmax(0,1fr)] xl:items-end xl:p-4 2xl:p-5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Admin control deck
          </p>
          <h2
            className="editorial-title mt-2 text-[28px] leading-none text-white md:text-[34px] xl:text-[30px] 2xl:text-[34px]"
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
          className="smooth-scroll-area grid grid-cols-2 gap-2 rounded-[18px] border border-white/10 bg-black/24 p-1.5 sm:flex sm:overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible xl:self-end"
        >
          {adminWorkbenchTabs.map((tab) => {
            const active = tab.id === activeId;

            return (
              <button
                aria-label={`${tab.shortLabel.toUpperCase()} ${tab.shortStat} ${tab.label.toUpperCase()} ${tab.stat} Open ${tab.label} workbench`}
                aria-pressed={active}
                className={classNames(
                  "group relative grid min-h-[74px] min-w-0 grid-cols-[30px_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-[14px] border px-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold sm:min-w-[176px] sm:grid-cols-[34px_minmax(0,1fr)] sm:gap-2.5 sm:px-3 md:min-w-0",
                  "xl:min-h-[64px] xl:grid-cols-[32px_minmax(0,1fr)] xl:px-3",
                  active
                    ? "border-[var(--sb-red-bright)]/58 bg-[linear-gradient(135deg,rgba(239,47,37,0.32),rgba(239,47,37,0.08),rgba(215,168,79,0.08))] shadow-[0_0_34px_rgba(239,47,37,0.24)]"
                    : "border-transparent bg-white/[0.025] hover:border-[var(--sb-gold)]/28 hover:bg-white/[0.045]",
                )}
                key={tab.id}
                onClick={() => handleWorkbenchTabChange(tab.id)}
                title={`Open ${tab.label} workbench`}
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
                    size={20}
                    src={tab.iconUrl}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className={classNames(
                      "block truncate text-[12px] font-semibold uppercase tracking-[0.08em]",
                      "max-[389px]:text-[11px] max-[389px]:tracking-[0.04em]",
                      active ? "text-white" : "text-white/68",
                    )}
                  >
                    <span className="hidden xl:inline">
                      {tab.label.toUpperCase()}
                    </span>
                    <span className="xl:hidden">
                      {tab.shortLabel.toUpperCase()}
                    </span>
                  </span>
                  <span
                    className={classNames(
                      "mt-1 block truncate font-mono text-[12px] sm:text-[15px]",
                      active ? "text-[var(--sb-gold-soft)]" : "text-white/58",
                    )}
                  >
                    <span className="hidden xl:inline">{tab.stat}</span>
                    <span className="xl:hidden">{tab.shortStat}</span>
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

      <div
        className="smooth-scroll-area p-3 md:p-4 xl:max-h-[clamp(560px,calc(100dvh-354px),780px)] xl:overflow-y-auto xl:overscroll-contain 2xl:p-5"
        data-testid="admin-workbench-panel"
        ref={workbenchPanelRef}
      >
        <AdminWorkbenchPanel
          activeId={activeId}
          onOpenForms={openFormsForDomain}
          onOpenOperations={openOperationsForDomain}
          onTargetDomainChange={handleTargetDomainChange}
          targetDomainId={targetDomainId}
          targetFormId={targetFormId}
          targetWorkspaceId={targetWorkspaceId}
        />
      </div>
    </section>
  );
}
