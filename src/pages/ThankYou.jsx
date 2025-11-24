import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Home, Phone, FileText } from 'lucide-react';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [invoiceLink, setInvoiceLink] = useState(null);

  const type = searchParams.get('type') || 'payment';
  const amountParam = searchParams.get('amount');
  const amount = amountParam ? `₹${amountParam}` : 'your payment';
  const registrationAmount = amountParam ? `₹${amountParam}` : '₹99';
  const transactionId = `TXN${Date.now()}`;

  useEffect(() => {
    // ✅ localStorage se invoice link uthao
    const link = localStorage.getItem("invoiceLink");
    if (link) {
      setInvoiceLink(`https://reticulation-backend-1.onrender.com${link}`);
      localStorage.removeItem("invoiceLink"); // ek bar use ke baad clear kar do
    }
  }, []);

  const content = {
    registration: {
      title: 'Thank You for Your Payment',
      description: `Your payment of ${registrationAmount} was successful! Thank you for registering with Reticulation Business.`,
      details: `We’ve received your details and payment. Our team will verify your information and activate your account within 24–48 hours.`,
    },
    order: {
      title: 'Thank You for Your Order!',
      description: `Your payment was successful!`,
      details: `Your order has been placed and is being processed. You will receive an email confirmation shortly with the order details.`,
    },
     payment: {
      title: 'Thank You for Your Payment!',
      description: `Your payment was successful!`,
      details: `We have received your payment. You will receive a confirmation email shortly.`,
    },
  };

  const pageContent = content[type] || content.payment;
  const displayAmount = type === 'order' ? 'Total' : `Amount Paid`;

  return (
    <>
      <Helmet>
        <title>Payment Successful - Reticulation Business</title>
        <meta name="description" content="Thank you for your payment." />
      </Helmet>
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <CardTitle className="text-3xl mt-4">{pageContent.title}</CardTitle>
              <CardDescription className="text-base">{pageContent.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{pageContent.details}</p>
              
              <div className="text-left bg-secondary/50 p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Payment Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{displayAmount}:</span>
                  <span className="font-medium">{amountParam ? `₹${amountParam}` : 'See confirmation email'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-xs">{transactionId}</span>
                </div>
              </div>

              {/* ✅ Invoice Download Button */}
              {invoiceLink && (
                <a
                  href={invoiceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Invoice
                </a>
              )}

              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Home
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ThankYou;
