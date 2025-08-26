import { useState } from "react";

export default function QuizStart({ onStart }) {
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);

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
    { id: 32, name: "Entertainment: Cartoon & Animations" }
  ];

  const handleStart = () => {
    onStart({ category, difficulty, numQuestions });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Start Your Quiz 🎯</h1>

      <div className="space-y-4">
        {/* 📚 Category Dropdown */}
        <div>
          <label className="font-semibold block mb-1">📚 Choose Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🎛️ Difficulty Dropdown */}
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

        {/* 🔢 Number of Questions */}
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
