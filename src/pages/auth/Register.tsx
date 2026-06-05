import { useState } from 'react';
import { User, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'member' | 'staff'>('member');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    const successReg = registerUser(name, email, password, role);

    if (successReg) {
      setSuccess(true);
      setTimeout(() => {
        navigate(role === 'member' ? '/auth/member-login' : '/auth/staff-login');
      }, 2000);
    } else {
      setError('User already exists with this email for the selected role.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-accent/10 rounded-2xl">
            <User className="w-12 h-12 text-accent" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/60">
          Join Service Hub as a Member or Staff.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/10 mx-4 sm:mx-0">
          {success ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in duration-300">
              <div className="inline-flex p-3 bg-green-500/10 rounded-2xl text-green-500 mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Registration Successful!</h3>
              <p className="text-sm text-foreground/60">
                Redirecting you to the login page for {role === 'member' ? 'Members' : 'Staff'}...
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleRegister}>
              {error && (
                <div className="bg-red-500/15 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Role Toggle Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">I want to register as a:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('member')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      role === 'member'
                        ? 'border-accent bg-accent/15 text-accent shadow-sm shadow-accent/10'
                        : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Member / Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('staff')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      role === 'staff'
                        ? 'border-primary bg-primary/15 text-primary shadow-sm shadow-primary/10'
                        : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Staff Member
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Full Name</label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Email Address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`cursor-pointer w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
                    role === 'member'
                      ? 'bg-accent hover:bg-accent/90 shadow-accent/20 focus:ring-accent'
                      : 'bg-primary hover:bg-primary/90 shadow-primary/20 focus:ring-primary'
                  }`}
                >
                  Register Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm space-y-3">
            <p className="text-foreground/60">
              Already have an account?{' '}
              <Link
                to={role === 'member' ? '/auth/member-login' : '/auth/staff-login'}
                className={`font-semibold transition-colors ${role === 'member' ? 'text-accent hover:text-accent/80' : 'text-primary hover:text-primary/80'}`}
              >
                Log In
              </Link>
            </p>
            <div>
              <Link to="/" className="text-foreground/50 hover:text-foreground transition-colors text-xs">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
