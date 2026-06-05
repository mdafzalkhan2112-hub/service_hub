import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, QrCode, DollarSign, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw, Smartphone } from 'lucide-react';

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

const getRate = (role: string): number => {
  const rates: Record<string, number> = {
    Electrician: 499,
    Plumber: 399,
    Carpenter: 599,
    Cleaning: 299,
    Painting: 799,
    'AC Repair': 699,
  };
  return rates[role] || 350;
};

export default function MemberPayments() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activePaymentBooking, setActivePaymentBooking] = useState<Booking | null>(null);
  const [paymentMode, setPaymentMode] = useState<'online' | 'offline'>('online');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const fetchBookings = () => {
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
        console.error('Error fetching bookings', e);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handlePayClick = (booking: Booking) => {
    setActivePaymentBooking(booking);
    setPaymentMode('online');
    setPaymentCompleted(false);
  };

  const processPayment = () => {
    if (!activePaymentBooking) return;

    setProcessingPayment(true);

    setTimeout(() => {
      const saved = localStorage.getItem('service_hub_bookings');
      if (saved) {
        try {
          const all: Booking[] = JSON.parse(saved);
          const updated = all.map((b) => {
            if (b.id === activePaymentBooking.id) {
              return { ...b, paymentStatus: (paymentMode === 'online' ? 'Paid' : 'COD') as 'Paid' | 'COD' };
            }
            return b;
          });
          localStorage.setItem('service_hub_bookings', JSON.stringify(updated));
          setBookings(updated.filter((b) => b.memberEmail.toLowerCase() === (user?.email || '').toLowerCase()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } catch (e) {
          console.error(e);
        }
      }
      setProcessingPayment(false);
      setPaymentCompleted(true);
      setTimeout(() => {
        setActivePaymentBooking(null);
        setPaymentCompleted(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <CreditCard className="w-8 h-8 text-accent" />
            Payments & Receipts
          </h1>
          <p className="text-sm text-foreground/60">
            Pay for active bookings, download receipts, and manage payment configurations.
          </p>
        </div>
        <button 
          onClick={fetchBookings}
          className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 rounded-xl transition cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4 text-foreground/75" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Bookings List (Left Column) - 7 columns */}
        <div className="lg:col-span-7 glass p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Service Payments History</h2>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/50 text-sm">No reservations found in your record.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => {
                const amount = getRate(b.workerRole);
                const payStatus = b.paymentStatus || 'Unpaid';
                return (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-black/5 dark:border-white/5 bg-white/5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{b.workerName}</h3>
                      <p className="text-xs text-primary font-medium">{b.workerRole}</p>
                      <div className="flex gap-4 text-xs text-foreground/50 mt-1">
                        <span>Date: {b.date}</span>
                        <span>Amt: <strong>₹{amount}</strong></span>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          b.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          Job: {b.status}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          payStatus === 'Paid'
                            ? 'bg-green-500/15 text-green-500 border border-green-500/20'
                            : payStatus === 'COD'
                            ? 'bg-blue-500/15 text-blue-500 border border-blue-500/20'
                            : 'bg-red-500/15 text-red-500 border border-red-500/20'
                        }`}>
                          Pay: {payStatus === 'COD' ? 'Cash on Delivery' : payStatus}
                        </span>
                      </div>
                    </div>

                    <div>
                      {payStatus === 'Unpaid' && b.status === 'Confirmed' ? (
                        <button
                          onClick={() => handlePayClick(b)}
                          className="cursor-pointer py-2 px-4 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent/20 transition-all"
                        >
                          Pay Now
                        </button>
                      ) : payStatus === 'Unpaid' && b.status === 'Pending' ? (
                        <span className="text-[10px] font-medium text-foreground/40 block max-w-[120px] text-right leading-relaxed bg-black/5 px-2.5 py-1.5 rounded-lg">
                          Pending Staff Confirmation
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-green-500 font-semibold text-xs py-1 px-3 bg-green-500/10 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" />
                          Settled
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Payment Gateway Interface (Right Column) - 5 columns */}
        <div className="lg:col-span-5">
          {activePaymentBooking ? (
            <div className="glass p-6 rounded-3xl border border-accent/25 shadow-xl relative min-h-[460px] flex flex-col justify-between">
              {paymentCompleted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
                  <div className="p-4 bg-green-500/10 rounded-full text-green-500">
                    <CheckCircle2 className="w-16 h-16 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Payment Acknowledged</h3>
                  <p className="text-sm text-foreground/60 max-w-xs leading-relaxed">
                    Thank you! Your transaction has been registered. The booking invoice is fully settled.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4">
                      <div>
                        <h2 className="text-lg font-bold text-foreground">Secure Checkout</h2>
                        <p className="text-xs text-foreground/60 mt-0.5">Booking ID: {activePaymentBooking.id}</p>
                      </div>
                      <button 
                        onClick={() => setActivePaymentBooking(null)}
                        className="text-xs font-semibold text-foreground/50 hover:text-foreground bg-black/5 py-1 px-2.5 rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    {/* Booking Details Summary */}
                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-foreground/70">Expert Name:</span>
                        <span className="text-foreground">{activePaymentBooking.workerName}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-semibold mt-2">
                        <span className="text-foreground/70">Specialty:</span>
                        <span className="text-primary">{activePaymentBooking.workerRole}</span>
                      </div>
                      <div className="flex justify-between items-center text-base font-extrabold border-t border-black/10 dark:border-white/10 mt-3 pt-3">
                        <span className="text-foreground">Total Amount:</span>
                        <span className="text-accent text-lg">₹{getRate(activePaymentBooking.workerRole)}</span>
                      </div>
                    </div>

                    {/* Mode Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider">Select Payment Mode</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMode('online')}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                            paymentMode === 'online'
                              ? 'border-accent bg-accent/15 text-accent shadow-sm'
                              : 'border-black/10 dark:border-white/10 text-foreground/60 hover:text-foreground'
                          }`}
                        >
                          <QrCode className="w-4 h-4" />
                          Online (UPI / QR)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMode('offline')}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                            paymentMode === 'offline'
                              ? 'border-primary bg-primary/15 text-primary shadow-sm'
                              : 'border-black/10 dark:border-white/10 text-foreground/60 hover:text-foreground'
                          }`}
                        >
                          <DollarSign className="w-4 h-4" />
                          Cash on Service
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Gateway display */}
                    <div className="pt-2">
                      {paymentMode === 'online' ? (
                        <div className="border border-dashed border-accent/30 rounded-2xl p-4 bg-accent/5 space-y-4 flex flex-col items-center text-center relative overflow-hidden">
                          <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
                          
                          {/* QR Code Graphic Representation */}
                          <div className="p-3 bg-white rounded-xl shadow-md border border-accent/20 flex items-center justify-center relative">
                            <div className="w-[140px] h-[140px] border-[6px] border-black flex flex-wrap justify-between p-1 rounded-sm">
                              {/* Faux QR Code Pattern blocks */}
                              <div className="w-[38px] h-[38px] bg-black rounded-xs" />
                              <div className="w-[38px] h-[38px] bg-black rounded-xs" />
                              <div className="w-full flex justify-between h-[38px] items-end">
                                <div className="w-[38px] h-[38px] bg-black rounded-xs" />
                                <div className="w-[20px] h-[20px] bg-accent rounded-sm animate-pulse flex items-center justify-center text-white text-[8px] font-bold">UPI</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground flex items-center justify-center gap-1">
                              <Smartphone className="w-4 h-4 text-accent" />
                              Scan QR to Pay
                            </p>
                            <p className="text-[11px] text-foreground/60 leading-relaxed max-w-[240px]">
                              Scan this UPI QR code using GPay, PhonePe, Paytm, or any BHIM app to complete the transaction.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-primary/30 rounded-2xl p-5 bg-primary/5 space-y-3">
                          <div className="flex items-center gap-2 text-primary font-bold text-sm">
                            <ShieldAlert className="w-5 h-5" />
                            Cash on Delivery Selected
                          </div>
                          <p className="text-xs text-foreground/60 leading-relaxed">
                            No upfront payments are required. You will settle the bill of <strong>₹{getRate(activePaymentBooking.workerRole)}</strong> directly with <strong>{activePaymentBooking.workerName}</strong> via Cash or UPI after the service has been successfully completed.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={processPayment}
                    disabled={processingPayment}
                    className={`cursor-pointer mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition shadow-lg ${
                      paymentMode === 'online'
                        ? 'bg-accent hover:bg-accent/90 shadow-accent/20'
                        : 'bg-primary hover:bg-primary/90 shadow-primary/20'
                    } disabled:opacity-50`}
                  >
                    {processingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Validating Transaction...
                      </>
                    ) : (
                      <>
                        Confirm {paymentMode === 'online' ? 'UPI Payment' : 'Cash on Delivery'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="glass p-8 rounded-3xl border border-black/5 dark:border-white/5 text-center min-h-[460px] flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-black/5 dark:bg-white/5 rounded-full text-foreground/40">
                <CreditCard className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Checkout Counter</h3>
              <p className="text-xs text-foreground/50 max-w-[240px] leading-relaxed mx-auto">
                Select an active, **Confirmed** booking from your list and click **Pay Now** to settle the invoice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
