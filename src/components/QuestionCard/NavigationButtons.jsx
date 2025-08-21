export default function NavigationButtons({ onNext, onPrev, disableNext, disablePrev }) {
  return (
    <div className="flex justify-between mt-6">
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
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
