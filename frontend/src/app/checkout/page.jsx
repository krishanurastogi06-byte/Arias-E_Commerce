"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
   const { cart, clearCart, user, isLoggedIn } = useStore();
   const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

   const [shippingData, setShippingData] = React.useState({
      fullname: user?.fullname || '',
      phoneNumber: user?.phoneNumber || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      pincode: user?.address?.pincode || ''
   });

   const [paymentMethod, setPaymentMethod] = React.useState('cod');

   React.useEffect(() => {
      if (user) {
         setShippingData({
            fullname: user.fullname || '',
            phoneNumber: user.phoneNumber || '',
            street: user.address?.street || '',
            city: user.address?.city || '',
            pincode: user.address?.pincode || ''
         });
      }
   }, [user]);

   return (
      <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
         <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-neutral-100"
            >
               <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold italic mb-4">Secure Checkout</h1>
                  <p className="text-neutral-400 text-sm">Review your shipping and payment details</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div>
                        <h3 className="flex items-center gap-3 text-lg font-bold mb-6">
                           <Truck size={20} className="text-accent-rose" />
                           Shipping Details
                        </h3>
                        <div className="space-y-4">
                           <input
                              type="text"
                              placeholder="Full Name"
                              value={shippingData.fullname}
                              onChange={(e) => setShippingData({ ...shippingData, fullname: e.target.value })}
                              className="w-full h-12 px-6 rounded-xl bg-neutral-50 border border-neutral-100 outline-none text-sm focus:border-black transition-colors"
                           />
                           <input
                              type="text"
                              placeholder="Mobile Number"
                              value={shippingData.phoneNumber}
                              onChange={(e) => setShippingData({ ...shippingData, phoneNumber: e.target.value })}
                              className="w-full h-12 px-6 rounded-xl bg-neutral-50 border border-neutral-100 outline-none text-sm focus:border-black transition-colors"
                           />
                           <input
                              type="text"
                              placeholder="Street Address"
                              value={shippingData.street}
                              onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                              className="w-full h-12 px-6 rounded-xl bg-neutral-50 border border-neutral-100 outline-none text-sm focus:border-black transition-colors"
                           />
                           <div className="grid grid-cols-2 gap-4">
                              <input
                                 type="text"
                                 placeholder="City"
                                 value={shippingData.city}
                                 onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                 className="w-full h-12 px-6 rounded-xl bg-neutral-50 border border-neutral-100 outline-none text-sm focus:border-black transition-colors"
                              />
                              <input
                                 type="text"
                                 placeholder="PIN Code"
                                 value={shippingData.pincode}
                                 onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                                 className="w-full h-12 px-6 rounded-xl bg-neutral-50 border border-neutral-100 outline-none text-sm focus:border-black transition-colors"
                              />
                           </div>
                        </div>
                     </div>

                     <div>
                        <h3 className="flex items-center gap-3 text-lg font-bold mb-6">
                           <CreditCard size={20} className="text-accent-rose" />
                           Payment Method
                        </h3>
                        <div className="space-y-3">
                           <div
                              onClick={() => setPaymentMethod('cod')}
                              className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-6 bg-neutral-200 rounded flex items-center justify-center text-[10px] font-bold">COD</div>
                                 <span className="text-sm font-medium">Cash on Delivery</span>
                              </div>
                              {paymentMethod === 'cod' && <CheckCircle2 size={20} className="text-neutral-800" />}
                           </div>

                           <div
                              onClick={() => setPaymentMethod('razorpay')}
                              className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'razorpay' ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">Razorpay</div>
                                 <span className="text-sm font-medium">Online Payment (Razorpay)</span>
                              </div>
                              {paymentMethod === 'razorpay' && <CheckCircle2 size={20} className="text-neutral-800" />}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#faf9f6] rounded-3xl p-8 h-fit border border-neutral-100">
                     <h3 className="text-lg font-bold mb-6 italic font-serif">Order Summary</h3>
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm text-neutral-500">
                           <span>Subtotal</span>
                           <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-500">
                           <span>Shipping</span>
                           <span>Free</span>
                        </div>
                        <div className="h-[1px] bg-neutral-200 mt-4" />
                        <div className="flex justify-between text-lg font-bold">
                           <span>Total</span>
                           <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                     </div>

                     <Link href="/"
                        onClick={(e) => {
                           if (cart.length === 0) {
                              e.preventDefault();
                              return;
                           }
                           toast.success(`Order placed successfully via ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}!`);
                           clearCart();
                        }}
                        className={`w-full btn-premium py-4 rounded-xl flex items-center justify-center gap-2 group ${cart.length === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                     >
                        <ShieldCheck size={18} />
                        <span>Complete Purchase</span>
                     </Link>

                     <Link href="/cart" className="block text-center mt-6 text-xs text-neutral-400 hover:text-neutral-800 transition-colors">
                        Return to shopping bag
                     </Link>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
   );
};

export default CheckoutPage;
