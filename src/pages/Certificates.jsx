import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock Data for certificates
const certificates = [
  {
    id: 1,
    name: 'Certificate of Incorporation',
    type: 'Government Registration',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/d98b6d44abb2426004cd4c0592a17646.jpg',
  },
  {
    id: 2,
    name: 'Importer-Exporter Code (IEC)',
    type: 'Trade License',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/702ae22ebfb425f8de33a4d8bd99e949.jpg',
  },
  {
    id: 3,
    name: 'GMP Certificate of Compliance',
    type: 'Quality Certification',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/d7fcd026df02eb47fe8d2af2913e0f9a.jpg',
  },
  {
    id: 4,
    name: 'HACCP Certificate of Compliance',
    type: 'Food Safety',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/fb39d503c84620caae918f2abecdd540.jpg',
  },
  {
    id: 5,
    name: 'ISO 22000:2018 Certificate',
    type: 'Food Safety Management',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/10ff9972b825184b2867843790862196.jpg',
  },
  {
    id: 6,
    name: 'Organic Certificate of Compliance',
    type: 'Organic Certification',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/b3c148b0d8f679b0d3b3772eaf4163e2.jpg',
  },
  {
    id: 7,
    name: 'UDYAM Registration Certificate',
    type: 'MSME Registration',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/75b2036288baa15dca69b1a8e56add19.jpg',
  },
  {
    id: 8,
    name: 'FSSAI Registration Certificate',
    type: 'Intellectual Property',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/8a68562afbaf9816dea89dda97e2c469.jpg',
  },
  {
    id: 9,
    name: 'Trademark Registration Certificate',
    type: 'Food License',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/ecbe7eba8b95856a2dd39b2c3d8cea3c.jpg',
  },
];

const CertificateCard = ({ cert }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-card border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={cert.imageUrl}
          alt={cert.name}
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
            <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
                 <h3 className="font-semibold text-card-foreground">{cert.name}</h3>
                 <p className="text-sm text-muted-foreground">{cert.type}</p>
            </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{cert.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 max-h-[80vh] overflow-auto">
                <img src={cert.imageUrl} alt={cert.name} className="w-full h-auto" />
              </div>
            </DialogContent>
          </Dialog>
          <Button asChild className="w-full">
            <a href={cert.imageUrl} download>
              <Download className="h-4 w-4 mr-2" /> Download
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


const Certificates = () => {
  return (
    <>
      <Helmet>
        <title>Our Certificates - Reticulation Business</title>
        <meta name="description" content="Browse our official certificates and documents. We believe in transparency and quality assurance." />
      </Helmet>
      <div className="space-y-12">
        <section className="text-center py-16 rounded-xl bg-gray-50">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
                Our <span className="text-primary">Certificates</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
                We are committed to transparency and quality. Here are some of our key business certificates.
            </motion.p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Certificates;