import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

const OwnerProperties = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Cozy Apartment',
      rent: '₹10,000',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: 'Modern Studio',
      rent: '₹8,500',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60',
    },
  ]);

  useEffect(() => {
    // TODO: Fetch properties owned by the logged-in owner from the backend
    // Example:
    // axios.get('/api/owner/properties').then(res => setProperties(res.data));
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">My Properties</h2>

        {properties.length === 0 ? (
          <p>No properties listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
                <img src={prop.image} alt={prop.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{prop.name}</h3>
                  <p className="text-gray-300">{prop.rent}/mo</p>
                  <p className="text-gray-400">{prop.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerProperties;
