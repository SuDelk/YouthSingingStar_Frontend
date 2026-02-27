export default function ContestantCard({ contestant, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(contestant.id)}
      className={`
        relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center
        transition-all duration-200 cursor-pointer w-full
        ${
          selected
            ? "border-yellow-400 bg-yellow-50 shadow-lg shadow-yellow-200 scale-105"
            : "border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md"
        }
      `}
    >
      {/* Contestant number badge */}
      <span
        className={`
          absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
          ${selected ? "bg-yellow-400 text-white" : "bg-gray-100 text-gray-500"}
        `}
      >
        {contestant.id}
      </span>

      {/* Avatar placeholder */}
      <div
        className={`
          flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold
          ${selected ? "bg-yellow-400 text-white" : "bg-gray-100 text-gray-400"}
        `}
      >
        {contestant.name.charAt(0)}
      </div>

      <div>
        <p className="font-semibold text-gray-800 text-sm leading-tight">
          {contestant.name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{contestant.region}</p>
      </div>

      {selected && (
        <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full px-3 py-0.5">
          ✓ Selected
        </span>
      )}
    </button>
  );
}
