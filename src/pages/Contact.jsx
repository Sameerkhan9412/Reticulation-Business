import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketId = `TICKET-${Date.now()}`;
    toast({
      title: "Ticket Raised Successfully!",
      description: `Your ticket ID is ${ticketId}. We will get back to you shortly.`,
    });
    e.target.reset();
  };

  const contactDetails = [
    { icon: Building, label: "Company Name", value: "Reticulation Business Promotion Private Limited" },
    { icon: Phone, label: "Mobile Number", value: "+91-8823036558" },
    { icon: Mail, label: "Email ID", value: "reticulationbusinesspromotion@gmail.com" },
    { icon: MapPin, label: "Location", value: "C/O Om Prakash Satoriya, Kisani Mohalla Chouk Bazar, Gairatganj, Madhya Pradesh, India - 464884" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Reticulation</title>
        <meta name="description" content="Get in touch with Reticulation Business Promotion Private Limited. Find our address, phone number, and email, or raise a support ticket." />
      </Helmet>
      <div className="py-8">
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Get In <span className="text-purple-400">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            We'd love to hear from you. Reach out to us with any questions or raise a support ticket below.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 p-8 rounded-lg space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <item.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-400">{item.label}</p>
                  <p className="text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Raise a Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Your Email</Label>
                  <Input id="email" type="email" required className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Your Phone</Label>
                  <Input id="phone" type="tel" required className="bg-gray-700 border-gray-600 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueType" className="text-gray-300">Issue Type</Label>
                <Select required>
                    <SelectTrigger id="issueType" className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select an issue type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="general">General Query</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="order">Order Related</SelectItem>
                        <SelectItem value="other">Others</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                <Input id="subject" required className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea id="message" rows={5} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment" className="text-gray-300">Attach File (Optional)</Label>
                <Input id="attachment" type="file" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Submit Ticket</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;