import React, { useState, useEffect } from 'react';
import TenantSidebar from '../../components/TenantSidebar';

const TenantProfile = () => {
  const [profile, setProfile] = useState({
    username: 'tenantuser',
    email: 'tenant@example.com',
    phone: '+91 1234567890',
  });

  useEffect(() => {
    // TODO: fetch real profile data here
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Submit updated profile data to backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TenantSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Profile Settings</h2>

        <form onSubmit={handleSubmit} className="max-w-md space-y-6">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={profile.username}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-purple-700 rounded hover:bg-purple-600 transition"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default TenantProfile;
