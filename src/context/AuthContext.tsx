import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'member' | 'staff';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'member' | 'staff') => boolean;
  logout: () => void;
  registerUser: (name: string, email: string, password: string, role: 'member' | 'staff') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load session from LocalStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('service_hub_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('service_hub_session');
      }
    }
  }, []);

  const login = (email: string, password: string, role: 'member' | 'staff'): boolean => {
    // 1. Check default accounts
    if (email.toLowerCase() === 'shivam@gmail.com' && role === 'member' && password === '1234') {
      const defaultUser: User = { name: 'Shivam', email, role };
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem('service_hub_session', JSON.stringify(defaultUser));
      return true;
    }
    if (email.toLowerCase() === 'shivam@gmail.com' && role === 'staff' && password === 'shivam1234') {
      const defaultUser: User = { name: 'Shivam', email, role };
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem('service_hub_session', JSON.stringify(defaultUser));
      return true;
    }
    
    if (email === 'member@example.com' && role === 'member') {
      const defaultUser: User = { name: 'Demo Member', email, role };
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem('service_hub_session', JSON.stringify(defaultUser));
      return true;
    }
    if (email === 'staff@example.com' && role === 'staff') {
      const defaultUser: User = { name: 'Staff Admin', email, role };
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem('service_hub_session', JSON.stringify(defaultUser));
      return true;
    }

    // 2. Check registered accounts
    const savedUsersStr = localStorage.getItem('service_hub_users');
    if (savedUsersStr) {
      try {
        const savedUsers = JSON.parse(savedUsersStr);
        const found = savedUsers.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
        );
        if (found && found.password === password) {
          const loggedInUser: User = { name: found.name, email: found.email, role: found.role };
          setUser(loggedInUser);
          setIsAuthenticated(true);
          localStorage.setItem('service_hub_session', JSON.stringify(loggedInUser));
          return true;
        }
      } catch (e) {
        console.error('Error parsing registered users', e);
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('service_hub_session');
  };

  const registerUser = (name: string, email: string, password: string, role: 'member' | 'staff'): boolean => {
    const savedUsersStr = localStorage.getItem('service_hub_users');
    let savedUsers: any[] = [];
    if (savedUsersStr) {
      try {
        savedUsers = JSON.parse(savedUsersStr);
      } catch (e) {
        savedUsers = [];
      }
    }

    // Prevent duplicate registrations for same email and role
    const exists = savedUsers.some(
      (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
    );
    if (exists) {
      return false;
    }

    savedUsers.push({ name, email, password, role });
    localStorage.setItem('service_hub_users', JSON.stringify(savedUsers));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
