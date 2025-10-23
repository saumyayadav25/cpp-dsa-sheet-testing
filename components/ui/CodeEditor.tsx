"use client";

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes"; // Using the theme provider from this project

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export default function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
}: CodeEditorProps) {
  const { theme } = useTheme();

  const handleEditorChange = (value?: string) => {
    setCode(value || "");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="border border-white/20 rounded-lg overflow-hidden bg-[#1e1e1e]">
      {/* Editor Controls Header */}
      <div className="bg-gray-800/50 p-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-300">Solution Editor</p>
        <div>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>

      {/* Monaco Editor */}
      <div style={{ height: "500px" }}>
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme === "dark" ? "vs-dark" : "light"}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}
