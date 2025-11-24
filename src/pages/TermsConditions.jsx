import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, CheckSquare, Shield, AlertTriangle, Landmark, Scale } from 'lucide-react';

const TermsConditions = () => {
  const terms = [
    {
      icon: FileText,
      text: "Reticulation is operated by Business Promotion Private Limited (a company incorporated in India).",
    },
    {
      icon: CheckSquare,
      text: "Your use of the website and all features/services are subject to these Terms and Conditions.",
    },
    {
      icon: CheckSquare,
      text: "All policies and rules applicable to any transaction, service or tool on the website will apply.",
    },
    {
      icon: Landmark,
      text: "By merely using the Website, you enter into a binding contract with Reticulation Business Promotion Private Limited.",
    },
    {
      icon: FileText,
      text: "Any transaction/service undertaken shall be governed by the specific policies or terms and conditions as specified on the Website.",
    },
    {
      icon: CheckSquare,
      text: "All policies/terms relating to your use of the Website, services and purchases shall be deemed to be a part of these Terms.",
    },
    {
      icon: AlertTriangle,
      text: "The Company has the right to change these terms and policies at any time without notice.",
    },
    {
      icon: Shield,
      text: "The Company may terminate the account and service if any misuse of the website or violation of Company's policy is found.",
    },
    {
      icon: Scale,
      text: "All disputes and conflicts will be governed by Indian laws and will be settled only in the jurisdiction of the Company's registered city.",
    },
    {
      icon: CheckSquare,
      text: "Every User, Customer, Supplier, and Job Seeker is required to comply with these Terms.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Reticulation Business</title>
        <meta name="description" content="Read the Terms and Conditions for using the Reticulation Business website and services." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-8">
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Terms & <span className="text-primary">Conditions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Please read these terms carefully before using our website or services.
          </motion.p>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-8 rounded-lg text-foreground space-y-6 border"
        >
          {terms.map((term, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full mt-1">
                <term.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">{term.text}</p>
              </div>
            </div>
          ))}
          <div className="pt-6 border-t mt-6">
            <h3 className="font-bold text-lg text-foreground mb-2">NOTE:</h3>
            <p className="text-muted-foreground italic">By using the Website, Services or any Transaction, you shall be deemed to have agreed to all these Terms and Conditions.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default TermsConditions;