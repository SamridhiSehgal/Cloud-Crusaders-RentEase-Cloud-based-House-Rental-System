import React from 'react';

const Popup = ({ title, children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-80">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Popup;
