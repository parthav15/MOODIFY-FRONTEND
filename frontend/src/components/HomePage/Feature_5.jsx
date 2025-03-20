import { motion } from "framer-motion";
import { ChevronDown, BrainCircuit, Sparkles, Music, Camera } from "lucide-react";
import { useState } from "react";

const Feature_5 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "How does Moodify detect emotions?",
      answer: "Using advanced computer vision and deep learning models to analyze facial micro-expressions in real-time",
      icon: <BrainCircuit className="h-5 w-5" />
    },
    {
      question: "What music platforms do you support?",
      answer: "Currently integrated with Spotify and YouTube Music, with more platforms coming soon",
      icon: <Music className="h-5 w-5" />
    },
    {
      question: "Is my camera feed stored?",
      answer: "No, we process images locally and never store any facial data",
      icon: <Camera className="h-5 w-5" />
    },
    {
      question: "How accurate is the emotion detection?",
      answer: "Our AI achieves 92% accuracy across 8 core emotions in controlled environments",
      icon: <Sparkles className="h-5 w-5" />
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Holographic Cube */}
      <motion.div
        className="absolute left-1/4 top-20 w-32 h-32 border-2 border-purple-500/30 backdrop-blur-lg"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-0 bg-purple-500/10 animate-pulse" />
      </motion.div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 mb-8">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              Knowledge Base
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Answers in Motion
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore common questions about our emotion-driven music technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-start gap-4"
              >
                {/* Animated Icon */}
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="p-2 bg-purple-500/10 rounded-lg mt-1"
                >
                  {faq.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {faq.question}
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      height: activeIndex === index ? 'auto' : 0
                    }}
                    className="text-gray-400 pr-8"
                  >
                    {faq.answer}
                  </motion.div>
                </div>

                <ChevronDown className={`h-5 w-5 text-purple-400 transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Hover Effect Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating MOODIFY Text */}
        <motion.div
          className="absolute right-20 bottom-20 opacity-10"
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 5, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity
          }}
        >
          <span className="text-[120px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            MOODIFY
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_5;