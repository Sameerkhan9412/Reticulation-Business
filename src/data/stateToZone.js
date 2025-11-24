// src/data/stateToZone.js
// State → Zone fallback mapping (jab tak Bigship ka official pincode list nahi aata)

export const stateToZone = {
  // North
  "Delhi": "NORTH1",
  "Haryana": "NORTH1",
  "Punjab": "NORTH1",
  "Uttar Pradesh": "NORTH2",
  "Uttarakhand": "NORTH2",

  // East
  "West Bengal": "EAST1",
  "Assam": "EAST1",
  "Odisha": "EAST2",
  "Bihar": "EAST2",
  "Jharkhand": "EAST2",

  // West
  "Maharashtra": "WEST1",
  "Goa": "WEST1",
  "Gujarat": "WEST2",
  "Rajasthan": "WEST2",

  // South
  "Tamil Nadu": "SOUTH1",
  "Kerala": "SOUTH1",
  "Karnataka": "SOUTH2",
  "Andhra Pradesh": "SOUTH2",
  "Telangana": "SOUTH2",

  // Central
  "Madhya Pradesh": "CENTRAL",
  "Chhattisgarh": "CENTRAL",

  // Special Zones
  "Jammu & Kashmir": "SPL1",
  "Ladakh": "SPL1",
  "Andaman & Nicobar Islands": "SPL2",
  "Lakshadweep": "SPL2",
};
