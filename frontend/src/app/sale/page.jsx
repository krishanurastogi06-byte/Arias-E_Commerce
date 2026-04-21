"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Zap, Clock, ShoppingBag, ChevronRight, Flame } from 'lucide-react';
import { products } from '@/data/data';
import ProductCard from '@/components/ProductCard';

/* ─── Countdown to midnight ────────────────────────────── */
function useCountdown() {
    const getTimeLeft = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;
        return {
            hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
            minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
            seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
        };
    };
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);
    return timeLeft;
}

/* ─── Savings calculator ────────────────────────────────── */
function getSavings(product) {
    if (!product.oldPrice) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

export default function SalePage() {
    const { hours, minutes, seconds } = useCountdown();
    const [activeFilter, setActiveFilter] = useState('All');

    const saleProducts = useMemo(() =>
        [...products].filter(p => p.oldPrice).sort((a, b) => getSavings(b) - getSavings(a)),
        []
    );

    const categories = ['All', ...Array.from(new Set(saleProducts.map(p => p.category)))];

    const filtered = useMemo(() =>
        activeFilter === 'All' ? saleProducts : saleProducts.filter(p => p.category === activeFilter),
        [activeFilter, saleProducts]
    );

    const maxDiscount = useMemo(() => Math.max(...saleProducts.map(getSavings)), [saleProducts]);
    const totalSavings = useMemo(() =>
        saleProducts.reduce((acc, p) => acc + (p.oldPrice - p.price), 0).toFixed(0),
        [saleProducts]
    );
    const featuredProduct = saleProducts[0]; // highest discount

    return (
        <main className="min-h-screen pt-20 bg-white">

            {/* ── Hero Banner ─────────────────────────────────── */}
            <section className="relative overflow-hidden bg-neutral-900 text-white">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
                        alt="Sale Banner"
                        fill
                        className="object-cover opacity-20"
                        priority
                        sizes="100vw"
                    />
                    {/* Red gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-neutral-900/80 to-neutral-900" />
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-8 py-20 md:py-28">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Copy */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                                <Flame size={12} className="fill-red-400" />
                                Limited Time Sale
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black leading-none mb-4 tracking-tight">
                                UP TO<br />
                                <span className="text-red-500">{maxDiscount}%</span> OFF
                            </h1>
                            <p className="text-neutral-300 text-lg leading-relaxed max-w-md mb-8">
                                Our biggest sale of the season. Premium styles at prices you won't believe — but only while stocks last.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#sale-grid"
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-colors"
                                >
                                    <ShoppingBag size={18} /> Shop the Sale
                                </a>
                                <Link
                                    href="/shop"
                                    className="border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-2xl flex items-center gap-2 transition-colors"
                                >
                                    Full Collection <ChevronRight size={16} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: Countdown + Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Countdown */}
                            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6">
                                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-bold mb-5">
                                    <Clock size={14} /> Sale ends at midnight
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[{ label: 'Hours', value: hours }, { label: 'Minutes', value: minutes }, { label: 'Seconds', value: seconds }].map(({ label, value }) => (
                                        <div key={label} className="text-center bg-white/5 rounded-2xl py-4">
                                            <p className="text-4xl font-black tabular-nums">{value}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">{label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: Tag, value: `${saleProducts.length}`, label: 'Items on Sale' },
                                    { icon: Zap, value: `${maxDiscount}%`, label: 'Max Discount' },
                                    { icon: ShoppingBag, value: `$${totalSavings}+`, label: 'Total Savings' },
                                ].map(({ icon: Icon, value, label }) => (
                                    <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                        <Icon size={18} className="text-red-400 mx-auto mb-2" />
                                        <p className="text-xl font-black">{value}</p>
                                        <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Best Deal Banner ────────────────────────────── */}
            {featuredProduct && (
                <section className="bg-red-50 border-y border-red-100 py-8">
                    <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                                <Image src={featuredProduct.image} alt={featuredProduct.title} fill className="object-cover" sizes="56px" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-0.5">🔥 Best Deal</p>
                                <p className="text-sm font-semibold text-neutral-800">{featuredProduct.title}</p>
                                <p className="text-xs text-neutral-500">{featuredProduct.discount} · Only <span className="font-bold text-red-500">₹{featuredProduct.price}</span></p>
                            </div>
                        </div>
                        <Link
                            href={`/shop/${featuredProduct.slug}`}
                            className="shrink-0 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                        >
                            Grab Deal <ChevronRight size={14} />
                        </Link>
                    </div>
                </section>
            )}

            {/* ── Products Grid ────────────────────────────────── */}
            <section id="sale-grid" className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">

                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-2">All On Sale</p>
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Sale <span className="italic font-serif text-neutral-400">Picks</span>
                            </h2>
                        </div>
                        <p className="text-sm text-neutral-500">{filtered.length} items found</p>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeFilter === cat
                                    ? 'bg-red-500 text-white shadow-md shadow-red-200'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
                        >
                            {filtered.map((product) => (
                                <div key={product.id} className="relative">
                                    {/* Savings badge overlay */}
                                    <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                                        Save {getSavings(product)}%
                                    </div>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                </div>
            </section>

            {/* ── Bottom CTA ──────────────────────────────────── */}
            <section className="bg-neutral-900 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">Don't miss out</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">More styles in full collection</h2>
                    <p className="text-neutral-400 mb-8 max-w-md mx-auto">Explore everything ARIA has to offer beyond the sale — new arrivals added weekly.</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-neutral-100 transition-colors"
                    >
                        Browse All <ChevronRight size={18} />
                    </Link>
                </div>
            </section>

        </main>
    );
}
