import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getProfile } from '../lib/api';

interface User {
  id: number;
  email: string;
  name?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name?: string) => Promise<any>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      getProfile(token).then(res => {
        if (res.user) setUser(res.user);
      });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await apiLogin({ email, password });
    if (res.token) {
      setToken(res.token);
      localStorage.setItem('token', res.token);
      setUser(res.user);
    }
    setLoading(false);
    return res;
  };

  const register = async (email: string, password: string, name?: string, role: string = 'BUYER') => {
    setLoading(true);
    const res = await apiRegister({ email, password, name, role });
    setLoading(false);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
