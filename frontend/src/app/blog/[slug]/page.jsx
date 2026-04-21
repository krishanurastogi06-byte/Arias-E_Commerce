'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogs } from '@/data/data';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif">Article Not Found</h1>
          <Link href="/blog" className="btn-premium inline-block">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  return (
    <main className="bg-background min-h-screen pt-20">
      {/* Cinematic Header */}
      <header className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white space-y-6">
            <span className="text-accent-blush uppercase tracking-[0.4em] text-xs font-semibold">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-xs md:text-sm uppercase tracking-widest font-medium opacity-90">
              <span>{blog.date}</span>
              <span className="w-1 h-1 bg-white rounded-full" />
              <span>By {blog.author}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-20">
        <div 
          className="prose prose-lg prose-neutral max-w-none font-sans leading-relaxed text-neutral-700
            prose-headings:font-serif prose-headings:text-foreground prose-headings:font-normal
            prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:mb-8
            prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-serif prose-blockquote:text-luxury-gold prose-blockquote:border-l-luxury-gold prose-blockquote:py-4
            prose-li:list-disc prose-li:mb-2 prose-li:ml-4
            prose-strong:text-foreground prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Author Bio (Optional) */}
        <div className="mt-20 pt-12 border-t border-neutral-100 flex items-center space-x-6">
          <div className="w-16 h-16 bg-accent-beige rounded-full flex-shrink-0 flex items-center justify-center font-serif text-2xl text-luxury-gold uppercase">
            {blog.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="text-lg font-serif">{blog.author}</h4>
            <p className="text-sm text-neutral-500 font-sans">
              Fashion Historian & ARIA Creative Consultant. Obsessed with the intersection of tradition and modernity.
            </p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-accent-beige/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-semibold">
                Keep Reading
              </span>
              <h2 className="text-4xl font-serif">You Might Also Like</h2>
            </div>
            <Link href="/blog" className="text-xs uppercase tracking-widest font-semibold border-b border-black pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-colors">
              View All Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 card-premium">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <span className="text-[10px] text-luxury-gold uppercase tracking-widest block mb-2 font-medium">
                  {post.category}
                </span>
                <h3 className="text-xl font-serif leading-snug group-hover:text-luxury-gold transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <div className="py-20 flex justify-center">
        <Link href="/blog" className="btn-premium">
          Back to the Journal
        </Link>
      </div>
    </main>
  );
}
