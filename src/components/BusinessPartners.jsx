import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'Justdial', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/ec08f678583e3298a083c4d6d5361c9a.png', link: 'https://jsdl.in/RSL-AXM1753776617' },
  { name: 'Go4WorldBusiness', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/6d33267728c0e3d726e79db09e10df01.png', link: 'https://www.go4worldbusiness.com/member/view/2781321/reticulation-business-promotion-pvt-ltd-.html' },
  { name: 'Alibaba', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/fb6223896ae7ad95ee2fba07d5f1407d.png', link: 'https://profile.alibaba.com/profile/my_profile.htm?tracelog=fromOldProfile' },
  { name: 'ExportersIndia', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/3da5edd4dbdc63f4a245535c7ba62b06.png', link: 'https://www.exportersindia.com/international-reticu/' },
  { name: 'Google', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/35421b7b5b0829d23527c53186f5de9c.png', link: 'https://g.co/kgs/Yf3s3YT' },
  { name: 'TradeIndia', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/ebd914da0d9e09e21d382318eee50044.png', link: 'https://www.tradeindia.com/reticulation-business-promotion-pvt-ltd-24440206/' },
  { name: 'IndiaMART', logo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/95b3541881cf653e4fd4e223d5ea12e7.png', link: 'https://www.indiamart.com/reticulation-business-promotion-private-limited/' },
];

const BusinessPartners = () => {
  return (
    <section className="py-12 bg-card/50 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Our Business Members
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-12 items-center">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.1)) grayscale(0)" }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-[120px] sm:w-[150px] object-contain"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessPartners;