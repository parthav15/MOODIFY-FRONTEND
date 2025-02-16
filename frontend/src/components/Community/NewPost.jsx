import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/community/create_post/`;

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register", { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Post created successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/community"), 2000);
            } else {
                setError(response.data.message || "Failed to create post.");
            }
        } catch (err) {
            setError("Error submitting post. Please try again.");
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
                            className="text-3xl font-extrabold text-white text-center mb-6"
                        >
                            Create a New Post
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
                                <label className="block text-white text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter post title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1">Content</label>
                                <textarea
                                    placeholder="Write your post content..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1">Image Upload</label>
                                <div className="flex items-center justify-center w-full bg-white border border-gray-400 rounded-lg p-2">
                                    <svg 
                                        className="w-6 h-6 text-gray-600 mr-2" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14V6h-4v2a1 1 0 00-1 1H8a1 1 0 000 2h2v12a2 2 0 100 4 2 2 0 000-4h-2V8a1 1 0 10-2 0v2z"
                                        ></path>
                                    </svg>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="w-full text-gray-600 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-[#6a0dad] hover:bg-[#5c0d8e] text-white py-2 px-4 rounded-lg font-bold text-lg transition-all"
                            >
                                Create Post
                            </motion.button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
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
                toastStyle={{ backgroundColor: '#00796b', color: 'white' }}
            />
        </>
    );
}