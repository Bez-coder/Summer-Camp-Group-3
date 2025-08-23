import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {

  const { register, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('BUYER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await register(email, password, name, role);
    if (res.user) setSuccess('Registration successful! You can now log in.');
    else setError(res.message || 'Registration failed');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
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
      <select value={role} onChange={e => setRole(e.target.value)} required>
        <option value="BUYER">Buyer</option>
        <option value="SELLER">Seller</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
};

export default Register;
