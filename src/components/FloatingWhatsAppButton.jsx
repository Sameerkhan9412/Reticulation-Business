import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const FloatingWhatsAppButton = () => {
  const location = useLocation();
  const params = useParams();
  const { cartItems } = useCart();
  const phoneNumber = "918823036558"; 

  const getMessage = () => {
    const pathname = location.pathname;

    if (pathname.startsWith("/product/")) {
      const product = products.find(p => p.id === parseInt(params.id));
      const productName = product ? product.name : "a product";
      return `Hi, I'm interested in ordering '${productName}' in bulk. Can you assist?`;
    }

    if (pathname.startsWith("/cart")) {
      if (cartItems.length === 0) {
        return "Hi, I have a question about bulk ordering.";
      }
      const itemsList = cartItems.map(item => `${item.quantity}x ${item.name}`).join("\n");
      return `Hi, I'd like to get a quote for my bulk order:\n${itemsList}`;
    }

    return "Hi, I have a question about your products.";
  };

  const handleClick = () => {
    const message = encodeURIComponent(getMessage());
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-[#25D366]"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </motion.button>
  );
};

export default FloatingWhatsAppButton;