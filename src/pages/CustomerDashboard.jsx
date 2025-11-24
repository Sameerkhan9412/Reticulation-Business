import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  FileText,
  Heart,
  User,
  Lock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    active: 0,
    cancelled: 0,
    delivered: 0,
    support: 0,
  });

  // ✅ Logout handler
  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully!" });
    navigate("/");
  };

  // ✅ Dashboard Nav Links
  const navLinks = [
    { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
    { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/profile", label: "Edit Profile", icon: User },
    { href: "/dashboard/change-password", label: "Change Password", icon: Lock },
  ];

  // ✅ Fetch order stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/customer/orders/stats/${user?.email}`
        );

        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Dashboard stats error:", err);
        toast({
          title: "Error",
          description: "Could not load your dashboard stats.",
          variant: "destructive",
        });
      }
    };

    if (user?.email) fetchStats();
  }, [user?.email]);

  return (
    <>
      <Helmet>
        <title>Customer Dashboard - Reticulation</title>
        <meta
          name="description"
          content={`Welcome to your dashboard, ${user?.name || "Customer"}. Manage your orders, profile, and more.`}
        />
      </Helmet>

      <DashboardLayout
        userType="Customer"
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
            Hello {user?.name || "Customer"}, welcome to your dashboard!
          </h1>
          <p className="text-muted-foreground mb-8">
            Here's a quick overview of your account.
          </p>

          {/* ✅ Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Active Orders"
              value={stats.active}
              icon={ShoppingBag}
              color="blue"
            />
            <DashboardCard
              title="Cancelled Orders"
              value={stats.cancelled}
              icon={ShoppingBag}
              color="red"
            />
            <DashboardCard
              title="Delivered Orders"
              value={stats.delivered}
              icon={ShoppingBag}
              color="green"
            />
            <DashboardCard
              title="Support Chats"
              value={stats.support}
              icon={MessageSquare}
              color="yellow"
            />
          </div>

          {/* ✅ Quick Links */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/products")}>
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => navigate("/dashboard/orders")}
                variant="secondary"
              >
                My Orders
              </Button>
              <Button
                onClick={() => navigate("/dashboard/invoices")}
                variant="outline"
              >
                Invoices
              </Button>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default CustomerDashboard;
