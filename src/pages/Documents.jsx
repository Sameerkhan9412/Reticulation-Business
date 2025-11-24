import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock Data for documents
const documents = [
  {
    id: 1,
    name: 'PAN Card - Reticulation Business Promotion Pvt Ltd',
    type: 'PAN Card',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/3896f4ebab18ebb91e8a3b63f55d236e.jpg',
  },
  {
    id: 2,
    name: 'Bank of India - Statement',
    type: 'Bank Document',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/e20d8280912c00c54d992c5e58bafb23.jpg',
  },
  {
    id: 3,
    name: 'Bank of India - Cheque',
    type: 'Bank Document',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/f110490b0095d033d452eeb3255e63f5.jpg',
  },
  {
    id: 4,
    name: 'Passport - Vikash Satoriya',
    type: 'Identity',
    imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/b95101cb24d2357d42dc7c35e4191dab.jpg',
  },
];

const DocumentCard = ({ doc }) => {
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
          src={doc.imageUrl}
          alt={doc.name}
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
            <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
                 <h3 className="font-semibold text-card-foreground">{doc.name}</h3>
                 <p className="text-sm text-muted-foreground">{doc.type}</p>
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
                <DialogTitle>{doc.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 max-h-[80vh] overflow-auto">
                <img src={doc.imageUrl} alt={doc.name} className="w-full h-auto" />
              </div>
            </DialogContent>
          </Dialog>
          <Button asChild className="w-full">
            <a href={doc.imageUrl} download>
              <Download className="h-4 w-4 mr-2" /> Download
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


const Documents = () => {
  return (
    <>
      <Helmet>
        <title>Our Documents - Reticulation Business</title>
        <meta name="description" content="Access our official business documents. We believe in transparency and quality assurance." />
      </Helmet>
      <div className="space-y-12">
        <section className="text-center py-16 rounded-xl bg-gray-50">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
                Our <span className="text-primary">Documents</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
                We are committed to transparency. Here are some of our key business and identity documents.
            </motion.p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Documents;