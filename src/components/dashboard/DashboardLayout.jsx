import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

const DashboardLayout = ({ children, userType, userName, navLinks }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-200px)] bg-gray-800/50 rounded-lg overflow-hidden">
      <Sidebar userType={userType} userName={userName} navLinks={navLinks} />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;