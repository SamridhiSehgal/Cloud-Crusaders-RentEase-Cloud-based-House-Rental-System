import React from 'react';

const PropertyCard = ({ title, location, price, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="mt-2 text-blue-600 font-bold">₹{price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
