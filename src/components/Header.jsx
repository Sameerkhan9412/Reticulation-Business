import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Bell, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import './Header.css'; 
import VisitorCounter from './VisitorCounter'; 
import { useCurrency } from '@/context/CurrencyContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { uniqueItemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { currency, setCurrency } = useCurrency();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/certificates', label: 'Certificates' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  const handleLogout = () => {
    logout();
    toast({ title: "Logout Successful" });
    navigate('/');
  };

  const handleDashboardRedirect = () => {
    if (user?.role) {
      navigate(`/dashboard/${user.role}`);
    }
  };

  const handleJobRegistration = () => {
    navigate('/register-job');
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* LEFT → Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg sm:text-xl font-bold text-foreground whitespace-nowrap"
            >
              <img
                alt="Reticulation Business Logo"
                className="h-10 w-auto"
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/9e4d3df0-cec4-4291-94af-593db2eca536/8cd8adca8d16cf78c9dd4d8844b4c612.png"
              />
              <span className="header-logo-text">Reticulation Business</span>
            </Link>
          </div>

          {/* CENTER → Nav Links */}
          <nav className="hidden lg:flex flex-1 justify-center items-center space-x-5 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT → Actions */}
          <div className="flex items-center space-x-3 header-right">
            {/* Language Translator */}

<select
  className="border rounded-md px-2 py-1 text-sm bg-white"
  onChange={(e) => {
    const lang = e.target.value;
    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = lang;
      googleCombo.dispatchEvent(new Event("change")); // ✅ यह ट्रिगर करेगा translate
    }
  }}
>
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
  <option value="gu">ગુજરાતી</option>
  <option value="bn">বাংলা</option>
  <option value="ta">தமிழ்</option>
  <option value="te">తెలుగు</option>
  <option value="ml">മലയാളം</option>
  <option value="ur">اردو</option>
  <option value="ar">العربية</option>
  <option value="fr">Français</option>
  <option value="de">Deutsch</option>
  <option value="es">Español</option>
  <option value="it">Italiano</option>
  <option value="ja">日本語</option>
  <option value="zh-CN">中文</option>
</select>


            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm bg-white"
            >
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="AED">AED د.إ</option>
              <option value="JPY">JPY ¥</option>
            </select>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" onClick={() => navigate('/cart')} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {uniqueItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                  {uniqueItemCount}
                </span>
              )}
            </Button>

            {/* Job Registration */}
            <Button
              variant="secondary"
              onClick={handleJobRegistration}
              className="hidden sm:inline-flex text-xs px-3 py-1.5"
            >
              Job Seeker @ ₹49
            </Button>

            {/* Auth / Login */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboardRedirect}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="px-2 sm:px-4">
                <Link to="/login">
                  <User className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-background/95"
        >
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" onClick={() => { navigate('/register-supplier'); setIsMenuOpen(false); }} className="w-4/5">
              Become a Supplier
            </Button>
            <Button variant="secondary" onClick={() => { handleJobRegistration(); setIsMenuOpen(false); }} className="w-4/5">
              Job Seeker Register @ ₹49
            </Button>
          </nav>
        </motion.div>
      )}

      {/* Announcement Bar */}
      <div className="bg-accent text-accent-foreground text-center py-2 text-sm overflow-hidden font-semibold">
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          <p>Announcements: Get 20% off on all new arrivals! ✨ Become a supplier and grow your business with us! 🚀</p>
        </motion.div>
      </div>

      {/* Visitor Counter */}
      {/* <VisitorCounter /> */}
    </header>
  );
};

export default Header;
