import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <div>Please log in to view your dashboard.</div>;
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})!</p>
      {/* Add dashboard widgets, stats, or links here */}
    </div>
  );
};

export default Dashboard;
