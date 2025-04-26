import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-[91vh] px-6 py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl"
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About MindBridge
        </motion.h1>

        <motion.p
          className="text-lg mb-6 text-white/90 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <strong>MindBridge</strong> is your personalized mental wellness companion.
          We combine the power of AI, self-reflection, and expert systems to provide
          tailored recommendations that support your emotional and mental health journey.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            className="bg-white/20 p-6 rounded-2xl shadow-inner"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">What We Do</h2>
            <p className="text-white/80">
              Analyze user self-reports and responses to questionnaires using intelligent
              algorithms to deliver real-time insights and mental health suggestions.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/20 p-6 rounded-2xl shadow-inner"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">Smart Suggestions</h2>
            <p className="text-white/80">
              Provide lifestyle tips, mindfulness exercises, and therapy resources tailored
              to each user’s emotional needs and mental state.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/20 p-6 rounded-2xl shadow-inner"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">Connect & Simulate</h2>
            <p className="text-white/80">
              Engage in friend-like simulated conversations or connect with real therapists
              nearby for professional advice—bridging the gap between feeling and healing.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/20 p-6 rounded-2xl shadow-inner"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
            <p className="text-white/80">
              To build a bridge between individuals and mental wellness using empathy, 
              AI, and thoughtful design—empowering people to take control of their mental journey.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
