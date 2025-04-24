import React, { useState } from "react";

const MemoryGame = () => {
  const cardsArray = ["😊", "🌈", "🌞", "🎵", "🌱", "❤️"];
  const shuffled = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index)) return;
    setFlipped([...flipped, index]);
  };

  React.useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (shuffled[first] === shuffled[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">Memory Match Game</h2>
      <div className="grid grid-cols-4 gap-4">
        {shuffled.map((card, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex justify-center items-center text-2xl transition-transform duration-200 ease-in-out transform bg-blue-100 cursor-pointer rounded shadow-lg hover:scale-110 ${flipped.includes(index) || matched.includes(index) ? "bg-green-300" : ""}`}
            onClick={() => handleFlip(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
