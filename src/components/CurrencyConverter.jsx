import { useState } from "react";

export default function CurrencyConverter({ price }) {
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState(null);

  // Static rates (USD base example)
  const rates = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
  };

  const convertCurrency = () => {
    if (rates["USD"] && rates[toCurrency]) {
      const convertedValue = (price / rates["USD"]) * rates[toCurrency];
      setConverted(convertedValue.toFixed(2));
    }
  };

  return (
    <div className="mt-4 bg-gray-100 p-3 rounded-lg">
      <p className="font-medium">💰 Price in other currency</p>

      <div className="flex gap-2 mt-2">
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 rounded-md"
        >
          {Object.keys(rates).map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>

        <button
          onClick={convertCurrency}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Convert
        </button>
      </div>

      {converted && (
        <p className="mt-2 font-semibold">
          {price} USD = {converted} {toCurrency}
        </p>
      )}
    </div>
  );
}
