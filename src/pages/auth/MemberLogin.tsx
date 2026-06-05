import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MemberLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password, 'member');
    if (success) {
      const redirectTo = searchParams.get('redirect') || '/member';
      navigate(redirectTo);
    } else {
      setError('Invalid email or password. Please make sure you are logging into the Member Portal.');
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
          Member Login
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/60">
          Access your personal dashboard and bookings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/10 mx-4 sm:mx-0">
          {error && (
            <div className="mb-4 bg-red-500/15 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-foreground">Email address / User ID</label>
              <div className="mt-1">
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm" 
                  placeholder="member@example.com"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/70 cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-accent hover:text-accent/80 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="cursor-pointer w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-accent/20 text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all">
                Sign in to Member Portal
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm space-y-3">
            <p className="text-foreground/60">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-semibold text-accent hover:text-accent/80 transition-colors">
                Register
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
