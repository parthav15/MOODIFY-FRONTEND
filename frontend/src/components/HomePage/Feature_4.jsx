import { motion } from "framer-motion";
import { Star, Quote, User, MessageCircle, Heart } from "lucide-react";

const Feature_4 = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Music Student",
      text: "Moodify transformed how I discover music. The emotion-based recommendations are eerily accurate!",
      rating: 5,
    },
    {
      id: 2,
      name: "Alex Chen",
      role: "AI Enthusiast",
      text: "The most innovative project I've seen in music tech. The community features are fantastic!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Developer",
      text: "Implementing Moodify in my final year project was the best decision. Highly recommended!",
      rating: 4,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(25)].map((_, i) => (
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
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
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
            <Heart className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              User Love
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Voices of Satisfaction
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why thousands of users trust Moodify for their musical journey
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-purple-500/20" />

              {/* User Avatar */}
              <motion.div
                className="mb-4 p-1 rounded-full w-max bg-gradient-to-r from-purple-500 to-pink-500"
                whileHover={{ rotate: 15 }}
              >
                <div className="p-3 bg-slate-900 rounded-full">
                  <User className="h-8 w-8 text-purple-400" />
                </div>
              </motion.div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    className="text-purple-400"
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>

              {/* User Info */}
              <div className="border-t border-purple-500/20 pt-4">
                <h3 className="font-semibold text-gray-100">{testimonial.name}</h3>
                <p className="text-sm text-purple-400">{testimonial.role}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              4.9/5
            </div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              2K+
            </div>
            <div className="text-gray-400">Satisfied Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              95%
            </div>
            <div className="text-gray-400">Positive Feedback</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 mx-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Share Your Experience
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;