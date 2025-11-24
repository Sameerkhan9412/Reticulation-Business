// src/utils/shipping.js
import { bigshipRates } from "@/data/shippingRates";
import { stateToZone } from "@/data/stateToZone";

// Customer ke state se zone nikalna
export function getZoneFromState(stateName) {
  return stateToZone[stateName] || null;
}

// Shipping charge calculate karna (per kg rate * total weight)
export function calculateShippingCharge(pickupZone, customerState, weightKg) {
  const customerZone = getZoneFromState(customerState);
  if (!customerZone) return 0;

  const rate = bigshipRates[pickupZone]?.[customerZone] || 0;
  return rate * weightKg;
}
