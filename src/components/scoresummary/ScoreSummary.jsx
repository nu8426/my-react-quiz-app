export default function ScoreSummary({ questions, userAnswers, onRestart }) {
  const score = questions.reduce((acc, q, idx) => {
    return acc + (userAnswers[idx] === q.correct_answer ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
      <p className="mb-4">
        Your Score: {score} / {questions.length}
      </p>

      <div className="space-y-2 mb-4">
        {questions.map((q, idx) => {
          const correct = q.correct_answer === userAnswers[idx];
          return (
            <div key={idx} className="p-2 border rounded">
              <p className="font-semibold">{q.question}</p>
              <p className={correct ? "text-green-600" : "text-red-600"}>
                Your Answer: {userAnswers[idx] || "Not answered"} (
                {correct ? "Correct" : `Wrong, correct: ${q.correct_answer}`})
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Restart Quiz
      </button>
    </div>
  );
}
