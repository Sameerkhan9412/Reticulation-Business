import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Password Reset Link Sent!",
      description: "If an account exists for this email, a reset link has been sent.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - Reticulation Business</title>
        <meta name="description" content="Reset your password for Reticulation Business." />
      </Helmet>
      <div className="max-w-sm mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email and we'll send you a link to reset your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="link" asChild>
                <Link to="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;