import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

const SupplierSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const supplierPolicyUrl =
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/d7a3c7ee0e6e0d96d2a85297d9b6ad3c.jpg";

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!data["supplier-policy-terms"]) {
      toast({
        title: "Error",
        description: "Please accept the Supplier Policy and Terms.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    // if (!res) {
    //   toast({
    //     title: "Error",
    //     description: "Razorpay SDK load failed",
    //     variant: "destructive",
    //   });
    //   setLoading(false);
    //   return;
    // }

    try {
      // ✅ Create Razorpay order
      const orderRes = await fetch("https://reticulation-backend-1.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99 }),
      });
      const orderData = await orderRes.json();

      const options = {
        key: "rzp_live_fkwlbaH61PHMdT",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Supplier Registration",
        description: "Pay ₹99 to complete Supplier Sign Up",
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch("https://reticulation-backend-1.onrender.com/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              userData: {
                ...data,
                amount: 99,
                type: "supplier",
              },
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast({
              title: "✅ Registration Successful",
              description: "Payment received & supplier registered.",
            });
            navigate("/thank-you?type=supplier&amount=99");
          } else {
            toast({
              title: "Payment Verification Failed",
              description: "Could not verify payment.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: data.businessName,
          email: data.email,
          contact: data.mobile,
        },
        theme: { color: "#22c55e" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="supplier-business-name">Business Name</Label>
          <Input id="supplier-business-name" name="businessName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-contact-person">Contact Person</Label>
          <Input id="supplier-contact-person" name="contactPerson" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-email">Email</Label>
          <Input id="supplier-email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-mobile">Mobile</Label>
          <Input id="supplier-mobile" name="mobile" type="tel" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-password">Password</Label>
          <Input id="supplier-password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-confirm-password">Confirm Password</Label>
          <Input id="supplier-confirm-password" name="confirmPassword" type="password" required />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="supplier-categories">Product Categories</Label>
          <Input id="supplier-categories" name="categories" placeholder="e.g., Spices, Aprons, Herbal Products" required />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="supplier-address">Business Address</Label>
          <Textarea id="supplier-address" name="address" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-gst">GST / ID Upload</Label>
          <Input id="supplier-gst" name="gst" type="file" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-logo">Logo (Optional)</Label>
          <Input id="supplier-logo" name="logo" type="file" />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-lg">Terms & Conditions for Suppliers</h3>
        <p className="text-sm text-muted-foreground">
          1-Year Membership Fee: ₹99. Please download and review our Supplier Policy. You must upload the signed document to complete your registration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a href={supplierPolicyUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button type="button" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Supplier Policy
            </Button>
          </a>
          <div className="w-full flex-grow">
            <Label htmlFor="signed-policy-supplier">Upload Signed Policy Document</Label>
            <Input id="signed-policy-supplier" type="file" accept="application/pdf,image/jpeg,image/png" required />
          </div>
        </div>
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox id="supplier-policy-terms" name="supplier-policy-terms" required />
          <Label htmlFor="supplier-policy-terms" className="text-sm font-normal text-muted-foreground">
            I have read and agree to the{" "}
            <Link to="/supplier-policy" className="text-primary hover:underline">Supplier Registration Policy</Link> and{" "}
            <Link to="/terms-and-conditions" className="text-primary hover:underline">Terms & Conditions</Link>.
          </Label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full text-lg font-bold">
        {loading ? "Processing..." : "Proceed to Pay ₹99"}
      </Button>
    </form>
  );
};

export default SupplierSignUpForm;
