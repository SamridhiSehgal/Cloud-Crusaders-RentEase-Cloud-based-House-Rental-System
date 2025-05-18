import React, { useEffect, useState } from 'react';
import TenantSidebar from '../../components/TenantSidebar';

const MyRentals = () => {
  const [rentals, setRentals] = useState([
    {
      id: 1,
      name: 'Cozy Apartment',
      rent: '₹10,000',
      location: 'Delhi',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: 'Modern Studio',
      rent: '₹8,500',
      location: 'Mumbai',
      startDate: '2024-06-15',
      endDate: '2025-06-14',
      image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60',
    },
  ]);

  useEffect(() => {
    // TODO: Fetch real rental data from backend API here
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TenantSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">My Rentals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <img src={rental.image} alt={rental.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{rental.name}</h3>
                <p className="text-gray-300">{rental.rent} / month</p>
                <p className="text-gray-400">{rental.location}</p>
                <p className="text-gray-400 mt-2 text-sm">
                  Rental Period: {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {rentals.length === 0 && <p>No active rentals found.</p>}
        </div>
      </main>
    </div>
  );
};

export default MyRentals;
