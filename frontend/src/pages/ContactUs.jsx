import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { MapPin, Phone, Mail, Clock, Sparkles, User, MessageCircle } from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

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
        toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <>
            <Navbar />
            <div className="h-15"/>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Floating Particles */}
                <div className="absolute inset-0 z-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.3, 0.8, 0.3],
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-2xl shadow-purple-900/20"
                    >
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 mb-4">
                                <Sparkles className="h-5 w-5 text-purple-400" />
                                <span className="text-sm font-semibold text-purple-400">
                                    Let's Connect
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Contact Our Team
                            </h1>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.form
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-gradient-to-r from-red-500/20 to-pink-500/10 rounded-lg border border-red-500/30 text-red-400 text-sm text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                        <Phone className="h-5 w-5" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                        <MessageCircle className="h-5 w-5" />
                                        Your Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                                >
                                    <Sparkles className="h-5 w-5" />
                                    Send Message
                                </motion.button>
                            </motion.form>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
                                >
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                                        Contact Details
                                    </h3>
                                    <div className="space-y-6 text-purple-300">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-6 h-6 mt-1 text-purple-400" />
                                            <div>
                                                <p className="font-medium">Headquarters</p>
                                                <p className="text-sm">123 Tech Street</p>
                                                <p className="text-sm">Innovation Valley, CA 94016</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Phone className="w-6 h-6 text-purple-400" />
                                            <span>+1 (555) 123-4567</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Mail className="w-6 h-6 text-purple-400" />
                                            <span>support@moodify.com</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
                                >
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                                        Operating Hours
                                    </h3>
                                    <div className="space-y-4 text-purple-300">
                                        <div className="flex justify-between items-center">
                                            <span>Monday - Friday</span>
                                            <span className="bg-purple-500/10 px-3 py-1 rounded-full">9 AM - 6 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Saturday</span>
                                            <span className="bg-purple-500/10 px-3 py-1 rounded-full">10 AM - 4 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Sunday</span>
                                            <span className="bg-purple-500/10 px-3 py-1 rounded-full">Closed</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <Footer />

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
                    toastStyle={{
                        background: 'rgba(30, 30, 45, 0.95)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        backdropFilter: 'blur(12px)',
                        color: '#e9d5ff'
                    }}
                />
            </div>
        </>
    );
};

export default ContactUs;