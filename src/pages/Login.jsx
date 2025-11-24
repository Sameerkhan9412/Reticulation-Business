import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import CustomerSignUpForm from "@/components/auth/CustomerSignUpForm";
import SupplierSignUpForm from "@/components/auth/SupplierSignUpForm";
import JobSeekerRegisterForm from "@/components/auth/JobSeekerRegisterForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState("login");
  const { isAuthenticated, user } = useAuth();

  const validTabs = [
    "login",
    "signup-customer",
    "signup-supplier",
    "register-jobseeker",
  ];

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab("login");
    }
  }, [tabParam]);

  // ✅ Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const dashboardPath =
        user.role === "admin"
          ? "/admin"
          : `/dashboard/${user.role.toLowerCase()}`;
      navigate(dashboardPath);
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">You are already logged in.</h1>
        <p className="text-muted-foreground">
          Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Login or Register - Reticulation</title>
        <meta
          name="description"
          content="Login to your account or register as a customer, supplier, or job seeker."
        />
      </Helmet>

      <div className="flex flex-col items-center justify-center py-8 md:py-12 gap-12">
        {/* ✅ Tabs for Login/Register */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md md:max-w-2xl lg:max-w-3xl"
        >
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-12 bg-secondary p-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup-customer">Customer Sign Up</TabsTrigger>
              <TabsTrigger value="signup-supplier">Supplier Sign Up</TabsTrigger>
              <TabsTrigger value="register-jobseeker">
                Job Seeker Register
              </TabsTrigger>
            </TabsList>

            <Card className="bg-card/80 backdrop-blur-sm border-border text-card-foreground mt-4">
              {/* ✅ LOGIN TAB */}
              <TabsContent value="login">
                <CardHeader>
                  <CardTitle className="text-2xl">Login to Your Account</CardTitle>
                  <CardDescription>Access your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                </CardContent>
              </TabsContent>

              {/* ✅ CUSTOMER SIGNUP TAB */}
              <TabsContent value="signup-customer">
                <CardHeader>
                  <CardTitle className="text-2xl">Create Customer Account</CardTitle>
                  <CardDescription>
                    Start shopping with us today!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CustomerSignUpForm />
                </CardContent>
              </TabsContent>

              {/* ✅ SUPPLIER SIGNUP TAB */}
              <TabsContent value="signup-supplier">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Become a Supplier / Vendor
                  </CardTitle>
                  <CardDescription>
                    First, create your account. You'll pay the fee on the next step.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierSignUpForm />
                </CardContent>
              </TabsContent>

              {/* ✅ JOB SEEKER REGISTER TAB (only here) */}
              <TabsContent value="register-jobseeker">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Register for Job Opportunities
                  </CardTitle>
                  <CardDescription>
                    Your next career move is just one step away. <br />
                    <strong>Job Seeker Registration Fee: ₹49 (One-time)</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobSeekerRegisterForm />
                </CardContent>
              </TabsContent>
            </Card>
          </Tabs>
        </motion.div>

        {/* ✅ Supplier Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md md:max-w-2xl lg:max-w-3xl"
        >
          <Card className="bg-card/80 backdrop-blur-sm border-border text-card-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Become a Supplier</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Join as a verified supplier with a one-year membership fee of ₹99.
                Once approved, you can list products and manage your inventory
                directly from your account.
              </p>
              <Button asChild>
                <Link to="/register-supplier">
                  Complete Registration & Pay{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
