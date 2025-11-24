import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Truck, Ban, Coins as HandCoins, CheckSquare, Building2 } from 'lucide-react';

const RefundAndCancellationPolicy = () => {
  const policies = [
    {
      icon: Building2,
      text: "Purchase/Refund/Cancellation before loading will be the responsibility of the Company.",
    },
    {
      icon: Truck,
      text: "Once the goods are successfully delivered, it will be the responsibility of the customer.",
    },
    {
      icon: Ban,
      text: "No refunds, exchanges or cancellations will be made after delivery for any reason.",
    },
    {
      icon: HandCoins,
      text: "Customer makes payment at their sole discretion, without pressure or confusion.",
    },
    {
      icon: Ban,
      text: "No refunds are possible once payment is made.",
    },
    {
      icon: CheckSquare,
      text: "You will carefully read and accept these terms before placing an order.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Refund & Cancellation Policy - Reticulation Business</title>
        <meta name="description" content="Read the Refund and Cancellation Policy of Reticulation Business. Learn about order cancellations, refunds, and product returns." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-8">
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Refund & Cancellation <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Please read our policy carefully before placing an order. Your satisfaction and trust are important to us.
          </motion.p>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-8 rounded-lg text-foreground space-y-6 border"
        >
          {policies.map((policy, index) => (
            <motion.div 
              key={index} 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <div className="bg-primary/10 p-3 rounded-full mt-1">
                <policy.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">{policy.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default RefundAndCancellationPolicy;