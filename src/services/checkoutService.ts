import { createOrderFromCheckout } from "@/lib/checkout";
import {
  serviceFailure,
  serviceSuccess,
  type ServiceResponse,
} from "@/services/contracts";
import type { CheckoutOrderInput } from "@/types/checkout";
import type { CartLineItem, Order } from "@/types/order";

/** Creates a confirmed mock order behind the future checkout API boundary. */
export async function createCheckoutOrder(
  items: CartLineItem[],
  input: CheckoutOrderInput,
): Promise<ServiceResponse<Order>> {
  if (items.length === 0) {
    return serviceFailure(
      "checkout_cart_empty",
      "Add at least one item before checkout.",
    );
  }

  if (!input.fulfillmentAt) {
    return serviceFailure(
      "checkout_fulfillment_missing",
      "Choose a pickup or delivery time before checkout.",
    );
  }

  if (input.totals.totalCents <= 0) {
    return serviceFailure(
      "checkout_total_invalid",
      "Order total must be greater than zero.",
    );
  }

  return serviceSuccess(createOrderFromCheckout(items, input), "local");
}
