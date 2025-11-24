import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Invoices = () => {
  const { token, user } = useAuth();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`https://reticulation-backend-1.onrender.com/customer/invoices`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setInvoices(data || []);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Could not load invoices.",
        });
      }
    };

    if (token) fetchInvoices();
  }, [token]);

  return (
    <DashboardLayout userType="Customer" userName={user?.name}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-4">My Invoices</h1>

        {invoices.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">No Invoices Available</h2>
            <p className="text-muted-foreground">
              Once you place orders, your invoices will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      Invoice #{invoice.id} - Order #{invoice.orderId}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-medium">₹{invoice.amount?.toFixed(2)}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      window.open(
                        `${import.meta.env.VITE_API_URL}/customer/invoices/${invoice.id}/download`,
                        "_blank"
                      )
                    }
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Invoices;
