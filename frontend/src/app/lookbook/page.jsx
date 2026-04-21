"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Play, ShoppingBag, Sparkles } from 'lucide-react';
import { products } from '@/data/data';

/* ─── Curated looks ─────────────────────────────────────── */
const looks = [
    {
        id: 1,
        season: 'Spring / Summer',
        title: 'Golden Hour',
        subtitle: 'Where silk meets sunset.',
        description: 'Effortless luxury for long evenings — flowing silhouettes, sun-kissed fabrics, and an ease that moves with you.',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200&auto=format&fit=crop',
        accent: 'from-amber-900/70',
        products: [1, 15, 6], // slugs by id
    },
    {
        id: 2,
        season: 'Autumn / Winter',
        title: 'Quiet Luxury',
        subtitle: 'The power of understatement.',
        description: 'Cashmere, wool, and muted tones — a wardrobe built on quality that whispers confidence in every room.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
        accent: 'from-stone-900/70',
        products: [2, 8, 13],
    },
    {
        id: 3,
        season: 'Festive',
        title: 'Celebration',
        subtitle: 'Dressed for every occasion.',
        description: 'From intimate dinners to grand galas — our festive edit is a symphony of embroidery, velvet, and artisan craft.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
        accent: 'from-violet-900/70',
        products: [4, 9, 11],
    },
    {
        id: 4,
        season: 'Resort',
        title: 'Riviera Edit',
        subtitle: 'Sun, style, and ease.',
        description: 'Inspired by the Mediterranean coast — breezy linens, statement sandals, and accessories that catch the light.',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop',
        accent: 'from-sky-900/70',
        products: [6, 14, 10],
    },
];

/* ─── Editorial grid images ─────────────────────────────── */
const editorial = [
    { src: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop', span: 'row-span-2', label: 'Timeless' },
    { src: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=800&auto=format&fit=crop', span: '', label: 'Effortless' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop', span: '', label: 'Bold' },
    { src: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop', span: 'col-span-2', label: 'Statement' },
];

export default function LookbookPage() {
    const [activeLook, setActiveLook] = useState(0);
    const look = looks[activeLook];
    const lookProducts = look.products.map(id => products.find(p => p.id === id)).filter(Boolean);

    return (
        <main className="min-h-screen pt-20 bg-white overflow-x-hidden">

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="relative h-[90vh] flex items-end overflow-hidden bg-neutral-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop"
                        alt="Lookbook Hero"
                        fill
                        className="object-cover opacity-60"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="relative z-10 container mx-auto px-4 md:px-8 pb-16 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-bold mb-4">ARIA 2026 Collection</p>
                        <h1 className="text-white text-6xl md:text-8xl xl:text-[120px] font-black leading-none tracking-tight mb-6">
                            THE<br /><em className="font-serif not-italic text-white/40">Lookbook</em>
                        </h1>
                        <p className="text-white/70 text-lg max-w-md leading-relaxed mb-8">
                            Curated stories for the modern woman — where fashion meets feeling.
                        </p>
                        <a
                            href="#editorial"
                            className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-3.5 rounded-2xl hover:bg-neutral-100 transition-colors"
                        >
                            Explore Looks <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── Chapter Selector ──────────────────────────────── */}
            <section id="editorial" className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">Seasonal Stories</p>
                            <h2 className="text-4xl md:text-5xl font-black">The Chapters</h2>
                        </div>
                    </div>

                    {/* Chapter Tabs */}
                    <div className="flex gap-2 flex-wrap mb-12">
                        {looks.map((l, i) => (
                            <button
                                key={l.id}
                                onClick={() => setActiveLook(i)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeLook === i
                                    ? 'bg-black text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {l.season}
                            </button>
                        ))}
                    </div>

                    {/* Featured Look */}
                    <motion.div
                        key={look.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden min-h-[560px]"
                    >
                        {/* Image */}
                        <div className="relative min-h-[400px] lg:min-h-0">
                            <Image
                                src={look.image}
                                alt={look.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${look.accent} to-transparent`} />
                            <div className="absolute bottom-6 left-6">
                                <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">{look.season}</span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="bg-neutral-950 text-white p-10 md:p-14 flex flex-col justify-center">
                            <p className="text-white/40 text-xs uppercase tracking-[0.25em] font-bold mb-3">Look 0{activeLook + 1}</p>
                            <h3 className="text-4xl md:text-5xl font-black mb-2">{look.title}</h3>
                            <p className="text-white/40 text-xl font-serif italic mb-6">{look.subtitle}</p>
                            <p className="text-white/60 text-sm leading-relaxed mb-10">{look.description}</p>

                            {/* Shop The Look */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Shop This Look</p>
                                <div className="flex flex-col gap-3">
                                    {lookProducts.map(p => (
                                        <Link
                                            key={p.id}
                                            href={`/shop/${p.slug}`}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-neutral-800">
                                                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white line-clamp-1 group-hover:text-white/70 transition-colors">{p.title}</p>
                                                <p className="text-xs text-white/40">${p.price}</p>
                                            </div>
                                            <div className="shrink-0 w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                                <ChevronRight size={12} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/shop"
                                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                    <ShoppingBag size={12} /> Shop All
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Masonry Editorial Grid ────────────────────────── */}
            <section className="bg-neutral-50 py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mb-12 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">Editorial</p>
                        <h2 className="text-4xl md:text-5xl font-black">The Vision</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[280px]">
                        {editorial.map(({ src, span, label }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${span}`}
                            >
                                <Image
                                    src={src}
                                    alt={label}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest">{label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Collection Strip ─────────────────────── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">From The Collection</p>
                            <h2 className="text-3xl md:text-4xl font-black">Pieces to Live In</h2>
                        </div>
                        <Link
                            href="/shop"
                            className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            View All <ChevronRight size={16} />
                        </Link>
                    </div>

                    {/* Horizontal scroll product strip */}
                    <div className="flex gap-6 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                        {products.slice(0, 8).map(p => (
                            <Link
                                key={p.id}
                                href={`/shop/${p.slug}`}
                                className="snap-start shrink-0 w-56 group"
                            >
                                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 mb-3">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="224px"
                                    />
                                    {p.isNewArrival && (
                                        <span className="absolute top-3 left-3 bg-black text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">New</span>
                                    )}
                                </div>
                                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-0.5">{p.brand}</p>
                                <p className="text-sm font-semibold text-neutral-800 line-clamp-1 group-hover:text-neutral-500 transition-colors">{p.title}</p>
                                <p className="text-sm font-bold mt-0.5">₹{p.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Newsletter / Closing CTA ───────────────────────── */}
            <section className="relative overflow-hidden bg-neutral-900 text-white py-24 text-center">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop"
                        alt="bg"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <Sparkles size={32} className="text-white/20 mx-auto mb-6" />
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">New Chapters Drop Monthly</p>
                    <h2 className="text-4xl md:text-6xl font-black mb-4">Stay in the Story</h2>
                    <p className="text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
                        Get early access to each new lookbook chapter, exclusive styling notes, and first look at new arrivals.
                    </p>
                    <form
                        onSubmit={e => e.preventDefault()}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 bg-white/10 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-white/40 transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-white text-black font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-100 transition-colors text-sm whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

        </main>
    );
}
