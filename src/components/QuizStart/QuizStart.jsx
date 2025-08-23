import { useState } from "react";

export default function QuizStart({ onStart }) {
  const [category, setCategory] = useState(9); // default General Knowledge
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStart = () => {
    onStart({ category, difficulty, numQuestions });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Start Your Quiz</h2>

      <div className="space-y-4 mb-6">
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="17">Science & Nature</option>
        </select>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Number of Questions */}
        <input
          type="number"
          min="1"
          max="20"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border p-2 rounded w-full text-center"
        />
      </div>

      <button
        onClick={handleStart}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}
