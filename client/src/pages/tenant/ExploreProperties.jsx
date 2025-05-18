import React, { useState, useEffect } from 'react';
import TenantSidebar from '../../components/TenantSidebar';

const ExploreProperties = () => {
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
    {
      id: 3,
      name: 'Shared Room',
      rent: '₹5,500',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=60',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProps, setFilteredProps] = useState(properties);

  useEffect(() => {
    setFilteredProps(
      properties.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, properties]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TenantSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Explore Properties</h2>

        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full mb-6 p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProps.length ? (
            filteredProps.map(p => (
              <div key={p.id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition">
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="text-gray-300">{p.rent} / month</p>
                  <p className="text-gray-400">{p.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No properties match your search.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExploreProperties;
