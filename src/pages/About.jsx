import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Globe, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Reticulation Business</title>
        <meta name="description" content="Learn about International Reticulation Business Promotion Private Limited, a renowned manufacturer and supplier of quality products." />
      </Helmet>
      <div className="space-y-16 py-8">
        <section className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            About <span className="text-primary">Reticulation Business</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Manufacturing and supplying supreme quality Masale, Tea, Rice, Flour, Dry Fruits, and more since 2018.
          </motion.p>
        </section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-8 rounded-lg border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-foreground space-y-4">
              <h2 className="text-3xl font-bold text-primary">Our Story</h2>
              <p className="text-muted-foreground">International Reticulation Business Promotion Private Limited is a renowned Manufacturing by all type Masale, Tea, Rice & Wholesaler, Exporter, Supplier of Flour, Dry Fruits, Harad etc. We have a commendable reputation in the industry for offering supreme quality all types spices, pulses, harbal product, rice,dry fruits, wholesalers supplier traders and exporter . We are reckoned among the best quality fruit traders in the region.</p>
              <p className="text-muted-foreground">We believe in keeping the interests of customers at the forefront. Ensuring maximum customer satisfaction is a priority for us. Our company offers top-quality products to customers. All products are thoroughly tested before the final dispatch. We offer products at the best of prices. We take care of the hassle-free and timely delivery of supplies.</p>
              <p className="text-muted-foreground">Incorporated in 2018, International Reticulation Business Promotion Private Limited is a name that is well-known in the sector. Our office is located in Raisen, Madhya Pradesh (India) and we operate throughout the world.</p>
            </div>
            <div>
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/8e6f8c02c3e209e01096c4c0cdcf6f26.jpg" className="w-full h-auto rounded-lg shadow-lg object-cover aspect-square" alt="Variety of colorful Indian spices" />
            </div>
          </div>
        </motion.section>

        <section className="text-center bg-secondary/10 p-8 rounded-lg border border-secondary/20">
            <Target className="h-12 w-12 mx-auto text-secondary mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Our Future Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We are also willing to expand the business by associating with 'Multi Level Marketing' soon.</p>
        </section>

        <section>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-lg border">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Worldwide Distribution</h3>
              <p className="text-muted-foreground">We have a wide distribution network across the world. We have created a wide base of customers throughout the globe. We facilitate timely delivery of supplies. We wish to establish long-lasting relations with customers, who we serve. We are thus a prime choice of people.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-lg border">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Professionals in our Team</h3>
              <p className="text-muted-foreground">The professionals, who we have in our team, come with adequate expertise and experience. They know the demands of the industry, well and take care of the needs of customers. Our primary objective is to become one among the leading names in the domain.</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;