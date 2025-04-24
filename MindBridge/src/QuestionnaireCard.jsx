import React from "react";
import { useNavigate } from "react-router-dom";


import { FaRegSmile, FaBrain, FaRegStickyNote,FaSmile } from "react-icons/fa";
import { GiBrain, GiHeartBeats,GiPeaceDove  } from "react-icons/gi";
import { MdColorLens } from "react-icons/md";  // Color Memory game icon

export default function CardsPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const cardClasses =
    "bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-72 h-44 text-center text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-yellow-300/40 border border-white/30";

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-white text-4xl font-extrabold mb-10 drop-shadow-md">Mental Health Assessments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div onClick={() => handleNavigate("/stressquestionnaire")} className={cardClasses}>
          <GiPeaceDove className="text-4xl mb-2 mx-auto text-yellow-300" />
          <h2 className="text-xl font-semibold">Stress Assessment</h2>
        </div>
        <div onClick={() => handleNavigate("/anxietyquestionnaire")} className={cardClasses}>
          <GiBrain className="text-4xl mb-2 mx-auto text-cyan-300" />
          <h2 className="text-xl font-semibold">Anxiety Assessment</h2>
        </div>
        <div onClick={() => handleNavigate("/depressionquestionnaire")} className={cardClasses}>
          <FaSmile className="text-4xl mb-2 mx-auto text-pink-300" />
          <h2 className="text-xl font-semibold">Depression Assessment</h2>
        </div>
      </div>

      <h2 className="text-white text-3xl font-bold mb-6">Interactive Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div onClick={() => handleNavigate("/MoodDetector")} className={cardClasses}>
        <FaRegSmile className="text-4xl mb-2 mx-auto text-blue-300" />
        <h2 className="text-xl font-semibold">Mood Tracker</h2>
      </div>
      <div onClick={() => handleNavigate("/VoiceMoodAnalyzer")} className={cardClasses}>
        <FaRegStickyNote className="text-4xl mb-2 mx-auto text-green-300" />
        <h2 className="text-xl font-semibold">Voice Mood Analyzer</h2>
      </div>
      <div onClick={() => handleNavigate("/MemoryGame")} className={cardClasses}>
        <GiBrain className="text-4xl mb-2 mx-auto text-yellow-300" />
        <h2 className="text-xl font-semibold">Memory Game</h2>
      </div>
      <div onClick={() => handleNavigate("/BreathingExercise")} className={cardClasses}>
        <GiHeartBeats className="text-4xl mb-2 mx-auto text-purple-300" />
        <h2 className="text-xl font-semibold">Breathing Exercise</h2>
      </div>
      <div onClick={() => handleNavigate("/AffirmationClicker")} className={cardClasses}>
        <FaBrain className="text-4xl mb-2 mx-auto text-pink-300" />
        <h2 className="text-xl font-semibold">Affirmation Clicker</h2>
      </div>

      {/* New Game: Color Memory Challenge */}
      <div onClick={() => handleNavigate("/ColorMemoryGame")} className={cardClasses}>
        <MdColorLens className="text-4xl mb-2 mx-auto text-teal-300" />
        <h2 className="text-xl font-semibold">Color Memory Challenge</h2>
      </div>
      </div>
    </div>
  );
}
