import React, { useState } from "react";
import axios from "axios";
import { FaMicrophone, FaStop } from "react-icons/fa";

const api = import.meta.env.VITE_BACKEND_URL;

function Medbot() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMicClick = () => {
    setIsListening(true);
    startSpeechRecognition();
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const sendTranscriptToBackend = async (text) => {
    try {
      setLoading(true);
      const response = await axios.post(api + "medbot", {
        text: text,
      });
      setResponseText(response.data.result);
      speakText(response.data.result);
    } catch (error) {
      console.error("Error sending transcript to backend: ", error);
    } finally {
      setLoading(false);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {};

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);

      sendTranscriptToBackend(speechToText);
    };

    recognition.start();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">
            <i className="bi bi-robot mx-2"></i>
            Welcome to Medbot
          </h1>
        </div>
        {loading ? (
          <div className="bg-blue-200 text-blue-800 p-4 rounded-md">
            Fetching Response, Please wait...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-blue-600 text-white p-4 rounded-full w-24 h-24 text-2xl hover:bg-blue-700 transition-all disabled:opacity-50"
                onClick={handleMicClick}
                disabled={isListening}
              >
                <FaMicrophone className="text-white self-center w-full hover:bg-blue-700" />
              </button>
              <button
                className="bg-red-600 text-white p-4 rounded-full w-24 h-24 text-2xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:hover:cursor-not-allowed"
                onClick={stopSpeaking}
                disabled={!isSpeaking}
              >
                <FaStop className="text-white self-center w-full hover:bg-none" />
              </button>
            </div>
            <div className="mt-4">
              <p>{transcript && `You said: "${transcript}"`}</p>
            </div>
            <div className="mt-4">
              <div
                className="bg-gray-900 text-white p-3 overflow-y-auto max-h-96 rounded-lg shadow-lg"
                style={{ width: "1000px", minHeight: "300px" }}
              >
                {responseText}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Medbot;
