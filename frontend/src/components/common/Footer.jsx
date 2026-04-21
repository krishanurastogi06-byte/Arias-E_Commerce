"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12" id="footer">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Info */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif font-bold italic tracking-tighter">ARIA</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Elevating female fashion since 2024. We believe in style that empowers and confidence that inspires.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.175 4.825H14.1835M5.25 1H13.75C16.0972 1 18 2.90279 18 5.25V13.75C18 16.0972 16.0972 18 13.75 18H5.25C2.90279 18 1 16.0972 1 13.75V5.25C1 2.90279 2.90279 1 5.25 1ZM12.9 8.9645C13.0049 9.67191 12.8841 10.3944 12.5547 11.0292C12.2253 11.6639 11.7042 12.1787 11.0654 12.5002C10.4266 12.8217 9.70268 12.9337 8.99662 12.82C8.29056 12.7064 7.6383 12.3731 7.13261 11.8674C6.62693 11.3617 6.29357 10.7094 6.17996 10.0034C6.06634 9.29732 6.17826 8.57341 6.49978 7.93462C6.8213 7.29583 7.33606 6.77468 7.97084 6.44531C8.60562 6.11593 9.32809 5.9951 10.0355 6.1C10.7571 6.207 11.4251 6.54324 11.9409 7.05906C12.4568 7.57488 12.793 8.24292 12.9 8.9645Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0.5L10.1006 0.509766C10.3286 0.556292 10.5 0.758287 10.5 1V4.27246C10.5 4.5486 10.2761 4.77246 10 4.77246H7.5459C7.46151 4.77246 7.37998 4.80654 7.32031 4.86621C7.2608 4.92584 7.22756 5.00657 7.22754 5.09082V7.0459H10C10.1539 7.0459 10.2998 7.11599 10.3945 7.2373C10.4893 7.35866 10.5227 7.51762 10.4854 7.66699L9.66699 10.9395C9.61135 11.162 9.41107 11.3184 9.18164 11.3184H7.22754V17.3633C7.22754 17.6393 7.00356 17.8631 6.72754 17.8633H3.4541C3.17816 17.863 2.9541 17.6393 2.9541 17.3633V11.3184H1C0.723917 11.3184 0.500096 11.0944 0.5 10.8184V7.5459L0.509766 7.44434C0.556489 7.21662 0.758467 7.0459 1 7.0459H2.9541V5.09082C2.95413 3.87337 3.43803 2.70565 4.29883 1.84473C5.15979 0.983764 6.32831 0.5 7.5459 0.5H10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2715 5.22363C14.3178 5.22363 15.0782 5.56743 15.6201 6.21973L15.623 6.22363C16.1895 6.89322 16.5 7.82853 16.5 9.08594V14.5039H13.5V9.59277C13.5 9.02367 13.3427 8.51394 12.9775 8.12305H12.9785C12.9749 8.11894 12.9704 8.11539 12.9668 8.11133C12.9655 8.10993 12.9642 8.10784 12.9629 8.10645H12.9619C12.6023 7.70569 12.1202 7.51760 11.5703 7.51758C11.076 7.51758 10.6337 7.66284 10.2871 7.97754L10.1514 8.11523C9.79206 8.50876 9.64062 9.02199 9.64062 9.59277V14.5039H6.62207V5.2959H9.64062V8.03906L10.5596 6.625C10.8279 6.21226 11.1838 5.87396 11.6357 5.61035L11.6367 5.61133C12.0794 5.35988 12.6182 5.22364 13.2715 5.22363ZM3.80762 5.2959V14.5039H0.790039V5.2959H3.80762ZM2.31641 0.5C2.90592 0.5 3.33229 0.662768 3.64453 0.948242L3.65039 0.953125C3.96229 1.22938 4.11518 1.5685 4.11523 2.00879C4.11523 2.43363 3.96492 2.76829 3.65039 3.04688C3.33851 3.32303 2.90992 3.48145 2.31641 3.48145C1.7084 3.48139 1.27512 3.32163 0.964844 3.04688C0.650316 2.76829 0.5 2.43363 0.5 2.00879C0.500053 1.5685 0.652942 1.22938 0.964844 0.953125L0.970703 0.948242C1.2813 0.664271 1.71237 0.500054 2.31641 0.5Z" stroke="currentColor" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:pl-12">
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-neutral-200">Quick Links</h4>
            <ul className="space-y-4 flex flex-col">
              <Link href="/shop?filter=new" className="text-neutral-400 hover:text-white transition-colors text-sm">
                New Arrival
              </Link>
              <Link href="/shop" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Shop All
              </Link>
              <Link href="/sale" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Offers & Sale
              </Link>
              <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-neutral-200">Support</h4>
            <ul className="space-y-4">
              {['Shipping Policy', 'Returns & Exchanges', 'Track Order', 'FAQs', 'Size Guide'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold uppercase tracking-widest text-neutral-200">Join the Circle</h4>
            <p className="text-neutral-400 text-sm italic">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent border-b border-neutral-700 pb-3 text-sm focus:border-white outline-none transition-colors pr-10"
              />
              <button className="absolute right-0 bottom-3 text-neutral-500 group-hover:text-white transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-neutral-800 mb-10">
          <div className="flex items-center gap-4 text-neutral-300">
            <Phone size={18} className="text-accent-rose" />
            <span className="text-sm">+91 81300 65326</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <Mail size={18} className="text-accent-rose" />
            <span className="text-sm">support@ariafashion.com</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <MapPin size={18} className="text-accent-rose" />
            <span className="text-sm">Aira Fashion A-88, Sector 4 Noida, <br /> Uttar Pradesh – 201301 Nearest Metro – Sector 16</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 uppercase tracking-widest">
          <p>© 2026 ARIA Fashion. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
