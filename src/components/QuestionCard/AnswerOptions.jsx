import { useState, useEffect } from "react";

export default function AnswerOptions({ correctAnswer, incorrectAnswers, selected, onSelect }) {
  const [shuffled, setShuffled] = useState([]);

  useEffect(() => {
    const options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    setShuffled(options);
  }, [correctAnswer, incorrectAnswers]);

  const handleClick = (option) => {
    if (!selected) onSelect(option);
  };

  return (
    <div className="space-y-2">
      {shuffled.map((ans, idx) => {
        const isCorrect = selected && ans === correctAnswer;
        const isWrong = selected && ans === selected && selected !== correctAnswer;
        return (
          <button
            key={idx}
            onClick={() => handleClick(ans)}
            className={`w-full text-left px-4 py-2 border rounded
              ${isCorrect ? "bg-green-300" : ""}
              ${isWrong ? "bg-red-300" : ""}
              ${!selected ? "hover:bg-blue-100" : ""}`}
            disabled={!!selected}
          >
            {ans}
          </button>
        );
      })}
    </div>
  );
}
