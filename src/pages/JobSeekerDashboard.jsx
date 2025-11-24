import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  User,
  CheckCircle,
  Briefcase,
  Mail,
  HelpCircle,
  Calendar,
  Edit,
  Phone,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const JobSeekerDashboard = () => {
  const { toast } = useToast();
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    jobsApplied: 0,
    lastApplication: "-",
    profileCompletion: 0,
  });

  // ✅ Logout handler
  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully!" });
    navigate("/");
  };

  // ✅ Dashboard Nav Links
  const navLinks = [
    { href: "/dashboard/profile", label: "My Profile", icon: User },
    { href: "/dashboard/payment-status", label: "Payment Status", icon: CheckCircle },
    { href: "/dashboard/jobs", label: "Available Jobs", icon: Briefcase },
    { href: "/dashboard/recommendations", label: "Job Recommendations", icon: Mail },
    { href: "/dashboard/support", label: "Help & Support", icon: HelpCircle },
  ];

  // ✅ Fetch jobseeker stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/jobseeker/stats`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Jobseeker stats error:", err);
        toast({
          title: "Error",
          description: "Could not load your jobseeker dashboard stats.",
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
        <title>Job Seeker Dashboard - Reticulation</title>
        <meta
          name="description"
          content={`Hello ${user?.name || "Jobseeker"}, your job journey starts here!`}
        />
      </Helmet>

      <DashboardLayout
        userType="Job Seeker"
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
            Hello {user?.name || "Jobseeker"}, your job journey starts here!
          </h1>
          <p className="text-muted-foreground mb-8">
            Keep your profile updated to get the best job recommendations.
          </p>

          {/* ✅ Announcements */}
          <div className="bg-primary text-primary-foreground text-center py-2 text-sm overflow-hidden rounded-lg mb-8">
            <motion.div
              className="whitespace-nowrap"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <p>
                📢 Announcements: New jobs in the IT sector added! Update your
                skills for better matches!
              </p>
            </motion.div>
          </div>

          {/* ✅ Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Jobs Applied"
              value={stats.jobsApplied}
              icon={Briefcase}
              color="blue"
            />
            <DashboardCard
              title="Last Application Date"
              value={stats.lastApplication}
              icon={Calendar}
              color="purple"
            />
            <div className="bg-card border text-card-foreground p-4 rounded-lg flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Profile Completion
                </h3>
                <p className="text-sm font-bold text-green-500">
                  {stats.profileCompletion}%
                </p>
              </div>
              <Progress value={stats.profileCompletion} className="h-2" />
            </div>
          </div>

          {/* ✅ Quick Actions */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleNotImplemented}>
                <Briefcase className="mr-2 h-4 w-4" /> Apply for New Job
              </Button>
              <Button onClick={handleNotImplemented} variant="secondary">
                <Edit className="mr-2 h-4 w-4" /> Update Resume
              </Button>
              <Button onClick={handleNotImplemented} variant="outline">
                <Phone className="mr-2 h-4 w-4" /> Contact Support
              </Button>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default JobSeekerDashboard;
