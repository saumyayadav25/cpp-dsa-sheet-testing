"use client";

interface FiltersProps {
  onFilterChange: (difficulty: string) => void;
  currentFilter: string;
}

export default function Filters({ onFilterChange, currentFilter }: FiltersProps) {
  return (
    <div className="flex gap-4 mt-4">
      {["All", "Basic", "Intermediate"].map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded ${
            currentFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
