import React, { useEffect, useState } from 'react';
import TenantSidebar from '../../components/TenantSidebar';

import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const TenantDashboard = () => {
  const [stats, setStats] = useState({
    activeRentals: 0,
    totalPaid: 0,
    approvedRequests: 0,
  });

  useEffect(() => {
    // Example API call
    // axios.get('/api/tenant/dashboard').then(res => setStats(res.data));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <TenantSidebar />
      <main className="flex-1 overflow-y-auto px-8 py-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome, Tenant!</h1>
        <div className="flex flex-wrap gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-1/2 lg:w-1/3">
            <StatCard icon={<HomeIcon className="text-blue-500" />} label="Active Rentals" value={stats.activeRentals} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-1/2 lg:w-1/3">
            <StatCard icon={<MonetizationOnIcon className="text-green-500" />} label="Total Paid" value={`₹${stats.totalPaid}`} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-1/2 lg:w-1/3">
            <StatCard icon={<CheckCircleOutlineIcon className="text-indigo-500" />} label="Approved Requests" value={stats.approvedRequests} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;
