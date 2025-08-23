export default function AnswerButton({ option, selected, onClick }) {
  return (
    <button
      className={`border rounded px-4 py-2 text-left w-full ${
        selected ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      {option}
    </button>
  );
}
