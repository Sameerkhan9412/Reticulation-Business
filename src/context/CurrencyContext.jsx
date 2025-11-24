import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Default currency INR
  const [currency, setCurrency] = useState("INR");

  // 👇 Static conversion rates (Base = INR)
  const rates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0096,
  AED: 0.044,
  JPY: 1.78,
};

  // Convert INR price → selected currency
  const convertPrice = (priceInINR) => {
    const rate = rates[currency] || 1;
    return (priceInINR * rate).toFixed(2);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
