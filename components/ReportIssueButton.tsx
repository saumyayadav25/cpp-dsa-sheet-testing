'use client';

export default function ReportIssueButton() {
  return (
    <a
      href="https://forms.gle/doYqjXbW7AisPP5x6"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 py-2 px-4 sm:py-3 sm:px-5 rounded-full text-sm font-semibold shadow-lg hover:shadow-2xl z-[1000] hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:-translate-y-1 max-w-[90vw] text-center"
    >
      <span className="inline-flex items-center">
        {/* Full text for screens >= sm */}
        <span className="hidden sm:inline text-lg">💬 Report an issue</span>
        
        {/* Shorter version or icon only for small screens */}
        <span className="inline sm:hidden text-lg">💬</span>
      </span>
    </a>
  );
}
