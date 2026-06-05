import { useEffect, useState } from 'react';
import { CreditCard, Search, DollarSign, Wallet, RefreshCw, Layers } from 'lucide-react';

interface Booking {
  id: string;
  memberEmail: string;
  memberName: string;
  workerId: string;
  workerName: string;
  workerRole: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  paymentStatus?: 'Unpaid' | 'Paid' | 'COD';
  createdAt: string;
}

const getRate = (role: string): number => {
  const rates: Record<string, number> = {
    Electrician: 499,
    Plumber: 399,
    Carpenter: 599,
    Cleaning: 299,
    Painting: 799,
    'AC Repair': 699,
  };
  return rates[role] || 350;
};

export default function StaffPayments() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('All');

  const loadBookings = () => {
    const saved = localStorage.getItem('service_hub_bookings');
    if (saved) {
      try {
        const all: Booking[] = JSON.parse(saved);
        all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(all);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Filter calculations
  const filteredData = bookings.filter((b) => {
    const matchesSearch = b.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.workerName.toLowerCase().includes(searchTerm.toLowerCase());
    const payStatus = b.paymentStatus || 'Unpaid';
    const matchesFilter = filterMode === 'All' || payStatus === filterMode;
    return matchesSearch && matchesFilter;
  });

  // Calculate revenue statistics
  let totalRevenue = 0;
  let totalPaidCount = 0;
  let totalCODCount = 0;
  let totalUnpaidCount = 0;

  bookings.forEach((b) => {
    const rate = getRate(b.workerRole);
    const payStatus = b.paymentStatus || 'Unpaid';
    if (payStatus === 'Paid') {
      totalRevenue += rate;
      totalPaidCount++;
    } else if (payStatus === 'COD') {
      totalRevenue += rate; // COD is considered revenue once completed, let's count it for potential/total revenue
      totalCODCount++;
    } else {
      totalUnpaidCount++;
    }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <CreditCard className="w-8 h-8 text-primary" />
            Customer Payments & Invoices
          </h1>
          <p className="text-sm text-foreground/60 mt-0.5">
            Track client invoices, UPI transactions, and cash-on-service settlements.
          </p>
        </div>
        <button
          onClick={loadBookings}
          className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 rounded-xl transition cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4 text-foreground/75" />
        </button>
      </div>

      {/* Revenue statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Paid via UPI', value: totalPaidCount, icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Cash on Service (COD)', value: totalCODCount, icon: Wallet, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Pending Invoice', value: totalUnpaidCount, icon: Layers, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between border border-black/5 dark:border-white/5">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
              <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Booking Payments table card */}
      <div className="glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Search member or worker name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-transparent rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
            />
          </div>

          <div className="flex gap-2">
            {['All', 'Paid', 'COD', 'Unpaid'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterMode(filter)}
                className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-xl transition ${
                  filterMode === filter
                    ? 'bg-primary text-white'
                    : 'bg-black/5 dark:bg-white/5 text-foreground/60 hover:text-foreground'
                }`}
              >
                {filter === 'All' ? 'All Invoices' : filter === 'COD' ? 'Cash/COD' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/50 text-sm">No transaction records found matching criteria.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Invoice Details</th>
                  <th className="pb-3">Customer Details</th>
                  <th className="pb-3">Expert booked</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-sm">
                {filteredData.map((b) => {
                  const rate = getRate(b.workerRole);
                  const payStatus = b.paymentStatus || 'Unpaid';
                  return (
                    <tr key={b.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 pl-2 font-mono text-xs text-foreground/50">{b.id}</td>
                      <td className="py-4">
                        <div className="font-semibold text-foreground">{b.memberName}</div>
                        <div className="text-xs text-foreground/60">{b.memberEmail}</div>
                      </td>
                      <td className="py-4">
                        <div className="font-medium text-foreground">{b.workerName}</div>
                        <div className="text-xs text-primary font-medium">{b.workerRole}</div>
                      </td>
                      <td className="py-4 text-foreground/80 font-semibold">₹{rate}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            payStatus === 'Paid'
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : payStatus === 'COD'
                              ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                              : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}
                        >
                          {payStatus === 'COD' ? 'Cash on Service' : payStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
