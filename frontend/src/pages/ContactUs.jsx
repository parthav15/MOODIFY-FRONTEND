import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/HomePage/Navbar";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Add your form submission logic here
        toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Clear form
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: ""
        });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-[#6a0dad] to-[#b19cd9] flex flex-col justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="container mx-auto p-8 flex flex-col items-center"
                >
                    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-lg border border-white/20">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-extrabold text-white text-center mb-8"
                        >
                            Get in Touch
                        </motion.h1>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Form */}
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                <div>
                                    <label className="block text-white text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-[#6a0dad] hover:bg-[#5c0d8e] text-white py-2 px-4 rounded-lg font-bold text-lg transition-all"
                                >
                                    Send Message
                                </motion.button>
                            </motion.form>

                            {/* Contact Information */}
                            <div className="text-white space-y-6">
                                <motion.div
                                    initial={{ x: 50 }}
                                    animate={{ x: 0 }}
                                    className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
                                >
                                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <svg
                                                className="w-6 h-6 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            123 Tech Street, Innovation Valley, CA 94016
                                        </div>
                                        <div className="flex items-center">
                                            <svg
                                                className="w-6 h-6 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                            +1 (555) 123-4567
                                        </div>
                                        <div className="flex items-center">
                                            <svg
                                                className="w-6 h-6 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            support@jobsphere.ai
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
                                >
                                    <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span>Monday - Friday:</span>
                                            <span>9:00 AM - 6:00 PM</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>Saturday:</span>
                                            <span>10:00 AM - 4:00 PM</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>Sunday:</span>
                                            <span>Closed</span>
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: '#00796b', color: 'white' }}
            />
        </>
    );
};

export default ContactUs;