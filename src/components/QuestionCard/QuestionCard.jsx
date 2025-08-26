import { useState, useEffect } from "react";

export default function QuestionCard({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const current = questions[currentIndex];
  const allOptions = [...current.incorrect_answers, current.correct_answer].sort();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Auto-submit if time runs out
  const handleAutoSubmit = () => {
    if (answers[currentIndex] === null) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = null;
      setAnswers(updatedAnswers);
      setSelected(null);
    }
  };

  // Select or change answer
  const handleSelect = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = option;
    setAnswers(updatedAnswers);
    setSelected(option);
  };

  // Go to next question
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(answers[currentIndex + 1]);
      setTimeLeft(30);
    } else {
      onFinish(answers);
    }
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(answers[currentIndex - 1]);
      setTimeLeft(30);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 max-w-xl mx-auto">
      {/* Header: Question number + Timer */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Question {currentIndex + 1} / {questions.length}</span>
        <span>⏱️ Time Left: {timeLeft}s</span>
      </div>

      {/* Question Text */}
      <h2 className="text-lg font-semibold">
        {currentIndex + 1}.{" "}
        <span dangerouslySetInnerHTML={{ __html: current.question }} />
      </h2>

      {/* Answer Options with Feedback */}
      <div className="flex flex-col gap-4">
        {allOptions.map((option) => {
          const isCorrect = option === current.correct_answer;
          const isSelected = selected === option;
          const hasAnswered = selected !== null || timeLeft === 0; // ✅ FIXED HERE

          let bg = "bg-gray-100 hover:bg-gray-200 active:scale-95 transition-colors duration-300";

          if (hasAnswered) {
            if (isSelected && isCorrect) bg = "bg-green-500 text-white";
            else if (isSelected && !isCorrect) bg = "bg-red-500 text-white";
            else if (isCorrect) bg = "bg-green-100 text-green-800 font-semibold";
            else bg = "bg-gray-100 opacity-50";
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered}
              className={`px-4 py-2 rounded border font-medium text-left ${bg}`}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          ⏮️ Previous
        </button>

        <button
          onClick={handleNext}
          disabled={answers[currentIndex] === null && timeLeft > 0}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          ⏭️ Next
        </button>
      </div>
    </div>
  );
}
