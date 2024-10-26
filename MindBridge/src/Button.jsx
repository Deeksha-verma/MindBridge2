export default function Button({ text, onClick, className }) {
  return (
    <button 
      onClick={onClick} className={`px-4 py-2 bg-amber-700 mb-4 mr-4 text-white rounded hover:bg-amber-800 ${className}`}
    >
      {text}
    </button>
  );
}
