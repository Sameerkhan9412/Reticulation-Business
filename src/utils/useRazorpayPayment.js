import { useToast } from "@/components/ui/use-toast";
const Razorpaykey = import.meta.env.VITE_RAZORPAY_KEY;
const apiUrl = import.meta.env.VITE_API_URL;


export const useRazorpayPayment = (formData) => {
  console.log(" iam cllied")
  const { toast } = useToast();
  console.log("i am called")
  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    // if (!res) {
    //   toast({ title: "Error", description: "Razorpay SDK failed to load", variant: "destructive" });
    //   return;
    // }
    try {
      const orderRes = await fetch(`${apiUrl}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 4900 }), // ✅ ₹49 in paise
      });
      
      const orderData = await orderRes.json();

      const options = {
        key: Razorpaykey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Job Seeker Registration",
        description: "Pay ₹49 to complete registration",
        order_id: orderData.id,
        handler: async function (response) {
          toast({ title: "Success", description: "Registration Successful 🎉" });

          await fetch("/verify-payment", {
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
        theme: { color: "#2563eb" },
      };

      const rzp1 = new window.Razorpay(options);
      console.log(" iam cllied")
      rzp1.open();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return { handlePayment };
};
