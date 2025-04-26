import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BreathingExercise = () => {
  const [step, setStep] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep === "Breathe in...") return "Hold...";
        if (prevStep === "Hold...") return "Breathe out...";
        return "Breathe in...";
      });
    }, 4000);

    setStep("Breathe in...");

    return () => clearInterval(interval);
  }, [isStarted]);

  const getScale = (step) => {
    if (step === "Breathe in...") return 1.2;
    if (step === "Hold...") return 1.2;
    return 1;
  };

  return (
    <div className="min-h-[91vh] flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-lg text-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-10 tracking-wide">
          Breathing Exercise
        </h2>

        {!isStarted ? (
          <button
            onClick={() => setIsStarted(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-full transition-all duration-300 shadow-lg"
          >
            Start
          </button>
        ) : (
          <>
            <motion.div
              animate={{ scale: getScale(step) }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-60 h-60 mx-auto rounded-full bg-gradient-to-br from-indigo-400/50 via-purple-500/60 to-pink-400/50 backdrop-blur-md shadow-md"
            ></motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-3xl text-white mt-10 font-semibold"
              >
                {step}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
