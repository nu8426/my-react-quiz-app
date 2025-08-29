import { useState, useEffect } from "react";

export default function QuestionCard({ questions, onAnswer, onFinish, answers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = questions[currentIndex];
  const allOptions = current
    ? [...current.incorrect_answers, current.correct_answer].sort()
    : [];

  const selected = answers[currentIndex]?.selected || null;
  const [timeLeft, setTimeLeft] = useState(30);

  const noQuestions = !questions || questions.length === 0;

  // Timer
  useEffect(() => {
    if (noQuestions || !current) return;

    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleSelect = (option) => {
    onAnswer(currentIndex, option); // update parent state
  };

  const handleNext = () => {
    if (!answers[currentIndex]) return; // block if unanswered

    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
    else onFinish();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  if (noQuestions) return <div className="text-center mt-10">No questions available.</div>;
  if (!current) return <div className="text-center mt-10">Loading question...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto space-y-6">
      {/* Question Progress + Timer */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span>⏱️ {timeLeft}s</span>
      </div>

      {/* Question */}
      <h2
        className="text-lg font-semibold"
        dangerouslySetInnerHTML={{ __html: current.question }}
      />

      {/* Answer Options */}
      <div className="flex flex-col gap-3">
        {allOptions.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === current.correct_answer;
          let bgClass = "bg-white hover:bg-gray-100";

          if (selected) {
            if (isSelected && isCorrect) bgClass = "bg-green-500 text-white";
            else if (isSelected && !isCorrect) bgClass = "bg-red-500 text-white";
            else if (isCorrect) bgClass = "bg-green-100 text-green-800 font-semibold";
            else bgClass = "bg-gray-100 opacity-50";
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 rounded border text-left ${bgClass}`}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          ⏮️ Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[currentIndex]} // disable if unanswered
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {currentIndex < questions.length - 1 ? "⏭️ Next" : "✅ Submit Quiz"}
        </button>
      </div>
    </div>
  );
}
