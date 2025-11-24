import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Bell, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      {/* 🔹 Top Info Bar */}
      <div className="bg-sky-50 text-gray-700 text-xs sm:text-sm py-1 px-3 flex flex-wrap justify-between items-center">
        <p className="truncate w-full sm:w-auto text-center sm:text-left">
          Become a supplier and grow your business with us! 🚀
        </p>
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <select className="bg-transparent border rounded px-1 py-0.5 text-xs sm:text-sm">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
          <select className="bg-transparent border rounded px-1 py-0.5 text-xs sm:text-sm">
            <option>INR ₹</option>
            <option>USD $</option>
          </select>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <nav className="flex items-center justify-between px-3 sm:px-6 md:px-8 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://reticulationbusiness.com/logo.png"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-base sm:text-lg font-semibold text-gray-800">
            Reticulation Business
          </span>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>
          <Link to="/products" className="hover:text-green-600">
            Products
          </Link>
          <Link to="/jobs" className="hover:text-green-600">
            Jobs
          </Link>
          <Link to="/about" className="hover:text-green-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-green-600">
            Contact
          </Link>
        </div>

        {/* Right: Icons + Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600" />
          <ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600" />
          <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600" />
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden focus:outline-none"
          >
            <Menu className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </nav>

      {/* 🔹 Animated Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              <div className="flex flex-col p-4 space-y-4 font-medium text-gray-800">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>
                <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                  Jobs
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
