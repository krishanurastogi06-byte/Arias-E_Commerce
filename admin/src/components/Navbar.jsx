import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full h-[72px] md:m-5 m-0 md:w-[calc(100%-40px)] md:rounded-xl rounded-none shadow-md md:shadow-sm bg-white border-b border-neutral-100 flex items-center px-6">
      <div className="flex-1 flex items-center justify-between mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center h-8">
          <img src="/logo.png" alt="Aria Logo" className="h-full object-contain" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-neutral-50 text-neutral-500 hover:text-luxury-gold transition-all group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-luxury-gold border-2 border-white rounded-full"></span>
          </button>

          <div className="h-8 w-[1px] bg-neutral-100 mx-1"></div>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-1 pr-2 rounded-full transition-all group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-accent-beige flex items-center justify-center font-bold text-luxury-gold text-xs shadow-sm">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] font-bold text-foreground leading-none mb-0.5">{user?.name || 'Admin'}</p>
              <p className="text-[8px] text-neutral-400 font-medium uppercase tracking-wider leading-none">Super Admin</p>
            </div>

            <div className="h-8 w-[1px] bg-neutral-100 mx-1"></div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-neutral-50 text-neutral-500 transition-all"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
