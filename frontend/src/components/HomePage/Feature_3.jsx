import { motion } from "framer-motion";
import { MessageCircle, Heart, Share, User, Smile, Send, MoreVertical } from "lucide-react";
import { useState } from "react";

const Feature_3 = () => {
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState({
    1: ["Great project!", "How do I get started?"],
    2: ["Loved the emotion detection!"]
  });

  const posts = [
    {
      id: 1,
      user: "AI_Enthusiast",
      content: "Just discovered Moodify - blown away by the accuracy of emotion detection! 🚀",
      likes: 42,
      timestamp: "2h ago",
      avatar: <User className="h-6 w-6" />
    },
    {
      id: 2,
      user: "MusicLover",
      content: "Shared my first playlist using Moodify's recommendation system. Check it out! 🎧",
      likes: 28,
      timestamp: "4h ago",
      avatar: <Smile className="h-6 w-6" />
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0">
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
            <Share className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              Interactive Community
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Connect & Collaborate
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of users sharing experiences, playlists, and insights in our vibrant community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-full">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{post.user}</h3>
                  <p className="text-sm text-gray-400">{post.timestamp}</p>
                </div>
                <button className="ml-auto text-gray-400 hover:text-purple-400">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-300 mb-6">{post.content}</p>

              {/* Interaction Buttons */}
              <div className="flex items-center gap-6 border-t border-purple-500/20 pt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400"
                >
                  <Heart className="h-5 w-5" />
                  <span>{post.likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400"
                  onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{comments[post.id]?.length || 0}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-purple-400"
                >
                  <Share className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Comments Section */}
              {activePost === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-purple-500/20"
                >
                  {comments[post.id].map((comment, index) => (
                    <div key={index} className="flex gap-3 mb-4">
                      <div className="p-2 bg-purple-500/10 rounded-full">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-300">User_{index + 1}</div>
                        <p className="text-gray-400 text-sm">{comment}</p>
                      </div>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex gap-3 mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-slate-800/50 border border-purple-500/20 rounded-full px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-purple-400"
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
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
            Join Community Discussion
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_3;