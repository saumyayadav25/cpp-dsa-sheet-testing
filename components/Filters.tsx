"use client";

import type { Difficulty } from "@/lib/types";

export function Filters({
  difficulty,
  onDifficultyChange,
}: {
  difficulty: Difficulty | "All";
  onDifficultyChange: (d: Difficulty | "All") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-muted-foreground">Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as any)}
        className="px-3 py-2 rounded-xl border bg-background"
      >
        <option value="All">All</option>
        <option value="Basic">Basic</option>
        <option value="Intermediate">Intermediate</option>
      </select>
    </div>
  );
}

