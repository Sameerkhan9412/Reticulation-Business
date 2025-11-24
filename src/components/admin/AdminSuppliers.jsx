import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminSuppliers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/suppliers`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading suppliers...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Registrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Business Name</th>
                <th className="p-2">Contact Person</th>
                <th className="p-2">Email</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Categories</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Payment ID</th>
                <th className="p-2">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {data.map(sp => (
                <tr key={sp.id} className="border-b">
                  <td className="p-2">{sp.businessname}</td>
                  <td className="p-2">{sp.contactperson}</td>
                  <td className="p-2">{sp.email}</td>
                  <td className="p-2">{sp.mobile}</td>
                  <td className="p-2">{sp.categories}</td>
                  <td className="p-2">₹{sp.amount}</td>
                  <td className="p-2">{sp.paymentid}</td>
                  <td className="p-2">{new Date(sp.registeredat).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSuppliers;
