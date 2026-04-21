import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Layers, PenTool, Users, ShoppingCart, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Layers size={20} />, label: 'Categories', path: '/categories' },
    { icon: <ShoppingBag size={20} />, label: 'Products', path: '/products' },
    { icon: <PenTool size={20} />, label: 'Blog', path: '/blog' },
    { icon: <Users size={20} />, label: 'User Management', path: '/users' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/orders' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed top-0 md:top-[72px] bottom-0 left-0 z-[1000] transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        group bg-white border-r border-neutral-100/80
        w-64 lg:w-20 lg:hover:w-64 mx-0 md:mx-5 my-0 md:my-10 rounded-none md:rounded-xl shadow-none md:shadow-sm
      `}>
        {/* Container */}
        <div className="h-full flex flex-col py-6 overflow-hidden">

          {/* Mobile-only Header */}
          <div className="mb-4 w-full flex items-center justify-between px-6 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Menu</span>
            <button onClick={onClose} className="p-1 text-neutral-400 hover:text-red-500 transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 w-full space-y-1.5 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => `
                  flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group/item relative
                  ${isActive
                    ? 'bg-black text-white shadow-md shadow-black/5 font-semibold'
                    : 'text-neutral-400 hover:bg-neutral-50 hover:text-foreground'
                  }
                `}
              >
                {/* Center icons in the collapsed state, but fixed width to keep alignment */}
                <div className="w-8 h-8 flex items-center justify-center shrink-0 transition-all">
                  {item.icon}
                </div>

                <span className="text-sm font-semibold whitespace-nowrap opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform translate-x-0 lg:translate-x-3 lg:group-hover:translate-x-0">
                  {item.label}
                </span>

                {/* Tooltip for collapsed state (Desktop only) */}
                <div className="hidden lg:block absolute left-[calc(100%+0.75rem)] px-3 py-1.5 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-lg opacity-0 -translate-x-3 pointer-events-none group-hover:hidden group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all z-50 shadow-xl">
                  {item.label}
                </div>
              </NavLink>
            ))}
          </nav>

          {/* Logout Section */}
          <div className="w-full mt-auto px-3">
            <button
              onClick={logout}
              className="w-full flex items-center gap-4 p-3 rounded-xl text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 group/logout"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0 transition-all">
                <LogOut size={20} />
              </div>
              <span className="text-sm font-semibold whitespace-nowrap opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
