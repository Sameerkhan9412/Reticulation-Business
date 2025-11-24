import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";

const JobSeekerRegisterForm = () => {
  const { toast } = useToast();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);

  // Load Razorpay SDK
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

    if (!data["jobseeker-policy-terms"]) {
      toast({
        title: "Error",
        description: "Please accept the Job Seeker Policy and Terms.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    // if (!res) {
    //   toast({ title: "Error", description: "Razorpay SDK failed to load", variant: "destructive" });
    //   setLoading(false);
    //   return;
    // }

    try {
      // ✅ Step 1: Create Razorpay Order
      const orderRes = await fetch("https://reticulation-backend-1.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 49 }),
      });
      const orderData = await orderRes.json();

      // ✅ Step 2: Open Razorpay Checkout
      const options = {
        key: "rzp_live_fkwlbaH61PHMdT",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Job Seeker Registration",
        description: "Pay ₹49 to complete registration",
        order_id: orderData.id,
        handler: async function (response) {
          toast({ title: "Success", description: "Payment Successful 🎉" });

          // ✅ Step 3: Prepare FormData for backend (includes files)
          const fd = new FormData();
          fd.append("type", "jobseeker");
          fd.append("fullName", data.fullName);
          fd.append("email", data.email);
          fd.append("mobile", data.mobile);
          fd.append("gender", data.gender);
          fd.append("dob", date ? format(date, "yyyy-MM-dd") : "");
          fd.append("qualification", data.qualification);
          fd.append("experience", data.experience);
          fd.append("amount", 49);
          fd.append("paymentId", response.razorpay_payment_id);
          fd.append("orderId", response.razorpay_order_id);

          if (formData.get("resume")) fd.append("resume", formData.get("resume"));
          if (formData.get("idProof")) fd.append("idProof", formData.get("idProof"));
          if (formData.get("signedPolicy")) fd.append("signedPolicy", formData.get("signedPolicy"));

          // ✅ Step 4: Send to backend
          await fetch("https://reticulation-backend-1.onrender.com/save-jobseeker", {
            method: "POST",
            body: fd,
          });
        },
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.mobile,
        },
        theme: { color: "#2563eb" },
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
      {/* ✅ Full Job Seeker Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required />
        </div>
        <div>
          <Label htmlFor="mobile">Mobile</Label>
          <Input id="mobile" name="mobile" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" name="confirmPassword" required />
        </div>

        {/* ✅ Improved Date Picker */}
        <div>
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"   // ✅ Enables month-year dropdown
                fromYear={1950}
                toYear={new Date().getFullYear()}
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(day) => day > new Date() || day < new Date("1950-01-01")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Gender</Label>
          <Select name="gender">
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="qualification">Qualification</Label>
          <Input id="qualification" name="qualification" required />
        </div>
        <div>
          <Label htmlFor="experience">Experience</Label>
          <Input id="experience" name="experience" placeholder="e.g. 2 years in Sales" required />
        </div>
        <div>
          <Label htmlFor="resume">Resume Upload</Label>
          <Input id="resume" name="resume" type="file" required />
        </div>
        <div>
          <Label htmlFor="idProof">ID Proof Upload</Label>
          <Input id="idProof" name="idProof" type="file" required />
        </div>
      </div>

      {/* ✅ Terms & Payment Section */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-lg">Terms & Conditions for Job Seekers</h3>
        <p className="text-sm text-muted-foreground">
          Job Seeker Registration Fee: ₹49 (One-time). Please review our policy before proceeding.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a href="/policies/JobSeekerPolicy.pdf" download="JobSeekerPolicy.pdf" className="w-full sm:w-auto">
            <Button type="button" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Job Seeker Policy
            </Button>
          </a>
          <div className="w-full flex-grow">
            <Label htmlFor="signed-policy-jobseeker">Upload Signed Policy</Label>
            <Input id="signed-policy-jobseeker" type="file" name="signedPolicy" required />
          </div>
        </div>
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox id="jobseeker-policy-terms" name="jobseeker-policy-terms" required />
          <Label htmlFor="jobseeker-policy-terms" className="text-sm font-normal text-muted-foreground">
            I have read and agree to the{" "}
            <Link to="/job-seeker-policy" className="text-primary hover:underline">
              Job Seeker Registration Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms-and-conditions" className="text-primary hover:underline">
              Terms & Conditions
            </Link>.
          </Label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full text-lg font-bold">
        {loading ? "Processing..." : "Proceed to Pay ₹49"}
      </Button>
    </form>
  );
};

export default JobSeekerRegisterForm;
