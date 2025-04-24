import React, { useState, useEffect } from "react";

const BreathingExercise = () => {
  const [step, setStep] = useState("Breathe in...");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep === "Breathe in...") return "Hold...";
        if (prevStep === "Hold...") return "Breathe out...";
        return "Breathe in...";
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold text-blue-700">Breathing Exercise</h2>
      <div className="text-3xl mt-4 animate-pulseSlow transition-all duration-1000">{step}</div>
    </div>
  );
};

export default BreathingExercise;
