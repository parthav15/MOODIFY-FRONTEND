import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin, Music, MessageCircle } from "lucide-react";

const Footer = () => {
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
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-purple-500/20">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
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
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Moodify
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing music experience through AI-powered emotion detection
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-purple-400 font-semibold mb-2">Explore</h4>
            <ul className="space-y-3">
              {['About Us', 'Features', 'Community', 'Documentation'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-purple-400 font-semibold mb-2">Resources</h4>
            <ul className="space-y-3">
              {['Blog', 'Help Center', 'API Status', 'Careers'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-purple-400 font-semibold mb-2">Stay Updated</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-lg text-sm"
              >
                Subscribe
              </motion.button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              {[
                { icon: <Twitter className="h-5 w-5" />, name: 'Twitter' },
                { icon: <Github className="h-5 w-5" />, name: 'GitHub' },
                { icon: <Linkedin className="h-5 w-5" />, name: 'LinkedIn' },
                { icon: <MessageCircle className="h-5 w-5" />, name: 'Discord' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ y: -5 }}
                  href="#"
                  className="text-purple-400 hover:text-pink-400"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Moodify. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
                <Link
                  key={link}
                  to="#"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute left-20 bottom-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-10"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute right-32 top-1/3 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-10"
        variants={floatingVariants}
        animate="float"
      />
    </footer>
  );
};

export default Footer;