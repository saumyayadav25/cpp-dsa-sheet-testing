// components/RandomQuestionButton.tsx

type RandomQuestionButtonProps = {
  onClick: () => void;
};

export default function RandomQuestionButton({ onClick }: RandomQuestionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
    >
      Pick Random Question
    </button>
  );
}
