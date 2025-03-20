import { motion } from "framer-motion";
import { Rocket, Users, Shield, Star, Globe, HeartHandshake } from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

const AboutUsPage = () => {
  const teamMembers = [
    { name: "Alex Chen", role: "AI Engineer", bio: "Deep learning specialist with 5+ years in emotion recognition" },
    { name: "Sarah Johnson", role: "Music Curator", bio: "Professional DJ with expertise in mood-based playlists" },
    { name: "Raj Patel", role: "Full Stack Developer", bio: "Web platform architect & UI/UX enthusiast" },
    { name: "Emma Wilson", role: "Community Manager", bio: "Connecting music lovers worldwide" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 mb-8">
            <Rocket className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              Pioneers in Emotion Tech
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Revolutionizing Music Experience
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At Moodify, we blend cutting-edge AI with musical passion to create 
            personalized soundscapes that resonate with your emotions
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-12 mb-20 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Shield className="h-6 w-6" />
              <span className="text-sm font-semibold">Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-100">
              Bridging Emotions & Technology
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We're committed to developing AI solutions that understand human emotions
              through facial recognition, creating music experiences that adapt in real-time
              to your mood and preferences
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-xl"
          >
            <div className="aspect-video rounded-xl bg-purple-500/10 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-gray-100">Meet the Visionaries</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="w-full h-48 bg-purple-500/10 rounded-xl mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3>
                <p className="text-purple-400 mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-purple-500/20"
          >
            <Star className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Innovation</h3>
            <p className="text-gray-400">Pushing boundaries in AI-driven music technology</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-purple-500/20"
          >
            <Globe className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Community</h3>
            <p className="text-gray-400">Connecting music lovers through shared experiences</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-purple-500/20"
          >
            <HeartHandshake className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Empathy</h3>
            <p className="text-gray-400">Technology that understands human emotions</p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
          <div className="p-6 border border-purple-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="p-6 border border-purple-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              1M+
            </div>
            <div className="text-gray-400">Songs Analyzed</div>
          </div>
          <div className="p-6 border border-purple-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-gray-400">Accuracy Rate</div>
          </div>
          <div className="p-6 border border-purple-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;