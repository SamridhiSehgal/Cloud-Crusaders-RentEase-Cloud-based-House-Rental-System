import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ to, title, description, backgroundImage, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center justify-center w-72 h-72 bg-cover bg-center text-white p-6 rounded-xl shadow-2xl hover:scale-105 transition-transform cursor-pointer" 
            style={{ backgroundImage: `url('${backgroundImage}')` }}>
            <h2 className="text-4xl font-bold">{title}</h2>
            <p className="mt-2 text-xl">{description}</p>
        </div>
    );
};

export default Card;
