"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogIn, ArrowRight, UserPlus, Mail, Lock, User as UserIcon, Phone, Loader2, MapPin, Building, Home } from 'lucide-react';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const [addressData, setAddressData] = useState({
    street: "",
    area: "",
    city: "",
    state: "",
    country: "India",
    pincode: ""
  });

  const [timer, setTimer] = useState(60);

  const { login } = useStore();
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (isVerifying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isVerifying, timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';
    const endpoint = isRegistering ? '/users/register' : '/users/login';

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isRegistering ? formData : { email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.notVerified) {
          setIsVerifying(true);
          setTimer(60);
          setSuccess("Please verify your email to continue.");
          return;
        }
        throw new Error(data.message || "Something went wrong");
      }

      if (isRegistering) {
        setIsVerifying(true);
        setTimer(60);
        setSuccess("Account created! Please check your email for the OTP.");
      } else {
        if (!data.user.address || !data.user.address.city) {
          login(data.user, data.token);
          setIsAddingAddress(true);
        } else {
          login(data.user, data.token);
          router.push('/');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';

    try {
      const response = await fetch(`${baseUrl}/users/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      login(data.user, data.token);
      
      if (!data.user.address || !data.user.address.city) {
        setIsVerifying(false);
        setIsAddingAddress(true);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';
    const token = localStorage.getItem('aria_token');

    try {
      const response = await fetch(`${baseUrl}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ address: addressData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update address");
      }

      localStorage.setItem('aria_user', JSON.stringify(data.user));
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';

    try {
      const response = await fetch(`${baseUrl}/users/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setSuccess("New OTP sent to your email!");
      setTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
              key={isAddingAddress ? 'address' : isVerifying ? 'verify' : isRegistering ? 'register' : 'login'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-serif font-bold italic mb-3">
                {isAddingAddress ? 'Shipping Address' : isVerifying ? 'Verify Email' : isRegistering ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-neutral-400 text-sm italic">
                {isAddingAddress
                  ? 'Tell us where to deliver your ARIA pieces'
                  : isVerifying
                    ? `Enter the 6-digit code sent to ${formData.email}`
                    : isRegistering
                      ? 'Join the ARIA family for a curated experience'
                      : 'Enter your details to access your account'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 text-xs rounded-2xl text-center">
            {success}
          </div>
        )}

        {isAddingAddress ? (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Street</label>
                <div className="relative">
                  <Home size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    name="street"
                    value={addressData.street}
                    onChange={handleAddressChange}
                    placeholder="123 Luxury Ave"
                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Area</label>
                <div className="relative">
                  <Building size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    name="area"
                    value={addressData.area}
                    onChange={handleAddressChange}
                    placeholder="Beverly Hills"
                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">City</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    placeholder="Los Angeles"
                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">State</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    name="state"
                    value={addressData.state}
                    onChange={handleAddressChange}
                    placeholder="California"
                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Country</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    name="country"
                    value={addressData.country}
                    onChange={handleAddressChange}
                    placeholder="USA"
                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Pincode</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    name="pincode"
                    value={addressData.pincode}
                    onChange={handleAddressChange}
                    placeholder="90210"
                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-2 group relative overflow-hidden mt-4 disabled:opacity-70"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Save Address & Continue'}
            </button>
          </form>
        ) : isVerifying ? (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Verification Code</label>
              <div className="relative">
                <Lock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  className="w-full h-14 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm tracking-[1em] font-mono text-center"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-2 group relative overflow-hidden mt-4 disabled:opacity-70"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Verify Account'}
            </button>

            <div className="flex flex-col items-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading || timer > 0}
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Didn't receive code? Resend"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsVerifying(false);
                  setIsRegistering(false);
                  setError("");
                  setSuccess("");
                }}
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
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
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. grace@aria.com"
                  className="w-full h-14 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                  required
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {isRegistering && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className="w-full h-14 pl-12 pr-6 rounded-2xl bg-[#faf9f6] border border-neutral-100 focus:border-neutral-800 transition-all outline-none text-sm"
                      required={isRegistering}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-2 group relative overflow-hidden mt-4 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">{isRegistering ? 'Create Account' : 'Log In'}</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {!isVerifying && (
          <>
            <div className="mt-8 flex items-center gap-4 text-xs text-neutral-400">
              <div className="flex-1 h-[1px] bg-neutral-100" />
              <span>OR</span>
              <div className="flex-1 h-[1px] bg-neutral-100" />
            </div>

            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
                setSuccess("");
              }}
              disabled={isLoading}
              className="w-full mt-8 py-4 px-6 rounded-2xl border border-neutral-200 text-sm font-bold uppercase tracking-widest hover:bg-[#faf9f6] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isRegistering ? <LogIn size={16} /> : <UserPlus size={16} />}
              <span>{isRegistering ? 'Back to Login' : 'Create ARIA Account'}</span>
            </button>
          </>
        )}

      </motion.div>
    </div>
  );
};

export default LoginPage;

