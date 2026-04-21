"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowRight, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useStore();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would handle registration or login logic here
    login();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 flex items-center justify-center px-4">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-neutral-100"
      >
        <div className="text-center mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegistering ? 'register' : 'login'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-serif font-bold italic mb-3">
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-neutral-400 text-sm italic">
                {isRegistering 
                  ? 'Join the ARIA family for a curated experience' 
                  : 'Enter your details to access your account'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {isRegistering && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Full Name</label>
                <div className="relative">
                   <UserIcon size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                   <input
                     type="text"
                     placeholder="e.g. Grace Sterling"
                     className="w-full h-14 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                     required={isRegistering}
                   />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                placeholder="e.g. grace@aria.com"
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                required
              />
            </div>
          </div>

          {!isRegistering && (
            <div className="text-right">
              <button type="button" className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-2 group relative overflow-hidden mt-4">
            <span className="relative z-10">{isRegistering ? 'Create Account' : 'Log In'}</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4 text-xs text-neutral-400">
          <div className="flex-1 h-[1px] bg-neutral-100" />
          <span>OR</span>
          <div className="flex-1 h-[1px] bg-neutral-100" />
        </div>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-8 py-4 px-6 rounded-2xl border border-neutral-200 text-sm font-bold uppercase tracking-widest hover:bg-[#faf9f6] transition-all flex items-center justify-center gap-2 group"
        >
          {isRegistering ? <LogIn size={16} /> : <UserPlus size={16} />}
          <span>{isRegistering ? 'Back to Login' : 'Create ARIA Account'}</span>
        </button>

      </motion.div>
    </div>
  );
};

export default LoginPage;
