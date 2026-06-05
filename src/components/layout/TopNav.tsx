import { Bell, Search, Menu, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopNav() {
  const { user } = useAuth();
  
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="glass sticky top-0 z-10 border-b border-white/20 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <button className="md:hidden text-foreground/70 hover:text-foreground mr-1">
          <Menu className="w-6 h-6" />
        </button>
        {/* Back to Home - visible on mobile only */}
        <Link
          to="/"
          className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 text-xs font-medium group"
        >
          <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
          <span>Home</span>
        </Link>
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-transparent rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0F172A]"></span>
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-foreground/10">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs tracking-wider">
            {initials}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-semibold text-foreground leading-none mb-0.5">{user?.name || 'User'}</p>
            <p className="text-xs text-foreground/50 leading-none">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
