// src/components/QuizStart/DifficultySelector.jsx
import React from "react";

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 mb-1 font-medium">Choose Difficulty:</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
