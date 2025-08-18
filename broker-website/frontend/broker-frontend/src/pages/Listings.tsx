import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Listings: React.FC = () => {
  const { user } = useAuth();
  // Placeholder: fetch listings from backend and display them
  return (
    <div>
      <h2>Listings</h2>
      <p>{user ? `Welcome, ${user.name} (${user.role})!` : 'Please log in to view listings.'}</p>
      {/* Listings table or cards go here */}
    </div>
  );
};

export default Listings;
