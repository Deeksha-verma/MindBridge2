import { useState, useEffect } from "react"
import { Sparkles, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const AffirmationClicker = () => {
  const affirmations = [
    "You are enough.",
    "Believe in yourself.",
    "You are strong.",
    "Your potential is limitless.",
    "Every day is a new beginning.",
    "You are capable of amazing things.",
    "Your mind is powerful.",
    "You deserve happiness.",
    "Trust your journey.",
    "You make a difference.",
  ]

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [particles, setParticles] = useState([]);

  const generateMessage = () => {
    setIsLoading(true)

    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 60 + 260}, 80%, 60%)`,
    }))

    setParticles(newParticles)

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length)
      const randomMessage = affirmations[randomIndex]
      setMessage(randomMessage)
      setIsLoading(false)
    }, 600)
  }

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([])
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [particles])

  return (
    <div className="min-h-[91vh] flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 ">
    <div className="max-w-md mx-auto">
      <div className="relative p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full -mr-12 -mt-12 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-200 rounded-full -ml-8 -mb-8 opacity-50"></div>

        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            initial={{
              left: "50%",
              top: "60%",
              opacity: 1,
              scale: 0,
            }}
            animate={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0,
              scale: 1,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
          />
        ))}

        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-purple-500 mr-2 h-5 w-5" />
            <h2 className="text-2xl font-bold text-purple-700">Positive Affirmation</h2>
            <Sparkles className="text-purple-500 ml-2 h-5 w-5" />
          </div>

          <div className="flex justify-center mb-8">
            <motion.button
              className="group relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 overflow-hidden"
              onClick={generateMessage}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                {isLoading ? "Generating..." : "Get Affirmation"}
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </motion.button>
          </div>

          <div className="h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-xl font-medium text-purple-800 mb-2">Your affirmation:</p>
                  <motion.p
                    className="text-2xl italic text-indigo-700 font-serif px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border border-purple-100"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    "{message}"
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AffirmationClicker
