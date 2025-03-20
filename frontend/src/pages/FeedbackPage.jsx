import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/HomePage/Navbar";

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
            <div className="min-h-screen bg-gradient-to-r from-[#6a0dad] to-[#b19cd9] flex flex-col justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="container mx-auto p-8 flex flex-col items-center"
                >
                    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-lg border border-white/20">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-extrabold text-white text-center mb-8"
                        >
                            Share Your Feedback
                        </motion.h1>

                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <div>
                                <label className="block text-white text-sm font-medium mb-1">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => handleRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="focus:outline-none"
                                            disabled={isSubmitting}
                                        >
                                            <svg
                                                className={`w-8 h-8 transition-colors ${
                                                    (hoverRating || formData.rating) >= star
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1">Your Feedback</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="We'd love to hear your thoughts..."
                                    disabled={isSubmitting}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-[#6a0dad] hover:bg-[#5c0d8e] text-white py-2 px-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Feedback"}
                            </motion.button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
                        >
                            <div className="text-white space-y-3">
                                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
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

export default FeedbackForm;