import { useState } from "react";
import QuizStart from "./components/QuizStart/QuizStart";
import QuestionCard from "./components/QuestionCard/QuestionCard";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = async ({ category, difficulty, numQuestions }) => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    const formatted = data.results.map((q) => ({
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
    }));
    setQuestions(formatted);
    setQuizStarted(true);
    setQuizFinished(false);
    setUserAnswers([]);
  };

  const finishQuiz = (answers) => {
    setUserAnswers(answers);
    setQuizFinished(true);
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setQuestions([]);
    setUserAnswers([]);
  };

  const score = questions.reduce((acc, q, idx) => {
    if (userAnswers[idx] === q.correct_answer) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {!quizStarted && !quizFinished && <QuizStart onStart={startQuiz} />}

        {quizStarted && !quizFinished && (
          <QuestionCard questions={questions} onFinish={finishQuiz} />
        )}

        {quizFinished && (
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
            <p className="mb-4">You scored {score} / {questions.length}</p>
            <button
              onClick={restartQuiz}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
