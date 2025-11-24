import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { XCircle, RefreshCw, Phone } from 'lucide-react';

const PaymentFailed = () => {
  return (
    <>
      <Helmet>
        <title>Payment Failed - Reticulation Business</title>
        <meta name="description" content="Your payment could not be processed." />
      </Helmet>
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto bg-red-100 rounded-full p-3 w-fit">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <CardTitle className="text-3xl mt-4">Payment Failed</CardTitle>
              <CardDescription className="text-base">Unfortunately, we were unable to process your payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Please try again with a different payment method or check your payment details. If the problem persists, please contact our support team.
              </p>
              
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link to="/register-supplier">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support
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

export default PaymentFailed;