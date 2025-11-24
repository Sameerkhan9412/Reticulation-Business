import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, UserCog, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  const privacyPoints = [
    "All your provided personal information (like name, mobile number, address, identity card, bank details) will be kept completely secure and will not be shared with any third party without your consent.",
    "The information will be used only for your service/recharge, KYC verification, and internal company records.",
    "Customers, suppliers or job seekers can request to update or delete their personal details at any time.",
    "The company has advanced security features and regular monitoring for data security.",
    "Under KYC rules, all data verification, logging and reporting will be done as per the rules if required."
  ];

  const kycPoints = [
    "KYC is mandatory for all customers, suppliers and job seekers - Aadhaar, PAN, photo, mobile number and bank details will be taken.",
    "KYC data will be saved on a secure server and can only be viewed by authorized employees of the company.",
    "In case of incorrect documents or mismatch in information, the KYC will be rejected and the customer/supplier will have to submit the documents again (as per government guidelines).",
    "KYC verification of all three - customers, suppliers or job seekers - will be required before all recharges (₹49 or ₹99) or product purchases to prevent fraudulent or illegal activities."
  ];

  return (
    <>
      <Helmet>
        <title>Privacy & KYC Policy - Reticulation Business</title>
        <meta name="description" content="Read the Privacy and KYC Policy of Reticulation Business." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-8">
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Privacy & KYC <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Your data security and privacy are our top priorities.
          </motion.p>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-8 rounded-lg text-foreground space-y-8 border"
        >
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center"><Lock className="mr-2 h-6 w-6" /> Privacy Policy Points</h2>
            <ul className="space-y-4">
              {privacyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <ShieldCheck className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t my-8"></div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center"><UserCog className="mr-2 h-6 w-6" /> KYC Policy Points</h2>
            <ul className="space-y-4">
              {kycPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Database className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicy;