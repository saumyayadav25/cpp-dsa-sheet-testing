'use client';

export default function ReportIssueButton() {
  return (
    <a
      href="https://forms.gle/doYqjXbW7AisPP5x6"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 bg-[#3a3b3f] text-white py-2 px-4 sm:py-3 sm:px-5 rounded-full text-sm font-semibold shadow-lg z-[1000] hover:bg-[#46474e] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 max-w-[90vw] text-center"
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
