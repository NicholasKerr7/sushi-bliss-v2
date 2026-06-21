import type {
  AdminDomainActionContext,
  DomainActionPanelContent,
} from "./adminDomainActions";
import type { WorkspaceRow } from "./adminOperationsData";

function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function countRowsByStatus(rows: WorkspaceRow[], status: string) {
  return rows.filter((row) => row.status === status).length;
}

function findHighestValueRow(rows: WorkspaceRow[]) {
  return (
    [...rows].sort(
      (first, second) => parseMoney(second.value) - parseMoney(first.value),
    )[0] ?? rows[0]
  );
}

export function buildOfferContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const {
    onMarkReviewed,
    onOpenForms,
    onPatchRecord,
    onPinRecord,
    onSelectRecord,
    rows,
  } = context;
  const scheduledOffer = rows.find((row) => row.status === "Scheduled");
  const expiredOffer = rows.find((row) => row.status === "Expired");

  return {
    accent: "Campaign actions",
    actions: [
      {
        detail: scheduledOffer
          ? `Moves ${scheduledOffer.label} into the active campaign queue.`
          : "No scheduled campaign is waiting to launch.",
        disabled: !scheduledOffer,
        iconUrl: "/assets/icons/golden-ticket-icon.png",
        id: "offers-launch-scheduled",
        label: "Launch scheduled offer",
        metric: scheduledOffer?.value ?? "Clear",
        run: () => {
          if (!scheduledOffer) {
            return;
          }

          onSelectRecord(scheduledOffer.id);
          onMarkReviewed(scheduledOffer.id);
          onPatchRecord(scheduledOffer.id, {
            detail: "Campaign launched for the upcoming service window.",
            status: "Active",
          });
        },
      },
      {
        detail: expiredOffer
          ? `Pins ${expiredOffer.label} for cleanup before reporting.`
          : "No expired campaign needs cleanup.",
        disabled: !expiredOffer,
        iconUrl: "/assets/icons/gold-alert-icon.png",
        id: "offers-clean-expired",
        label: "Clean expired offer",
        metric: expiredOffer?.status ?? "Clear",
        run: () => {
          if (!expiredOffer) {
            return;
          }

          onSelectRecord(expiredOffer.id);
          onPinRecord(expiredOffer.id);
          onPatchRecord(expiredOffer.id, {
            detail: "Expired offer pinned for weekly campaign cleanup.",
            status: "Inactive",
          });
        },
      },
      {
        detail: "Opens the offer form for campaign copy and validity changes.",
        iconUrl: "/assets/icons/user-settings-icon.png",
        id: "offers-open-form",
        label: "Open offer form",
        metric: "Form",
        run: () => onOpenForms("offers"),
      },
    ],
    insight:
      "Launch scheduled campaigns and clean expired offers before they distort weekly reporting.",
    stats: [
      {
        label: "Active",
        tone: "success",
        value: String(countRowsByStatus(rows, "Active")),
      },
      {
        label: "Scheduled",
        tone: "gold",
        value: String(countRowsByStatus(rows, "Scheduled")),
      },
      {
        label: "Expired",
        tone: "danger",
        value: String(countRowsByStatus(rows, "Expired")),
      },
    ],
    title: "Offer control",
  };
}

export function buildLocationContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const {
    onMarkReviewed,
    onOpenOperations,
    onPatchRecord,
    onPinRecord,
    onSelectRecord,
    rows,
  } = context;
  const maintenanceBranch = rows.find((row) => row.status === "Maintenance");
  const handoffBranch = maintenanceBranch ?? context.selectedRecord ?? rows[0];
  const busiestBranch = findHighestValueRow(rows);

  return {
    accent: "Branch actions",
    actions: [
      {
        detail: maintenanceBranch
          ? `Pins ${maintenanceBranch.label} until the manager handoff is complete.`
          : handoffBranch
            ? `Pins ${handoffBranch.label} for the next manager handoff.`
            : "No branch is available for manager handoff.",
        disabled: !handoffBranch,
        iconUrl: "/assets/icons/gold-alert-icon.png",
        id: "locations-escalate-maintenance",
        label: maintenanceBranch
          ? "Escalate maintenance branch"
          : "Pin manager handoff",
        metric: maintenanceBranch?.status ?? handoffBranch?.meta ?? "Clear",
        run: () => {
          if (!handoffBranch) {
            return;
          }

          onSelectRecord(handoffBranch.id);
          onPinRecord(handoffBranch.id);
          onPatchRecord(handoffBranch.id, {
            detail: maintenanceBranch
              ? "Manager handoff requested before this branch returns to full service."
              : "Manager handoff pinned for today's service window.",
          });
        },
      },
      {
        detail: busiestBranch
          ? `Marks ${busiestBranch.label} reviewed for today's service load.`
          : "No branch volume is available.",
        disabled: !busiestBranch,
        iconUrl: "/assets/icons/map-pin-icon.png",
        id: "locations-review-busiest",
        label: "Review busiest branch",
        metric: busiestBranch?.value ?? "None",
        run: () => {
          if (!busiestBranch) {
            return;
          }

          onSelectRecord(busiestBranch.id);
          onMarkReviewed(busiestBranch.id);
          onPatchRecord(busiestBranch.id, {
            detail: "Service load reviewed for the current branch window.",
          });
        },
      },
      {
        detail:
          "Opens the live location workspace for route and branch review.",
        iconUrl: "/assets/icons/takeaway-bag-icon.png",
        id: "locations-open-live",
        label: "Open branch workspace",
        metric: "Live",
        run: () => onOpenOperations("locations"),
      },
    ],
    insight:
      "Escalate maintenance and review the busiest branch before route planning tightens.",
    stats: [
      {
        label: "Active",
        tone: "success",
        value: String(countRowsByStatus(rows, "Active")),
      },
      {
        label: "Busiest",
        tone: "gold",
        value: busiestBranch?.value ?? "0",
      },
      {
        label: "Risk",
        tone: "danger",
        value: String(countRowsByStatus(rows, "Maintenance")),
      },
    ],
    title: "Location control",
  };
}

export function buildCustomerContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const {
    onMarkReviewed,
    onOpenOperations,
    onPatchRecord,
    onPinRecord,
    onSelectRecord,
    rows,
  } = context;
  const vipGuest = findHighestValueRow(rows);
  const pendingGuest = rows.find((row) => row.status === "Pending");

  return {
    accent: "Guest actions",
    actions: [
      {
        detail: vipGuest
          ? `Pins ${vipGuest.label} for hospitality follow-up.`
          : "No guest value record is available.",
        disabled: !vipGuest,
        iconUrl: "/assets/icons/lotus-crown-icon.png",
        id: "customers-pin-vip",
        label: "Pin VIP follow-up",
        metric: vipGuest?.value ?? "None",
        run: () => {
          if (!vipGuest) {
            return;
          }

          onSelectRecord(vipGuest.id);
          onPinRecord(vipGuest.id);
          onPatchRecord(vipGuest.id, {
            detail: "Hospitality follow-up queued for the top guest segment.",
          });
        },
      },
      {
        detail: pendingGuest
          ? `Marks ${pendingGuest.label} referral onboarding reviewed.`
          : "No pending guest needs onboarding review.",
        disabled: !pendingGuest,
        iconUrl: "/assets/icons/group-icon.png",
        id: "customers-review-referral",
        label: "Review referral guest",
        metric: pendingGuest?.meta ?? "Clear",
        run: () => {
          if (!pendingGuest) {
            return;
          }

          onSelectRecord(pendingGuest.id);
          onMarkReviewed(pendingGuest.id);
          onPatchRecord(pendingGuest.id, {
            detail: "Referral onboarding reviewed for the loyalty team.",
            status: "Active",
          });
        },
      },
      {
        detail: "Opens the live customer workspace for deeper loyalty review.",
        iconUrl: "/assets/icons/user-icon.png",
        id: "customers-open-live",
        label: "Open customer workspace",
        metric: "Live",
        run: () => onOpenOperations("customers"),
      },
    ],
    insight:
      "Keep top-spend members and new referral guests close to the loyalty team.",
    stats: [
      {
        label: "Active",
        tone: "success",
        value: String(countRowsByStatus(rows, "Active")),
      },
      {
        label: "VIP",
        tone: "gold",
        value: vipGuest?.value ?? "$0",
      },
      {
        label: "Pending",
        tone: "danger",
        value: String(countRowsByStatus(rows, "Pending")),
      },
    ],
    title: "Customer control",
  };
}

export function buildAnalyticsContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const {
    onMarkReviewed,
    onOpenOperations,
    onPatchRecord,
    onPinRecord,
    onSelectRecord,
    rows,
  } = context;
  const revenueMetric =
    rows.find((row) => row.label.toLowerCase().includes("order value")) ??
    rows[0];
  const reviewMetric =
    rows.find((row) => row.label.toLowerCase().includes("satisfaction")) ??
    rows.find((row) => row.status !== "Active") ??
    rows[0];

  return {
    accent: "Performance actions",
    actions: [
      {
        detail: revenueMetric
          ? `Pins ${revenueMetric.label} for the weekly performance note.`
          : "No revenue metric is available.",
        disabled: !revenueMetric,
        iconUrl: "/assets/icons/qr-code-icon.png",
        id: "analytics-pin-revenue",
        label: "Pin revenue metric",
        metric: revenueMetric?.value ?? "None",
        run: () => {
          if (!revenueMetric) {
            return;
          }

          onSelectRecord(revenueMetric.id);
          onPinRecord(revenueMetric.id);
          onPatchRecord(revenueMetric.id, {
            detail: "Pinned for the weekly revenue performance note.",
          });
        },
      },
      {
        detail: reviewMetric
          ? `Marks ${reviewMetric.label} ready for guest experience review.`
          : "No experience metric is available.",
        disabled: !reviewMetric,
        iconUrl: "/assets/icons/star-icon.png",
        id: "analytics-review-experience",
        label: "Review guest metric",
        metric: reviewMetric?.value ?? "None",
        run: () => {
          if (!reviewMetric) {
            return;
          }

          onSelectRecord(reviewMetric.id);
          onMarkReviewed(reviewMetric.id);
          onPatchRecord(reviewMetric.id, {
            detail: "Guest experience metric reviewed for weekly reporting.",
            status: "Active",
          });
        },
      },
      {
        detail: "Opens the analytics workspace for full metric context.",
        iconUrl: "/assets/icons/gold-alert-icon.png",
        id: "analytics-open-live",
        label: "Open analytics workspace",
        metric: "Live",
        run: () => onOpenOperations("analytics"),
      },
    ],
    insight:
      "Route revenue and guest-experience signals into weekly reporting without leaving Manage.",
    stats: [
      {
        label: "Tracked",
        tone: "success",
        value: String(countRowsByStatus(rows, "Active")),
      },
      {
        label: "Revenue",
        tone: "gold",
        value: revenueMetric?.value ?? "$0",
      },
      {
        label: "Watch",
        tone: "danger",
        value: String(rows.filter((row) => row.status !== "Active").length),
      },
    ],
    title: "Analytics control",
  };
}
