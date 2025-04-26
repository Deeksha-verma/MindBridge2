import React, { useMemo, useState, useEffect } from "react";

export default function DepressionQuestionnaire() {
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
    console.log(responses);
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

  return (
    <div className="min-h-screen bg-skin p-6 flex items-center w-full flex-col">
      <h2 className="text-2xl font-bold text-[#008080] mb-6">
        Depression Assessment
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
    </div>
  );
}
