'use client';

import React from 'react';
import Link from 'next/link';
import { blogs } from '@/data/data';

export default function BlogPage() {
  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-medium animate-fade-in">
            Reflections & Insights
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
            The Journal
          </h1>
          <p className="max-w-xl text-neutral-500 font-sans leading-relaxed">
            Welcome to the ARIA Journal. A space dedicated to the art of craftsmanship, 
            timeless style, and the philosophy of quiet luxury.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-12">
          {blogs.map((blog, index) => (
            <Link 
              key={blog.id} 
              href={`/blog/${blog.slug}`}
              className="group block"
            >
              <article className="card-premium h-full flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-medium text-black rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 text-[10px] text-neutral-400 uppercase tracking-widest mb-4">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>By {blog.author}</span>
                  </div>
                  
                  <h2 className="text-2xl font-serif mb-4 group-hover:text-luxury-gold transition-colors duration-300 leading-snug">
                    {blog.title}
                  </h2>
                  
                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center text-xs uppercase tracking-[0.2em] font-medium text-black group-hover:translate-x-2 transition-transform duration-300">
                    Read Article
                    <svg 
                      className="ml-2 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-accent-beige rounded-3xl p-12 md:p-24 flex flex-col items-center text-center space-y-8 italic">
          <h2 className="text-3xl md:text-4xl font-serif max-w-2xl leading-relaxed">
            "Fashion is a language that creates itself in clothes to interpret reality."
          </h2>
          <div className="w-12 h-px bg-luxury-gold" />
          <p className="text-luxury-gold uppercase tracking-widest text-xs font-sans not-italic">
            Subscribe to our Journal
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mt-4">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow bg-white border border-neutral-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
            />
            <button className="btn-premium whitespace-nowrap">
              Join Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
