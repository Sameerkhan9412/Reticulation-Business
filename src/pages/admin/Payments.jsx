import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

const payments = [
  { id: 'txn_123', user: 'Aarav Sharma', amount: '₹99.00', type: 'Registration Fee', status: 'Success', date: '2023-10-26' },
  { id: 'txn_124', user: 'Priya Patel', amount: '₹1,250.50', type: 'Product Order', status: 'Success', date: '2023-10-25' },
  { id: 'txn_125', user: 'Rohan Singh', amount: '₹99.00', type: 'Registration Fee', status: 'Pending', date: '2023-10-24' },
  { id: 'txn_126', user: 'Anika Gupta', amount: '₹800.00', type: 'Product Order', status: 'Failed', date: '2023-10-23' },
  { id: 'txn_127', user: 'Vikram Kumar', amount: '₹49.00', type: 'Job Fee', status: 'Success', date: '2023-10-22' },
];

const Payments = () => {
  return (
    <>
      <Helmet>
        <title>Manage Payments - Admin Panel</title>
      </Helmet>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
                <p className="text-muted-foreground">Review all transactions made on the platform.</p>
            </div>
            <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                    <TableCell>{payment.user}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.status === 'Success' ? 'default' : 
                        payment.status === 'Pending' ? 'secondary' : 'destructive'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Payments;