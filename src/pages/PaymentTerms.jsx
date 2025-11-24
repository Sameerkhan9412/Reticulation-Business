import React from "react";
import {
  CreditCard,
  Clock,
  XCircle,
  Banknote,
  Truck,
  Landmark,
  AlertCircle,
  ShieldCheck,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

const PaymentTerms = () => {
  const terms = [
    {
      icon: CreditCard,
      text: "The customer has to make 50% advance payment of the total order value.",
    },
    {
      icon: CreditCard,
      text: "The remaining 50% payment will be made after receiving the BL (Bill Copy).",
    },
    {
      icon: Clock,
      text: "The loading process of the goods will start only 24 hours after receiving the advance payment.",
    },
    {
      icon: XCircle,
      text: "Order cancellation is not possible after loading.",
    },
    {
      icon: Banknote,
      text: "The amount deposited will not be refunded or returned.",
    },
    {
      icon: Truck,
      text: "The company's responsibility will be limited to the correct delivery of the goods only.",
    },
    {
      icon: Landmark,
      text: "Payment will be made only through digital mode (NEFT/RTGS/IMPS/UPI) to the official bank account of the company.",
    },
    {
      icon: AlertCircle,
      text: "In case of delayed payment, late fees or penalty will be applicable.",
    },
    {
      icon: ShieldCheck,
      text: "In case of any dispute, the company's decision will be final and binding.",
    },
    {
      icon: PackageCheck,
      text: "Checking of goods by the customer is mandatory at the time of delivery; claim will not be accepted later.",
    },
    {
      icon: ShoppingCart,
      text: "Online order/shopping payment will be accepted 100% only.",
    },

    // ✅ International Payment Terms
    {
      icon: Landmark,
      text: "Cash in Advance (CIA) – Full or part payment is made in advance.",
    },
    {
      icon: Landmark,
      text: "Advance Payment – Payment before order or shipment.",
    },
    {
      icon: Landmark,
      text: "Wire Transfer – Electronic funds transfer in advance.",
    },
    {
      icon: Landmark,
      text: "Telegraphic Transfer (TT) – Fast bank transfer in advance.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Payment Terms & Conditions
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {terms.map((term, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <term.icon className="w-6 h-6 text-blue-600 mt-1" />
            <p className="text-gray-700">{term.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentTerms;
