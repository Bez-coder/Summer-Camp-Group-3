import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/listings" element={<ProtectedRoute><Listings /></ProtectedRoute>} />
  <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
  <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const shouldUseDark = stored ? stored === 'dark' : false;
    document.documentElement.classList.toggle('dark', shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end">
            <button
              onClick={toggleTheme}
              className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.24 2.676-7.843 6.43-9.175a.75.75 0 01.951.966A8.25 8.25 0 0012 19.5a8.25 8.25 0 007.709-5.37.75.75 0 011.043-.443z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM4.47 4.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.47 5.53a.75.75 0 010-1.06zm12.88 12.88a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3A.75.75 0 012.25 12zm15 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zM4.47 19.53a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.53 19.53a.75.75 0 01-1.06 0zm12.88-12.88a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
