import React, { useEffect, useMemo, useState } from "react";
const api = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useAuth } from "./context/AuthContext";

export default function StressQuestionnaire() {
  const { currentUser } = useAuth();

  const questions = useMemo(
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

  const options = useMemo(
    () => [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
    []
  );

  const [responses, setResponses] = useState(() =>
    questions.map((question) => ({
      question: question,
      answer: "",
      score: 0,
    }))
  );
  const [score, setScore] = useState(0);

  useEffect(() => {
    const totalScore = Object.values(responses).reduce(
      (sum, obj) => sum + obj.score,
      0
    );
    setScore(totalScore);
  }, [responses]);

  const handleOptionChange = (index, question, answer, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = {
      question: question,
      answer: answer,
      score: value,
    };
    setResponses(updatedResponses);
  };

  const submitAssignment = async () => {
    try {
      const response = await axios.post(`${api}assessment/store`, {
        responses,
        type: "STRESS",
        userId: currentUser.id,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-skin p-6 flex items-center w-full flex-col">
      <h2 className="text-2xl font-bold text-[#008080] mb-6">
        Stress Assessment
      </h2>

      <form className="w-full bg-skin p-6 space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <p className="text-lg font-medium text-gray-700 mb-3">
              {index + 1}. {question}
            </p>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer flex-1 p-3 bg-[#FFFFF0] text-#B0B0B0 min-w-[15%] max-w-[20%] min-h-[60px] text-center rounded-lg border ${
                    responses[index]?.answer === option.label
                      ? "bg-[#20B2A6] text-#B0B0B0 border-blue-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.value}
                    checked={responses[index]?.answer === option.label}
                    onChange={() =>
                      handleOptionChange(
                        index,
                        question,
                        option.label,
                        option.value
                      )
                    }
                    className="hidden"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>

      <div className="mt-6 w-full max-w-xl bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800">
          Total Score: {score}
        </h3>
        <p className="text-gray-600 mt-2">
          Your score is based on your selected responses.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <button
          className="border-1 border-black border bg-black text-white px-4 py-1 rounded-md hover:bg-green-100 hover:text-black mt-6 disabled:hover:text-white disabled:hover:bg-black disabled:cursor-not-allowed"
          disabled={responses.some((obj) => obj.answer === "")}
          onClick={submitAssignment}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
