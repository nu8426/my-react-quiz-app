import { useState } from "react";
import QuizStart from "./components/QuizStart/QuizStart";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import ScoreSummary from "./components/ScoreSummary/ScoreSummary";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = ({ category, difficulty, numQuestions }) => {
    // Sample questions, 4 options each
    const sampleQuestions = [
      {
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["Berlin", "Madrid", "Rome"],
      },
      {
        question: "Which language runs in a web browser?",
        correct_answer: "JavaScript",
        incorrect_answers: ["Python", "C++", "Java"],
      },
    ];
    setQuestions(sampleQuestions);
    setQuizStarted(true);
  };

  const finishQuiz = (answers) => {
    setUserAnswers(answers);
    setQuizFinished(true);
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
          <ScoreSummary
            questions={questions}
            answers={userAnswers}
            onRestart={restartQuiz}
          />
        )}
      </div>
    </div>
  );
}
