import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, {user?.name}</h1>
        <p className="text-neutral-500">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-foreground">
        <StatCard label="Total Sales" value="₹24,500" change="+12.5%" />
        <StatCard label="Total Orders" value="156" change="+8.2%" />
        <StatCard label="Active Customers" value="1,240" change="+4.1%" />
      </div>

      {/* Main Stats Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500">
          <h2 className="text-xl font-serif font-bold mb-6">Recent Sales</h2>
          <div className="space-y-6">
            <SaleItem name="Lydia James" product="Silk Wrap Gown" price="₹249.99" date="2 mins ago" />
            <SaleItem name="Marcus Chen" product="Cashmere Sweater" price="₹129.50" date="15 mins ago" />
            <SaleItem name="Sarah Smith" product="Floral Saree" price="₹199.00" date="1 hour ago" />
          </div>
        </div>

        <div className="bg-white border border-neutral-100 rounded-3xl p-10 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-accent-beige rounded-full flex items-center justify-center mb-6 text-luxury-gold">
            <LayoutDashboard size={40} />
          </div>
          <h2 className="text-xl font-serif font-bold mb-2 text-foreground">Manage your brand</h2>
          <p className="text-neutral-500 max-w-xs mx-auto mb-6">
            Your store is currently performing 15% better than last month.
          </p>
          <button className="btn-luxury">View Reports</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change }) => (
  <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all">
    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl font-serif font-bold">{value}</h3>
      <span className="text-xs font-bold text-green-500 px-2 py-1 bg-green-50 rounded-full">{change}</span>
    </div>
  </div>
);

const SaleItem = ({ name, product, price, date }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-accent-beige flex items-center justify-center font-bold text-luxury-gold group-hover:bg-black group-hover:text-white transition-all">
        {name[0]}
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="text-xs text-neutral-400">{product}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-foreground">{price}</p>
      <p className="text-[10px] text-neutral-400 uppercase tracking-tighter">{date}</p>
    </div>
  </div>
);

export default Dashboard;
