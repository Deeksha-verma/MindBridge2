import React, { useState, useEffect } from "react";

const ColorMemoryGame = () => {
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFD700", "#FF1493", "#00BFFF"];
  const [gameState, setGameState] = useState("idle"); // idle, memorize, matching, success, failure
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [displayColor, setDisplayColor] = useState("#FFFFFF");
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [showColorNames, setShowColorNames] = useState(false);

  // Color name mapping for accessibility
  const colorNames = {
    "#FF5733": "Red-Orange",
    "#33FF57": "Green",
    "#5733FF": "Purple",
    "#FFD700": "Gold",
    "#FF1493": "Pink",
    "#00BFFF": "Blue"
  };

  // Generate sequence for the level
  const generateSequence = () => {
    const seqLength = level + 2; // Level 1 starts with 3 colors
    const newSequence = [];
    for (let i = 0; i < seqLength; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      newSequence.push(colors[randomIndex]);
    }
    return newSequence;
  };

  // Start the game
  const startGame = () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentIndex(0);
    setGameState("memorize");
    setIsShowingSequence(true);
    showSequence(newSequence);
  };

  // Show the sequence to memorize
  const showSequence = async (seq) => {
    setDisplayColor("#FFFFFF");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < seq.length; i++) {
      setDisplayColor(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
      setDisplayColor("#FFFFFF");
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsShowingSequence(false);
    setGameState("matching");
  };

  // Handle player's color selection
  const handleColorSelection = (color) => {
    if (gameState !== "matching" || isShowingSequence) return;
    
    const updatedPlayerSequence = [...playerSequence, color];
    setPlayerSequence(updatedPlayerSequence);
    setDisplayColor(color);
    
    // Check if the selected color matches the current color in the sequence
    if (color !== sequence[currentIndex]) {
      setGameState("failure");
      return;
    }
    
    setCurrentIndex(currentIndex + 1);
    
    // Check if the player completed the sequence
    if (updatedPlayerSequence.length === sequence.length) {
      setScore(score + (level * 100));
      setGameState("success");
    }
    
    // Reset display color after a short delay
    setTimeout(() => {
      if (gameState === "matching") {
        setDisplayColor("#FFFFFF");
      }
    }, 300);
  };

  // Move to the next level
  const nextLevel = () => {
    setLevel(level + 1);
    const newSequence = generateSequence();
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentIndex(0);
    setGameState("memorize");
    setIsShowingSequence(true);
    showSequence(newSequence);
  };

  // Reset the game on failure
  const resetGame = () => {
    setGameState("idle");
    setScore(0);
    setLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setCurrentIndex(0);
    setDisplayColor("#FFFFFF");
  };

  // Messages based on game state
  const getMessage = () => {
    switch (gameState) {
      case "idle":
        return "Welcome to Color Memory! Press Start to begin.";
      case "memorize":
        return "Memorize the sequence of colors!";
      case "matching":
        return `Repeat the sequence! (${playerSequence.length}/${sequence.length})`;
      case "success":
        return "Perfect! You matched all colors!";
      case "failure":
        return "Oops! Wrong color. Game Over!";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-8 px-4 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-lg border-b border-white/20 shadow-lg text-white">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-6 text-center">
        <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          Color Memory Challenge
        </h2>
        
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/20 px-3 py-1 rounded-lg">
            <span className="text-xs uppercase">Level</span>
            <p className="text-xl font-bold">{level}</p>
          </div>
          
          <div className="bg-white/20 px-3 py-1 rounded-lg">
            <span className="text-xs uppercase">Score</span>
            <p className="text-xl font-bold">{score}</p>
          </div>
        </div>
        
        <div 
          className="w-32 h-32 mx-auto rounded-full mb-4 transition-all duration-300 transform hover:scale-105 border-4 border-white/30"
          style={{ backgroundColor: displayColor }}
        >
          {showColorNames && displayColor !== "#FFFFFF" && (
            <div className="h-full flex items-center justify-center">
              <span className="bg-black/50 px-2 py-1 rounded text-sm">
                {colorNames[displayColor]}
              </span>
            </div>
          )}
        </div>
        
        <p className="mb-4 h-6 text-lg font-medium">{getMessage()}</p>
        
        <div className="grid grid-cols-3 gap-8 mb-4">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorSelection(color)}
              disabled={gameState !== "matching" || isShowingSequence}
              className="w-16 h-16 rounded-full transition duration-200 transform hover:scale-110 disabled:opacity-50 mr-8 disabled:cursor-not-allowed border-2 border-white/30"
              style={{ backgroundColor: color }}
              aria-label={colorNames[color]}
            />
          ))}
        </div>
        
        <div className="mt-4 space-y-2">
          {gameState === "idle" && (
            <button 
              onClick={startGame}
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium transition-all hover:shadow-lg hover:opacity-90"
            >
              Start Game
            </button>
          )}
          
          {gameState === "success" && (
            <button 
              onClick={nextLevel}
              className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium transition-all hover:shadow-lg hover:opacity-90"
            >
              Next Level
            </button>
          )}
          
          {gameState === "failure" && (
            <button 
              onClick={resetGame}
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg font-medium transition-all hover:shadow-lg hover:opacity-90"
            >
              Try Again
            </button>
          )}
          
          <label className="flex items-center justify-center space-x-2 text-sm mt-4">
            <input
              type="checkbox"
              checked={showColorNames}
              onChange={() => setShowColorNames(!showColorNames)}
              className="rounded"
            />
            <span>Show color names (accessibility)</span>
          </label>
        </div>
      </div>
      
      <div className="max-w-md mx-auto mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl text-sm">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Watch the sequence of colors shown in the circle</li>
          <li>Memorize the order of the colors</li>
          <li>After the sequence finishes, click the colored buttons in the same order</li>
          <li>Complete the sequence to advance to the next level</li>
          <li>Each level adds one more color to remember</li>
          <li>Your score increases with each successful level</li>
        </ol>
      </div>
    </div>
  );
};

export default ColorMemoryGame;