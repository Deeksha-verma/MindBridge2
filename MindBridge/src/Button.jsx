export default function Button({ text, onClick, className }) {
  return (
    <button 
      onClick={onClick} className={`px-4 py-2 mb-4 mr-2 ${className}`}
    >
      {text}
    </button>
  );
}
