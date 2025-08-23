import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, loading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (!res.token) setError(res.message || 'Login failed');
  };

  if (user) return <div>Logged in as {user.email}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
};

export default Login;
