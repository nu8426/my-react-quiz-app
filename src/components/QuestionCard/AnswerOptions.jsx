import AnswerButton from "./AnswerButton";

export default function AnswerOptions({ options, selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-3 mb-4">
      {options.map((option) => (
        <AnswerButton
          key={option}
          option={option}
          selected={selected === option}
          onClick={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
