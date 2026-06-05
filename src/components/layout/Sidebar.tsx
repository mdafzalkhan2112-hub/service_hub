import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const staffNavigation = [
  { name: 'Dashboard', href: '/staff', icon: LayoutDashboard },
  { name: 'Members', href: '/staff/members', icon: Users },
  { name: 'Attendance', href: '/staff/attendance', icon: CalendarDays },
  { name: 'Payments', href: '/staff/payments', icon: CreditCard },
  { name: 'Reports', href: '/staff/reports', icon: FileText },
  { name: 'Settings', href: '/staff/settings', icon: Settings },
];

const memberNavigation = [
  { name: 'Dashboard', href: '/member', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/member/bookings', icon: CalendarDays },
  { name: 'Payments History', href: '/member/payments', icon: CreditCard },
  { name: 'Support', href: '/member/support', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const currentNavigation = user?.role === 'staff' ? staffNavigation : memberNavigation;
  const logoText = user?.role === 'staff' ? 'Staff Portal' : 'Member Hub';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="hidden md:flex flex-col w-64 glass-dark text-foreground border-r border-white/10">
      {/* Back to Home */}
      <div className="px-4 pt-4">
        <Link
          to="/"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 text-sm group"
        >
          <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
      <div className="p-6 flex items-center justify-center border-b border-white/10 pt-3">
        <h2 className="text-2xl font-bold text-primary tracking-tight">{logoText}</h2>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          {currentNavigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/staff' && item.href !== '/member' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/20 text-primary font-medium border border-primary/20 shadow-sm' 
                    : 'text-foreground/70 hover:bg-white/5 hover:text-foreground border border-transparent'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-foreground/50'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-foreground/70 hover:bg-white/5 hover:text-foreground transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-foreground/50" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
