import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tenant'); // 'owner' or 'tenant'
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Sign-in submitted for ${role}`);
        // You can call different backend APIs based on role here
        //after sign in add token in localStorage and owner object id
        if(role==='tenant'){
            navigate('/tenant/dashboard');
        }
        else{
            navigate('/owner/dashboard');
        }

    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-gray-800 text-white py-4 px-8 flex justify-between items-center z-50">
                <div className="text-3xl font-bold">
                    <Link to="/">RentEase</Link>
                </div>
                <div className="flex gap-6 items-center">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/search" className="hover:text-gray-300">Search</Link>
                    <Link to="/help" className="hover:text-gray-300">Help</Link>
                    <Link to="/blog" className="hover:text-gray-300">Blog</Link>
                    <Link to="/videos" className="hover:text-gray-300">Videos</Link>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                        SignIn
                    </button>
                </div>
            </nav>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white text-black rounded-xl shadow-xl w-10/12 max-w-sm h-[540px] p-8 relative flex flex-col">
                        {/* Close Icon */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                        >
                            ×
                        </button>

                        <div className="mt-6 flex-grow">
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Sign In as {role === 'owner' ? 'Owner' : 'Tenant'}
                            </h2>

                            {/* Toggle Switch */}
                            <div className="flex justify-center mb-4 gap-4">
                                <button
                                    onClick={() => setRole('owner')}
                                    className={`px-4 py-1 rounded-full border ${role === 'owner' ? 'bg-blue-600 text-white' : 'bg-white text-black border-gray-300'}`}
                                >
                                    Owner
                                </button>
                                <button
                                    onClick={() => setRole('tenant')}
                                    className={`px-4 py-1 rounded-full border ${role === 'tenant' ? 'bg-blue-600 text-white' : 'bg-white text-black border-gray-300'}`}
                                >
                                    Tenant
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Email or Phone"
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 p-2 rounded"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                                >
                                    Sign In
                                </button>
                            </form>

                            <p className="mt-2 text-sm text-center">
                                <span className="text-red-600 font-semibold">New user?</span>{' '}
                                <span className="text-black">
                                    Please select <strong>Owner</strong> or <strong>Tenant</strong> on the home page.
                                </span>
                            </p>
                        </div>

                        {/* Why Join Section */}
                        <div className="text-sm text-center text-gray-700 mt-2">
                            <p><strong>Why join RentEase?</strong></p>
                            <p>
                                Discover hassle-free renting, connect directly with verified owners or tenants,
                                and manage everything in one place. It's fast, secure, and easy.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
