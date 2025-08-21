import { useState } from "react";
import AnswerOptions from "./AnswerOptions";
import NavigationButtons from "./NavigationButtons";

export default function QuestionCard({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const updated = [...userAnswers];
    updated[currentIndex] = answer;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(userAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="mb-4">{questions[currentIndex].question}</p>

      <AnswerOptions
        correctAnswer={questions[currentIndex].correct_answer}
        incorrectAnswers={questions[currentIndex].incorrect_answers}
        selected={userAnswers[currentIndex]}
        onSelect={handleAnswer}
      />

      <NavigationButtons
        onNext={handleNext}
        onPrev={handlePrev}
        disableNext={currentIndex === questions.length - 1 && !userAnswers[currentIndex]}
        disablePrev={currentIndex === 0}
      />
    </div>
  );
}
