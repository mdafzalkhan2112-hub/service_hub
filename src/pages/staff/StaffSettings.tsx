import { useState } from 'react';
import { Settings, Save, RefreshCw, AlertOctagon, Info, Database } from 'lucide-react';
export default function StaffSettings() {
  const [portalName, setPortalName] = useState('Service Hub Admin Portal');
  const [supportEmail, setSupportEmail] = useState('support@servicehub.com');
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setMessage('Configuration settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
  };

  const handleClearData = (key: string) => {
    if (confirm(`Are you sure you want to delete all stored ${key}? This will reset the portal state.`)) {
      localStorage.removeItem(key);
      alert(`${key} deleted. Refreshing portal...`);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Settings className="w-8 h-8 text-primary" />
          System Settings
        </h1>
        <p className="text-sm text-foreground/60 mt-0.5">
          Configure administrative configurations, alerts, and system database backups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Configurations Form (Left Column) - 7 columns */}
        <form onSubmit={handleSaveSettings} className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-4">
            <Info className="w-5 h-5 text-primary" />
            General Configurations
          </h2>

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-xl text-sm font-medium">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-foreground/75 uppercase tracking-wider mb-2">Portal Name</label>
              <input
                type="text"
                value={portalName}
                onChange={(e) => setPortalName(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/75 uppercase tracking-wider mb-2">Administrative Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-foreground/75">Alert Notification Settings</h3>
            
            <div className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-2xl">
              <div>
                <h4 className="text-sm font-bold text-foreground">New Booking Toggles</h4>
                <p className="text-xs text-foreground/60 mt-0.5">Receive browser push notifications when a user schedules a worker.</p>
              </div>
              <input
                type="checkbox"
                checked={bookingAlerts}
                onChange={() => setBookingAlerts(!bookingAlerts)}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-2xl">
              <div>
                <h4 className="text-sm font-bold text-foreground">Payment Confirmation Alerts</h4>
                <p className="text-xs text-foreground/60 mt-0.5">Trigger alert notifications on successful UPI or COD payment settlements.</p>
              </div>
              <input
                type="checkbox"
                checked={paymentAlerts}
                onChange={() => setPaymentAlerts(!paymentAlerts)}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-black/10 dark:border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer inline-flex items-center gap-2 py-3 px-6 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving Configuration...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Portal Settings
                </>
              )}
            </button>
          </div>
        </form>

        {/* Database Control Panel (Right Column) - 5 columns */}
        <div className="lg:col-span-5 glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-4">
            <Database className="w-5 h-5 text-red-500" />
            System Database Controls
          </h2>

          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed">
            <AlertOctagon className="w-5 h-5 flex-shrink-0" />
            <div>
              <strong className="font-bold block mb-1">Caution: Irreversible Actions</strong>
              The controls below let you purge mock tables stored inside the local storage cache. Purging will reset the website to its initial setup.
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleClearData('service_hub_bookings')}
              className="cursor-pointer w-full flex items-center justify-between p-4 bg-black/5 hover:bg-red-500/10 text-foreground hover:text-red-500 rounded-2xl border border-transparent hover:border-red-500/20 transition duration-200"
            >
              <div className="text-left">
                <span className="text-sm font-bold block">Reset Bookings Database</span>
                <span className="text-[10px] text-foreground/50 block mt-0.5">Clears all booking entries in LocalStorage.</span>
              </div>
              <RefreshCw className="w-4 h-4 flex-shrink-0" />
            </button>

            <button
              onClick={() => handleClearData('service_hub_tickets')}
              className="cursor-pointer w-full flex items-center justify-between p-4 bg-black/5 hover:bg-red-500/10 text-foreground hover:text-red-500 rounded-2xl border border-transparent hover:border-red-500/20 transition duration-200"
            >
              <div className="text-left">
                <span className="text-sm font-bold block">Reset Support Tickets</span>
                <span className="text-[10px] text-foreground/50 block mt-0.5">Clears all client support tickets.</span>
              </div>
              <RefreshCw className="w-4 h-4 flex-shrink-0" />
            </button>

            <button
              onClick={() => handleClearData('service_hub_users')}
              className="cursor-pointer w-full flex items-center justify-between p-4 bg-black/5 hover:bg-red-500/10 text-foreground hover:text-red-500 rounded-2xl border border-transparent hover:border-red-500/20 transition duration-200"
            >
              <div className="text-left">
                <span className="text-sm font-bold block">Reset Registered Users</span>
                <span className="text-[10px] text-foreground/50 block mt-0.5">Deletes all custom registered member/staff profiles.</span>
              </div>
              <RefreshCw className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
