import { useState, useEffect } from "react";
import QuestionText from "./QuestionText";
import AnswerOptions from "./AnswerOptions";
import NavigationButtons from "./NavigationButtons";

export default function QuestionCard({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(30); // 30 seconds per question

  const currentQuestion = questions[currentIndex];
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  // Countdown timer
  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleAnswer = (answer) => {
    const updated = [...userAnswers];
    updated[currentIndex] = answer;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimer(30);
    } else {
      onFinish(userAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTimer(30);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <QuestionText currentIndex={currentIndex} total={questions.length} text={currentQuestion.question} />
      <p className="text-right text-sm text-gray-500 mb-2">Time: {timer}s</p>
      <AnswerOptions
        options={options}
        selected={userAnswers[currentIndex]}
        onSelect={handleAnswer}
      />
      <NavigationButtons
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={currentIndex === 0}
        disableNext={!userAnswers[currentIndex] && timer > 0}
        isLast={currentIndex === questions.length - 1}
      />
    </div>
  );
}
