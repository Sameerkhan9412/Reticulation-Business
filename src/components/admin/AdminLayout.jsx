import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { Bell, User, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, loading, user, logout } = useAuth(); // 👈 logout और user destructure किया
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // or a redirect component
  }

  return (
    <div className="min-h-screen bg-secondary/50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="pl-14 md:pl-64 transition-all duration-300">
        {/* ✅ Top Navbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6 shadow-sm">
          
          {/* Left Section - Search */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>

          {/* Right Section - Notifications + User + Logout */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>

            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {user?.name || "Admin"}
              </span>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
