import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 p-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} RentEase. All Rights Reserved.</p>
                <p className="text-xs">Designed and developed with ❤️ by ???</p>
            </div>
        </footer>
    );
};

export default Footer;