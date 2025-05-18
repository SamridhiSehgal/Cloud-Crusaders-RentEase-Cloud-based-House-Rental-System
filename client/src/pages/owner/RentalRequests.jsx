import React from 'react';
import Sidebar from '../../components/Sidebar';

const RentalRequests = () => {
  const requests = [
    { id: 1, tenantName: 'John Doe', property: 'Cozy Apartment', date: '2024-05-01' },
    { id: 2, tenantName: 'Jane Smith', property: 'Modern Studio', date: '2024-05-02' },
  ];

  const handleAccept = (id) => {
    alert(`Accepted request ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejected request ID: ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Rental Requests</h2>

        {requests.length === 0 ? (
          <p>No rental requests found.</p>
        ) : (
          <div className="space-y-4">
            {requests.map(req => (
              <div
                key={req.id}
                className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{req.tenantName}</p>
                  <p className="text-gray-400 text-sm">
                    {req.property} | {new Date(req.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RentalRequests;
