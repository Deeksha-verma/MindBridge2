import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function VoiceMoodAnalyzer() {
  const [moodData, setMoodData] = useState({ Happy: 0, Sad: 0, Neutral: 0 });
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setRecording(true);

    recognition.onresult = async (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setRecording(false);

      // Send speech to backend
      const response = await fetch('http://localhost:8000/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: speech }),
      });

      const data = await response.json();
      if (data.mood) {
        setMoodData(prev => ({ ...prev, [data.mood]: prev[data.mood] + 1 }));
      }
    };

    recognition.onerror = () => {
      setRecording(false);
      alert('Speech recognition error. Try again.');
    };
  };

  const chartData = {
    labels: ['Happy', 'Sad', 'Neutral'],
    datasets: [
      {
        data: Object.values(moodData),
        backgroundColor: ['#4ade80', '#f87171', '#facc15'],
      },
    ],
  };

  return (
    <div className='min-h-[91vh] pt-12 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-lg '>
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">Voice Mood Analyzer</h2>

      <button
        onClick={startListening}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        disabled={recording}
      >
        {recording ? 'Listening...' : 'Record Your Mood'}
      </button>

      <div className="text-center mt-2 text-gray-700">
        {transcript && <p>🗣️ You said: "{transcript}"</p>}
      </div>

      <Pie data={chartData} />
    </div>
    </div>
  );
}
