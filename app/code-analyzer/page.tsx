"use client";
import React, { useState } from 'react';
import { Loader2, ChevronDown, Code2, Zap, Brain, Timer, Database, Activity } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-full p-6 border border-slate-700/50">
              <Code2 className="w-12 h-12 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Code <span className="text-blue-400">Analyzer</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Estimate time and space complexity of your algorithms with precision
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-slate-500 pt-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Fast Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span>Accurate Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analyzer Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-8 space-y-8 hover:bg-slate-800/60 transition-all duration-300">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label htmlFor="language" className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Code2 className="w-4 h-4" />
              Programming Language
            </label>
            <div className="relative">
              <select
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm appearance-none cursor-pointer transition-all duration-300 hover:bg-slate-700/70"
              >
                {languages.map(l => (
                  <option key={l.value} value={l.value} className="bg-slate-800 text-white">{l.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="space-y-3">
            <label htmlFor="mode" className="flex items-center gap-2 text-sm font-medium text-slate-300">
              {mode === 'static' ? <Zap className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              Analysis Mode
            </label>
            <div className="relative">
              <select
                id="mode"
                value={mode}
                onChange={e => setMode(e.target.value as 'static' | 'ai')}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm appearance-none cursor-pointer transition-all duration-300 hover:bg-slate-700/70"
              >
                <option value="static" className="bg-slate-800 text-white">⚡ Heuristics (Fast)</option>
                <option value="ai" className="bg-slate-800 text-white">🧠 AI Analysis (Best Quality)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Code Input */}
        <div className="space-y-3">
          <label htmlFor="code" className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Code2 className="w-4 h-4" />
            Your Code
          </label>
          <div className="relative">
            <textarea
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={16}
              className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-4 py-4 font-mono text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm min-h-[400px] transition-all duration-300 hover:bg-slate-900/90 placeholder-slate-500 resize-none"
              placeholder="// Paste your code here and discover its complexity...
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}"
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 px-8 py-3 rounded-lg text-base ring-offset-background transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-xl min-w-[200px]"
            disabled={loading || !code.trim()}
          >
            <div className="flex items-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  <span>Analyze Code</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div role="alert" className="bg-red-900/20 border border-red-800/30 text-red-300 p-6 rounded-xl backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <p className="font-semibold">Analysis Failed</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-8 space-y-6 animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Complexity */}
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 hover:bg-slate-700/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Timer className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-slate-200">Time Complexity</h3>
              </div>
              <p className="text-2xl font-bold text-blue-400 font-mono">
                {result.time}
              </p>
            </div>

            {/* Space Complexity */}
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 hover:bg-slate-700/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-slate-200">Space Complexity</h3>
              </div>
              <p className="text-2xl font-bold text-green-400 font-mono">
                {result.space}
              </p>
            </div>
          </div>

          {/* AI Explanation */}
          {result.explanation && (
            <details className="group bg-slate-700/20 rounded-lg border border-slate-600/50 transition-all duration-300 hover:bg-slate-700/30 open:bg-slate-700/30">
              <summary className="font-semibold text-slate-200 p-6 cursor-pointer list-none flex justify-between items-center group-hover:text-white transition-colors">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span>AI Explanation</span>
                </div>
                <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 border-t border-slate-600/50">
                <div className="bg-slate-900/50 rounded-lg p-4 mt-4">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans leading-relaxed">
                    {result.explanation}
                  </pre>
                </div>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzerPage;