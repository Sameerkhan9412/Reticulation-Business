import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const JobRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    qualification: "",
    experience: "",
    cityState: "",
    resume: null,
    idProof: null,
    signedPolicy: null,
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    if (!formData.agree) {
      alert("⚠️ Please accept Job Seeker Policy and Terms & Conditions before proceeding.");
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
      const orderRes = await fetch("https://reticulation-backend-1.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 49 }),
      });

      const orderData = await orderRes.json();

      const options = {
        key: "rzp_live_fkwlbaH61PHMdT",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Job Seeker Registration",
        description: "Register for Job Opportunities",
        order_id: orderData.id,
        handler: async function (response) {
          toast({ title: "Success", description: "Registration Successful 🎉" });

          await fetch("https://reticulation-backend-1.onrender.com/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              userData: { ...formData, amount: 49, type: "jobseeker" },
            }),
          });
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#2563eb" }, // blue-600
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
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Job Seeker Registration <span className="text-blue-600">@ ₹49</span>
      </h2>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700">Full Name</Label>
          <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter full name" required />
        </div>
        <div>
          <Label className="text-gray-700">Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required />
        </div>
        <div>
          <Label className="text-gray-700">Phone</Label>
          <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="9876543210" required />
        </div>
        <div>
          <Label className="text-gray-700">Password</Label>
          <Input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="******" required />
        </div>
        <div>
          <Label className="text-gray-700">Confirm Password</Label>
          <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="******" required />
        </div>
        <div>
          <Label className="text-gray-700">Date of Birth</Label>
          <Input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
        </div>
        <div>
          <Label className="text-gray-700">Gender</Label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full text-gray-700"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Label className="text-gray-700">Qualification</Label>
          <Input name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder="e.g. MBA, B.Tech" />
        </div>
        <div>
          <Label className="text-gray-700">Experience</Label>
          <Input name="experience" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 2 years in Sales" />
        </div>
        <div>
          <Label className="text-gray-700">City / State</Label>
          <Input name="cityState" value={formData.cityState} onChange={handleInputChange} placeholder="Delhi, India" />
        </div>
      </div>

      {/* File Uploads */}
      <div className="mt-6 space-y-4">
        <div>
          <Label className="text-gray-700">Resume Upload</Label>
          <input type="file" name="resume" onChange={handleFileChange} className="border p-2 w-full rounded-lg" />
        </div>
        <div>
          <Label className="text-gray-700">ID Proof Upload</Label>
          <input type="file" name="idProof" onChange={handleFileChange} className="border p-2 w-full rounded-lg" />
        </div>
      </div>

      {/* Policy Upload */}
     {/* Policy + Terms Section */}
<div className="mt-6 p-4 bg-gray-50 rounded-lg border text-sm text-gray-700">
 
  <ul className="list-disc pl-5 space-y-1">

      <a
        href="/policies/JobSeekerPolicy.pdf"
        download
        className="text-blue-600 underline hover:text-blue-800"
      >
        📥 Download Job Seeker Policy (PDF)
      </a>
      <div className="w-full flex-grow">
  <Label htmlFor="signed-policy-jobseeker">Upload Signed Policy</Label>
  <Input
    id="signed-policy-jobseeker"
    type="file"
    name="signedPolicy"
    onChange={handleFileChange}   // ✅ यह add करना ज़रूरी है
    required
    className="input-light"
  />
</div>

    
  </ul>

  <label className="flex items-start gap-2 mt-3">
    <input
      type="checkbox"
      checked={formData.agree}
      onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
      className="mt-1"
    />
    <span>
      I have read and agree to the{" "}
      <a
        href="/policies/JobSeekerPolicy.pdf"
        target="_blank"
        className="text-blue-600 underline"
      >
        Job Seeker Policy
      </a>{" "}
      and{" "}
      <a
        href="/terms-and-conditions"
        target="_blank"
        className="text-blue-600 underline"
      >
        Terms & Conditions
      </a>.
    </span>
  </label>
</div>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-lg shadow-md transition-all"
      >
        {loading ? "Processing..." : "Proceed to Pay ₹49"}
      </Button>
    </div>
  );
};

export default JobRegistration;
