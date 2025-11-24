import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const JobSeekerPolicy = () => {
    const policyUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/ca59a4b979cabca0f28aaefdc256fc62.jpg";

  return (
    <>
      <Helmet>
        <title>Job Seeker Policy - Reticulation Business</title>
        <meta name="description" content="Read the Job Seeker Policy for Reticulation Business. Understand the terms for job registration." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-8">
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Job Seeker Registration <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Please read our policy carefully before registering for job opportunities.
          </motion.p>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-4 sm:p-8 rounded-lg text-foreground border"
        >
          <div className="mb-6">
            <a href={policyUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Job Seeker Policy PDF
              </Button>
            </a>
          </div>
          <img
            src={policyUrl}
            alt="Job Seeker Policy Document"
            className="w-full rounded-lg border"
          />
        </motion.div>
      </div>
    </>
  );
};

export default JobSeekerPolicy;