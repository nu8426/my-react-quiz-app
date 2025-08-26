import React from 'react';
import categoryIcon from './assets/category.png';
import difficultyIcon from './assets/difficulty.png';
import questionsIcon from './assets/questions.png';
import bullseyeIcon from './assets/bullseye.png';

export default function QuizSetup({ onStart }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <img src={bullseyeIcon} alt="Start icon" className="w-6 h-6" />
        Start Your Quiz
      </h1>

      <div className="flex items-center gap-2 text-lg font-semibold">
        <img src={categoryIcon} alt="Category" className="w-5 h-5" />
        Choose Category: <span className="text-gray-600">General Knowledge</span>
      </div>

      <div className="flex items-center gap-2 text-lg font-semibold">
        <img src={difficultyIcon} alt="Difficulty" className="w-5 h-5" />
        Choose Difficulty: <span className="text-gray-600">Easy</span>
      </div>

      <div className="flex items-center gap-2 text-lg font-semibold">
        <img src={questionsIcon} alt="Questions" className="w-5 h-5" />
        Number of Questions: <span className="text-gray-600">5</span>
      </div>

      <button
        onClick={onStart}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
      >
        Start Quiz
      </button>
    </div>
  );
}
