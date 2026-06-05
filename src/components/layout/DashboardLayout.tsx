import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background decorative gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
        
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
