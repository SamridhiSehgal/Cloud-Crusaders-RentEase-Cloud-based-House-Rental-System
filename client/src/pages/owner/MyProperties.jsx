import { Sidebar } from 'lucide-react';
import React from 'react';

const MyProperties = () => (
  <div className="p-6">
    <Sidebar/>
    <h2 className="text-2xl font-bold mb-4">My Listed Properties</h2>
    {/* Map properties from backend */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">Property Card</div>
    </div>
  </div>
);

export default MyProperties;
