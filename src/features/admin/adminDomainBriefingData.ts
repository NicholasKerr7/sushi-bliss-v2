import { type AdminWorkspaceId } from "./adminOperationsData";

export type AdminDomainTone = "danger" | "gold" | "success";

export interface AdminDomainBriefingAction {
  detail: string;
  iconUrl: string;
  id: string;
  label: string;
}

export interface AdminDomainBriefingStat {
  label: string;
  tone: AdminDomainTone;
  value: string;
}

export interface AdminDomainBriefing {
  actions: readonly AdminDomainBriefingAction[];
  accent: string;
  insight: string;
  stats: readonly AdminDomainBriefingStat[];
  title: string;
}

const adminDomainBriefings: Partial<Record<AdminWorkspaceId, AdminDomainBriefing>> = {
  analytics: {
    accent: "Weekly performance",
    actions: [
      {
        detail: "Prepare a revenue note with the strongest drivers.",
        iconUrl: "/assets/icons/gold-alert-icon.png",
        id: "analytics-report",
        label: "Stage weekly report",
      },
      {
        detail: "Tag the top menu items for chef review.",
        iconUrl: "/assets/icons/star-icon.png",
        id: "analytics-menu",
        label: "Stage menu signal",
      },
    ],
    insight:
      "Revenue and order count are both trending upward; protect the evening peak with staffing and prep visibility.",
    stats: [
      { label: "AOV", tone: "gold", value: "$101.32" },
      { label: "Conversion", tone: "success", value: "+12.4%" },
      { label: "Review risk", tone: "danger", value: "1" },
    ],
    title: "Performance board",
  },
  customers: {
    accent: "Guest intelligence",
    actions: [
      {
        detail: "Prepare a retention touchpoint for top-spend members.",
        iconUrl: "/assets/icons/lotus-crown-icon.png",
        id: "customers-vip",
        label: "Stage VIP follow-up",
      },
      {
        detail: "Review new referral guests before the weekend.",
        iconUrl: "/assets/icons/group-icon.png",
        id: "customers-referrals",
        label: "Stage referral review",
      },
    ],
    insight:
      "Gold and Platinum members are driving repeat value; keep loyalty, referrals, and omakase interest close to the service team.",
    stats: [
      { label: "Members", tone: "gold", value: "928" },
      { label: "New guests", tone: "success", value: "342" },
      { label: "Pending", tone: "danger", value: "1" },
    ],
    title: "Guest value board",
  },
  locations: {
    accent: "Branch health",
    actions: [
      {
        detail: "Send the manager summary for today's service window.",
        iconUrl: "/assets/icons/map-pin-icon.png",
        id: "locations-handoff",
        label: "Stage branch handoff",
      },
      {
        detail: "Check route coverage before the delivery peak.",
        iconUrl: "/assets/icons/delivery-scooter-icon.png",
        id: "locations-route",
        label: "Stage route check",
      },
    ],
    insight:
      "Downtown and Midtown are carrying the highest order load. Keep Westside visible for manager handoff and delivery routing.",
    stats: [
      { label: "Active sites", tone: "success", value: "4" },
      { label: "Today orders", tone: "gold", value: "1.2k" },
      { label: "Risks", tone: "danger", value: "0" },
    ],
    title: "Branch service board",
  },
  menu: {
    accent: "Catalog control",
    actions: [
      {
        detail: "Review inactive and premium items before publishing.",
        iconUrl: "/assets/icons/sushi-menu-icon.png",
        id: "menu-audit",
        label: "Stage menu audit",
      },
      {
        detail: "Check pricing consistency across premium categories.",
        iconUrl: "/assets/icons/qr-code-icon.png",
        id: "menu-pricing",
        label: "Stage price check",
      },
    ],
    insight:
      "Premium nigiri and rolls need tight pricing review before service. Keep inactive items visible until the chef lead signs off.",
    stats: [
      { label: "Live items", tone: "success", value: "4" },
      { label: "Premium", tone: "gold", value: "2" },
      { label: "Inactive", tone: "danger", value: "1" },
    ],
    title: "Menu catalog board",
  },
  offers: {
    accent: "Campaign health",
    actions: [
      {
        detail: "Prepare copy and validity checks for scheduled campaigns.",
        iconUrl: "/assets/icons/golden-ticket-icon.png",
        id: "offers-window",
        label: "Stage offer window",
      },
      {
        detail: "Review expired offers before they appear in reports.",
        iconUrl: "/assets/icons/gold-alert-icon.png",
        id: "offers-cleanup",
        label: "Stage cleanup",
      },
    ],
    insight:
      "Active promos are healthy, but the expired pool needs cleanup before weekly analytics and referral reporting.",
    stats: [
      { label: "Active", tone: "success", value: "3" },
      { label: "Scheduled", tone: "gold", value: "2" },
      { label: "Expired", tone: "danger", value: "7" },
    ],
    title: "Offer command board",
  },
  orders: {
    accent: "Service flow",
    actions: [
      {
        detail: "Escalate preparing and delivery rows to kitchen ops.",
        iconUrl: "/assets/icons/chef-hat-icon.png",
        id: "orders-kitchen",
        label: "Stage kitchen note",
      },
      {
        detail: "Review delivery timing before courier dispatch.",
        iconUrl: "/assets/icons/takeaway-bag-icon.png",
        id: "orders-dispatch",
        label: "Stage dispatch check",
      },
    ],
    insight:
      "Most orders are closed, but preparing and delivery rows should stay surfaced until the next handoff is complete.",
    stats: [
      { label: "Completed", tone: "success", value: "3" },
      { label: "Active", tone: "gold", value: "2" },
      { label: "Escalate", tone: "danger", value: "1" },
    ],
    title: "Fulfillment board",
  },
  reservations: {
    accent: "Dining room flow",
    actions: [
      {
        detail: "Confirm VIP and larger parties with the host lead.",
        iconUrl: "/assets/icons/calendar-icon.png",
        id: "reservations-host",
        label: "Stage host review",
      },
      {
        detail: "Check table timing for pending evening arrivals.",
        iconUrl: "/assets/icons/dining-setting-icon.png",
        id: "reservations-seating",
        label: "Stage seating check",
      },
    ],
    insight:
      "The queue is mostly confirmed. Pending parties and VIP seating need host review before the evening room fills.",
    stats: [
      { label: "Confirmed", tone: "success", value: "3" },
      { label: "Upcoming", tone: "gold", value: "5" },
      { label: "Pending", tone: "danger", value: "2" },
    ],
    title: "Reservation floor board",
  },
};

export function getAdminDomainBriefing(
  id: AdminWorkspaceId,
): AdminDomainBriefing {
  return adminDomainBriefings[id] ?? adminDomainBriefings.menu!;
}
