import React, { useEffect, useMemo, useState } from "react";
const api = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import VideoRecorder from "./VideoRecorder";

export default function Questionnaire() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [recording, setRecording] = useState(true);
  const [feedbackText, setFeedbackText] = useState(""); // Added state for feedback text
  const [fetchingAPIResponse, setFetchingAPIResponse] = useState(false);
  const [feedback, setFeedback] = useState({ analysis: "", suggestion: "" });
  const [liveSentiment, setLiveSentiment] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [assessmentId, setAssessmentId] = useState(null);

  const handleFrameCaptured = async (frame) => {
    const response = await axios.post("http://localhost:8000/sentiment-frame", {
      image: frame,
      userId: currentUser.id,
    });

    // Optionally set live feedback (assuming your backend returns emotion)
    setLiveSentiment(response.data.emotion || "");
  };
  const handleFollowUp = async () => {
    if (!feedbackText.trim()) return;

    setFetchingAPIResponse(true);
    const userMessage = feedbackText;
    setFeedbackText(""); // Clear input immediately
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
      const response = await axios.post(`${api}assessment/followup`, {
        userId: currentUser.id,
        assessmentId: assessmentId,
        message: userMessage,
        chatHistory: chatHistory,
      });

      console.log("Response from follow-up:", response.data); // Log the API response

      const therapistReply =
        response?.data?.reply ?? "Let's talk more about it.";

      setChatHistory((prev) => [
        ...prev,
        { sender: "therapist", text: therapistReply },
      ]);
    } catch (error) {
      // Enhanced error logging
      console.error("Error sending follow-up message:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "therapist",
          text: "Sorry, I’m having trouble responding. Please try again later.",
        },
      ]);
    } finally {
      setFetchingAPIResponse(false);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-box");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const data = location.state || {};
    setType(data?.type || "");
    setQuestions(data?.questions || []);
    setLoading(false);
  }, [location.state]);

  const options = useMemo(
    () => [
      { label: "Not at all" },
      { label: "Several days" },
      { label: "More than half the days" },
      { label: "Nearly every day" },
    ],
    []
  );

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (questions.length) {
      const initialResponses = questions.map((question) => ({
        question: question,
        answer: "",
      }));
      setResponses(initialResponses);
    }
  }, [questions]);

  const submitAssignment = async () => {
    try {
      setFetchingAPIResponse(true);
      setRecording(false);
      const response = await axios.post(`${api}assessment/store`, {
        responses,
        type: type,
        userId: currentUser.id,
      });
      if (response.status === 200) {
        setAssessmentId(response.data.assessmentId);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-600">
        Invalid Access 🚫 - Please start from the homepage!
      </div>
    );
  }
  const handleOptionChange = (index, question, answer, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = {
      question: question,
      answer: answer,
    };
    setResponses(updatedResponses);
  };

  return (
    <div className="min-h-screen bg-skin p-6 flex items-center w-full flex-col">
      <VideoRecorder
        recording={recording}
        onFrameCaptured={handleFrameCaptured}
      />
      {liveSentiment && (
        <div className="fixed top-4 right-4 bg-white text-black p-3 shadow-lg rounded-lg z-50">
          Current Emotion: <strong>{liveSentiment}</strong>
        </div>
      )}
      <h2 className="text-2xl font-bold text-[#008080] mb-6">
        {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Assessment
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

          <div className="mt-6">
            <label className="block text-lg font-medium mb-2">
              Want to talk more about the suggestions?
            </label>
            <textarea
              rows="4"
              className="w-full border rounded-md p-4 shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Share your thoughts, feelings, or questions here..."
              value={feedbackText} // Controlled input
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button
              className="mt-4 bg-teal-500 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition disabled:cursor-wait"
              onClick={handleFollowUp}
              disabled={fetchingAPIResponse}
            >
              Send
            </button>
            {chatHistory.length > 0 && (
              <div className="mt-6 bg-gray-50 p-4 border rounded-lg max-h-60 overflow-y-auto shadow-inner">
                <h3 className="text-lg font-semibold text-teal-700 mb-2">
                  Live Chat
                </h3>
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded-md w-fit max-w-[70%] ${
                      msg.sender === "user"
                        ? "bg-teal-100 self-end ml-auto text-right"
                        : "bg-gray-200 self-start mr-auto text-left"// good for  chat work 
                    }`}
                  >
                    <div className="text-sm">{msg.text}</div>
                  </div>
                ))}
                {fetchingAPIResponse && (
                  <div className="text-sm text-gray-500 italic">
                    Therapist is typing...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Talk to Therapist Button */}
          <div className="mt-8">
            <p className="text-lg font-medium mb-2">Prefer human help?</p>
            <button
              className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition duration-300"
              onClick={() => {
                // Replace below with your preferred navigation or dialog logic
                window.open("https://meet.google.com/yrh-edda-moa", "_blank");
              }}
            >
              Talk to a Therapist 💬
            </button>
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
              onClick={() => {
                setRecording(false); // Stop recording before submitting
                submitAssignment(); // Then trigger submission
              }}
            >
              {fetchingAPIResponse ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
