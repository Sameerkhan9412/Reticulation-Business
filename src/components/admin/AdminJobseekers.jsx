import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminJobseekers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/jobseekers`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading jobseekers...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobseeker Registrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Gender</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Payment ID</th>
                <th className="p-2">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {data.map(js => (
                <tr key={js.id} className="border-b">
                  <td className="p-2">{js.fullname}</td>
                  <td className="p-2">{js.email}</td>
                  <td className="p-2">{js.mobile}</td>
                  <td className="p-2">{js.gender}</td>
                  <td className="p-2">{js.dob}</td>
                  <td className="p-2">₹{js.amount}</td>
                  <td className="p-2">{js.paymentid}</td>
                  <td className="p-2">{new Date(js.registeredat).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminJobseekers;
