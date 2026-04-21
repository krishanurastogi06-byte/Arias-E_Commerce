"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, } from 'lucide-react';
import Link from 'next/link';
import { contactData } from '@/data/data';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-8">

                {/* Hero Section */}
                <motion.div
                    className="text-center mb-20"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-serif font-bold italic mb-6 text-[#1a1a1a]"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Whether you have a question about our collections, need styling advice, or just want to say hello, we'd love to hear from you.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Contact Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100"
                    >
                        <h2 className="text-3xl font-serif font-bold mb-8 text-[#1a1a1a]">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Jane Doe"
                                        className="w-full bg-[#faf9f6] border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:border-accent-rose outline-none transition-all placeholder:text-neutral-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="jane@example.com"
                                        className="w-full bg-[#faf9f6] border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:border-accent-rose outline-none transition-all placeholder:text-neutral-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Subject</label>
                                <input
                                    required
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Inquiry about Order #12345"
                                    className="w-full bg-[#faf9f6] border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:border-accent-rose outline-none transition-all placeholder:text-neutral-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Your Message</label>
                                <textarea
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Tell us how we can help..."
                                    className="w-full bg-[#faf9f6] border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:border-accent-rose outline-none transition-all placeholder:text-neutral-300 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full group relative overflow-hidden btn-premium h-14 flex items-center justify-center gap-3 ${isSubmitted ? 'bg-green-600' : ''}`}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : isSubmitted ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Message Sent Successfully
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Message</span>
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-8 text-[#1a1a1a]">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent-rose shrink-0 border border-neutral-50">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-1">Our Location</h4>
                                        <p className="text-[#1a1a1a] leading-relaxed">{contactData.address}</p>
                                        <p className="text-neutral-500 text-sm mt-1 italic">Nearest Metro: {contactData.nearestMetro}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent-rose shrink-0 border border-neutral-50">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-1">Call Us</h4>
                                        <p className="text-[#1a1a1a] font-medium text-lg">{contactData.phone}</p>
                                        <p className="text-neutral-500 text-sm mt-1">Available during business hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent-rose shrink-0 border border-neutral-50">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-1">Email Us</h4>
                                        <p className="text-[#1a1a1a] font-medium text-lg">{contactData.email}</p>
                                        <p className="text-neutral-500 text-sm mt-1">We usually respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-neutral-200/60">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-6">Connect with us</h3>
                            <div className="flex gap-4">
                                {[
                                    {
                                        name: 'Instagram',
                                        url: contactData.socials.find(s => s.name === 'Instagram')?.url || '#',
                                        path: 'M14.175 4.825H14.1835M5.25 1H13.75C16.0972 1 18 2.90279 18 5.25V13.75C18 16.0972 16.0972 18 13.75 18H5.25C2.90279 18 1 16.0972 1 13.75V5.25C1 2.90279 2.90279 1 5.25 1ZM12.9 8.9645C13.0049 9.67191 12.8841 10.3944 12.5547 11.0292C12.2253 11.6639 11.7042 12.1787 11.0654 12.5002C10.4266 12.8217 9.70268 12.9337 8.99662 12.82C8.29056 12.7064 7.6383 12.3731 7.13261 11.8674C6.62693 11.3617 6.29357 10.7094 6.17996 10.0034C6.06634 9.29732 6.17826 8.57341 6.49978 7.93462C6.8213 7.29583 7.33606 6.77468 7.97084 6.44531C8.60562 6.11593 9.32809 5.9951 10.0355 6.1C10.7571 6.207 11.4251 6.54324 11.9409 7.05906C12.4568 7.57488 12.793 8.24292 12.9 8.9645Z',
                                        viewBox: '0 0 19 19',
                                        strokeWidth: 2
                                    },
                                    {
                                        name: 'Facebook',
                                        url: contactData.socials.find(s => s.name === 'Facebook')?.url || '#',
                                        path: 'M10 0.5L10.1006 0.509766C10.3286 0.556292 10.5 0.758287 10.5 1V4.27246C10.5 4.5486 10.2761 4.77246 10 4.77246H7.5459C7.46151 4.77246 7.37998 4.80654 7.32031 4.86621C7.2608 4.92584 7.22756 5.00657 7.22754 5.09082V7.0459H10C10.1539 7.0459 10.2998 7.11599 10.3945 7.2373C10.4893 7.35866 10.5227 7.51762 10.4854 7.66699L9.66699 10.9395C9.61135 11.162 9.41107 11.3184 9.18164 11.3184H7.22754V17.3633C7.22754 17.6393 7.00356 17.8631 6.72754 17.8633H3.4541C3.17816 17.863 2.9541 17.6393 2.9541 17.3633V11.3184H1C0.723917 11.3184 0.500096 11.0944 0.5 10.8184V7.5459L0.509766 7.44434C0.556489 7.21662 0.758467 7.0459 1 7.0459H2.9541V5.09082C2.95413 3.87337 3.43803 2.70565 4.29883 1.84473C5.15979 0.983764 6.32831 0.5 7.5459 0.5H10Z',
                                        viewBox: '0 0 11 19',
                                        strokeWidth: 1.5
                                    },
                                    {
                                        name: 'LinkedIn',
                                        url: '#',
                                        path: 'M13.2715 5.22363C14.3178 5.22363 15.0782 5.56743 15.6201 6.21973L15.623 6.22363C16.1895 6.89322 16.5 7.82853 16.5 9.08594V14.5039H13.5V9.59277C13.5 9.02367 13.3427 8.51394 12.9775 8.12305H12.9785C12.9749 8.11894 12.9704 8.11539 12.9668 8.11133C12.9655 8.10993 12.9642 8.10784 12.9629 8.10645H12.9619C12.6023 7.70569 12.1202 7.51760 11.5703 7.51758C11.076 7.51758 10.6337 7.66284 10.2871 7.97754L10.1514 8.11523C9.79206 8.50876 9.64062 9.02199 9.64062 9.59277V14.5039H6.62207V5.2959H9.64062V8.03906L10.5596 6.625C10.8279 6.21226 11.1838 5.87396 11.6357 5.61035L11.6367 5.61133C12.0794 5.35988 12.6182 5.22364 13.2715 5.22363ZM3.80762 5.2959V14.5039H0.790039V5.2959H3.80762ZM2.31641 0.5C2.90592 0.5 3.33229 0.662768 3.64453 0.948242L3.65039 0.953125C3.96229 1.22938 4.11518 1.5685 4.11523 2.00879C4.11523 2.43363 3.96492 2.76829 3.65039 3.04688C3.33851 3.32303 2.90992 3.48145 2.31641 3.48145C1.7084 3.48139 1.27512 3.32163 0.964844 3.04688C0.650316 2.76829 0.5 2.43363 0.5 2.00879C0.500053 1.5685 0.652942 1.22938 0.964844 0.953125L0.970703 0.948242C1.2813 0.664271 1.71237 0.500054 2.31641 0.5Z',
                                        viewBox: '0 0 17 15',
                                        strokeWidth: 1.5
                                    }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1a1a1a] hover:text-accent-rose transition-all duration-300 border border-neutral-100"
                                    >
                                        <svg
                                            width={20}
                                            height={20}
                                            viewBox={social.viewBox}
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="transition-colors duration-300"
                                        >
                                            <path
                                                d={social.path}
                                                stroke="currentColor"
                                                strokeWidth={social.strokeWidth}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Clock size={120} />
                            </div>
                            <h3 className="text-lg font-serif font-bold mb-6 italic relative z-10 text-accent-rose">Business Hours</h3>
                            <div className="space-y-4 relative z-10">
                                {contactData.workingHours.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <span className="text-neutral-400 font-medium">{item.day}</span>
                                        <span className="font-semibold">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-24 rounded-[2rem] overflow-hidden shadow-2xl h-[450px] relative border-4 border-white"
                >
                    <iframe
                        src={contactData.locations[0].mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-1000"
                    ></iframe>
                </motion.div>

            </div>
        </div>
    );
};

export default ContactPage;
