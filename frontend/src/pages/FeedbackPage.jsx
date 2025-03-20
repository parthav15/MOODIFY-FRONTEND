import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Star, Mail, Sparkles, MessageCircle } from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

const BASE_URL = "http://localhost:8000";


const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        rating: 0,
        message: ""
    });
    const [error, setError] = useState(null);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRating = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication required. Please log in.");
            setIsSubmitting(false);
            return;
        }

        if (!formData.rating || !formData.message) {
            setError("Please provide a rating and feedback message");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/emotion/add_feedback/`,
                {
                    comment: formData.message,
                    rating: formData.rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                toast.success("Feedback submitted successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setFormData({
                    rating: 0,
                    message: ""
                });
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error submitting feedback. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-15"/>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Floating Particles Background */}
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

                <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-2xl shadow-purple-900/20"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 mb-4">
                                <Sparkles className="h-5 w-5 text-purple-400" />
                                <span className="text-sm font-semibold text-purple-400">
                                    Share Your Experience
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Shape Our Future
                            </h1>
                        </div>

                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
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
                                    <Star className="h-5 w-5" />
                                    Rating
                                </label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            whileHover={{ scale: 1.2 }}
                                            className={`p-2 rounded-full transition-all ${(hoverRating || formData.rating) >= star
                                                    ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                                                    : 'bg-slate-800/50 border border-purple-500/20'
                                                }`}
                                            disabled={isSubmitting}
                                        >
                                            <Star
                                                className={`h-6 w-6 ${(hoverRating || formData.rating) >= star
                                                        ? 'text-white'
                                                        : 'text-purple-500/50'
                                                    }`}
                                                fill="currentColor"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Your Feedback
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 placeholder-purple-300/50"
                                    placeholder="We value your thoughts and suggestions..."
                                    disabled={isSubmitting}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <Sparkles className="h-5 w-5" />
                                {isSubmitting ? "Sending..." : "Submit Feedback"}
                            </motion.button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 p-6 bg-slate-900/50 backdrop-blur-lg rounded-xl border border-purple-500/20"
                        >
                            <div className="text-purple-300 space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Need Assistance?
                                </h3>
                                <p className="text-sm">
                                    Reach out to our support team at{" "}
                                    <span className="text-purple-400 hover:underline">
                                        support@moodify.com
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Add Footer */}
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

export default FeedbackForm;