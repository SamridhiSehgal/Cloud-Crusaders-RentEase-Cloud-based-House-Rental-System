import React, { useState } from 'react';
import TenantSidebar from '../../components/TenantSidebar';

const TenantChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Tenant', text: 'Hello! I’m interested in your property.' },
    { id: 2, sender: 'Owner', text: 'Hi! Sure, it’s still available. Would you like a tour?' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'Tenant',
      text: newMessage.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');

    // TODO: Send to backend via WebSocket or API
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TenantSidebar />
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Chat with Owner</h2>

        <div className="flex-1 bg-gray-800 rounded-lg shadow p-4 overflow-y-auto mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 p-3 max-w-md rounded-lg ${
                msg.sender === 'Tenant'
                  ? 'bg-blue-700 ml-auto text-right'
                  : 'bg-gray-700 mr-auto text-left'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default TenantChat;
