import { useState } from "react";
import axios from "axios";

export default function InvoicePayment() {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      // 1️⃣ Create Razorpay order
      const amount = 500; // INR
      const orderRes = await axios.post("https://reticulation-backend-1.onrender.com/create-order", { amount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "DigiWorld360Solution",
        description: "Product Payment",
        order_id: orderRes.data.id,
        handler: async function (response) {
          try {
            const userData = {
              type: "order",
              shipping: {
                fullName: "Vikrant Gaur",
                email: "vikrant@example.com",
                address: "Aligarh, UP",
              },
              items: [{ name: "Product 1", price: 500, quantity: 1 }],
              totalAmount: amount,
            };

            const verifyRes = await axios.post("https://reticulation-backend-1.onrender.com/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userData,
            });

            setInvoice(verifyRes.data.invoice);
          } catch (err) {
            setError(err.response?.data?.error || "Invoice generation failed");
          }
        },
        theme: { color: "#1E40AF" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.error || "Payment failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Pay & Get Invoice</h1>
      <button
        onClick={handlePayment}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {invoice && (
        <div className="mt-4 p-4 border rounded bg-green-50">
          <h2 className="font-semibold mb-2">Invoice Generated!</h2>
          <p><strong>Invoice Number:</strong> {invoice.serial_number}</p>
          <a
            href={`https://app.getswipe.in/api/partner/v2/doc/${invoice.hash_id}/pdf`}
            target="_blank"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Download PDF
          </a>
        </div>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
