import { bigshipRates } from "./shippingRates";
import { stateToZone } from "./stateToZone";

/**
 * Calculate domestic shipping charge (Bigship zone rates)
 * @param {string} fromState - Origin warehouse state (default: Delhi)
 * @param {string} toState - Destination customer state
 * @param {number} totalWeight - Total shipment weight in kg
 * @returns {number} Shipping charge
 */
export const calculateDomesticShipping = (fromState = "Delhi", toState, totalWeight = 1) => {
  const fromZone = stateToZone[fromState];
  const toZone = stateToZone[toState];

  if (!fromZone || !toZone) {
    console.warn("⚠️ Invalid zone mapping for:", fromState, toState);
    return 0;
  }

  const ratePerKg = bigshipRates[fromZone]?.[toZone];
  if (!ratePerKg) {
    console.warn("⚠️ Rate not found for zones:", fromZone, "->", toZone);
    return 0;
  }

  return ratePerKg * totalWeight;
};

/**
 * Calculate international shipping charge (₹2 per kg)
 * @param {number} totalWeight - Total shipment weight in kg
 * @returns {number} Shipping charge
 */
export const calculateInternationalShipping = (totalWeight = 1) => {
  return totalWeight * 2;
};
