import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from "react-i18next"; // 👈 added

const Footer = () => {
  const { toast } = useToast();
  const { t } = useTranslation(); // 👈 hook

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@reticulationbusinesspromot1695?si=QYyuJFWjGTkWZ5U1' },
    { icon: Instagram, href: 'https://www.instagram.com/reticulationbusinesspromotion?igsh=MWpuOW1mMWhnb3duaQ==' },
    { icon: Twitter, href: 'https://x.com/Reticulati95284?t=OpVH6Ih9nnFgjlhp3fcgiQ&s=09' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vikash-satoriya-3690aa145' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1BA9YHEJCe/' },
  ];

  const footerLinks = [
    { href: '/about', label: 'about' },
    { href: '/contact', label: 'contactUs' },
    { href: '/register-supplier', label: 'supplierRegister' },
    { href: '/certificates', label: 'certificates' },
    { href: '/privacy-policy', label: 'privacy' },
    { href: '/terms-and-conditions', label: 'terms' },
    { href: '/payment-terms', label: 'paymentTerms' },
    { href: '/refund-cancellation-policy', label: 'refund' },
    { href: '/shipping-policy', label: 'shipping' },
    { href: '/supplier-policy', label: 'supplierPolicy' },
    { href: '/job-seeker-policy', label: 'jobSeekerPolicy' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast({
      title: t("subscribed") || "Subscribed!",
      description: t("featurePending") || "🚧 This feature isn't implemented yet—but don't worry! 🚀",
    });
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand + Social */}
          <div>
            <p className="text-xl font-bold text-foreground mb-2">Reticulation Business</p>
            <p className="text-sm text-muted-foreground">{t("footerTagline") || "Your one-stop solution for quality products and career opportunities."}</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-foreground mb-4">{t("quickLinks")}</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-primary transition-colors text-sm text-muted-foreground">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-semibold text-foreground mb-4">{t("stayConnected") || "Stay Connected"}</p>
            <p className="text-sm mb-2 text-muted-foreground">{t("subscribeText") || "Subscribe to our newsletter for updates."}</p>
            <form onSubmit={handleSubscribe} className="flex mt-2">
              <Input type="email" placeholder={t("yourEmail") || "Your Email"} className="rounded-r-none focus:ring-0 focus:ring-offset-0" />
              <Button type="submit" className="rounded-l-none">{t("subscribe") || "Subscribe"}</Button>
            </form>
          </div>

          {/* Location + Bank Details */}
<div>
  <p className="font-semibold text-foreground mb-4">
    {t("ourLocation") || "Our Location"}
  </p>
  <p className="text-sm text-muted-foreground mb-4">
    International Reticulation Business Promotion Private Limited<br />
    Raisen, Madhya Pradesh, India
  </p>

  <p className="font-semibold text-foreground mb-2">
    {t("bankDetails") || "Bank Details"}
  </p>
  <p className="text-sm text-muted-foreground">
    <strong>Bank Name:</strong> Bank of India <br />
    <strong>Account No:</strong> 908220110000065 <br />
    <strong>IFSC Code:</strong> BKID0009082 <br />
    <strong>SWIFT/BIC Code:</strong> BKIDINBBXXX <br />
    <strong>Branch:</strong> GAIRATGANJ BRANCH DISTT-RAISEN (MP)-464884
  </p>
</div>

        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Reticulation Business. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
