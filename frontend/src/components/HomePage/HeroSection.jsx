import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Rocket, ChevronDown, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const HeroSection = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
  const canvasRef = useRef(null);
  const hoverSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'] });

  // Parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [15, -15]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);

  // Gradient morph animation
  const gradients = [
    'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
    'linear-gradient(45deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'
  ];

  // Audio visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(147, 51, 234, 0.05)';
      
      // Create flowing wave effect
      const time = Date.now() * 0.002;
      for(let i = 0; i < canvas.width; i += 20) {
        const amplitude = Math.sin(time + i * 0.02) * 40;
        ctx.beginPath();
        ctx.arc(i, canvas.height/2 + amplitude, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrame = requestAnimationFrame(drawWave);
    };

    drawWave();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Cursor particle effect
  const particles = useRef([]);
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setCursorPos({ x: e.clientX, y: e.clientY });

    // Add new particles
    for(let i = 0; i < 3; i++) {
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 2,
        life: 1
      });
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: gradients,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Audio Visualization Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full opacity-20"
        width={window.innerWidth}
        height={window.innerHeight}
      />

      {/* Interactive Cursor Particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {particles.current.map((particle, index) => (
          <div
            key={index}
            className="absolute bg-purple-500 rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.x,
              top: particle.y,
              opacity: particle.life
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-30 text-center max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Your Emotions,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Playlist
            </span>
          </h1>

          <motion.p
            className="text-lg md:text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            AI-powered music curation that syncs with your emotional wavelength. 
            Experience sound that moves with you.
          </motion.p>

          {/* CTA Buttons with Sound Effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => hoverSound.play()}
            >
              <Link
                to="/get-started"
                className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
              >
                <Rocket className="h-5 w-5 transition-transform group-hover:rotate-45" />
                Start Experience
              </Link>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => hoverSound.play()}
            >
              <Link
                to="/demo"
                className="flex items-center gap-3 border border-purple-500/30 text-purple-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <Music className="h-5 w-5 fill-purple-500 transition-transform group-hover:scale-125" />
                Live Demo
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 20, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <ChevronDown className="h-8 w-8 text-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;