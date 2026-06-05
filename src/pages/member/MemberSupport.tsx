import { useState, useEffect } from 'react';
import { Mail, Phone, Clock, MessageSquare, Plus, CheckCircle2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FAQ {
  q: string;
  a: string;
}

interface Ticket {
  id: string;
  memberEmail: string;
  subject: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Resolved';
  createdAt: string;
}

const faqData: FAQ[] = [
  { q: 'How do you verify the service workers?', a: 'Every professional on Service Hub undergoes a rigorous background check including address verification, criminal records check, and practical skill evaluations before onboarding.' },
  { q: 'What is the refund policy?', a: 'If a service is unsatisfactory, you can report it via this Support tab within 48 hours. Our team will audit the request and initiate a full or partial refund if appropriate.' },
  { q: 'How can I change my appointment time?', a: 'You can reschedule any active booking directly from the dashboard up to 2 hours before the start time. Simply cancel and request a new time, or reach out to support.' },
  { q: 'Are there any hidden charges?', a: 'No, the price you see on checkout is the final rate. All local taxes and professional fees are included. Material charges (if any) are billed separately based on actual receipts.' }
];

export default function MemberSupport() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const fetchTickets = () => {
    const saved = localStorage.getItem('service_hub_tickets');
    if (saved) {
      try {
        const all: Ticket[] = JSON.parse(saved);
        const filtered = all.filter(
          (t) => t.memberEmail.toLowerCase() === (user?.email || '').toLowerCase()
        );
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setTickets(filtered);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      memberEmail: user?.email || 'member@example.com',
      subject,
      description,
      urgency,
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    const saved = localStorage.getItem('service_hub_tickets');
    let all: Ticket[] = [];
    if (saved) {
      try {
        all = JSON.parse(saved);
      } catch (e) {
        all = [];
      }
    }
    all.push(newTicket);
    localStorage.setItem('service_hub_tickets', JSON.stringify(all));

    setSuccess(true);
    setTickets([newTicket, ...tickets]);

    setTimeout(() => {
      setSubject('');
      setDescription('');
      setUrgency('Medium');
      setShowForm(false);
      setSuccess(false);
    }, 2000);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-accent" />
          Customer Support
        </h1>
        <p className="text-sm text-foreground/60">
          Get answers to FAQs, contact our 24/7 helpdesk, or open a live support ticket.
        </p>
      </div>

      {/* Support Info Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Toll Free Call Support', value: '1800-419-3232', desc: 'Available 24/7 for emergency bookings.', icon: Phone, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Email Helpdesk', value: 'support@servicehub.com', desc: 'Average response time under 2 hours.', icon: Mail, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Live Chat Status', value: 'Agents Active', desc: 'Instant messaging support inside portal.', icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map((item, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">{item.label}</p>
                <p className="text-sm sm:text-base font-extrabold text-foreground mt-0.5">{item.value}</p>
              </div>
            </div>
            <p className="text-xs text-foreground/60 mt-4 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Ticket System (Left Column) - 7 columns */}
        <div className="lg:col-span-7 glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Support Tickets</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="cursor-pointer inline-flex items-center gap-1 py-2 px-4 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              New Ticket
            </button>
          </div>

          {showForm && (
            <div className="p-5 rounded-2xl border border-accent/20 bg-accent/5 space-y-4 animate-in slide-in-from-top duration-300">
              {success ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
                  <h4 className="font-bold text-foreground">Ticket Registered</h4>
                  <p className="text-xs text-foreground/60">Your support ticket has been opened successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-foreground/75 uppercase tracking-wider mb-2">Subject</label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Delay in electrician arrival"
                        className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground/75 uppercase tracking-wider mb-2">Urgency</label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value as any)}
                        className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/75 uppercase tracking-wider mb-2">Detailed Description</label>
                    <textarea
                      required
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please explain the issue in detail..."
                      className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="py-2 px-4 border border-black/10 dark:border-white/10 hover:bg-black/5 rounded-xl text-xs font-semibold text-foreground/60 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="cursor-pointer py-2 px-4 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent/20 transition-all"
                    >
                      Open Ticket
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/50 text-sm">No active tickets registered. Click "New Ticket" to open one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl border border-black/5 dark:border-white/5 bg-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">{t.subject}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        t.urgency === 'High' ? 'bg-red-500/10 text-red-500' : t.urgency === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {t.urgency}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        t.status === 'Resolved' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed">{t.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-foreground/40 border-t border-black/5 dark:border-white/5 pt-2 font-mono">
                    <span>Ticket: {t.id}</span>
                    <span>Date: {new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQs (Right Column) - 5 columns */}
        <div className="lg:col-span-5 glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent" />
            Frequently Asked FAQs
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, i) => {
              const isExpanded = expandedFAQ === i;
              return (
                <div key={i} className="border-b border-black/5 dark:border-white/5 pb-3">
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm text-foreground hover:text-accent transition-colors py-2 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-foreground/60 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-foreground/60 flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <p className="text-xs sm:text-sm text-foreground/60 mt-1 leading-relaxed pl-1 animate-in slide-in-from-top-1 duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
