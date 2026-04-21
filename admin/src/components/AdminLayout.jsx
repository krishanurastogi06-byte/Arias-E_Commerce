import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6]">
      {/* Top Navbar: Full Width */}
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-0 md:pt-24">
        {/* Sidebar: Sits below Navbar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content: Adjust padding based on sidebar width */}
        <main className="flex-1 lg:pl-20 transition-all duration-300 min-h-[calc(100vh-72px)] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dynamic Page Content */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
