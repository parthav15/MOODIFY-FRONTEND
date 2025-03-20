import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, Rocket, Users, Award, Sparkles } from "lucide-react";

const Feature_2 = () => {
  const reasons = [
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "AI-Powered Learning",
      description: "Enhance your technical skills with cutting-edge emotion recognition technology"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Academic Relevance",
      description: "Perfect for final year projects and research in AI/ML domains"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Career Boost",
      description: "Stand out with hands-on experience in full-stack AI applications"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Join 10,000+ students in our learning ecosystem"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award-Winning Concept",
      description: "Recognized by leading tech education platforms"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Innovation Focus",
      description: "Pioneer in emotion-based music recommendation systems"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(40)].map((_, i) => (
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
              Student's First Choice
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Why Students Choose Moodify?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The ultimate platform bridging AI innovation with academic excellence - 
            chosen by 500+ institutions worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <motion.div
                  className="mb-4 text-purple-400 p-3 bg-purple-500/10 rounded-lg w-max"
                  whileHover={{ rotate: 15 }}
                >
                  {reason.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-purple-500/10 pointer-events-none"
                animate={{
                  borderColor: [
                    'rgba(168,85,247,0.1)',
                    'rgba(236,72,153,0.1)',
                    'rgba(168,85,247,0.1)'
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16 border-t border-purple-500/20 pt-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              95%
            </div>
            <div className="text-gray-400">Project Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <div className="text-gray-400">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-400">Support System</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_2;