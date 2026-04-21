"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Tag, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
   const pathname = usePathname();

   const navItems = [
      { name: 'Home', icon: Home, href: '/' },
      { name: 'Shop', icon: ShoppingBag, href: '/shop' },
      { name: 'Sale', icon: Tag, href: '/sale' },
      { name: 'Profile', icon: User, href: '/profile' },
   ];

   const isActive = (href) => {
      if (href === '/' && pathname === '/') return true;
      if (href !== '/' && pathname.startsWith(href)) return true;
      // Also consider /login as part of Profile for mobile nav highlighting
      if (href === '/profile' && pathname === '/login') return true;
      return false;
   };

   return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-neutral-100 z-50 lg:hidden px-4 pb-safe">
         <div className="flex justify-between items-center h-16 max-w-md mx-auto">
            {navItems.map((item) => {
               const active = isActive(item.href);
               const Icon = item.icon;

               return (
                  <Link
                     key={item.name}
                     href={item.href}
                     className="relative flex flex-col items-center justify-center w-full h-full gap-1 group"
                  >
                     <motion.div
                        initial={false}
                        animate={active ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                        className={`transition-colors duration-300 ${
                           active ? 'text-[#1a1a1a]' : 'text-neutral-400 group-hover:text-neutral-600'
                        }`}
                     >
                        <Icon size={20} className={active ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
                     </motion.div>
                     
                     <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                        active ? 'text-[#1a1a1a]' : 'text-neutral-400'
                     }`}>
                        {item.name}
                     </span>

                     {active && (
                        <motion.div
                           layoutId="bottom-nav-indicator"
                           className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#1a1a1a] rounded-full"
                        />
                     )}
                  </Link>
               );
            })}
         </div>
      </nav>
   );
};

export default BottomNav;
