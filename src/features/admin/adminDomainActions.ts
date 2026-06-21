import { type AdminWorkspaceId, type WorkspaceRow } from "./adminOperationsData";

export type EditableRecordPatch = Partial<
  Pick<WorkspaceRow, "detail" | "meta" | "status" | "value">
>;

export type DomainStatTone = "danger" | "gold" | "success";

export interface AdminDomainActionCallbacks {
  onMarkReviewed: (rowId: string) => void;
  onOpenForms: (domainId: AdminWorkspaceId) => void;
  onOpenOperations: (domainId: AdminWorkspaceId) => void;
  onPatchRecord: (rowId: string, updates: EditableRecordPatch) => void;
  onPinRecord: (rowId: string) => void;
  onSelectRecord: (rowId: string) => void;
}

export interface AdminDomainActionContext extends AdminDomainActionCallbacks {
  activeId: AdminWorkspaceId;
  rows: WorkspaceRow[];
  selectedRecord?: WorkspaceRow;
}

export interface DomainAction {
  detail: string;
  disabled?: boolean;
  iconUrl: string;
  id: string;
  label: string;
  metric: string;
  run: () => void;
}

export interface DomainStat {
  label: string;
  tone: DomainStatTone;
  value: string;
}

export interface DomainActionPanelContent {
  accent: string;
  actions: DomainAction[];
  insight: string;
  stats: DomainStat[];
  title: string;
}

function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function countRowsByStatus(rows: WorkspaceRow[], status: string) {
  return rows.filter((row) => row.status === status).length;
}

function countOpenRows(rows: WorkspaceRow[]) {
  return rows.filter(
    (row) => !["Active", "Completed", "Confirmed"].includes(row.status),
  ).length;
}

function getDefaultPanelCopy(activeId: AdminWorkspaceId) {
  if (activeId === "analytics") {
    return {
      accent: "Performance actions",
      insight:
        "Use the selected metric to route attention back into operations without leaving Manage.",
      title: "Signal routing",
    };
  }

  if (activeId === "customers") {
    return {
      accent: "Guest actions",
      insight:
        "Pin high-value guest signals and open the live workspace for deeper account review.",
      title: "Member routing",
    };
  }

  if (activeId === "locations") {
    return {
      accent: "Branch actions",
      insight:
        "Use the focused branch as the source for form edits or live operational review.",
      title: "Location routing",
    };
  }

  if (activeId === "offers") {
    return {
      accent: "Campaign actions",
      insight:
        "Push campaign records into forms or live operations when the offer needs cleanup.",
      title: "Offer routing",
    };
  }

  return {
    accent: "Domain actions",
    insight:
      "Select, pin, and route the focused record into the right admin surface.",
    title: "Management routing",
  };
}

function buildGenericActions({
  activeId,
  onMarkReviewed,
  onOpenForms,
  onOpenOperations,
  onPinRecord,
  onSelectRecord,
  rows,
  selectedRecord,
}: AdminDomainActionContext): DomainAction[] {
  const openRecord =
    rows.find(
      (row) => !["Active", "Completed", "Confirmed"].includes(row.status),
    ) ?? rows[0];
  const canOpenForm = ["locations", "menu", "offers"].includes(activeId);

  return [
    {
      detail: openRecord
        ? `Moves ${openRecord.label} into focus for review.`
        : "No records are available to select.",
      disabled: !openRecord,
      iconUrl: "/assets/icons/search-icon.png",
      id: `${activeId}-focus-next`,
      label: "Focus next record",
      metric: openRecord?.status ?? "None",
      run: () => {
        if (openRecord) {
          onSelectRecord(openRecord.id);
        }
      },
    },
    {
      detail: selectedRecord
        ? `Pins ${selectedRecord.label} and marks it reviewed.`
        : "Select a record before routing it.",
      disabled: !selectedRecord,
      iconUrl: "/assets/icons/star-icon.png",
      id: `${activeId}-review-pin`,
      label: "Pin reviewed focus",
      metric: selectedRecord?.value ?? "Select",
      run: () => {
        if (!selectedRecord) {
          return;
        }

        onPinRecord(selectedRecord.id);
        onMarkReviewed(selectedRecord.id);
      },
    },
    {
      detail: canOpenForm
        ? "Opens the matching form studio for a structured edit."
        : "Opens the live operations workspace for this domain.",
      iconUrl: canOpenForm
        ? "/assets/icons/user-settings-icon.png"
        : "/assets/icons/takeaway-bag-icon.png",
      id: `${activeId}-route`,
      label: canOpenForm ? "Open domain form" : "Open live workspace",
      metric: canOpenForm ? "Form" : "Live",
      run: () => {
        if (canOpenForm) {
          onOpenForms(activeId);
        } else {
          onOpenOperations(activeId);
        }
      },
    },
  ];
}

function buildMenuContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const { onMarkReviewed, onOpenForms, onPatchRecord, onPinRecord, onSelectRecord, rows } =
    context;
  const inactiveItem = rows.find((row) => row.status === "Inactive");
  const premiumItem =
    rows
      .filter((row) => parseMoney(row.value) >= 18)
      .sort((first, second) => parseMoney(second.value) - parseMoney(first.value))[0] ??
    rows[0];

  return {
    accent: "Catalog actions",
    actions: [
      {
        detail: inactiveItem
          ? `Selects ${inactiveItem.label} and queues chef review.`
          : "No inactive catalog item needs audit.",
        disabled: !inactiveItem,
        iconUrl: "/assets/icons/chef-crest-icon.png",
        id: "menu-audit-inactive",
        label: "Audit inactive item",
        metric: inactiveItem?.status ?? "Clear",
        run: () => {
          if (!inactiveItem) {
            return;
          }

          onSelectRecord(inactiveItem.id);
          onPinRecord(inactiveItem.id);
          onPatchRecord(inactiveItem.id, {
            detail:
              "Chef review queued before this item returns to the live catalog.",
            status: "Pending",
          });
        },
      },
      {
        detail: premiumItem
          ? `Marks ${premiumItem.label} pricing as reviewed.`
          : "No premium price record is available.",
        disabled: !premiumItem,
        iconUrl: "/assets/icons/qr-code-icon.png",
        id: "menu-lock-premium",
        label: "Lock premium pricing",
        metric: premiumItem?.value ?? "None",
        run: () => {
          if (!premiumItem) {
            return;
          }

          onSelectRecord(premiumItem.id);
          onMarkReviewed(premiumItem.id);
          onPatchRecord(premiumItem.id, {
            detail:
              "Premium pricing reviewed and ready for the next service window.",
          });
        },
      },
      {
        detail: "Opens the menu form for structured catalog updates.",
        iconUrl: "/assets/icons/user-settings-icon.png",
        id: "menu-open-form",
        label: "Open menu form",
        metric: "Form",
        run: () => onOpenForms("menu"),
      },
    ],
    insight:
      "Move inactive and premium records into review before changing the live menu.",
    stats: [
      {
        label: "Active",
        tone: "success",
        value: String(countRowsByStatus(rows, "Active")),
      },
      {
        label: "Premium",
        tone: "gold",
        value: String(rows.filter((row) => parseMoney(row.value) >= 18).length),
      },
      {
        label: "Inactive",
        tone: "danger",
        value: String(countRowsByStatus(rows, "Inactive")),
      },
    ],
    title: "Menu control",
  };
}

function buildOrderContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const { onMarkReviewed, onOpenOperations, onPatchRecord, onPinRecord, onSelectRecord, rows } =
    context;
  const preparingOrder = rows.find((row) => row.status === "Preparing");
  const deliveryOrder = rows.find((row) => row.status === "Out for Delivery");

  return {
    accent: "Fulfillment actions",
    actions: [
      {
        detail: preparingOrder
          ? `Pins ${preparingOrder.label} for the kitchen handoff.`
          : "No preparing order needs kitchen priority.",
        disabled: !preparingOrder,
        iconUrl: "/assets/icons/chef-hat-icon.png",
        id: "orders-prioritize-kitchen",
        label: "Prioritize kitchen order",
        metric: preparingOrder?.value ?? "Clear",
        run: () => {
          if (!preparingOrder) {
            return;
          }

          onSelectRecord(preparingOrder.id);
          onPinRecord(preparingOrder.id);
          onPatchRecord(preparingOrder.id, {
            detail: "Kitchen priority set for the next chef handoff.",
          });
        },
      },
      {
        detail: deliveryOrder
          ? `Completes ${deliveryOrder.label} after courier handoff.`
          : "No delivery order is waiting for completion.",
        disabled: !deliveryOrder,
        iconUrl: "/assets/icons/delivery-scooter-icon.png",
        id: "orders-complete-delivery",
        label: "Complete delivery handoff",
        metric: deliveryOrder?.status ?? "Clear",
        run: () => {
          if (!deliveryOrder) {
            return;
          }

          onSelectRecord(deliveryOrder.id);
          onMarkReviewed(deliveryOrder.id);
          onPatchRecord(deliveryOrder.id, {
            detail: "Courier handoff closed and receipt ready for review.",
            status: "Completed",
          });
        },
      },
      {
        detail: "Opens the live order workspace for the full queue.",
        iconUrl: "/assets/icons/takeaway-bag-icon.png",
        id: "orders-open-live",
        label: "Open order workspace",
        metric: "Live",
        run: () => onOpenOperations("orders"),
      },
    ],
    insight:
      "Advance live order records without switching into the full operations queue.",
    stats: [
      {
        label: "Completed",
        tone: "success",
        value: String(countRowsByStatus(rows, "Completed")),
      },
      {
        label: "Preparing",
        tone: "gold",
        value: String(countRowsByStatus(rows, "Preparing")),
      },
      {
        label: "Delivery",
        tone: "danger",
        value: String(countRowsByStatus(rows, "Out for Delivery")),
      },
    ],
    title: "Order control",
  };
}

function buildReservationContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  const { onMarkReviewed, onOpenOperations, onPatchRecord, onPinRecord, onSelectRecord, rows } =
    context;
  const pendingReservation = rows.find((row) => row.status === "Pending");
  const vipReservation =
    rows.find((row) => row.value.toLowerCase().includes("vip")) ?? rows[0];

  return {
    accent: "Dining room actions",
    actions: [
      {
        detail: pendingReservation
          ? `Confirms ${pendingReservation.label} and marks it reviewed.`
          : "No pending party needs confirmation.",
        disabled: !pendingReservation,
        iconUrl: "/assets/icons/check-icon.png",
        id: "reservations-confirm-pending",
        label: "Confirm pending party",
        metric: pendingReservation?.meta ?? "Clear",
        run: () => {
          if (!pendingReservation) {
            return;
          }

          onSelectRecord(pendingReservation.id);
          onMarkReviewed(pendingReservation.id);
          onPatchRecord(pendingReservation.id, {
            detail: "Host confirmation completed for the evening seating plan.",
            status: "Confirmed",
          });
        },
      },
      {
        detail: vipReservation
          ? `Pins ${vipReservation.label} for host stand visibility.`
          : "No VIP seating record is available.",
        disabled: !vipReservation,
        iconUrl: "/assets/icons/dining-setting-icon.png",
        id: "reservations-pin-vip",
        label: "Pin VIP seating",
        metric: vipReservation?.value ?? "None",
        run: () => {
          if (!vipReservation) {
            return;
          }

          onSelectRecord(vipReservation.id);
          onPinRecord(vipReservation.id);
        },
      },
      {
        detail: "Opens the full reservation workspace for table review.",
        iconUrl: "/assets/icons/calendar-icon.png",
        id: "reservations-open-live",
        label: "Open reservation workspace",
        metric: "Live",
        run: () => onOpenOperations("reservations"),
      },
    ],
    insight:
      "Confirm pending parties and keep VIP seating visible for the host stand.",
    stats: [
      {
        label: "Confirmed",
        tone: "success",
        value: String(countRowsByStatus(rows, "Confirmed")),
      },
      {
        label: "Pending",
        tone: "danger",
        value: String(countRowsByStatus(rows, "Pending")),
      },
      {
        label: "VIP",
        tone: "gold",
        value: String(
          rows.filter((row) => row.value.toLowerCase().includes("vip")).length,
        ),
      },
    ],
    title: "Reservation control",
  };
}

export function buildAdminDomainActionContent(
  context: AdminDomainActionContext,
): DomainActionPanelContent {
  if (context.activeId === "menu") {
    return buildMenuContent(context);
  }

  if (context.activeId === "orders") {
    return buildOrderContent(context);
  }

  if (context.activeId === "reservations") {
    return buildReservationContent(context);
  }

  const defaultCopy = getDefaultPanelCopy(context.activeId);

  return {
    ...defaultCopy,
    actions: buildGenericActions(context),
    stats: [
      { label: "Records", tone: "gold", value: String(context.rows.length) },
      {
        label: "Open",
        tone: "danger",
        value: String(countOpenRows(context.rows)),
      },
      {
        label: "Ready",
        tone: "success",
        value: String(countRowsByStatus(context.rows, "Active")),
      },
    ],
  };
}
