export default function NavigationButtons({ onPrev, onNext, disablePrev, disableNext, isLast }) {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={disableNext}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLast ? "Finish" : "Next"}
      </button>
    </div>
  );
}
