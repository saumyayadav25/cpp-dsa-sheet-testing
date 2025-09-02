import React, { useState } from 'react';
import { analyzeWithOpenAI } from '@/lib/openaiAnalyze';

const languages = [
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
];

function estimateComplexity(code: string, language: string) {
  // Simple heuristics for demonstration
  let time = 'O(1)';
  let space = 'O(1)';
  const loopPatterns = [/for\s*\(/g, /while\s*\(/g, /for\s+\w+\s*:/g];
  const recursionPattern = /function|def|void|int|double|float|public|private|protected|static|\w+\s*\(.*\)\s*\{[^}]*\breturn\s+\w+\s*\(.*\)/gs;
  let loopCount = 0;
  loopPatterns.forEach((pat) => {
    const matches = code.match(pat);
    if (matches) loopCount += matches.length;
  });
  if (loopCount === 1) time = 'O(n)';
  if (loopCount > 1) time = 'O(n^' + loopCount + ')';
  if (recursionPattern.test(code)) time = 'O(2^n) or O(n log n) (recursive detected)';
  if (/new\s+|malloc|\[\]/.test(code)) space = 'O(n) (dynamic allocation detected)';
  if (/\bint\s+\w+\[.*\]/.test(code) || /\bvector<.*>\s+\w+/.test(code)) space = 'O(n) (array/vector detected)';
  return { time, space };
}


const CodeAnalyzerPage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [result, setResult] = useState<{ time: string; space: string; explanation?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'static' | 'ai'>('static');
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      if (mode === 'static') {
        const res = estimateComplexity(code, language);
        setResult(res);
      } else {
        const res = await analyzeWithOpenAI(code, language);
        setResult(res);
      }
    } catch (e: any) {
      setError('Failed to analyze code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">Code Analyzer</h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <label htmlFor="language" className="font-medium">Language</label>
          <select
            id="language"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            {languages.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="font-medium">Analysis Mode</label>
          <select
            value={mode}
            onChange={e => setMode(e.target.value as 'static' | 'ai')}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="static">Heuristics (Fast)</option>
            <option value="ai">AI (Best, may take a few seconds)</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="code" className="font-medium">Paste your code</label>
        <textarea
          id="code"
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={10}
          className="border rounded px-2 py-2 font-mono"
          placeholder="Paste your code here..."
        />
      </div>
      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading || !code.trim()}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="bg-white shadow rounded p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Estimated Complexity</h2>
          <div className="flex flex-col gap-1 mb-2">
            <span><strong>Time Complexity:</strong> {result.time}</span>
            <span><strong>Space Complexity:</strong> {result.space}</span>
          </div>
          {result.explanation && (
            <details className="mt-2 cursor-pointer">
              <summary className="font-medium text-blue-700">Show AI Explanation</summary>
              <pre className="whitespace-pre-wrap text-sm mt-2 bg-gray-50 p-2 rounded border overflow-x-auto">{result.explanation}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzerPage;