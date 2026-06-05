import { CalendarCheck, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookingInfoSection() {
  return (
    <div id="bookings" className="py-24 relative bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Seamless Bookings & Services</h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Explore our wide range of services before you even log in. Our transparent booking system allows you to see availability and pricing upfront. Sign in to secure your slot instantly.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: CalendarCheck, title: 'Real-time Availability', desc: 'See instantly what slots are open for today, tomorrow, or next month.' },
                { icon: Clock, title: 'Instant Confirmations', desc: 'No waiting around. Once you book as a member, it is confirmed.' },
                { icon: ShieldCheck, title: 'Secure Reservations', desc: 'Your data and payment information are heavily encrypted.' },
              ].map((feature, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-foreground/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="glass p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[80px]" />
              <h3 className="text-2xl font-bold text-foreground mb-6 relative z-10">Featured Services</h3>
              <div className="space-y-4 relative z-10">
                {[
                  { name: 'Premium Consultation', duration: '60 min', price: '$120' },
                  { name: 'Standard Session', duration: '45 min', price: '$80' },
                  { name: 'Quick Check-in', duration: '15 min', price: '$30' },
                ].map((service, i) => (
                  <Link to="/auth/member-login" key={i} className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/10 dark:border-white/10 p-4 rounded-xl flex justify-between items-center cursor-pointer block">
                    <div>
                      <h4 className="font-semibold text-foreground">{service.name}</h4>
                      <p className="text-sm text-foreground/50">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{service.price}</p>
                      <p className="text-xs text-foreground/40">Login to book</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
