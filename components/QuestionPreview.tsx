// components/QuestionPreview.tsx

type QuestionPreviewProps = {
  question: {
    id: number;
    title: string;
    description: string;
  };
  onClick?: () => void; // Optional: can be used to select/view full question
};

export default function QuestionPreview({ question, onClick }: QuestionPreviewProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 bg-white dark:bg-gray-900"
    >
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
        {question.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
        {question.description}
      </p>
    </div>
  );
}
