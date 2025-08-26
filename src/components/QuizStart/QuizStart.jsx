import { useState } from "react";

export default function QuizStart({ onStart }) {
  const [category, setCategory] = useState(9); // General Knowledge
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStart = () => {
    onStart({ category, difficulty, numQuestions });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Start Your Quiz 🎯</h1>

      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="font-semibold block mb-1">📚 Choose Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          >
            <option value={9}>General Knowledge</option>
            <option value={21}>Sports</option>
            <option value={23}>History</option>
            <option value={17}>Science & Nature</option>
            <option value={22}>Geography</option>
            <option value={18}>Computers</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="font-semibold block mb-1">🎛️ Choose Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="font-semibold block mb-1">🔢 Number of Questions:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full border rounded px-2 py-1 text-center"
          />
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}
