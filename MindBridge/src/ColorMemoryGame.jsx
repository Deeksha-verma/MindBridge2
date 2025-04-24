import React, { useState, useEffect } from "react";

const ColorMemoryGame = () => {
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFD700", "#FF1493", "#00BFFF"];
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("#FFFFFF");
  const [message, setMessage] = useState("Memorize the color!");

  useEffect(() => {
    if (selectedColors.length === 3) {
      setMessage("Try to match the colors!");
    }
  }, [selectedColors]);

  const handleColorSelection = (color) => {
    setSelectedColors([...selectedColors, color]);
    setCurrentColor(color);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4 text-teal-700">Color Memory Challenge</h2>
      <div
        className="w-32 h-32 mx-auto rounded-full mb-4"
        style={{ backgroundColor: currentColor }}
      ></div>
      <p className="mb-4">{message}</p>
      <div className="grid grid-cols-3 gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorSelection(color)}
            className="w-16 h-16 rounded-full transition duration-200 transform hover:scale-110"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      {selectedColors.length === 3 && (
        <div className="mt-4">
          <p className="text-green-600">Colors selected: {selectedColors.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ColorMemoryGame;
