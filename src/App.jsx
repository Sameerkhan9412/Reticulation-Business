import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import BlogPage from '@/pages/BlogPage';
import Contact from '@/pages/Contact';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Certificates from '@/pages/Certificates';
import Login from '@/pages/Login';
import CustomerDashboard from '@/pages/CustomerDashboard';
import SupplierDashboard from '@/pages/SupplierDashboard';
import JobSeekerDashboard from '@/pages/JobSeekerDashboard';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';
import RefundAndCancellationPolicy from '@/pages/RefundAndCancellationPolicy';
import ShippingPolicy from '@/pages/ShippingPolicy';
import SupplierPolicy from '@/pages/SupplierPolicy';
import JobSeekerPolicy from '@/pages/JobSeekerPolicy';
import PaymentTerms from '@/pages/PaymentTerms';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import NotFound from '@/pages/NotFound';
import Staples from '@/pages/Staples';
import SupplierRegistration from '@/pages/SupplierRegistration';
import JobRegistration from '@/pages/JobRegistration';
import ScrollToTop from '@/components/ScrollToTop';
import SearchResults from '@/pages/SearchResults';
import ThankYou from '@/pages/ThankYou';
import PaymentFailed from '@/pages/PaymentFailed';
import ForgotPassword from '@/pages/ForgotPassword';
import PaymentPage from '@/pages/PaymentPage';

// ✅ Admin pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminJobseekers from "./components/admin/AdminJobseekers";
import AdminSuppliers from "./components/admin/AdminSuppliers";
import PaymentsPage from "./components/admin/PaymentsPage";
import Users from '@/pages/admin/Users';

// 👇 Currency context
import { CurrencyProvider } from '@/context/CurrencyContext';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // ✅ Admin routes
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="jobseekers" element={<AdminJobseekers />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    );
  }

  // ✅ Normal site routes
  return (
    <CurrencyProvider>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/staples" element={<Staples />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register-supplier" element={<SupplierRegistration />} />
          <Route path="/register-job" element={<JobRegistration />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
          <Route path="/dashboard/job-seeker" element={<JobSeekerDashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/refund-cancellation-policy" element={<RefundAndCancellationPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/supplier-policy" element={<SupplierPolicy />} />
          <Route path="/job-seeker-policy" element={<JobSeekerPolicy />} />
          <Route path="/payment-terms" element={<PaymentTerms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </CurrencyProvider>
  );
}

export default App;
