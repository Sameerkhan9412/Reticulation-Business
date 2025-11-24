import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Briefcase, UserPlus } from "lucide-react";
import BusinessPartners from "@/components/BusinessPartners";
import FeaturedProducts from "@/components/FeaturedProducts";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Reticulation Business - Quality Products & Job Opportunities</title>
        <meta
          name="description"
          content="Welcome to Reticulation Business. Discover a wide range of quality products and find your next career opportunity with our job portal."
        />
      </Helmet>

      <div className="space-y-16">
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 md:py-32 rounded-xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/1952c000266848476d62a41a60987c37.jpg"
              alt="A vibrant collection of Indian spices"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
            >
              Authentic Indian Spices & Natural Products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-8"
            >
              Direct from Source — Your Gateway to Quality & Careers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/products">
                  Start Shopping <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Link to="/register-job">
                  Find a Job <Briefcase className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE SECTION */}
        <section className="px-4 sm:px-6 md:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-8">
            Why Choose Reticulation Business?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card border p-6 rounded-lg text-center shadow-sm"
            >
              <ShoppingBag className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Quality Products
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                A curated selection of high-quality items to meet your needs.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card border p-6 rounded-lg text-center shadow-sm"
            >
              <Briefcase className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Career Growth
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Access to a wide range of job opportunities from top companies.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card border p-6 rounded-lg text-center shadow-sm"
            >
              <UserPlus className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Supplier Partnership
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                A platform for suppliers to reach a broader market and grow
                their business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="px-4 sm:px-6 md:px-10">
          <FeaturedProducts />
        </section>

        {/* BUSINESS PARTNERS */}
        <section className="px-4 sm:px-6 md:px-10">
          <BusinessPartners />
        </section>
      </div>
    </>
  );
};

export default Home;
