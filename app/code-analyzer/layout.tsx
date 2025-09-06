import React from 'react';

export default function CodeAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {children}
    </div>
  );
}
