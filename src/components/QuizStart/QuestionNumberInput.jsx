// src/components/QuizStart/QuestionNumberInput.jsx
import React from "react";

const QuestionNumberInput = ({ numQuestions, setNumQuestions }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 mb-1 font-medium">Number of Questions:</label>
      <input
        type="number"
        min="1"
        max="20"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        className="border px-3 py-2 rounded-lg w-32"
      />
    </div>
  );
};

export default QuestionNumberInput;
