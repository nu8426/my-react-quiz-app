import { useState, useEffect } from "react";

export default function QuestionCard({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const currentQuestion = questions[currentIndex];

  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

  // shuffle options only once per question
  const [shuffledOptions, setShuffledOptions] = useState([]);
  useEffect(() => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setSelectedAnswer(null);
  }, [currentIndex]);

  const handleAnswer = (option) => {
    if (selectedAnswer) return; // prevent multiple clicks
    setSelectedAnswer(option);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = option === currentQuestion.correct_answer;
    setAnswers(newAnswers);

    // move to next question after 1s
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onFinish(newAnswers);
      }
    }, 1000);
  };

  const getButtonClass = (option) => {
    if (!selectedAnswer) return "bg-blue-500 text-white hover:bg-blue-600";
    if (option === currentQuestion.correct_answer) return "bg-green-500 text-white";
    if (option === selectedAnswer) return "bg-red-500 text-white";
    return "bg-gray-300 text-black";
  };

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white">
      <h2
        className="text-xl font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />
      <div className="grid grid-cols-1 gap-3">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className={`p-3 rounded-xl font-medium ${getButtonClass(option)}`}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
      <p className="mt-4 text-right text-gray-500">
        Question {currentIndex + 1}/{questions.length}
      </p>
    </div>
  );
}
