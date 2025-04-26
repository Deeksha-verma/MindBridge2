import React, { useEffect, useMemo, useState } from "react";
const api = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useAuth } from "./context/AuthContext";

export default function DepressionQuestionnaire() {
  const { currentUser } = useAuth();

  const questions = useMemo(
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

  const options = useMemo(
    () => [
      { label: "Not at all" },
      { label: "Several days" },
      { label: "More than half the days" },
      { label: "Nearly every day" },
    ],
    []
  );

  const [responses, setResponses] = useState(() =>
    questions.map((question) => ({
      question: question,
      answer: "",
    }))
  );
  const [fetchingAPIResponse, setFetchingAPIResponse] = useState(false);
  const [feedback, setFeedback] = useState({ analysis: "", suggestion: "" });

  const handleOptionChange = (index, question, answer, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = {
      question: question,
      answer: answer,
    };
    setResponses(updatedResponses);
  };

  const submitAssignment = async () => {
    try {
      setFetchingAPIResponse(true);
      const response = await axios.post(`${api}assessment/store`, {
        responses,
        type: "DEPRESSION",
        userId: currentUser.id,
      });
      if (response.status == 200) {
        setFeedback({
          analysis: response?.data?.aiResponse?.analysis ?? "",
          suggestion: response?.data?.aiResponse?.suggestion ?? "",
        });
      } else {
        setFeedback({
          analysis: "Seems like there is a problem getting the feedback",
          suggestion: "Please try again",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingAPIResponse(false);
    }
  };

  return (
    <div className="min-h-screen bg-skin p-6 flex items-center w-full flex-col">
      <h2 className="text-2xl font-bold text-[#008080] mb-6">
        Depression Assessment
      </h2>

      {feedback?.analysis ? (
        <div className="flex flex-col gap-y-6 border border-1 rounded-lg shadow-lg bg-white p-8 mx-20 mt-6">
          <div className="flex flex-col gap-y-4">
            <div className="text-3xl font-bold">Analysis:</div>
            <div>{feedback?.analysis}</div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="text-3xl font-bold">Suggestion:</div>
            <div>{feedback?.suggestion}</div>
          </div>
        </div>
      ) : fetchingAPIResponse ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">
            Analysing your answers... 🌿 Hold tight!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 w-full">
          <div className="w-full bg-skin p-6 flex flex-col gap-y-6">
            {questions.map((question, index) => (
              <div
                key={index}
                className="border-b border-gray-400 pb-6 flex flex-col gap-y-3"
              >
                <p className="text-lg font-medium text-gray-700">
                  {index + 1}. {question}
                </p>
                <div className="flex flex-wrap gap-2">
                  {options.map((option, idx) => (
                    <label
                      key={`${index}-${idx}`}
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
                          handleOptionChange(index, question, option.label)
                        }
                        className="hidden"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center w-full">
            <button
              className="bg-gradient-to-r from-teal-500 to-green-400 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:from-green-500 hover:to-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                fetchingAPIResponse ||
                responses.some((obj) => obj.answer === "")
              }
              onClick={submitAssignment}
            >
              {fetchingAPIResponse ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
