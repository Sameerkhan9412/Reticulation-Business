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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, FileDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const users = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Supplier', status: 'Approved', joined: '2023-10-26' },
  { id: 2, name: 'Priya Patel', email: 'priya.patel@example.com', role: 'Customer', status: 'N/A', joined: '2023-10-25' },
  { id: 3, name: 'Rohan Singh', email: 'rohan.singh@example.com', role: 'Supplier', status: 'Pending', joined: '2023-10-24' },
  { id: 4, name: 'Anika Gupta', email: 'anika.gupta@example.com', role: 'Customer', status: 'N/A', joined: '2023-10-23' },
  { id: 5, name: 'Vikram Kumar', email: 'vikram.kumar@example.com', role: 'Job Seeker', status: 'Paid', joined: '2023-10-22' },
];

const Users = () => {
  const { toast } = useToast();

  const handleAction = (action, userId) => {
    toast({
      title: `Action: ${action}`,
      description: `Action '${action}' triggered for user ID ${userId}. This is a demo.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Users - Admin Panel</title>
      </Helmet>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">Manage all registered users, suppliers, and job seekers.</p>
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === 'Approved' ? 'default' : 
                        user.status === 'Pending' ? 'secondary' : 
                        user.status === 'Paid' ? 'outline' : 'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction('View Profile', user.id)}>View Profile</DropdownMenuItem>
                          {user.role === 'Supplier' && user.status === 'Pending' && (
                            <DropdownMenuItem onClick={() => handleAction('Approve Supplier', user.id)}>Approve Supplier</DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleAction('Suspend User', user.id)} className="text-red-600">Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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

export default Users;