import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome to BrokerHub</h1>
      {user ? <p>Hello, {user.name} ({user.role})!</p> : <p>Please log in or register.</p>}
    </div>
  );
};

export default Home;
