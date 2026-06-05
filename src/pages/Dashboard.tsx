import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { Users, UserPlus, Activity, CreditCard, CalendarDays, CheckCircle2, Check, RefreshCw } from 'lucide-react';

const revenueData = [
  { name: 'Jan', total: 3200 },
  { name: 'Feb', total: 4100 },
  { name: 'Mar', total: 2900 },
  { name: 'Apr', total: 4800 },
  { name: 'May', total: 3900 },
  { name: 'Jun', total: 5200 },
];

const attendanceData = [
  { name: 'Mon', count: 45 },
  { name: 'Tue', count: 52 },
  { name: 'Wed', count: 38 },
  { name: 'Thu', count: 65 },
  { name: 'Fri', count: 48 },
  { name: 'Sat', count: 85 },
  { name: 'Sun', count: 92 },
];

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
  createdAt: string;
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load all bookings
  const loadBookings = () => {
    const saved = localStorage.getItem('service_hub_bookings');
    if (saved) {
      try {
        const all: Booking[] = JSON.parse(saved);
        // Sort by createdAt descending
        all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(all);
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = (id: string, newStatus: 'Confirmed' | 'Completed') => {
    const saved = localStorage.getItem('service_hub_bookings');
    if (saved) {
      try {
        const all: Booking[] = JSON.parse(saved);
        const updated = all.map((b) => b.id === id ? { ...b, status: newStatus } : b);
        localStorage.setItem('service_hub_bookings', JSON.stringify(updated));
        setBookings(updated.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (e) {
        console.error('Error updating booking status', e);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
        <button 
          onClick={loadBookings}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition shadow-lg shadow-primary/20 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', value: '2,420', icon: Users, trend: '+12%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'New Registrations', value: '142', icon: UserPlus, trend: '+8%', color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Active Today', value: '845', icon: Activity, trend: '+24%', color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Monthly Revenue', value: '$24,500', icon: CreditCard, trend: '+4%', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-black/5 dark:border-white/5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">{stat.trend}</span>
              <span className="text-foreground/50 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
          <h2 className="text-lg font-bold text-foreground mb-6">Revenue Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="total" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
          <h2 className="text-lg font-bold text-foreground mb-6">Weekly Attendance</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="count" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4, fill: '#06B6D4', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Service Bookings Section */}
      <div className="glass p-6 rounded-3xl shadow-sm border border-black/5 dark:border-white/5 space-y-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          Customer Service Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/50 text-sm">No bookings have been made yet by customers.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Customer Details</th>
                  <th className="pb-3">Expert / Specialty</th>
                  <th className="pb-3">Slot Date & Time</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="font-semibold text-foreground">{booking.memberName}</div>
                      <div className="text-xs text-foreground/60">{booking.memberEmail}</div>
                    </td>
                    <td className="py-4 text-foreground/80">
                      <div className="font-medium text-foreground">{booking.workerName}</div>
                      <div className="text-xs text-primary font-medium">{booking.workerRole}</div>
                    </td>
                    <td className="py-4 text-foreground/75">
                      <div>{booking.date}</div>
                      <div className="text-xs text-foreground/65 flex items-center gap-1 mt-0.5">
                        <Activity className="w-3.5 h-3.5 text-foreground/40" />
                        {booking.time}
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-500/10 text-green-500'
                            : booking.status === 'Completed'
                            ? 'bg-purple-500/10 text-purple-500'
                            : 'bg-amber-500/10 text-amber-500'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      {booking.status === 'Pending' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                          className="cursor-pointer inline-flex items-center gap-1 py-1.5 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition shadow-sm hover:shadow-md"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}
                      {booking.status !== 'Completed' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'Completed')}
                          className="cursor-pointer inline-flex items-center gap-1 py-1.5 px-3 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-semibold transition shadow-sm hover:shadow-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Complete
                        </button>
                      )}
                      {booking.status === 'Completed' && (
                        <span className="text-xs text-foreground/45 italic font-medium">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
