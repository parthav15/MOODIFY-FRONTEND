import { motion } from "framer-motion";
import { MessageCircle, Mail, User, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3]
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
            <MessageCircle className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions or suggestions? Our team is ready to help you create
            the perfect musical experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/20"
          >
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20"
              variants={floatingVariants}
              animate="float"
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20"
              variants={floatingVariants}
              animate="float"
            />

            <form className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <User className="h-5 w-5 text-purple-400" />
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-purple-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <Mail className="h-5 w-5 text-purple-400" />
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-purple-500"
                  placeholder="hello@moodify.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  rows="5"
                  className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-purple-500"
                  placeholder="Type your message here..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <Send className="h-5 w-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/20">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Let's Create Harmony Together
              </h3>
              <p className="text-gray-300 mb-6">
                Whether you're looking to collaborate, provide feedback, or just
                want to talk about music and AI - we're all ears!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail className="h-6 w-6 text-purple-400" />
                  <span>contact@moodify.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                  <span>Join our Discord community</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-4">
              {['Twitter', 'GitHub', 'LinkedIn'].map((platform) => (
                <motion.a
                  key={platform}
                  whileHover={{ y: -5 }}
                  className="p-4 text-center rounded-xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <span className="text-purple-400">{platform}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;