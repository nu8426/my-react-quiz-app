import React from "react";

export default function ScoreSummary({
  score,
  totalQuestions,
  answers,
  retakeQuiz,
}) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-600">
        Quiz Summary
      </h2>

      <div className="text-center text-lg space-y-2">
        <p>
          <span className="font-semibold">Your Score:</span> {score} /{" "}
          {totalQuestions}
        </p>
        <p>
          <span className="font-semibold">Correct Answers:</span>{" "}
          {answers.filter((a) => a.isCorrect).length}
        </p>
        <p>
          <span className="font-semibold">Incorrect Answers:</span>{" "}
          {totalQuestions - answers.filter((a) => a.isCorrect).length}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Answer Review:</h3>
        {answers.map((a, idx) => (
          <div
            key={a.number ?? idx}
            className={`p-4 rounded border ${
              a.isCorrect
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <p
              className="font-semibold"
              dangerouslySetInnerHTML={{
                __html: `${a.number ?? idx + 1}. ${a.question}`,
              }}
            />
            <p>
              Your Answer:{" "}
              <span
                className={
                  a.isCorrect
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {a.selected ?? "No Answer"}
              </span>
            </p>
            <p>
              Correct Answer: <span className="font-semibold">{a.correct}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={retakeQuiz}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
