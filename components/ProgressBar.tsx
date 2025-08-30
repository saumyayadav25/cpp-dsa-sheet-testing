"use client";

interface ProgressBarProps {
  currentIndex: number;
  total: number;
}

export default function ProgressBar({ currentIndex, total }: ProgressBarProps) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="w-full max-w-xs bg-gray-200 h-2 rounded mt-6">
      <div
        className="bg-blue-500 h-2 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

//This is progress bar for flascard page
