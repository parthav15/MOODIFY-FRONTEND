import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LiveEmotionDetection from '../components/MusicRecommendation/LiveEmotionDetection';
import MusicPlayer from './MusicPlayer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/HomePage/Navbar';

const MusicRecommendation = () => {
    const [imageFile, setImageFile] = useState(null);
    const [language, setLanguage] = useState('english');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [liveMode, setLiveMode] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImageFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResults(null);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to use this feature');
            setIsLoading(false);
            setTimeout(() => {
                navigate('/login-register');
            }, 2000);;
        }

        if (!imageFile) {
            toast.error('Please upload an image');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('language', language);

        try {
            const response = await axios.post('http://localhost:8000/emotion/emotion_detection/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.data.success) {
                setResults(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error processing request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-[#6a0dad] to-[#b19cd9] py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                        onClick={() => setLiveMode(!liveMode)}
                    >
                        {liveMode ? 'Switch to Image Upload' : 'Try Live Emotion Detection'}
                    </motion.button>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-white text-center mb-8">
                        Music Recommendation
                    </h1>

                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Image Upload Section */}
                            <div className="mb-8">
                                <label className="block text-white mb-4 text-lg">Upload Facial Image</label>
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-purple-400 bg-white/10' : 'border-white/20'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="text-white">
                                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {imageFile ? (
                                                <p className="text-sm">{imageFile.name}</p>
                                            ) : (
                                                <p className="text-sm">Drag & Drop or Click to Upload</p>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Language Selection */}
                            <div className="mb-8">
                                <label className="block text-white mb-4 text-lg">Select Language</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['english', 'hindi', 'punjabi'].map((lang) => (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => setLanguage(lang)}
                                            className={`py-2 rounded-lg text-sm font-medium transition-colors ${language === lang
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                                }`}
                                        >
                                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold text-lg transition-all disabled:opacity-50"
                            >
                                {isLoading ? 'Analyzing...' : 'Get Recommendations'}
                            </motion.button>
                        </motion.form>

                        {/* Results Section */}
                        {liveMode ? (
                            <LiveEmotionDetection />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-12"
                            >
                                {results && (
                                    <>
                                        <div className="text-center mb-12">
                                            <h2 className="text-2xl font-bold text-white mb-2">
                                                Detected Emotion: {results.emotion}
                                            </h2>
                                            <p className="text-white/80">Based on your facial expression</p>
                                        </div>

                                        <MusicPlayer recommendations={results.recommendations} />
                                    </>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: '#6a0dad', color: 'white' }}
            />
        </>
    );
};

export default MusicRecommendation;
