import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
  <p>Role: {user.role}</p>
  <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
