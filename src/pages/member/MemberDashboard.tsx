import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CalendarDays, Hourglass, CheckCircle2, Award, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function MemberDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('service_hub_bookings');
    if (saved) {
      try {
        const all: Booking[] = JSON.parse(saved);
        // Filter bookings for the logged-in member
        const filtered = all.filter(
          (b) => b.memberEmail.toLowerCase() === (user?.email || '').toLowerCase()
        );
        // Sort by createdAt descending
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(filtered);
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
  }, [user]);

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === 'Pending').length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const completed = bookings.filter((b) => b.status === 'Completed').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-accent to-accent/80 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-accent/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-[20%] -translate-y-[20%] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="bg-white/20 text-white text-xs font-semibold py-1 px-3 rounded-full uppercase tracking-wider">
            Member Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Valued Member'}!
          </h1>
          <p className="text-white/80 max-w-lg text-sm sm:text-base leading-relaxed">
            Manage your service reservations, review service providers, and explore top experts.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'All Bookings', value: total, icon: ClipboardList, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Requests', value: pending, icon: Hourglass, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Confirmed bookings', value: confirmed, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Jobs Completed', value: completed, icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-black/5 dark:border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
              <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="glass p-6 rounded-3xl shadow-sm border border-black/5 dark:border-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />
              Recent Bookings
            </h2>
            <Link to="/member/bookings" className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors">
              View All Bookings &rarr;
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-foreground/50 text-sm">You don't have any bookings yet.</p>
              <Link
                to="/"
                className="inline-flex py-2.5 px-5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent/20 transition-all cursor-pointer"
              >
                Find & Book a Worker
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                    <th className="pb-3 pl-2">Service Expert</th>
                    <th className="pb-3">Service Category</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Time Slot</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-sm">
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 pl-2 font-semibold text-foreground">{booking.workerName}</td>
                      <td className="py-4 text-foreground/80">{booking.workerRole}</td>
                      <td className="py-4 text-foreground/75">{booking.date}</td>
                      <td className="py-4 text-foreground/75">{booking.time}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
