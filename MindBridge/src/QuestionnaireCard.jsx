import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegSmile, FaBrain, FaRegStickyNote, FaSmile } from "react-icons/fa";
import { GiBrain, GiHeartBeats, GiPeaceDove } from "react-icons/gi";
import { MdColorLens } from "react-icons/md"; // Color Memory game icon

export default function CardsPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleQuestionnairesNavigate = (path, data) => {
    navigate(path, { state: data });
  };

  const stressQuestions = useMemo(
    () => [
      "I feel overwhelmed or stressed out",
      "I find it hard to manage time and prioritize tasks",
      "I experience physical symptoms, like headaches or stomachaches",
      "I struggle to relax or unwind",
      "I feel irritable or short-tempered",
      "I find myself worrying excessively about different aspects of life",
      "I have trouble sleeping due to stress",
      "I feel tense or anxious in most situations",
      "I tend to avoid stressful situations even if they’re necessary",
      "I find it difficult to focus or concentrate on tasks",
    ],
    []
  );

  const anxietyQuestions = useMemo(
    () => [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen",
      "Difficulty concentrating on things, such as reading or watching TV",
      "Physical symptoms such as sweating, trembling, or a racing heart",
      "Avoiding situations that make you anxious",
    ],
    []
  );

  const depressionQuestions = useMemo(
    () => [
      "Little interest or pleasure in doing things.",
      "Feeling down, depressed, or hopeless.",
      "Trouble falling asleep, staying asleep, or sleeping too much.",
      "Feeling tired or having little energy.",
      "Poor appetite or overeating.",
      "Feeling bad about yourself—or that you are a failure or have let yourself or your family down.",
      "Trouble concentrating on things, such as reading the newspaper or watching television.",
      "Moving or speaking so slowly that other people could have noticed, or the opposite—being fidgety or restless.",
      "Thoughts that you would be better off dead or of hurting yourself in some way.",
    ],
    []
  );

  const cardClasses =
    "bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-72 h-44 text-center text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-yellow-300/40 border border-white/30";

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-white text-4xl font-extrabold mb-10 drop-shadow-md">
        Mental Health Assessments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          onClick={() =>
            handleQuestionnairesNavigate("/questionnaire", {
              type: "STRESS",
              questions: stressQuestions,
            })
          }
          className={cardClasses}
        >
          <GiPeaceDove className="text-4xl mb-2 mx-auto text-yellow-300" />
          <h2 className="text-xl font-semibold">Stress Assessment</h2>
        </div>
        <div
          onClick={() =>
            handleQuestionnairesNavigate("/questionnaire", {
              type: "ANXIETY",
              questions: anxietyQuestions,
            })
          }
          className={cardClasses}
        >
          <GiBrain className="text-4xl mb-2 mx-auto text-cyan-300" />
          <h2 className="text-xl font-semibold">Anxiety Assessment</h2>
        </div>
        <div
          onClick={() =>
            handleQuestionnairesNavigate("/questionnaire", {
              type: "DEPRESSION",
              questions: depressionQuestions,
            })
          }
          className={cardClasses}
        >
          <FaSmile className="text-4xl mb-2 mx-auto text-pink-300" />
          <h2 className="text-xl font-semibold">Depression Assessment</h2>
        </div>
      </div>

      <h2 className="text-white text-3xl font-bold mb-6">Interactive Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          onClick={() => handleNavigate("/MoodDetector")}
          className={cardClasses}
        >
          <FaRegSmile className="text-4xl mb-2 mx-auto text-blue-300" />
          <h2 className="text-xl font-semibold">Mood Tracker</h2>
        </div>
        <div
          onClick={() => handleNavigate("/VoiceMoodAnalyzer")}
          className={cardClasses}
        >
          <FaRegStickyNote className="text-4xl mb-2 mx-auto text-green-300" />
          <h2 className="text-xl font-semibold">Voice Mood Analyzer</h2>
        </div>
        <div
          onClick={() => handleNavigate("/MemoryGame")}
          className={cardClasses}
        >
          <GiBrain className="text-4xl mb-2 mx-auto text-yellow-300" />
          <h2 className="text-xl font-semibold">Memory Game</h2>
        </div>
        <div
          onClick={() => handleNavigate("/BreathingExercise")}
          className={cardClasses}
        >
          <GiHeartBeats className="text-4xl mb-2 mx-auto text-purple-300" />
          <h2 className="text-xl font-semibold">Breathing Exercise</h2>
        </div>
        <div
          onClick={() => handleNavigate("/AffirmationClicker")}
          className={cardClasses}
        >
          <FaBrain className="text-4xl mb-2 mx-auto text-pink-300" />
          <h2 className="text-xl font-semibold">Affirmation Clicker</h2>
        </div>

        

        {/* New Game: Color Memory Challenge */}
        <div
          onClick={() => handleNavigate("/ColorMemoryGame")}
          className={cardClasses}
        >
          <MdColorLens className="text-4xl mb-2 mx-auto text-teal-300" />
          <h2 className="text-xl font-semibold">Color Memory Challenge</h2>
        </div>
      </div>
      <div
  onClick={() => handleNavigate("/medbot")}
  className="fixed bottom-6 right-6 bg-pink-400 p-4 rounded-full shadow-2xl cursor-pointer hover:bg-pink-500 transition-all z-50"
>
  <FaBrain className="text-4xl text-white" />
</div>
    </div>
  );
}
