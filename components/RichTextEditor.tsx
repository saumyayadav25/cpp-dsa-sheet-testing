"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  Heading1, 
  Heading2, 
  Heading3,
  Underline,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your notes...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Format text functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const insertList = (ordered: boolean = false) => {
    const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    formatText(command);
  };

  const insertHeading = (level: number) => {
    formatText('formatBlock', `h${level}`);
  };

  const setTextAlign = (alignment: string) => {
    formatText(`justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
      }
    }
  };

  const toolbarButtons = [
    {
      icon: <Bold className="w-4 h-4" />,
      title: "Bold (Ctrl+B)",
      onClick: () => formatText('bold'),
      command: 'bold'
    },
    {
      icon: <Italic className="w-4 h-4" />,
      title: "Italic (Ctrl+I)",
      onClick: () => formatText('italic'),
      command: 'italic'
    },
    {
      icon: <Underline className="w-4 h-4" />,
      title: "Underline (Ctrl+U)",
      onClick: () => formatText('underline'),
      command: 'underline'
    },
    {
      icon: <Heading1 className="w-4 h-4" />,
      title: "Heading 1",
      onClick: () => insertHeading(1),
      command: 'h1'
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      title: "Heading 2",
      onClick: () => insertHeading(2),
      command: 'h2'
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      title: "Heading 3",
      onClick: () => insertHeading(3),
      command: 'h3'
    },
    {
      icon: <List className="w-4 h-4" />,
      title: "Bullet List",
      onClick: () => insertList(false),
      command: 'insertUnorderedList'
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      title: "Numbered List",
      onClick: () => insertList(true),
      command: 'insertOrderedList'
    },
    {
      icon: <Quote className="w-4 h-4" />,
      title: "Quote",
      onClick: () => formatText('formatBlock', 'blockquote'),
      command: 'blockquote'
    },
    {
      icon: <Code className="w-4 h-4" />,
      title: "Code",
      onClick: () => formatText('formatBlock', 'pre'),
      command: 'pre'
    },
    {
      icon: <AlignLeft className="w-4 h-4" />,
      title: "Align Left",
      onClick: () => setTextAlign('left'),
      command: 'justifyLeft'
    },
    {
      icon: <AlignCenter className="w-4 h-4" />,
      title: "Align Center",
      onClick: () => setTextAlign('center'),
      command: 'justifyCenter'
    },
    {
      icon: <AlignRight className="w-4 h-4" />,
      title: "Align Right",
      onClick: () => setTextAlign('right'),
      command: 'justifyRight'
    }
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="toolbar border-b border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-t-md">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              className="toolbar-btn p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              title={button.title}
              onClick={button.onClick}
              onMouseDown={(e: React.MouseEvent) => e.preventDefault()} // Prevent focus loss
            >
              {button.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={`editor-content min-h-[200px] p-4 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white border-0 focus:outline-none focus:ring-0 rounded-b-md ${
          isEditorFocused ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
        }`}
        onInput={handleInput}
        onFocus={() => setIsEditorFocused(true)}
        onBlur={() => setIsEditorFocused(false)}
        onKeyDown={handleKeyDown}
        style={{ minHeight: 'calc(100% - 60px)' }}
        data-placeholder={!value ? placeholder : ''}
      />

      {/* Custom styles for the editor */}
      <style jsx>{`
        .rich-text-editor {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .rich-text-editor:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }

        .dark .rich-text-editor {
          border-color: #4b5563;
        }

        .dark .rich-text-editor:focus-within {
          border-color: #60a5fa;
          box-shadow: 0 0 0 1px #60a5fa;
        }

        .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        .dark .editor-content:empty:before {
          color: #6b7280;
        }

        .editor-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .editor-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }

        .editor-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .editor-content ul {
          list-style-type: disc;
          padding-left: 2em;
          margin: 1em 0;
        }

        .editor-content ol {
          list-style-type: decimal;
          padding-left: 2em;
          margin: 1em 0;
        }

        .editor-content li {
          margin: 0.25em 0;
        }

        .editor-content blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }

        .dark .editor-content blockquote {
          border-left-color: #4b5563;
          color: #9ca3af;
        }

        .editor-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          margin: 1em 0;
        }

        .dark .editor-content pre {
          background-color: #374151;
        }

        .editor-content p {
          margin: 0.5em 0;
        }

        .editor-content strong {
          font-weight: bold;
        }

        .editor-content em {
          font-style: italic;
        }

        .editor-content u {
          text-decoration: underline;
        }

        .toolbar-btn:hover {
          transform: scale(1.05);
        }

        .toolbar-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

