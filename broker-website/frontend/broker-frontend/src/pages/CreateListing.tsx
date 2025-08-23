import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const CreateListing: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <div>Please log in to create a listing.</div>;
  // Placeholder: form for creating a new listing
  return (
    <div>
      <h2>Create Listing</h2>
      <form>
        {/* Add form fields for title, description, category, price, etc. */}
        <input type="text" placeholder="Title" required />
        <textarea placeholder="Description" required />
        <input type="number" placeholder="Price" required />
        {/* Add category select, image upload, etc. */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateListing;
