import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CalendarDays, ArrowLeft, Hourglass, CheckCircle2, Award } from 'lucide-react';
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

export default function MemberBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('service_hub_bookings');
    if (saved) {
      try {
        const all: Booking[] = JSON.parse(saved);
        const filtered = all.filter(
          (b) => b.memberEmail.toLowerCase() === (user?.email || '').toLowerCase()
        );
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(filtered);
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
  }, [user]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link to="/member" className="inline-flex items-center text-xs font-semibold text-accent hover:text-accent/80 gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <CalendarDays className="w-8 h-8 text-accent" />
            My Bookings History
          </h1>
          <p className="text-sm text-foreground/60">
            A complete record of all your bookings and scheduled appointments.
          </p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl shadow-sm border border-black/5 dark:border-white/5">
        {bookings.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-foreground/50 text-sm">No reservations found in your record.</p>
            <Link
              to="/"
              className="inline-flex py-3 px-6 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent/20 transition-all cursor-pointer"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-2xl border border-black/5 dark:border-white/5 hover:border-accent/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-md"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-500/10 text-green-500'
                        : booking.status === 'Completed'
                        ? 'bg-purple-500/10 text-purple-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}
                  >
                    {booking.status === 'Confirmed' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : booking.status === 'Completed' ? (
                      <Award className="w-6 h-6" />
                    ) : (
                      <Hourglass className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{booking.workerName}</h3>
                    <p className="text-xs text-foreground/60 font-medium uppercase tracking-wider mt-0.5">
                      {booking.workerRole}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-foreground/50">
                      <span>Date: <strong className="text-foreground/75 font-semibold">{booking.date}</strong></span>
                      <span>Time: <strong className="text-foreground/75 font-semibold">{booking.time}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col sm:items-end justify-between items-center gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-500/10 text-green-500'
                        : booking.status === 'Completed'
                        ? 'bg-purple-500/10 text-purple-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}
                  >
                    {booking.status}
                  </span>
                  <span className="text-[10px] text-foreground/40 font-mono">
                    ID: {booking.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
