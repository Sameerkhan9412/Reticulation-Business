import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PaymentsPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const [suppliersRes, jobseekersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/admin/suppliers`),
          fetch(`${import.meta.env.VITE_API_URL}/admin/jobseekers`),
        ]);

        const suppliersData = await suppliersRes.json();
        const jobseekersData = await jobseekersRes.json();

        setSuppliers(suppliersData);
        setJobseekers(jobseekersData);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="p-6">Loading payments...</p>;

  // ✅ Merge suppliers + jobseekers into single table
  const payments = [
    ...suppliers.map((s) => ({
      id: `S-${s.id}`,
      name: s.businessname,
      email: s.email,
      type: "Supplier",
      amount: s.amount,
      paymentId: s.paymentid,
      orderId: s.orderid,
      registeredAt: s.registeredat,
    })),
    ...jobseekers.map((j) => ({
      id: `J-${j.id}`,
      name: j.fullname,
      email: j.email,
      type: "Jobseeker",
      amount: j.amount,
      paymentId: j.paymentid,
      orderId: j.orderid,
      registeredAt: j.registeredat,
    })),
  ].sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)); // latest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Payment ID</th>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.email}</td>
                  <td className="p-2 border">{p.type}</td>
                  <td className="p-2 border font-semibold">₹{p.amount}</td>
                  <td className="p-2 border">{p.paymentId}</td>
                  <td className="p-2 border">{p.orderId}</td>
                  <td className="p-2 border">
                    {new Date(p.registeredAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsPage;
