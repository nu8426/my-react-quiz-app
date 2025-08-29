import React, { useState } from "react";
import QuizStart from "./components/QuizStart/QuizStart";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import ScoreSummary from "./components/ScoreSummary/ScoreSummary";
import useFetchQuestions from "./hooks/useFetchQuestions";

export default function App() {
  const [quizSettings, setQuizSettings] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("start"); // "start" | "quiz" | "summary"
  const [scoreHistory, setScoreHistory] = useState(() => {
    const saved = localStorage.getItem("scoreHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const { questions, loading, error } = useFetchQuestions(
    quizSettings?.numQuestions,
    quizSettings?.category,
    quizSettings?.difficulty
  );

  // Start quiz
  const handleStart = (numQuestions, category, difficulty) => {
    setQuizSettings({ numQuestions, category, difficulty });
    setAnswers([]);
    setScore(0);
    setStage("quiz");
  };

  // Live answer tracking
  const handleAnswer = (questionIndex, selected) => {
    const currentQuestion = questions[questionIndex];
    const isCorrect = selected === currentQuestion.correct_answer;

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      question: currentQuestion.question,
      correct: currentQuestion.correct_answer,
      selected,
      isCorrect,
      number: questionIndex + 1,
    };
    setAnswers(updatedAnswers);

    const newScore = updatedAnswers.filter((a) => a?.isCorrect).length;
    setScore(newScore);
  };

  const finishQuiz = () => {
    const detailedAnswers = questions.map((q, idx) => {
      const selected = answers[idx]?.selected || null;
      return {
        number: idx + 1,
        question: q.question,
        selected,
        correct: q.correct_answer,
        isCorrect: selected === q.correct_answer,
      };
    });

    const newScore = detailedAnswers.filter((a) => a.isCorrect).length;
    setAnswers(detailedAnswers);
    setScore(newScore);

    const newEntry = {
      date: new Date().toLocaleString(),
      score: newScore,
      total: questions.length,
      category: quizSettings?.category,
      difficulty: quizSettings?.difficulty,
    };
    const updatedHistory = [newEntry, ...scoreHistory].slice(0, 10);
    setScoreHistory(updatedHistory);
    localStorage.setItem("scoreHistory", JSON.stringify(updatedHistory));

    setStage("summary");
  };

  const handleRetake = () => {
    setQuizSettings(null);
    setAnswers([]);
    setScore(0);
    setStage("start");
  };

  // Render Start
  if (stage === "start" || !quizSettings) {
    return <QuizStart onStart={handleStart} scoreHistory={scoreHistory} />;
  }

  // Loading or error states
  if (loading) return <div className="text-center mt-10">Loading questions...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  // Render Summary
  if (stage === "summary") {
    return (
      <ScoreSummary
        answers={answers}
        totalQuestions={questions.length}
        score={score}
        retakeQuiz={handleRetake}
      />
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Live Score */}
      <div className="text-right text-lg font-semibold text-blue-600">
        Score: {score} / {questions.length}
      </div>

      <QuestionCard
        questions={questions}
        onAnswer={handleAnswer}
        onFinish={finishQuiz}
        answers={answers}
      />
    </div>
  );
}
