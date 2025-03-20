import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef } from "react";

const Feature_1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"], { damping: 15 });
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"], { damping: 15 });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -15]);

  // Badge micro-interaction variants
  const badgeVariants = {
    hover: {
      background: [
        'linear-gradient(45deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
        'linear-gradient(45deg, rgba(168,85,247,0.1) 0%, rgba(99,102,241,0.1) 100%)'
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    },
    tap: {
      scale: 0.95,
      background: 'linear-gradient(45deg, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.2) 100%)'
    }
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
            'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)',
            'linear-gradient(225deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
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
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description with Parallax */}
          <motion.div 
            style={{ y: y1 }}
            className="space-y-8"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 relative overflow-hidden"
              variants={badgeVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 relative">
                AI-Powered Emotion Detection
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Revolutionizing Music Experience
            </h2>

            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              Moodify harnesses advanced computer vision and machine learning algorithms 
              to analyze facial expressions in real-time, creating personalized music 
              recommendations that perfectly match your current emotional state. Our 
              system continuously evolves to understand your unique musical preferences.
            </motion.p>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden">
                {/* Animated Button Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                <span className="relative z-10">Explore Features</span>
                <Sparkles className="h-5 w-5 relative z-10" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Project Name with Parallax */}
          <motion.div 
            style={{ y: y2, rotateX }}
            className="relative flex items-center justify-center h-full min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl backdrop-blur-xl border border-purple-500/20" />
            
            <motion.div 
              className="relative z-10 text-center"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                MOODIFY
              </div>
              <div className="mt-4 text-lg text-purple-300 font-medium">
                Emotion-Driven Soundscape
              </div>
            </motion.div>

            {/* Animated Border */}
            <motion.div 
              className="absolute inset-0 rounded-3xl border-2 border-purple-500/30"
              animate={{
                borderColor: [
                  'rgba(168,85,247,0.3)',
                  'rgba(236,72,153,0.3)',
                  'rgba(168,85,247,0.3)'
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature_1;