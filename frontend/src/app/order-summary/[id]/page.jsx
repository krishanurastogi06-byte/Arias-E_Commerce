"use client";
import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Package,
    Truck,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Clock,
    MapPin,
    CreditCard,
    Download,
    HelpCircle,
    ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

const OrderSummaryContent = () => {
    const params = useParams();
    const orderId = params.id || '404';

    // Mock detailed order data
    const orderDetails = {
        id: `#${orderId}`,
        date: 'March 24, 2024',
        status: orderId.includes('7721') ? 'Delivered' : 'Shipped',
        paymentMethod: 'Visa ending in 4242',
        shippingAddress: {
            name: 'Grace Sterling',
            line1: 'Skyline Apartments, Penthouse B',
            line2: 'Worli, Mumbai',
            city: 'Mumbai',
            state: 'MH',
            pincode: '400001',
            phone: '+91 98765 43210'
        },
        items: [
            {
                name: 'Silk Wrap Evening Gown',
                price: '₹2,599.00',
                qty: 1,
                image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop'
            },
            {
                name: 'Pearl Embellished Clutch',
                price: '₹2,000.00',
                qty: 1,
                image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=800&auto=format&fit=crop'
            }
        ],
        summary: {
            subtotal: '₹4,599.00',
            shipping: 'Free',
            tax: '₹0.00',
            total: '₹4,599.00'
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 font-sans text-[#1a1a1a]">
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">
                    <Link href="/" className="hover:text-accent-rose transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <Link href="/profile" className="hover:text-accent-rose transition-colors">Profile</Link>
                    <ChevronRight size={10} />
                    <span className="text-neutral-800">Order Summary</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold italic">Order Details</h1>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${orderDetails.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                {orderDetails.status}
                            </span>
                        </div>
                        <p className="text-neutral-500 font-medium">
                            Placed on <span className="text-[#1a1a1a]">{orderDetails.date}</span> • Order {orderDetails.id}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-6 h-12 rounded-xl border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:border-[#1a1a1a] transition-all">
                            <Download size={16} />
                            Invoice
                        </button>
                        {orderDetails.status !== 'Delivered' && (
                            <Link
                                href={`/track?id=${orderId}`}
                                className="flex items-center gap-2 px-6 h-12 rounded-xl bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-widest hover:bg-accent-rose transition-all shadow-lg shadow-black/10"
                            >
                                <Truck size={16} />
                                Track
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content: Items List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-100">
                            <div className="p-8 md:p-10 border-b border-neutral-50 flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                                    <ShoppingBag size={18} className="text-accent-rose" />
                                    Your Items ({orderDetails.items.length})
                                </h3>
                            </div>
                            <div className="divide-y divide-neutral-50">
                                {orderDetails.items.map((item, idx) => (
                                    <div key={idx} className="p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8 group">
                                        <div className="w-24 h-32 rounded-2xl overflow-hidden border border-neutral-50 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 className="text-lg font-bold text-[#1a1a1a] mb-1">{item.name}</h4>
                                            <p className="text-xs text-neutral-400 mb-4 tracking-wide uppercase italic">Premium Collection</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-bold text-neutral-300">Quantity</p>
                                                    <p className="text-sm font-bold">{item.qty}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-bold text-neutral-300">Price</p>
                                                    <p className="text-sm font-bold text-accent-rose">{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Help */}
                        <div className="bg-accent-blush/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 border border-accent-rose/5">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent-rose">
                                <HelpCircle size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-xl font-serif font-bold italic mb-2">Need assistance?</h4>
                                <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
                                    Whether it's a return, exchange, or style advice, our concierge is here to help you.
                                </p>
                            </div>
                            <Link href="/contact" className="btn-premium px-8 rounded-xl whitespace-nowrap">Contact Concierge</Link>
                        </div>
                    </div>

                    {/* Sidebar: Details & Summary */}
                    <div className="space-y-8">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-50">
                                <MapPin size={18} className="text-accent-rose" />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Shipping To</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-[#1a1a1a]">{orderDetails.shippingAddress.name}</p>
                                <p className="text-xs text-neutral-500 leading-relaxed italic">
                                    {orderDetails.shippingAddress.line1},<br />
                                    {orderDetails.shippingAddress.line2},<br />
                                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                                </p>
                                <p className="text-xs text-neutral-400 mt-4 pt-4 border-t border-neutral-50/50 italic">
                                    {orderDetails.shippingAddress.phone}
                                </p>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-50">
                                <CreditCard size={18} className="text-accent-rose" />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Payment</h3>
                            </div>
                            <p className="text-xs font-bold text-[#1a1a1a] italic">{orderDetails.paymentMethod}</p>
                        </div>

                        {/* Financial Summary */}
                        <div className="bg-neutral-900 text-white rounded-[2rem] p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-700">
                                <Package size={120} />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4 relative z-10">Financial Summary</h3>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between text-xs font-medium text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">{orderDetails.summary.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-neutral-400">
                                    <span>Shipping</span>
                                    <span className="text-accent-rose italic">{orderDetails.summary.shipping}</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-neutral-400">
                                    <span>Estimated Tax</span>
                                    <span className="text-white">{orderDetails.summary.tax}</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Total Amount</p>
                                        <p className="text-3xl font-bold italic font-serif text-accent-rose">{orderDetails.summary.total}</p>
                                    </div>
                                    <CheckCircle2 size={32} className="text-white/20" />
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/profile"
                            className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-[#1a1a1a] transition-colors"
                        >
                            <ArrowLeft size={12} />
                            Back to My Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderSummaryPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
                <div className="w-8 h-8 border-4 border-accent-rose border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <OrderSummaryContent />
        </Suspense>
    );
};

export default OrderSummaryPage;
