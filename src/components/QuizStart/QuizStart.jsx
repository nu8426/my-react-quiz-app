import { useEffect, useState } from "react";

export default function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(9); // default General Knowledge
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategories(data.trivia_categories);
    }
    fetchCategories();
  }, []);

  const handleStart = () => {
    onStart({ category, difficulty, numQuestions });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Start Quiz</h1>

      <label className="block mb-2 font-semibold">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 mb-4"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full border p-2 mb-4"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label className="block mb-2 font-semibold">Number of Questions</label>
      <input
        type="number"
        value={numQuestions}
        min={1}
        max={50}
        onChange={(e) => setNumQuestions(e.target.value)}
        className="w-20 border p-2 mb-4 text-center"
      />

      <button
        onClick={handleStart}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}
