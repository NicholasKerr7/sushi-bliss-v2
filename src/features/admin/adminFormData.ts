export type AdminFormFieldType = "select" | "textarea" | "text";
export type AdminFormId =
  | "locations"
  | "menu"
  | "offers"
  | "settings"
  | "users";

export interface AdminFormField {
  helper?: string;
  id: string;
  label: string;
  options?: readonly string[];
  type: AdminFormFieldType;
}

export interface AdminFormConfig {
  accent: string;
  description: string;
  fields: readonly AdminFormField[];
  iconUrl: string;
  id: AdminFormId;
  initialValues: Record<string, string>;
  title: string;
}

export const adminFormConfigs: readonly AdminFormConfig[] = [
  {
    accent: "Catalog",
    description:
      "Tune a menu item before publishing changes to guest-facing surfaces.",
    fields: [
      { id: "name", label: "Item name", type: "text" },
      {
        id: "category",
        label: "Category",
        options: ["Nigiri", "Rolls", "Sashimi", "Specials", "Drinks"],
        type: "select",
      },
      { id: "price", label: "Price", type: "text" },
      {
        id: "status",
        label: "Status",
        options: ["Active", "Seasonal", "Hidden", "Sold out"],
        type: "select",
      },
      { id: "station", label: "Kitchen station", type: "text" },
      {
        helper: "Shown internally for service prep and quality control.",
        id: "note",
        label: "Chef note",
        type: "textarea",
      },
    ],
    iconUrl: "/assets/icons/sushi-menu-icon.png",
    id: "menu",
    initialValues: {
      category: "Nigiri",
      name: "Otoro Nigiri",
      note: "Keep torching optional and verify rice temperature before service.",
      price: "$12.00",
      station: "Counter A",
      status: "Active",
    },
    title: "Menu Item Form",
  },
  {
    accent: "Promotion",
    description:
      "Prepare offer rules, timing, and redemption copy before a campaign goes live.",
    fields: [
      { id: "name", label: "Offer name", type: "text" },
      {
        id: "discountType",
        label: "Discount type",
        options: ["Percentage", "Fixed", "Experience credit", "Member only"],
        type: "select",
      },
      { id: "discountValue", label: "Discount value", type: "text" },
      { id: "validUntil", label: "Valid until", type: "text" },
      {
        id: "status",
        label: "Status",
        options: ["Draft", "Active", "Scheduled", "Expired"],
        type: "select",
      },
      {
        helper: "Keep eligibility explicit so checkout can validate it later.",
        id: "rules",
        label: "Eligibility rules",
        type: "textarea",
      },
    ],
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "offers",
    initialValues: {
      discountType: "Percentage",
      discountValue: "20%",
      name: "Lunch Special",
      rules: "Valid for pickup orders between 11:00 AM and 2:00 PM.",
      status: "Scheduled",
      validUntil: "May 31, 2026",
    },
    title: "Offer Form",
  },
  {
    accent: "Branch",
    description:
      "Update location ownership and service readiness without touching maps or routing.",
    fields: [
      { id: "branch", label: "Branch name", type: "text" },
      { id: "manager", label: "Manager", type: "text" },
      {
        id: "status",
        label: "Service status",
        options: ["Active", "Maintenance", "Limited service", "Closed"],
        type: "select",
      },
      { id: "cutoff", label: "Order cutoff", type: "text" },
      { id: "phone", label: "Phone", type: "text" },
      {
        helper: "Visible to staff until live location CRUD is connected.",
        id: "note",
        label: "Operational note",
        type: "textarea",
      },
    ],
    iconUrl: "/assets/icons/map-pin-icon.png",
    id: "locations",
    initialValues: {
      branch: "Sushi Bliss Downtown",
      cutoff: "9:30 PM",
      manager: "Hiroshi Tanaka",
      note: "Delivery window is normal. Keep omakase seats capped at 12.",
      phone: "+81 3 0000 2481",
      status: "Active",
    },
    title: "Location Form",
  },
  {
    accent: "Access",
    description:
      "Stage role and permission changes for admin users before auth wiring.",
    fields: [
      { id: "name", label: "Staff name", type: "text" },
      {
        id: "role",
        label: "Role",
        options: ["Super Admin", "Menu Manager", "Hospitality Lead", "Analyst"],
        type: "select",
      },
      {
        id: "access",
        label: "Access level",
        options: ["All access", "Operations", "Read only", "Suspended"],
        type: "select",
      },
      {
        id: "status",
        label: "Status",
        options: ["Active", "Pending", "Suspended"],
        type: "select",
      },
      { id: "reviewer", label: "Reviewer", type: "text" },
      {
        helper: "This remains local until Supabase Auth policies are wired.",
        id: "handoff",
        label: "Access handoff",
        type: "textarea",
      },
    ],
    iconUrl: "/assets/icons/user-icon.png",
    id: "users",
    initialValues: {
      access: "All access",
      handoff: "Review access after backend roles are connected.",
      name: "Hiroshi Tanaka",
      reviewer: "Owner review",
      role: "Super Admin",
      status: "Active",
    },
    title: "User Access Form",
  },
  {
    accent: "System",
    description:
      "Adjust operational toggles that will later map to Supabase and Stripe config.",
    fields: [
      {
        id: "ordering",
        label: "Online ordering",
        options: ["Enabled", "Pickup only", "Paused"],
        type: "select",
      },
      { id: "pickupLead", label: "Pickup lead time", type: "text" },
      {
        id: "drinksPolicy",
        label: "Drinks policy",
        options: ["Restaurant only", "Pickup eligible", "Hidden"],
        type: "select",
      },
      {
        id: "paymentMode",
        label: "Payment mode",
        options: ["Mock Stripe", "Stripe test", "Disabled"],
        type: "select",
      },
      {
        id: "backendMode",
        label: "Backend mode",
        options: ["Local mock", "Supabase ready", "Maintenance"],
        type: "select",
      },
      {
        helper: "Do not add credentials here. Use env vars only.",
        id: "note",
        label: "Release note",
        type: "textarea",
      },
    ],
    iconUrl: "/assets/icons/user-settings-icon.png",
    id: "settings",
    initialValues: {
      backendMode: "Local mock",
      drinksPolicy: "Restaurant only",
      note: "Keep Supabase and Stripe credentials out of client code.",
      ordering: "Enabled",
      paymentMode: "Mock Stripe",
      pickupLead: "15 minutes",
    },
    title: "System Settings Form",
  },
];

export const defaultAdminFormId: AdminFormId = "menu";

export function getAdminFormConfig(id: AdminFormId) {
  return (
    adminFormConfigs.find((config) => config.id === id) ?? adminFormConfigs[0]
  );
}
