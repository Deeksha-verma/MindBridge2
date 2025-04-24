import React, { useRef, useState , useEffect } from 'react';
import Webcam from 'react-webcam';

export default function MoodDetector() {
  const webcamRef = useRef(null);
  const [mood, setMood] = useState('');
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(data => console.log("API check:", data));
  }, []);


  const captureAndAnalyze = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
   
    
    const response = await fetch('http://localhost:8000/detect-emotion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageSrc })
    });
    const data = await response.json();
    if (data.emotion) {
      setMood(`You seem to be feeling: ${data.emotion}`);
    } else {
      setMood(`Error: ${data.error}`);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">AI Mood Detector</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg mb-4"
      />
      <button
        onClick={captureAndAnalyze}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Analyze Mood
      </button>
      {mood && <p className="mt-4 text-green-700">{mood}</p>}
    </div>
  );
}
