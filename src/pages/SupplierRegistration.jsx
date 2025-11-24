import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SupplierSignUpForm from "@/components/auth/SupplierSignUpForm"; // ✅ reuse Supplier form

const SupplierRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Supplier Registration - Reticulation Business</title>
        <meta
          name="description"
          content="Become a Verified Supplier – Join Reticulation Business"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Become a Verified Supplier
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-2">
                Register today as a verified supplier and connect with buyers
                across India.  
                <br />
                <span className="font-bold text-primary">
                  1-Year Membership Fee: ₹99
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* ✅ SupplierSignUpForm reused here */}
              <SupplierSignUpForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SupplierRegistration;
