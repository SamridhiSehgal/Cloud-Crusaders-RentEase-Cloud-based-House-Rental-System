import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarIcon from '@mui/icons-material/Star';

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const OwnerDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    requests:   0,
    earnings:   0,
    rating:     0,
  });
// this property will fetech from the backend...
  const properties = [
    { id: 1, name: 'Room 1', rent: '₹8,000',  location: 'Dehradun', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Room 2', rent: '₹10,000', location: 'Delhi',    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Room 3', rent: '₹12,000', location: 'Mumbai',   image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Room 3', rent: '₹12,000', location: 'Mumbai',   image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Room 3', rent: '₹12,000', location: 'Mumbai',   image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Room 3', rent: '₹12,000', location: 'Mumbai',   image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60' },
  ];

  useEffect(() => {
    //change route at time of connecteivity with database backend...
    axios.get('/api/owner/dashboard')
      .then(res => {
        console.log('dashboard stats:', res.data);
        setStats(res.data);
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden bg-gray-100">
        {/* ===== stats section ===== */}
        <div className="px-8 py-8 w-full max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome, Owner!</h1>

          <div className="flex flex-wrap gap-6 mb-10">
            {[ 
              // { icon: <HomeIcon className="text-blue-500" />,           label: 'Total Properties', value: stats.properties },
              // { icon: <MailOutlineIcon className="text-yellow-500" />,  label: 'Pending Requests', value: stats.requests   },
              // { icon: <MonetizationOnIcon className="text-green-500" />,label: 'Monthly Earnings', value: `₹${stats.earnings}` },
              // { icon: <StarIcon className="text-indigo-500" />,         label: 'Avg. Rating',      value: stats.rating     }
              { icon: <HomeIcon className="text-blue-500" />,           label: 'Total Properties', value: 0 },
              { icon: <MailOutlineIcon className="text-yellow-500" />,  label: 'Pending Requests', value: 0   },
              { icon: <MonetizationOnIcon className="text-green-500" />,label: 'Monthly Earnings', value: `₹${0}` },
              { icon: <StarIcon className="text-indigo-500" />,         label: 'Avg. Rating',      value: 0     }
            ].map(({ icon, label, value }) => (
              <div 
                key={label}
                className="bg-white p-6 rounded-xl shadow-lg flex-none w-full sm:w-1/2 lg:w-1/4"
              >
                <StatCard icon={icon} label={label} value={value} />
              </div>
            ))}
          </div>
        </div>

        {/* ===== listings (scrollable) ===== */}
        <section className="flex-1 overflow-y-auto px-8 pb-8 max-w-7xl mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-4">Property Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-gray-700 mt-1">{p.rent}/mo</p>
                  <p className="text-gray-500">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OwnerDashboard;
