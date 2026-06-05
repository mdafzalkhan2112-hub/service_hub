import { useState } from 'react';
import { ClipboardCheck, Search, UserCheck, AlertTriangle, AlertCircle } from 'lucide-react';

const mockAttendance = [
  { id: 1, date: '2026-06-05', name: 'Shivam', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: 8.5, status: 'Present' },
  { id: 2, date: '2026-06-05', name: 'Ravi Kumar', checkIn: '09:12 AM', checkOut: '05:45 PM', hours: 8.5, status: 'Late' },
  { id: 3, date: '2026-06-05', name: 'Mohit Sharma', checkIn: '09:05 AM', checkOut: '05:30 PM', hours: 8.4, status: 'Present' },
  { id: 4, date: '2026-06-05', name: 'Amit Verma', checkIn: '--', checkOut: '--', hours: 0, status: 'Absent' },
  { id: 5, date: '2026-06-04', name: 'Shivam', checkIn: '08:58 AM', checkOut: '05:30 PM', hours: 8.5, status: 'Present' },
  { id: 6, date: '2026-06-04', name: 'Ravi Kumar', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: 8.5, status: 'Present' },
  { id: 7, date: '2026-06-04', name: 'Mohit Sharma', checkIn: '09:15 AM', checkOut: '05:30 PM', hours: 8.2, status: 'Late' },
  { id: 8, date: '2026-06-04', name: 'Amit Verma', checkIn: '09:02 AM', checkOut: '05:30 PM', hours: 8.4, status: 'Present' },
  { id: 9, date: '2026-06-03', name: 'Shivam', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: 8.5, status: 'Present' },
  { id: 10, date: '2026-06-03', name: 'Ravi Kumar', checkIn: '09:03 AM', checkOut: '05:30 PM', hours: 8.4, status: 'Present' },
  { id: 11, date: '2026-06-03', name: 'Mohit Sharma', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: 8.5, status: 'Present' },
  { id: 12, date: '2026-06-03', name: 'Amit Verma', checkIn: '09:20 AM', checkOut: '05:30 PM', hours: 8.1, status: 'Late' },
];

export default function StaffAttendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredData = mockAttendance.filter((record) => {
    const matchesName = record.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesName && matchesStatus;
  });

  const totalPresent = mockAttendance.filter(r => r.date === '2026-06-05' && (r.status === 'Present' || r.status === 'Late')).length;
  const totalLate = mockAttendance.filter(r => r.date === '2026-06-05' && r.status === 'Late').length;
  const totalAbsent = mockAttendance.filter(r => r.date === '2026-06-05' && r.status === 'Absent').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            Staff Attendance Logs
          </h1>
          <p className="text-sm text-foreground/60 mt-0.5">
            Monitor and record staff login and service status check-ins.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Active Today', value: totalPresent, icon: UserCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Late Arrivals (Today)', value: totalLate, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Absent (Today)', value: totalAbsent, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between border border-black/5 dark:border-white/5">
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

      {/* Filter and Table Card */}
      <div className="glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Search staff name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-transparent rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
            />
          </div>

          <div className="flex gap-2">
            {['All', 'Present', 'Late', 'Absent'].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-xl transition ${
                  statusFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-black/5 dark:bg-white/5 text-foreground/60 hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Staff Name</th>
                <th className="pb-3">Check In</th>
                <th className="pb-3">Check Out</th>
                <th className="pb-3">Hours Worked</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-sm">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-2 text-foreground/80">{record.date}</td>
                  <td className="py-4 font-semibold text-foreground">{record.name}</td>
                  <td className="py-4 text-foreground/75">{record.checkIn}</td>
                  <td className="py-4 text-foreground/75">{record.checkOut}</td>
                  <td className="py-4 text-foreground/75 font-mono">{record.hours > 0 ? `${record.hours} hrs` : '--'}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        record.status === 'Present'
                          ? 'bg-green-500/10 text-green-500'
                          : record.status === 'Late'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
