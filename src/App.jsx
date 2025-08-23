import { useState } from "react";
import QuizStart from "./components/QuizStart/QuizStart";
import QuestionCard from "./components/QuestionCard/QuestionCard";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = async ({ category, difficulty, numQuestions }) => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    const formattedQuestions = data.results.map((q) => ({
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
    }));

    setQuestions(formattedQuestions);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        {!quizStarted && !quizFinished && <QuizStart onStart={startQuiz} />}
        {quizStarted && !quizFinished && (
          <QuestionCard questions={questions} onFinish={finishQuiz} />
        )}
        {quizFinished && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
            <p className="mb-4">
              You answered {userAnswers.filter(Boolean).length} out of{" "}
              {questions.length} questions.
            </p>
            <button
              onClick={restartQuiz}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
