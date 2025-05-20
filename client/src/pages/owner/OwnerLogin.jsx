import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerLoginPopup = ({ onClose }) => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '', contact: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let dataToSend;
            if (isSignUp) {
                dataToSend = formData;
            } else {
                dataToSend = {
                    email: formData.email,
                    password: formData.password,
                };
            }
            console.log(dataToSend);
            const response = await axios.post(
                `http://localhost:3000/owner/${isSignUp ? 'signup' : 'login'}`,
                dataToSend
            );
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                localStorage.setItem('owner', response.data.token);
                localStorage.setItem('ownerId',response.data.owner._id);
                alert(`${isSignUp ? "Owner Signed Up" : "Owner Logged In"} Successfully`);
                navigate('/owner/dashboard');
                onClose();
            } else {
                alert(`${isSignUp ? "Owner Sign Up" : "Owner Login"} Failed`);
            }
        } catch (error) {
            alert(`${isSignUp ? "Owner Sign Up" : "Owner Login"} Failed`);
            console.error(error);
        }
    };

    return (
        <div className="popup-overlay flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 sm:w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800">
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                    {isSignUp ? 'Owner Sign Up' : 'Owner Login'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {isSignUp && (
                        <div>
                            <label className="block mb-1 text-gray-700 text-sm">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                required={isSignUp}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-1 text-gray-700 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            required
                        />
                    </div>
                    {isSignUp && (
                        <div>
                            <label className="block mb-1 text-gray-700 text-sm">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                required={isSignUp}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-1 text-gray-700 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform transform hover:scale-105 text-sm font-medium">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <p className="mt-3 text-center text-gray-600 text-sm">
                    {isSignUp ? 'Already have an account?' : 'New owner?'}{' '}
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'Login here' : 'Sign up here'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default OwnerLoginPopup;
