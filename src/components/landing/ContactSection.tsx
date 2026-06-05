import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#EFF6FF] to-[#F8FAFC] dark:from-[#0B1329] dark:to-[#101726] border-t border-black/5 dark:border-white/5">
      {/* Decorative Blob */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Get In Touch With Us
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Have questions about our service verification or need support booking an expert? Send us a message and our team will respond shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details (Left Column) - 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We operate across 150+ cities in India. Reach out to us via any of the channels below.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { title: 'Our Address', desc: '4th Floor, Tech Hub Sector-62, Noida, UP, India', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { title: 'Call Us Now', desc: '+91 1800-419-3232 (Toll Free)', icon: Phone, color: 'text-green-500', bg: 'bg-green-500/10' },
                { title: 'Email Support', desc: 'support@servicehub.com', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-600/10' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1E293B]/75 p-5 rounded-2xl flex items-start space-x-4 border border-[#E2E8F0] dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                  <div className={`p-3 rounded-xl ${item.bg} text-white flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form (Right Column) - 7 columns */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#1E293B]/75 p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-white/10 shadow-xl relative min-h-[420px] flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in zoom-in duration-300">
                  <div className="inline-flex p-3 bg-green-500/10 rounded-2xl text-green-500 mb-2">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out, {name}! Our team has received your message and will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A]/40 border border-[#E2E8F0] dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A]/40 border border-[#E2E8F0] dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Subject (Optional)</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Query about worker verification"
                      className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A]/40 border border-[#E2E8F0] dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A]/40 border border-[#E2E8F0] dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="cursor-pointer w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
