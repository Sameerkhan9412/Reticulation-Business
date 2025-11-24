import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const CustomerSignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Move this function OUTSIDE handleSubmit
  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Only digits
  };

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

    const newUser = {
      name: data.fullName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      role: "customer",
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "https://reticulation-backend-1.onrender.com"}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        toast({
          title: "Registration Successful!",
          description: "Welcome! Please log in to continue.",
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Server error. Please try again later.",
        variant: "destructive",
      });
      console.error("❌ Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ✅ Full Name */}
        <div className="space-y-2">
          <Label htmlFor="customer-name">Full Name</Label>
          <Input id="customer-name" name="fullName" required />
        </div>

        {/* ✅ Email */}
        <div className="space-y-2">
          <Label htmlFor="customer-email">Email</Label>
          <Input id="customer-email" name="email" type="email" required />
        </div>

        {/* ✅ Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="customer-mobile">Mobile Number</Label>
          <Input
            id="customer-mobile"
            name="mobile"
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            onInput={handleMobileInput}
            required
          />
        </div>

        {/* ✅ Password */}
        <div className="space-y-2">
          <Label htmlFor="customer-password">Password</Label>
          <Input id="customer-password" name="password" type="password" required />
        </div>

        {/* ✅ Confirm Password */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="customer-confirm-password">Confirm Password</Label>
          <Input
            id="customer-confirm-password"
            name="confirmPassword"
            type="password"
            required
          />
        </div>

        {/* Optional fields */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="customer-address">Address</Label>
          <Textarea id="customer-address" name="address" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer-city">City</Label>
          <Input id="customer-city" name="city" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer-state">State</Label>
          <Input id="customer-state" name="state" />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="customer-terms" required />
        <Label
          htmlFor="customer-terms"
          className="text-sm font-normal text-muted-foreground"
        >
          I agree to the{" "}
          <Link to="/payment-terms" className="text-primary hover:underline">
            Payment Terms
          </Link>{" "}
          and{" "}
          <Link to="/terms-and-conditions" className="text-primary hover:underline">
            Terms & Conditions
          </Link>.
        </Label>
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
};

export default CustomerSignUpForm;
