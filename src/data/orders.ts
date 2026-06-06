import { menuItemById } from "@/data/menu";
import { mockUser } from "@/data/mockUser";
import { calculateOrderTotals } from "@/lib/money";
import type { CartLineItem, Order } from "@/types/order";

type MockOrderItem = string | { menuItemId: string; quantity: number };

const fallbackPaymentMethod = mockUser.paymentMethods[0] || {
  brand: "Visa",
  expiresAt: "2028-12",
  id: "visa-4242",
  last4: "4242",
};
const fallbackAddress = mockUser.addresses[0] || {
  city: "New York",
  id: "home",
  label: "Home",
  line1: "120 Sakura Street",
  postalCode: "10013",
  region: "NY",
};

const confirmationCodes: Record<string, string> = {
  "mock-active-order": "SB-260604-LIVE",
  "mock-completed-dragon-order": "SB-260604-DRGN",
  "mock-completed-omakase-order": "SB-260601-OMKS",
  "mock-completed-salmon-order": "SB-260602-SLMN",
};

const orderDates: Record<string, { createdAt: string; fulfillmentAt: string }> =
  {
    "mock-active-order": {
      createdAt: "2026-06-04T21:05:00.000Z",
      fulfillmentAt: "2026-06-04T21:55:00.000Z",
    },
    "mock-completed-dragon-order": {
      createdAt: "2026-06-03T23:20:00.000Z",
      fulfillmentAt: "2026-06-04T00:10:00.000Z",
    },
    "mock-completed-omakase-order": {
      createdAt: "2026-06-01T22:45:00.000Z",
      fulfillmentAt: "2026-06-01T23:30:00.000Z",
    },
    "mock-completed-salmon-order": {
      createdAt: "2026-06-02T23:10:00.000Z",
      fulfillmentAt: "2026-06-03T00:00:00.000Z",
    },
  };

function createLineItem(
  menuItemId: string,
  quantity: number,
  orderId: string,
): CartLineItem | undefined {
  const menuItem = menuItemById.get(menuItemId);

  if (!menuItem) {
    return undefined;
  }

  return {
    addOns: [],
    customizations: [
      {
        groupId: "wasabi",
        groupLabel: "Wasabi",
        optionId: "chef-balance",
        optionLabel: "Chef balance",
      },
      {
        groupId: "soy",
        groupLabel: "Soy",
        optionId: "house",
        optionLabel: "House soy",
      },
    ],
    id: `${orderId}-${menuItem.id}`,
    menuItem,
    menuItemId: menuItem.id,
    quantity,
  };
}

function createMockOrder(
  orderId: string,
  menuItems: MockOrderItem[],
  status: Order["status"],
  mode: Order["mode"],
  totalDiscountCents = 0,
): Order {
  const items = menuItems
    .map((item, index) => {
      const menuItemId = typeof item === "string" ? item : item.menuItemId;
      const quantity = typeof item === "string" ? index + 1 : item.quantity;

      return createLineItem(menuItemId, quantity, orderId);
    })
    .filter((item): item is CartLineItem => Boolean(item));
  const subtotalCents = items.reduce(
    (total, item) => total + item.menuItem.priceCents * item.quantity,
    0,
  );
  const dates = orderDates[orderId];

  return {
    confirmationCode:
      confirmationCodes[orderId] ||
      (status === "completed" ? "SB-260604-PAST" : "SB-260604-LIVE"),
    courier:
      mode === "delivery"
        ? {
            etaMinutes: 18,
            id: "courier-yuki",
            name: "Yuki Tanaka",
            phone: "+1 555 0128",
            vehicle: "Black sedan",
          }
        : undefined,
    createdAt:
      dates?.createdAt ||
      (status === "completed"
        ? "2026-06-03T23:20:00.000Z"
        : "2026-06-04T21:05:00.000Z"),
    customer: {
      email: mockUser.email,
      name: mockUser.name,
      phone: mockUser.phone,
    },
    deliveryAddress: mode === "delivery" ? fallbackAddress : undefined,
    fulfillmentAt:
      dates?.fulfillmentAt ||
      (status === "completed"
        ? "2026-06-04T00:10:00.000Z"
        : "2026-06-04T21:55:00.000Z"),
    id: orderId,
    items,
    mode,
    paymentMethod: fallbackPaymentMethod,
    promoCode: totalDiscountCents > 0 ? "BLISS10" : undefined,
    status,
    totals: calculateOrderTotals(subtotalCents, totalDiscountCents),
  };
}

export const mockOrders: Order[] = [
  createMockOrder(
    "mock-active-order",
    [
      { menuItemId: "otoro-nigiri", quantity: 2 },
      { menuItemId: "spicy-tuna-roll", quantity: 2 },
      { menuItemId: "salmon-nigiri", quantity: 2 },
      { menuItemId: "dragon-roll", quantity: 1 },
      { menuItemId: "ebi-nigiri", quantity: 1 },
    ],
    "preparing",
    "delivery",
  ),
  createMockOrder(
    "mock-completed-dragon-order",
    [
      { menuItemId: "dragon-roll", quantity: 2 },
      { menuItemId: "otoro-nigiri", quantity: 1 },
      { menuItemId: "salmon-sashimi", quantity: 1 },
    ],
    "completed",
    "delivery",
  ),
  createMockOrder(
    "mock-completed-salmon-order",
    [
      { menuItemId: "salmon-nigiri", quantity: 3 },
      { menuItemId: "rainbow-roll", quantity: 1 },
      { menuItemId: "chutoro-nigiri", quantity: 2 },
    ],
    "completed",
    "delivery",
  ),
  createMockOrder(
    "mock-completed-omakase-order",
    [
      { menuItemId: "otoro-nigiri", quantity: 2 },
      { menuItemId: "uni-gunkan", quantity: 1 },
      { menuItemId: "spicy-tuna-roll", quantity: 2 },
      { menuItemId: "ebi-nigiri", quantity: 1 },
    ],
    "completed",
    "pickup",
  ),
];
