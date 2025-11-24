import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Orders = () => {
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://reticulation-backend-1.onrender.com/customer/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Could not fetch orders. Please try again later.",
        });
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <DashboardLayout userType="Customer" userName={user?.name}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">No Orders Found</h2>
            <p className="text-muted-foreground">
              You haven’t placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      Order #{order.id} - {order.items?.length || 0} items
                    </h3>
                    <Badge>{order.status}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="font-medium">
                    Total: ₹{order.totalAmount?.toFixed(2)}
                  </p>
                  <Button
                    size="sm"
                    onClick={() =>
                      window.open(`/invoices/${order.id}`, "_blank")
                    }
                  >
                    View Invoice
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

export default Orders;
