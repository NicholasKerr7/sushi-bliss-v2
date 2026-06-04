import { menuItemById } from "@/data/menu";
import { mockUser } from "@/data/mockUser";
import { calculateOrderTotals } from "@/lib/money";
import type { CartLineItem, Order } from "@/types/order";

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
  menuItemIds: string[],
  status: Order["status"],
  mode: Order["mode"],
  totalDiscountCents = 0,
): Order {
  const items = menuItemIds
    .map((menuItemId, index) => createLineItem(menuItemId, index + 1, orderId))
    .filter((item): item is CartLineItem => Boolean(item));
  const subtotalCents = items.reduce(
    (total, item) => total + item.menuItem.priceCents * item.quantity,
    0,
  );

  return {
    confirmationCode:
      status === "completed" ? "SB-260604-PAST" : "SB-260604-LIVE",
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
      status === "completed"
        ? "2026-06-03T23:20:00.000Z"
        : "2026-06-04T21:05:00.000Z",
    customer: {
      email: mockUser.email,
      name: mockUser.name,
      phone: mockUser.phone,
    },
    deliveryAddress: mode === "delivery" ? fallbackAddress : undefined,
    fulfillmentAt:
      status === "completed"
        ? "2026-06-04T00:10:00.000Z"
        : "2026-06-04T21:55:00.000Z",
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
    ["otoro-nigiri", "spicy-tuna-roll"],
    "preparing",
    "delivery",
    250,
  ),
  createMockOrder(
    "mock-completed-order",
    ["chutoro-nigiri", "salmon-sashimi"],
    "completed",
    "pickup",
  ),
];
