import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardsPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-skin flex items-center justify-center"> 
    <div className="flex justify-right gap-6 p-8">
      <div
        onClick={() => handleNavigate("/stressquestionnaire")}
        className="bg-white shadow-lg rounded-lg p-6 md:w-80 md:h-40 text-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 hover:bg-[#FFFFF0]"
      >
        <h2 className="text-xl font-semibold">Stress<br></br>Assessment</h2>
      </div>
      <div
        onClick={() => handleNavigate("/anxietyquestionnaire")}
        className="bg-white shadow-lg rounded-lg p-6 md:w-80 md:h-40 text-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 hover:bg-[#FFFFF0]"
      >
        <h2 className="text-xl font-semibold">Anxiety<br></br>Assessment</h2>
      </div>
      <div
        onClick={() => handleNavigate("/depressionquestionnaire")}
        className="bg-white shadow-lg rounded-lg p-6 md:w-80 md:h-40 text-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 hover:bg-[#FFFFF0]"
      >
        <h2 className="text-xl font-semibold">Depression<br></br>Assessment</h2>
      </div>
    </div>
    </div>
  );
}
