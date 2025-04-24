import React, { useState } from "react";

const AffirmationClicker = () => {
  const affirmations = [
    "You are enough.",
    "Believe in yourself.",
    "You are strong.",
    "Your potential is limitless.",
    "Every day is a new beginning."
  ];
  
  const [message, setMessage] = useState("");

  const generateMessage = () => {
    const randomMessage = affirmations[Math.floor(Math.random() * affirmations.length)];
    setMessage(randomMessage);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold text-purple-600 mb-2">Positive Affirmation</h2>
      <button
        className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors duration-200"
        onClick={generateMessage}
      >
        Get Affirmation
      </button>
      <p className="mt-2 text-lg italic text-purple-700 animate-fade">"{message}"</p>
    </div>
  );
};

export default AffirmationClicker;
