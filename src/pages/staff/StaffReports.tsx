import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FileBarChart, RefreshCw, Star, HelpCircle, Activity, Award } from 'lucide-react';

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

const COLORS = ['#2563EB', '#D97706', '#10B981', '#7C3AED'];

export default function StaffReports() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    const saved = localStorage.getItem('service_hub_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Compute status distributions
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  const statusDistribution = [
    { name: 'Pending', value: pendingCount },
    { name: 'Confirmed', value: confirmedCount },
    { name: 'Completed', value: completedCount },
  ].filter(item => item.value > 0);

  // Compute category jobs
  const categoryCounts: Record<string, number> = {};
  bookings.forEach(b => {
    categoryCounts[b.workerRole] = (categoryCounts[b.workerRole] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCounts).map(role => ({
    name: role,
    count: categoryCounts[role]
  }));

  const resolutionRate = bookings.length > 0 ? Math.round((completedCount / bookings.length) * 100) : 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <FileBarChart className="w-8 h-8 text-primary" />
            Business Analytics Reports
          </h1>
          <p className="text-sm text-foreground/60 mt-0.5">
            Statistical breakdown of service completions, bookings, and customer categories.
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

      {/* Analytics stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[
          { label: 'Total Placed Requests', value: bookings.length, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Completion Rate', value: `${resolutionRate}%`, icon: Award, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Customer Satisfaction', value: '4.85 / 5', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Active Support Tickets', value: '1', icon: HelpCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Jobs Distribution (Left Column) - 7 columns */}
        <div className="lg:col-span-7 glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Services Breakdown by Category</h2>
          
          {categoryData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-foreground/50 text-sm">No category distribution data available yet.</p>
            </div>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} vertical={false} />
                  <XAxis dataKey="name" stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} />
                  <YAxis stroke="currentColor" className="text-foreground/50 text-xs" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Booking Status Distribution (Right Column) - 5 columns */}
        <div className="lg:col-span-5 glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-foreground">Booking Status Breakdown</h2>

          {statusDistribution.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center">
              <p className="text-foreground/50 text-sm">No status distribution data available.</p>
            </div>
          ) : (
            <>
              <div className="h-[200px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                {statusDistribution.map((entry, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="font-semibold text-foreground/80">{entry.name}</span>
                    </div>
                    <p className="font-extrabold text-sm text-foreground">{entry.value} jobs</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
