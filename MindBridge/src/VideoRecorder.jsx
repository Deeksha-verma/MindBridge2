import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const VideoRecorder = ({ recording, onFrameCaptured }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) onFrameCaptured(imageSrc); // send to backend
      }, 3000); // every 3 seconds
    }
    return () => clearInterval(interval);
  }, [recording]);

  return (
    <div className="mb-4">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={200}
        height={150}
      />
    </div>
  );
};

export default VideoRecorder;
