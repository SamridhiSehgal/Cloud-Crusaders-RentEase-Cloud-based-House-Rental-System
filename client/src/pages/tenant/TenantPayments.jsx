import React, { useEffect, useState } from 'react';
import TenantSidebar from '../../components/TenantSidebar';

const TenantPayments = () => {
  const [payments, setPayments] = useState([
    { id: 1, propertyName: 'Cozy Apartment', amount: 10000, date: '2024-01-01', status: 'Paid' },
    { id: 2, propertyName: 'Modern Studio', amount: 8500, date: '2024-02-01', status: 'Paid' },
    { id: 3, propertyName: 'Shared Room', amount: 5500, date: '2024-03-01', status: 'Due' },
  ]);

  useEffect(() => {
    // TODO: Fetch real payment data from backend API here
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TenantSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Payment History</h2>

        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-2 text-left">Property</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-800">
                <td className="border border-gray-600 px-4 py-2">{payment.propertyName}</td>
                <td className="border border-gray-600 px-4 py-2">₹{payment.amount}</td>
                <td className="border border-gray-600 px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                <td className={`border border-gray-600 px-4 py-2 font-semibold ${
                  payment.status === 'Paid' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default TenantPayments;
