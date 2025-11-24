import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  Package,
  CreditCard,
  BarChart2,
  Settings,
  PlusCircle,
  List,
  Tag,
  Download,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SupplierDashboard = () => {
  const { toast } = useToast();
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    salesToday: 0,
    newOrders: 0,
    lowStock: 0,
    pendingPayments: 0,
  });

  // ✅ Logout handler
  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully!" });
    navigate("/");
  };

  // ✅ Navigation links
  const navLinks = [
    { href: "/dashboard/products", label: "Product Management", icon: Package },
    { href: "/dashboard/payments", label: "Payment & Earnings", icon: CreditCard },
    { href: "/dashboard/reports", label: "Sales Reports", icon: BarChart2 },
    { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
  ];

  // ✅ Fetch supplier stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/supplier/stats`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch supplier stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Supplier stats error:", err);
        toast({
          title: "Error",
          description: "Could not load supplier dashboard stats.",
          variant: "destructive",
        });
      }
    };

    if (token) fetchStats();
  }, [token]);

  // ✅ Placeholder for not implemented features
  const handleNotImplemented = () => {
    toast({
      title: "Feature In Progress",
      description:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Supplier Dashboard - Reticulation</title>
        <meta
          name="description"
          content={`Welcome Supplier ${user?.name}, manage your store here.`}
        />
      </Helmet>

      <DashboardLayout
        userType="Supplier"
        userName={user?.name}
        navLinks={navLinks}
        onLogout={handleLogout}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome Supplier {user?.name}, manage your store here.
          </h1>
          <p className="text-muted-foreground mb-8">
            Here's what's happening with your store today.
          </p>

          {/* ✅ Dynamic Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total Sales Today"
              value={`₹${stats.salesToday}`}
              icon={BarChart2}
              color="green"
            />
            <DashboardCard
              title="New Orders"
              value={stats.newOrders}
              icon={Package}
              color="blue"
            />
            <DashboardCard
              title="Inventory Alerts"
              value={`${stats.lowStock} low stock`}
              icon={Package}
              color="yellow"
            />
            <DashboardCard
              title="Pending Payments"
              value={`₹${stats.pendingPayments}`}
              icon={CreditCard}
              color="red"
            />
          </div>

          {/* ✅ Product Management */}
          <div className="bg-card p-6 rounded-lg mb-8 border">
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleNotImplemented}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              </Button>
              <Button onClick={handleNotImplemented} variant="secondary">
                <List className="mr-2 h-4 w-4" /> View/Edit Product List
              </Button>
              <Button onClick={handleNotImplemented} variant="secondary">
                <Tag className="mr-2 h-4 w-4" /> Stock & Pricing
              </Button>
            </div>
          </div>

          {/* ✅ Quick Tools */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Quick Tools
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleNotImplemented} variant="outline">
                Add Discount / Offers
              </Button>
              <Button onClick={handleNotImplemented} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Product Excel
              </Button>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default SupplierDashboard;
