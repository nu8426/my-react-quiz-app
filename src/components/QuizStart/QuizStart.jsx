import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function QuizStart({ onStart, scoreHistory = [] }) {
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" },
  ];

  // Filter categories based on search query
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStart = () => {
    onStart(numQuestions, category, difficulty);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg space-y-4">
      {/* Search Bar */}
      <SearchBar query={searchQuery} onChange={setSearchQuery} />

      <h1 className="text-2xl font-bold text-center mb-4">
        Start Your Quiz 🎯
      </h1>

      <div className="space-y-3">
        <div>
          <label className="block font-semibold mb-1">📚 Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories match your search</option>
            )}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">🎛 Difficulty:</label>
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

        <div>
          <label className="block font-semibold mb-1">
            🔢 Number of Questions:
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full border rounded px-2 py-1 text-center"
          />
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>

      {/* Score History */}
      {Array.isArray(scoreHistory) && scoreHistory.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Score History
          </h2>
          <ul className="space-y-3">
            {scoreHistory.map((entry, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 shadow-sm hover:bg-blue-100 transition"
              >
                <span className="text-gray-600 font-medium">{entry.date}</span>
                <span className="text-lg font-bold text-blue-800">
                  {entry.score}
                  <span className="text-gray-500 font-normal"> / {entry.total}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
