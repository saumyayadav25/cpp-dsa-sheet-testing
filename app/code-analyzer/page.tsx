"use client";
import React, { useState } from 'react';
import { Loader2, ChevronDown } from 'lucide-react';
import { analyzeWithOpenAI } from '@/lib/openaiAnalyze';

const languages = [
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
];

function estimateComplexity(code: string, language: string) {
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Code Analyzer</h1>
        <p className="mt-2 text-lg text-muted-foreground">Estimate time and space complexity of your code.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm p-6 grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="language" className="text-sm font-medium text-muted-foreground">Language</label>
            <select
              id="language"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-background border border-input rounded-md px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full"
            >
              {languages.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mode" className="text-sm font-medium text-muted-foreground">Analysis Mode</label>
            <select
              id="mode"
              value={mode}
              onChange={e => setMode(e.target.value as 'static' | 'ai')}
              className="bg-background border border-input rounded-md px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full"
            >
              <option value="static">Heuristics (Fast)</option>
              <option value="ai">AI (Best, may take a few seconds)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="text-sm font-medium text-muted-foreground">Paste your code</label>
          <textarea
            id="code"
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={12}
            className="bg-background border border-input rounded-md px-3 py-2 font-mono text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full min-h-[200px]"
            placeholder="Paste your code here..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="inline-flex items-center justify-center bg-primary text-primary-foreground h-10 px-6 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          disabled={loading || !code.trim()}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
        <div role="alert" className="bg-destructive/10 text-destructive border-l-4 border-destructive p-4 rounded-md">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-muted/50 rounded-xl p-6 mt-4 animate-in fade-in-50">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Analysis Result</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-center">
            <div className="bg-background/70 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Time Complexity</h3>
              <p className="text-lg font-semibold text-primary">{result.time}</p>
            </div>
            <div className="bg-background/70 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Space Complexity</h3>
              <p className="text-lg font-semibold text-primary">{result.space}</p>
            </div>
          </div>

          {result.explanation && (
            <details className="mt-4 bg-background/70 rounded-lg border open:ring-1 open:ring-inset open:ring-border transition-all">
              <summary className="font-medium text-foreground p-4 cursor-pointer list-none flex justify-between items-center">
                Show AI Explanation
                <ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="p-4 border-t">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">{result.explanation}</pre>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzerPage;
