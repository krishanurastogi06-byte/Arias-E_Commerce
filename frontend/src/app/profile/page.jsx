"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
   User,
   Package,
   MapPin,
   Phone,
   Mail,
   LogOut,
   ChevronRight,
   Heart,
   Settings,
   ShieldCheck,
   Clock,
   ExternalLink,
   ArrowRight,
   Truck,
   Eye,
   CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

const ProfilePage = () => {
   const { user, setUser, isLoggedIn, logout, isInitialized } = useStore();
   const router = useRouter();

   const [activeTab, setActiveTab] = useState('Account Details');
   const [isEditing, setIsEditing] = useState(false);
   const [tempUser, setTempUser] = useState(user);

   useEffect(() => {
      if (isInitialized && !isLoggedIn) {
         router.push('/login');
      }
   }, [isLoggedIn, isInitialized, router]);

   // Update tempUser when user changes (e.g. after initialization)
   useEffect(() => {
      if (user) {
         setTempUser(user);
      }
   }, [user]);

   if (!isInitialized || !isLoggedIn) return null;

   const handleLogout = () => {
      logout();
      router.push('/');
   };

   const handleEdit = () => {
      setTempUser(user);
      setIsEditing(true);
   };

   const handleCancel = () => {
      setTempUser(user);
      setIsEditing(false);
   };

   const handleSave = () => {
      setUser(tempUser);
      setIsEditing(false);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTempUser(prev => ({ ...prev, [name]: value }));
   };

   const recentOrders = [
      { 
         id: '#ORD-7721', 
         date: 'March 24, 2024', 
         total: '₹4,599.00', 
         status: 'Delivered', 
         items: 2,
         productName: 'Silk Wrap Evening Gown',
         productImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop',
         paymentStatus: 'Paid'
      },
      { 
         id: '#ORD-6691', 
         date: 'February 12, 2024', 
         total: '₹12,450.00', 
         status: 'Shipped', 
         items: 3,
         productName: 'Oversized Woolen Blazer',
         productImage: 'https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3ZlcmNvYXR8ZW58MHx8MHx8fDA%3D',
         paymentStatus: 'Paid'
      },
   ];

   const profileTransitions = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.5, ease: "easeOut" }
   };

   return (
      <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 font-sans text-[#1a1a1a]">
         <div className="container mx-auto px-4 md:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

               {/* Sidebar Navigation */}
               <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1 space-y-4"
               >
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col items-center text-center">
                     <div className="w-24 h-24 rounded-full bg-accent-beige flex items-center justify-center text-accent-rose mb-4 border-4 border-[#faf9f6]">
                        <User size={48} />
                     </div>
                     <h2 className="text-2xl font-serif font-bold italic">{user.name}</h2>
                     <p className="text-neutral-400 text-sm mt-1 mb-6 italic">Member since {user.joined}</p>

                     <div className="w-full space-y-2">
                        {[
                           { icon: User, label: 'Account Details' },
                           { icon: Package, label: 'My Orders' },
                           { icon: Settings, label: 'Preferences' }
                        ].map((item, idx) => (
                           <button
                              key={idx}
                              onClick={() => {
                                 setActiveTab(item.label);
                                 setIsEditing(false); // Reset editing mode when switching tabs
                              }}
                              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === item.label ? 'bg-[#1a1a1a] text-white' : 'hover:bg-neutral-50 text-neutral-500'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <item.icon size={18} />
                                 <span className="text-sm font-medium">{item.label}</span>
                              </div>
                              <ChevronRight size={14} className={activeTab === item.label ? 'opacity-100' : 'opacity-30'} />
                           </button>
                        ))}
                     </div>

                     <div className="w-full h-[1px] bg-neutral-100 my-6" />

                     <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300 group"
                     >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Log Out</span>
                     </button>
                  </div>

                  <div className="bg-[#1a1a1a] text-white rounded-3xl p-8 relative overflow-hidden group">
                     <ShieldCheck size={120} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                     <h4 className="text-sm font-bold uppercase tracking-widest text-accent-rose mb-3">ARIA Insider</h4>
                     <p className="text-xs text-neutral-400 leading-relaxed relative z-10">
                        You are a gold tier member. Enjoy exclusive early access to new collections and complimentary shipping on all orders.
                     </p>
                  </div>
               </motion.div>

               {/* Main Content Area */}
               <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                     {activeTab === 'Account Details' && (
                        <motion.section
                           key="account-details"
                           {...profileTransitions}
                           className="space-y-8"
                        >
                           <div className="flex justify-between items-center">
                              <h3 className="text-3xl font-serif font-bold italic">Personal Information</h3>
                              {!isEditing ? (
                                 <button
                                    onClick={handleEdit}
                                    className="text-xs font-bold uppercase tracking-widest text-accent-rose hover:text-[#1a1a1a] transition-colors border border-accent-rose/20 px-4 py-2 rounded-xl"
                                 >
                                    Edit Profile
                                 </button>
                              ) : (
                                 <div className="flex gap-3">
                                    <button
                                       onClick={handleCancel}
                                       className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors"
                                    >
                                       Cancel
                                    </button>
                                    <button
                                       onClick={handleSave}
                                       className="text-xs font-bold uppercase tracking-widest bg-[#1a1a1a] text-white px-4 py-2 rounded-xl"
                                    >
                                       Save Changes
                                    </button>
                                 </div>
                              )}
                           </div>

                           <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-1">Full Name</label>
                                 <div className="flex items-center gap-4 p-5 bg-[#faf9f6] rounded-2xl border border-neutral-50 focus-within:border-neutral-800 transition-all">
                                    <User size={18} className="text-accent-rose" />
                                    {isEditing ? (
                                       <input
                                          name="name"
                                          value={tempUser.name}
                                          onChange={handleInputChange}
                                          className="bg-transparent border-none outline-none w-full text-neutral-800 font-medium"
                                       />
                                    ) : (
                                       <span className="text-neutral-800 font-medium">{user.name}</span>
                                    )}
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-1">Email Address</label>
                                 <div className="flex items-center gap-4 p-5 bg-[#faf9f6] rounded-2xl border border-neutral-50 focus-within:border-neutral-800 transition-all">
                                    <Mail size={18} className="text-accent-rose" />
                                    {isEditing ? (
                                       <input
                                          name="email"
                                          value={tempUser.email}
                                          onChange={handleInputChange}
                                          className="bg-transparent border-none outline-none w-full text-neutral-800 font-medium"
                                       />
                                    ) : (
                                       <span className="text-neutral-800 font-medium">{user.email}</span>
                                    )}
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-1">Contact Number</label>
                                 <div className="flex items-center gap-4 p-5 bg-[#faf9f6] rounded-2xl border border-neutral-50 focus-within:border-neutral-800 transition-all">
                                    <Phone size={18} className="text-accent-rose" />
                                    {isEditing ? (
                                       <input
                                          name="phone"
                                          value={tempUser.phone}
                                          onChange={handleInputChange}
                                          className="bg-transparent border-none outline-none w-full text-neutral-800 font-medium"
                                       />
                                    ) : (
                                       <span className="text-neutral-800 font-medium">{user.phone}</span>
                                    )}
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-1">Default Address</label>
                                 <div className="flex items-start gap-4 p-5 bg-[#faf9f6] rounded-2xl border border-neutral-50 focus-within:border-neutral-800 transition-all">
                                    <MapPin size={18} className="text-accent-rose mt-1 shrink-0" />
                                    {isEditing ? (
                                       <textarea
                                          name="address"
                                          value={tempUser.address}
                                          onChange={handleInputChange}
                                          className="bg-transparent border-none outline-none w-full text-neutral-800 font-medium resize-none"
                                          rows={2}
                                       />
                                    ) : (
                                       <span className="text-neutral-800 font-medium leading-relaxed">{user.address}</span>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </motion.section>
                     )}

                     {activeTab === 'My Orders' && (
                        <motion.section
                           key="my-orders"
                           {...profileTransitions}
                           className="space-y-8"
                        >
                           <div className="flex justify-between items-end">
                              <h3 className="text-3xl font-serif font-bold italic">Order History</h3>
                              <button className="text-xs font-bold uppercase tracking-widest text-accent-rose hover:text-[#1a1a1a] transition-colors flex items-center gap-2">
                                 Sort By: Recent <ChevronRight size={14} className="rotate-90" />
                              </button>
                           </div>

                           <div className="space-y-6">
                              {recentOrders.map((order) => (
                                 <div key={order.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
                                       {/* Product Image */}
                                       <div className="w-24 h-32 md:w-20 md:h-24 rounded-2xl overflow-hidden shadow-sm border border-neutral-50 shrink-0">
                                          <img 
                                             src={order.productImage} 
                                             alt={order.productName} 
                                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                          />
                                       </div>

                                       <div className="flex-1 space-y-1 text-center md:text-left">
                                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                             <p className="text-base font-bold text-[#1a1a1a] tracking-tight">{order.id}</p>
                                             <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                                                order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                             }`}>
                                                {order.status}
                                             </span>
                                          </div>
                                          <p className="text-sm font-medium text-neutral-800 line-clamp-1">{order.productName}</p>
                                          <p className="text-xs text-neutral-400">{order.date} • {order.items} items</p>
                                       </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
                                       <div className="text-center sm:text-right">
                                          <p className="text-lg font-bold text-[#1a1a1a] leading-none mb-1">{order.total}</p>
                                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                             {order.paymentStatus === 'Paid' ? (
                                                <span className="flex items-center justify-center sm:justify-end gap-1 text-green-600/70">
                                                   <CheckCircle size={10} /> Paid
                                                </span>
                                             ) : (
                                                <span className="text-orange-500">Unpaid</span>
                                             )}
                                          </p>
                                       </div>

                                       <div className="flex items-center gap-3 w-full sm:w-auto">
                                          <Link 
                                             href={`/order-summary/${order.id.replace('#', '')}`}
                                             className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-neutral-50 text-[#1a1a1a] text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                                          >
                                             <Eye size={16} />
                                             <span className="hidden xl:inline">Summary</span>
                                          </Link>
                                          
                                          {order.status !== 'Delivered' && (
                                             <Link 
                                                href={`/track?id=${order.id.replace('#', '')}`}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-widest hover:bg-accent-rose transition-all duration-300"
                                             >
                                                <Truck size={16} />
                                                <span className="hidden xl:inline">Track</span>
                                             </Link>
                                          )}

                                          {order.status === 'Delivered' && (
                                             <button className="w-12 h-12 rounded-xl border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-[#1a1a1a] hover:border-neutral-800 transition-all">
                                                <ArrowRight size={18} />
                                             </button>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </motion.section>
                     )}

                     {activeTab === 'Preferences' && (
                        <motion.section
                           key="preferences"
                           {...profileTransitions}
                           className="space-y-8"
                        >
                           <h3 className="text-3xl font-serif font-bold italic">Preferences</h3>
                           <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-100 space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                 <div className="space-y-6">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-800">Notifications</h4>
                                    <div className="space-y-4">
                                       {[
                                          { label: 'Email Notifications', desc: 'Receive updates about your orders and returns' },
                                          { label: 'SMS Alerts', desc: 'Get real-time shipping updates on your phone' },
                                          { label: 'Newsletter', desc: 'Be the first to know about new collections' }
                                       ].map((pref, i) => (
                                          <div key={i} className="flex items-center justify-between">
                                             <div>
                                                <p className="text-sm font-bold text-neutral-800">{pref.label}</p>
                                                <p className="text-[11px] text-neutral-400">{pref.desc}</p>
                                             </div>
                                             <div className="w-12 h-6 bg-accent-rose/20 rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-accent-rose rounded-full" />
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                                 <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-800">Regional Settings</h4>
                                    <div className="space-y-4">
                                       <div className="space-y-2">
                                          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-1">Currency</label>
                                          <select className="w-full h-12 px-5 bg-[#faf9f6] border border-neutral-100 rounded-xl text-sm font-bold outline-none appearance-none">
                                             <option>INR (₹)</option>
                                             <option>USD ($)</option>
                                             <option>EUR (€)</option>
                                          </select>
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-1">Language</label>
                                          <select className="w-full h-12 px-5 bg-[#faf9f6] border border-neutral-100 rounded-xl text-sm font-bold outline-none appearance-none">
                                             <option>English (UK)</option>
                                             <option>English (US)</option>
                                             <option>Hindi (IN)</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="pt-8 border-t border-neutral-50">
                                 <button className="btn-premium px-8 rounded-xl text-[11px]">Save Preferences</button>
                              </div>
                           </div>
                        </motion.section>
                     )}
                  </AnimatePresence>

                  {/* Loyalty Card - Persistent at the bottom of main content */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.5 }}
                     className="bg-accent-blush/30 rounded-[2.5rem] p-10 md:p-14 border border-accent-rose/10 flex flex-col md:flex-row items-center gap-12 mt-12"
                  >
                     <div className="flex-1 space-y-6 text-center md:text-left">
                        <h3 className="text-3xl font-serif font-bold italic tracking-tight">ARIA Loyalty Program</h3>
                        <p className="text-neutral-500 max-w-md leading-relaxed">
                           You're only 2,500 points away from the Platinum Tier. Unlock curated style experiences and private preview access.
                        </p>
                        <button className="btn-premium px-10 rounded-2xl">Discover Benefits</button>
                     </div>
                     <div className="w-48 h-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center relative bg-white">
                        <div className="text-center">
                           <p className="text-3xl font-bold text-[#1a1a1a]">77%</p>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">to Platinum</p>
                        </div>
                        <svg className="absolute inset-0 w-full h-full -rotate-90 p-4">
                           <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#f5f0e6" strokeWidth="8" />
                           <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#d4a373" strokeWidth="8" strokeDasharray="241" strokeDashoffset="55" strokeLinecap="round" />
                        </svg>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
