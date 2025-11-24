import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { indianStates } from "@/data/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";

// ✅ Currency Context
import { useCurrency } from "@/context/CurrencyContext";
const apiUrl = import.meta.env.VITE_API_URL;
const Razorpaykey = import.meta.env.VITE_RAZORPAY_KEY;

const Checkout = () => {
  const { cartItems, cartTotal, clearCart, shippingCharge, setShippingState } = useCart();
  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    mobile: "", // ✅ Added mobile
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Currency hook
  const { currency, convertPrice } = useCurrency();

  // ✅ GST Rate
  const hasDryFruits = cartItems.some(
    (item) => (item.category || item.name || "").toLowerCase().includes("dryfruit")
  );
  const currentGstRate = hasDryFruits ? 0.12 : 0.05;
  const currentGstAmount = cartTotal * currentGstRate;

  // ✅ Shipping only after state selection
  const appliedShipping = shipping.state ? shippingCharge : 0;

  // ✅ Grand Total
  const estimatedGrandTotal = cartTotal + appliedShipping + currentGstAmount;

  // Load Razorpay SDK
  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ✅ Handle Payment
  const handlePayment = async () => {
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "You must agree to the Terms & Conditions before payment.",
      });
      return;
    }

    if (
      !shipping.fullName ||
      !shipping.email ||
      !shipping.mobile ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.zip
    ) {
      toast({
        title: "Missing Info",
        description: "Please fill all shipping details before payment.",
      });
      return;
    }

    // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    // if (!res) {
    //   toast({ title: "Payment Failed", description: "Razorpay SDK failed to load." });
    //   return;
    // }

    try {
      // ✅ Create order with backend
      const orderRes = await fetch(
        // "https://reticulationbusiness.com/api/payment/create-order",
        `${apiUrl}/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: estimatedGrandTotal,
            productType: "order",
            shippingCharge,
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderData.id) {
        toast({ title: "Payment Failed", description: "Could not create order." });
        return;
      }

      const options = {
        key: Razorpaykey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Reticulation Business",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            `${apiUrl}/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                userData: {
                  type: "customer",
                  fullName: shipping.fullName,
                  email: shipping.email,
                  mobile: shipping.mobile, // ✅ Send mobile to backend
                  address: shipping.address,
                  items: cartItems,
                  subtotal: cartTotal,
                  gstAmount: currentGstAmount,
                  shippingCharge,
                  totalAmount: estimatedGrandTotal,
                },
              }),
            }
          );

          console.log("verydata")
          const verifyData = await verifyRes.json();
          console.log("verydata",verifyData)
          if (verifyData.success) {
            toast({
              title: "✅ Payment Successful",
              description: "Payment ID: " + response.razorpay_payment_id,
            });
            clearCart();
            navigate("/thank-you?type=payment");
          } else {
            toast({
              title: "Verification Failed",
              description: "Could not verify payment.",
            });
          }
        },
        prefill: {
          name: shipping.fullName,
          email: shipping.email,
          contact: shipping.mobile, // ✅ Prefill with user mobile
        },
        theme: { color: "#3399cc" },
      };
      console.log("i sm option",options)
      const rzp1 = new window.Razorpay(options);
      
      console.log("order Datassss",orderData)
      rzp1.open();
      console.log("order Datassss",orderData)
    } catch (err) {
      toast({ title: "Payment Error", description: err.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Shipping Form */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={shipping.fullName}
            onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={shipping.email}
            onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            value={shipping.mobile}
            onChange={(e) => setShipping({ ...shipping, mobile: e.target.value })}
            maxLength={10}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={shipping.address}
            onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={shipping.city}
            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <select
            id="state"
            value={shipping.state}
            onChange={(e) => {
              setShipping({ ...shipping, state: e.target.value });
              setShippingState(e.target.value);
            }}
            className="w-full border rounded p-2"
          >
            <option value="">Select State</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="zip">ZIP / Postal Code</Label>
          <Input
            id="zip"
            value={shipping.zip}
            onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 border-t pt-4 space-y-1">
        <p>Subtotal: {convertPrice(cartTotal)} {currency}</p>
        <p>
          Shipping: {shipping.state ? `${convertPrice(shippingCharge)} ${currency}` : "-"}
        </p>
        <p>GST ({hasDryFruits ? "12%" : "5%"}): {convertPrice(currentGstAmount)} {currency}</p>
        <p className="font-bold">Grand Total: {convertPrice(estimatedGrandTotal)} {currency}</p>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a href="/terms-and-conditions" target="_blank" className="text-blue-600 underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/payment-terms" target="_blank" className="text-blue-600 underline">
            Payment Terms Policy
          </a>.
        </label>
      </div>

      {/* Pay Button */}
      <Button onClick={handlePayment} className="mt-6 w-full" disabled={!acceptedTerms}>
        <Lock className="mr-2 h-5 w-5" /> Pay {convertPrice(estimatedGrandTotal)} {currency}
      </Button>
    </div>
  );
};

export default Checkout;
