// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const MemoryGame = () => {
//   const cardsArray = ["😊", "🌈", "🌞", "🎵", "🌱", "❤️", "🚀", "🎮"];
  
//   const [cards, setCards] = useState([]);
//   const [flipped, setFlipped] = useState([]);
//   const [matched, setMatched] = useState([]);
//   const [moves, setMoves] = useState(0);
//   const [gameWon, setGameWon] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(false);

//   useEffect(() => {
//     initializeGame();
//   }, []);

//   useEffect(() => {
//     if (matched.length > 0 && matched.length === cards.length) {
//       setGameWon(true);
//     }
//   }, [matched, cards]);

//   useEffect(() => {
//     if (flipped.length === 2) {
//       setIsDisabled(true);
//       const [first, second] = flipped;
      
//       if (cards[first].value === cards[second].value) {
//         setMatched([...matched, first, second]);
//         setFlipped([]);
//         setIsDisabled(false);
//       } else {
//         setTimeout(() => {
//           setFlipped([]);
//           setIsDisabled(false);
//         }, 1000);
//       }
//       setMoves(prevMoves => prevMoves + 1);
//     }
//   }, [flipped, cards, matched]);

//   const initializeGame = () => {
//     const gameCards = cardsArray.slice(0, 8);
    
//     const cardPairs = [...gameCards, ...gameCards].map((value, index) => ({
//       id: index,
//       value,
//       isFlipped: false,
//       isMatched: false
//     }));
    
//     const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    
//     setCards(shuffled);
//     setFlipped([]);
//     setMatched([]);
//     setMoves(0);
//     setGameWon(false);
//   };

//   const handleFlip = (index) => {
//     if (isDisabled || flipped.includes(index) || matched.includes(index)) return;
    
//     if (flipped.length < 2) {
//       setFlipped(flipped => [...flipped, index]);
//     }
//   };

//   const handleReset = () => {
//     initializeGame();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center max-w-2xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-blue-600">Memory Match Game</h1>
      
//       <div className="flex justify-between w-full mb-4">
//         <div className="text-lg font-medium">Moves: {moves}</div>
//         <button 
//           onClick={handleReset}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
//         >
//           Reset Game
//         </button>
//       </div>
      
//       {gameWon && (
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full text-center"
//         >
//           <p className="font-bold">Congratulations! You won in {moves} moves!</p>
//         </motion.div>
//       )}
      
//       <div className="grid grid-cols-4 gap-3 w-full">
//         {cards.map((card, index) => (
//           <motion.div
//             key={card.id}
//             onClick={() => handleFlip(index)}
//             className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer text-4xl shadow ${
//               matched.includes(index) 
//                 ? "bg-green-100" 
//                 : "bg-white hover:bg-gray-50"
//             }`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <motion.div
//               className="w-full h-full flex items-center justify-center"
//               animate={{ rotateY: flipped.includes(index) || matched.includes(index) ? 180 : 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {flipped.includes(index) || matched.includes(index) ? (
//                 <span>{card.value}</span>
//               ) : (
//                 <span className="text-3xl">❓</span>
//               )}
//             </motion.div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MemoryGame;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MemoryGame = () => {
  const cardsArray = ["😊", "🌈", "🌞", "🎵", "🌱", "❤️", "🚀", "🎮"];
  
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameWon(true);
    }
  }, [matched, cards]);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsDisabled(true);
      const [first, second] = flipped;
      
      if (cards[first].value === cards[second].value) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsDisabled(false);
        }, 1000);
      }
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [flipped, cards, matched]);

  const initializeGame = () => {
    const gameCards = cardsArray.slice(0, 8);
    
    const cardPairs = [...gameCards, ...gameCards].map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }));
    
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleFlip = (index) => {
    if (isDisabled || flipped.includes(index) || matched.includes(index)) return;
    
    if (flipped.length < 2) {
      setFlipped(flipped => [...flipped, index]);
    }
  };

  const handleReset = () => {
    initializeGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Memory Match Game</h1>
      
      <div className="flex justify-evenly w-full mb-4">
        <div className="text-lg font-medium text-white">Moves: {moves}</div>
        <button 
          onClick={handleReset}
          className="text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 hover:shadow-yellow-300/40 border border-white/30"
        >
          Reset Game
        </button>
      </div>
      
      {gameWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full text-center"
        >
          <p className="font-bold">Congratulations! You won in {moves} moves!</p>
        </motion.div>
      )}
      
      <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => handleFlip(index)}
            className={`aspect-square flex items-center justify-center text-3xl rounded-lg cursor-pointer shadow-md transition-all duration-300 ease-in-out
            ${matched.includes(index) ? "bg-green-400" : "bg-white/40 hover:bg-white/60 "}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{ rotateY: flipped.includes(index) || matched.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {flipped.includes(index) || matched.includes(index) ? (
                <span>{card.value}</span>
              ) : (
                <span className="text-3xl">❓</span>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
