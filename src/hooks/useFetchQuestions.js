import { useState, useEffect } from "react";

export default function useFetchQuestions(numQuestions, category, difficulty) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!numQuestions) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
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
      } catch (err) {
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [numQuestions, category, difficulty]);

  return { questions, loading, error };
}
