import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Truck, Package, Link2, AlertCircle, HelpCircle } from 'lucide-react';

const ShippingPolicy = () => {
  const policyPoints = [
    {
      icon: Truck,
      text: "All delivery services of the Company will be entirely through the Shipping Cargo Delivery App Service and as per its policies.",
    },
    {
      icon: Package,
      text: "Delivery responsibility and handling will be solely dependent on Shipping Cargo's terms, conditions and tracking system.",
    },
    {
      icon: Link2,
      text: "The Company will only provide order processing and tracking links; the Company will not be responsible for delivery, damage or delay.",
    },
    {
      icon: AlertCircle,
      text: "Customer will be provided with order tracking facility, which will enable them to track their goods.",
    },
    {
      icon: HelpCircle,
      text: "Any delivery related issues (delay in delivery, damage, missing packets etc.) will be the responsibility of Shipping Cargo Company and not our private limited company.",
    },
    {
      icon: HelpCircle,
      text: "All claims, rights and complaints related to delivery shall be directed by the Customer to the Shipping Cargo App / Service Partner only.",
    },
    {
    icon: Package,
    text: "International Shipping: Delivery generally takes 7 to 10 days, but the maximum time may extend to 30 to 45 days.",
    },
    {
    icon: Package,
    text: "Domestic Shipping: Delivery generally takes 3 to 5 days, but the maximum time may extend to 15 to 20 days.",
    },

  ];

  return (
    <>
      <Helmet>
        <title>Shipping Policy - Reticulation Business</title>
        <meta name="description" content="Read the Shipping Policy of Reticulation Business regarding our delivery partner, Shipping Cargo." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-8">
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Shipping <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            As per Shipping Cargo (a Delivery App and Service Partner)
          </motion.p>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-8 rounded-lg text-foreground space-y-6 border"
        >
          {policyPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full mt-1">
                <point.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">{point.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default ShippingPolicy;