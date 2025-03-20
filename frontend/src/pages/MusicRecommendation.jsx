import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Camera, Upload, Languages, Sparkles, Music } from 'lucide-react';
import LiveEmotionDetection from '../components/MusicRecommendation/LiveEmotionDetection';
import MusicPlayer from './MusicPlayer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

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
            <div className='h-15'/>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 z-0">
                    {[...Array(20)].map((_, i) => (
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

                <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 px-6 py-2 rounded-full mx-auto transition-all"
                            onClick={() => setLiveMode(!liveMode)}
                        >
                            <Camera className="h-5 w-5" />
                            {liveMode ? 'Switch to Image Upload' : 'Try Live Emotion Detection'}
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center mb-12"
                        >
                            Emotion-Driven Music Discovery
                        </motion.h1>

                        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-2xl shadow-purple-900/20">
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                {/* Image Upload Section */}
                                <div className="mb-8">
                                    <label className="block text-purple-300 mb-4 text-lg font-medium flex items-center gap-2">
                                        <Upload className="h-6 w-6" />
                                        Upload Facial Image
                                    </label>
                                    <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                                                ? 'border-purple-400 bg-purple-500/10 shadow-inner shadow-purple-500/20'
                                                : 'border-purple-500/20 bg-slate-900/30'
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
                                            <div className="text-purple-300 space-y-4">
                                                <Upload className="w-16 h-16 mx-auto mb-4 stroke-1" />
                                                {imageFile ? (
                                                    <p className="text-sm bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
                                                        {imageFile.name}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm">Drag & Drop or Click to Upload</p>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Language Selection */}
                                <div className="mb-8">
                                    <label className="block text-purple-300 mb-4 text-lg font-medium flex items-center gap-2">
                                        <Languages className="h-6 w-6" />
                                        Select Language
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['english', 'hindi', 'punjabi'].map((lang) => (
                                            <motion.button
                                                key={lang}
                                                type="button"
                                                onClick={() => setLanguage(lang)}
                                                whileHover={{ scale: 1.05 }}
                                                className={`py-3 rounded-xl text-sm font-medium transition-all ${language === lang
                                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                                        : 'bg-slate-800/50 text-purple-300 hover:bg-slate-800/70 border border-purple-500/20'
                                                    }`}
                                            >
                                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                                >
                                    <Sparkles className="h-5 w-5" />
                                    {isLoading ? 'Analyzing Emotion...' : 'Get Recommendations'}
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
                                        <div className="space-y-12">
                                            <div className="text-center">
                                                <motion.div
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20"
                                                >
                                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                                        {results.emotion}
                                                    </h2>
                                                    <p className="text-purple-300">Detected from your expression</p>
                                                </motion.div>
                                            </div>

                                            <MusicPlayer recommendations={results.recommendations} />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Add Footer */}
                <Footer />

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

export default MusicRecommendation;
