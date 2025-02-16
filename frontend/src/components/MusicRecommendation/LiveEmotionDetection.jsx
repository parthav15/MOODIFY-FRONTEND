import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import MusicPlayer from '../../pages/MusicPlayer';

const LiveEmotionDetection = () => {
  const [emotion, setEmotion] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [faceBox, setFaceBox] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
      startDetection();
    } catch (err) {
      toast.error('Error accessing camera');
      setIsLoading(false);
    }
  };

  const captureAndAnalyze = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');
      formData.append('language', 'Hindi');

      try {
        const response = await axios.post('http://localhost:8000/emotion/emotion_detection/', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          setFaceBox(response.data.face_coordinates);
          setEmotion(response.data.emotion);
          setRecommendations([...response.data.recommendations]);
        }
      } catch (error) {
        toast.error('Error analyzing frame');
      }
    }, 'image/jpeg');
  };

  const startDetection = () => {
    intervalRef.current = setInterval(captureAndAnalyze, 30000); // Changed to 30 seconds
    setIsLoading(false);
    captureAndAnalyze(); // Initial immediate call
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Live Emotion Detection</h1>
        <div className="relative mb-8">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-96 object-cover rounded-2xl"
            style={{ display: isCameraOn ? 'block' : 'none' }}
          />
          {faceBox && (
            <div
              className="absolute border-4 border-purple-500 rounded-lg"
              style={{
                left: `${faceBox.x}px`,
                top: `${faceBox.y}px`,
                width: `${faceBox.width}px`,
                height: `${faceBox.height}px`,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-8 left-0 bg-purple-600 px-4 py-2 rounded-lg"
              >
                <span className="text-xl font-bold">{emotion}</span>
              </motion.div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" width="640" height="480" />
        </div>
        {!isCameraOn && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startCamera}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold"
            >
              {isLoading ? 'Initializing...' : 'Start Live Detection'}
            </motion.button>
          </div>
        )}
        {recommendations.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <MusicPlayer recommendations={recommendations} />
          </motion.div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default LiveEmotionDetection;