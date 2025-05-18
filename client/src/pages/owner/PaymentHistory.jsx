import React from 'react';
import Sidebar from '../../components/Sidebar';

const PaymentHistory = () => {
  const payments = [
    {
      id: 1,
      tenantName: 'John Doe',
      property: 'Cozy Apartment',
      amount: 10000,
      date: '2024-05-01',
      status: 'Paid',
    },
    {
      id: 2,
      tenantName: 'Jane Smith',
      property: 'Modern Studio',
      amount: 8500,
      date: '2024-04-25',
      status: 'Paid',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Payment History</h1>

        {payments.length === 0 ? (
          <p>No payments received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 bg-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-left text-sm text-gray-200">
                  <th className="px-4 py-3 border border-gray-600">Tenant</th>
                  <th className="px-4 py-3 border border-gray-600">Property</th>
                  <th className="px-4 py-3 border border-gray-600">Amount</th>
                  <th className="px-4 py-3 border border-gray-600">Date</th>
                  <th className="px-4 py-3 border border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-700 transition">
                    <td className="px-4 py-3 border border-gray-600">{payment.tenantName}</td>
                    <td className="px-4 py-3 border border-gray-600">{payment.property}</td>
                    <td className="px-4 py-3 border border-gray-600">₹{payment.amount}</td>
                    <td className="px-4 py-3 border border-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 border border-gray-600 text-green-400 font-semibold">
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaymentHistory;
