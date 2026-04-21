"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    Package, 
    Truck, 
    CheckCircle2, 
    ChevronRight, 
    ArrowLeft,
    Clock,
    MapPin,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const TrackOrderContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id') || '404';

    const steps = [
        { title: 'Order Placed', date: 'March 24, 2024, 10:30 AM', status: 'completed', icon: Package },
        { title: 'Processing', date: 'March 24, 2024, 02:15 PM', status: 'completed', icon: Clock },
        { title: 'Shipped', date: 'March 25, 2024, 09:00 AM', status: 'current', icon: Truck },
        { title: 'Delivered', date: 'Expected by March 27', status: 'upcoming', icon: CheckCircle2 }
    ];

    return (
        <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 font-sans text-[#1a1a1a]">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">
                    <Link href="/" className="hover:text-accent-rose transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <Link href="/profile" className="hover:text-accent-rose transition-colors">Profile</Link>
                    <ChevronRight size={10} />
                    <span className="text-neutral-800">Track Order</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">Track Your Order</h1>
                        <p className="text-neutral-500 font-medium">Order ID: <span className="text-[#1a1a1a]">#{orderId}</span></p>
                    </div>
                    <Link 
                        href="/profile" 
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-accent-rose transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Orders
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Progress Card */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100">
                            <div className="space-y-12">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="relative flex gap-8 group">
                                        {/* Line */}
                                        {idx !== steps.length - 1 && (
                                            <div className={`absolute left-7 top-14 w-[2px] h-12 ${
                                                step.status === 'completed' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'
                                            }`} />
                                        )}
                                        
                                        {/* Icon Container */}
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                                            step.status === 'completed' ? 'bg-[#1a1a1a] text-white shadow-xl shadow-black/10' : 
                                            step.status === 'current' ? 'bg-accent-rose text-white shadow-xl shadow-rose-200' : 
                                            'bg-neutral-50 text-neutral-300 border border-neutral-100'
                                        }`}>
                                            <step.icon size={24} />
                                        </div>

                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className={`text-base font-bold tracking-tight ${
                                                    step.status === 'upcoming' ? 'text-neutral-300' : 'text-[#1a1a1a]'
                                                }`}>
                                                    {step.title}
                                                </h3>
                                                {step.status === 'completed' && (
                                                    <CheckCircle2 size={16} className="text-green-500" />
                                                )}
                                            </div>
                                            <p className={`text-xs font-medium ${
                                                step.status === 'upcoming' ? 'text-neutral-200' : 'text-neutral-400'
                                            }`}>
                                                {step.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-neutral-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden group">
                           <Truck size={120} className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                              <div className="w-16 h-16 rounded-2xl bg-accent-rose/20 flex items-center justify-center text-accent-rose">
                                 <ShieldCheck size={32} />
                              </div>
                              <div className="flex-1 text-center md:text-left">
                                 <h4 className="text-lg font-serif font-bold italic mb-2">Delivery Guarantee</h4>
                                 <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                                    Your package is insured and handled with the utmost care. If you have any concerns regarding your delivery, our concierge team is available 24/7.
                                 </p>
                              </div>
                           </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-100">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] mb-6 border-b border-neutral-50 pb-4">Shipping Address</h3>
                            <div className="flex gap-4">
                                <MapPin size={18} className="text-accent-rose shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-[#1a1a1a] mb-1 italic">Grace Sterling</p>
                                    <p className="text-xs text-neutral-500 leading-relaxed italic">
                                        Skyline Apartments, Penthouse B,<br />
                                        Mumbai, MH - 400001
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-accent-blush/20 rounded-[2rem] p-8 border border-accent-rose/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] mb-6 border-b border-accent-rose/10 pb-4">Order Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-neutral-500">Subtotal</span>
                                    <span className="text-[#1a1a1a]">₹4,200.00</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-neutral-500">Shipping</span>
                                    <span className="text-green-600 italic">Free</span>
                                </div>
                                <div className="pt-4 border-t border-accent-rose/10 flex justify-between items-end">
                                    <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-xl font-bold text-[#1a1a1a]">₹4,200.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrackOrderPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
                <div className="w-8 h-8 border-4 border-accent-rose border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <TrackOrderContent />
        </Suspense>
    );
};

export default TrackOrderPage;
