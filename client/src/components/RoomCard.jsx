import React from 'react';

const RoomCard = ({ room }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{room.location}</h3>
            <p className="text-gray-600">Rent: ₹{room.rentPrice}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">View Details</button>
        </div>
    );
};

export default RoomCard;