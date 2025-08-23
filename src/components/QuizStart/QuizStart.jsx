import React, { useState } from "react";
import CategorySelector from "./CategorySelector";
import DifficultySelector from "./DifficultySelector";

function QuizStart({ onStart }) {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5); // default 5

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ category, difficulty, numQuestions });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Start Your Quiz 🎯
      </h1>

      <form onSubmit={handleSubmit}>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="border px-4 py-3 font-semibold text-gray-700 w-1/3">
                Choose Category:
              </td>
              <td className="border px-4 py-3">
                <CategorySelector value={category} onChange={setCategory} />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
              <td className="border px-4 py-3 font-semibold text-gray-700">
                Choose Difficulty:
              </td>
              <td className="border px-4 py-3">
                <DifficultySelector value={difficulty} onChange={setDifficulty} />
              </td>
            </tr>

            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="border px-4 py-3 font-semibold text-gray-700">
                Number of Questions:
              </td>
              <td className="border px-4 py-3">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={numQuestions} // default value set here
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full border rounded px-2 py-1 text-center"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuizStart;
