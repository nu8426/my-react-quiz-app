export default function QuestionText({ currentIndex, total, text }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">
        Question {currentIndex + 1} of {total}
      </h2>
      <p className="font-semibold">{text}</p>
    </div>
  );
}
