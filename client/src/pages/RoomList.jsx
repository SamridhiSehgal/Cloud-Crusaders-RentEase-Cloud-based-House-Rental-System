import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ city: '', rentPrice: '', bhk: '', furnishingStatus: '' });
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    // TODO: replace with real API call
    const fakeRooms = [
      { _id: '1', location: 'New Delhi', rentPrice: 15000, bhk: 2, furnishingStatus: 'Furnished', images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D'] },
      { _id: '2', location: 'Mumbai', rentPrice: 20000, bhk: 3, furnishingStatus: 'Semi-Furnished', images: ['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'] },
      { _id: '3', location: 'Bangalore', rentPrice: 10000, bhk: 1, furnishingStatus: 'Unfurnished', images: ['https://plus.unsplash.com/premium_photo-1676968002767-1f6a09891350?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJvb218ZW58MHx8MHx8fDA%3D'] },
      { _id: '4', location: 'Pune', rentPrice: 12000, bhk: 2, furnishingStatus: 'Furnished', images: ['https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJvb218ZW58MHx8MHx8fDA%3D'] },
    ];
    setRooms(fakeRooms);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    // TODO: apply filters logic
    setPanelOpen(false);
  };

  return (
    <>
      <Navbar />

      {/* Filter Toggle Button (fixed at top-left) */}
      {!panelOpen &&
        <button
          className="fixed top-[80px] left-6 z-50 p-3  bg-white rounded shadow"
          onClick={() => setPanelOpen(true)}
        >
          <TuneIcon />
        </button>
      }

      {/* Filter Panel */}
      <div
        className={`fixed top-[72px] left-0 z-40 h-[calc(100vh-72px)] w-64 bg-white p-6 shadow-lg overflow-y-auto transform transition-transform duration-300 ${
          panelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setPanelOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold mb-6">Filter</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rent Price</label>
            <select
              name="rentPrice"
              value={filters.rentPrice}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="">Any</option>
              <option value="2000-5000">₹2,000 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
              <option value="20000+">₹20,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">BHK</label>
            <select
              name="bhk"
              value={filters.bhk}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} BHK
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Furnishing</label>
            <select
              name="furnishingStatus"
              value={filters.furnishingStatus}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="">Any</option>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
          <button
            onClick={handleApply}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Apply & Close
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`pt-[90px] bg-gray-50 min-h-screen transition-all duration-300 ${panelOpen ? 'lg:pl-64' : 'lg:pl-0'}`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Available Rooms</h1>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link key={room._id} to={`/rooms/${room._id}`} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                  <img src={room.images[0]} alt="Room" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{room.location}</h2>
                    <p className="text-gray-700 mb-1">
                      Rent: <span className="font-medium">₹{room.rentPrice}</span>
                    </p>
                    <p className="text-gray-700 mb-1">
                      BHK: <span className="font-medium">{room.bhk}</span>
                    </p>
                    <p className="text-gray-700">
                      Furnishing: <span className="font-medium">{room.furnishingStatus}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RoomList;
