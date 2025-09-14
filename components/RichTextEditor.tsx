"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [selectionFormats, setSelectionFormats] = useState<Record<string, boolean>>({});
  const changeBufferRef = useRef<number | null>(null);

  // Allowed tags for sanitization
  const ALLOWED_BLOCK = new Set(['P','H1','H2','H3','UL','OL','LI','BLOCKQUOTE','PRE']);
  const ALLOWED_INLINE = new Set(['STRONG','EM','U','CODE','BR']);

  const sanitizeHTML = useCallback((html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null);
    const toRemove: Element[] = [];
    while (walker.nextNode()) {
      const el = walker.currentNode as HTMLElement;
      const tag = el.tagName;
      if (!ALLOWED_BLOCK.has(tag) && !ALLOWED_INLINE.has(tag)) {
        if (tag === 'DIV') { // convert DIV to P
          const p = doc.createElement('p');
            p.innerHTML = el.innerHTML;
            el.replaceWith(p);
            continue;
        }
        toRemove.push(el);
        continue;
      }
      // Strip all attributes except class (optional)
      [...el.attributes].forEach(attr => {
        if (attr.name !== 'class') el.removeAttribute(attr.name);
      });
    }
    toRemove.forEach(el => el.replaceWith(...Array.from(el.childNodes)));
    return doc.body.innerHTML.replace(/\u200B/g,'').trim();
  }, []);

  // Initialize editor content
  useEffect(() => {
    if (!editorRef.current) return;
    const sanitized = sanitizeHTML(value || '');
    if (editorRef.current.innerHTML !== sanitized) {
      editorRef.current.innerHTML = sanitized;
    }
  }, [value, sanitizeHTML]);

  const updateSelectionState = useCallback(() => {
    const cmds = ['bold','italic','underline','insertUnorderedList','insertOrderedList'];
    const state: Record<string, boolean> = {};
    cmds.forEach(c => { try { state[c] = document.queryCommandState(c); } catch { state[c] = false; } });
    const sel = window.getSelection();
    if (sel && sel.anchorNode) {
      let node: Node | null = sel.anchorNode;
      while (node && node !== editorRef.current) {
        if (node instanceof HTMLElement) {
          if (['H1','H2','H3'].includes(node.tagName)) {
            state['h1'] = node.tagName === 'H1';
            state['h2'] = node.tagName === 'H2';
            state['h3'] = node.tagName === 'H3';
            break;
          }
        }
        node = node.parentNode;
      }
    }
    setSelectionFormats(state);
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', updateSelectionState);
    return () => document.removeEventListener('selectionchange', updateSelectionState);
  }, [updateSelectionState]);

  // Format text functions
  const commitChange = useCallback(() => {
    if (!editorRef.current) return;
    const cleaned = sanitizeHTML(editorRef.current.innerHTML || '');
    if (cleaned !== value) onChange(cleaned);
  }, [onChange, sanitizeHTML, value]);

  const scheduleCommit = () => {
    if (changeBufferRef.current) cancelAnimationFrame(changeBufferRef.current);
    changeBufferRef.current = requestAnimationFrame(commitChange);
  };

  const formatText = (command: string, valueArg?: string) => {
    document.execCommand(command, false, valueArg);
    scheduleCommit();
    editorRef.current?.focus();
    updateSelectionState();
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

  const handleInput = () => { scheduleCommit(); };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    scheduleCommit();
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
        case 'z':
          e.preventDefault();
          document.execCommand('undo');
          scheduleCommit();
          break;
        case 'y':
          e.preventDefault();
          document.execCommand('redo');
          scheduleCommit();
          break;
      }
    }
    // Tab to indent/outdent inside lists
    if (e.key === 'Tab') {
      const sel = window.getSelection();
      if (sel && sel.anchorNode) {
        const li = sel.anchorNode instanceof HTMLElement ? sel.anchorNode.closest('li') : sel.anchorNode.parentElement?.closest('li');
        if (li) {
          e.preventDefault();
            if (e.shiftKey) document.execCommand('outdent'); else document.execCommand('indent');
            scheduleCommit();
        }
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
    },
    {
      icon: <span className="font-mono text-xs">⤺</span>,
      title: "Undo (Ctrl+Z)",
      onClick: () => { document.execCommand('undo'); scheduleCommit(); },
      command: 'undo'
    },
    {
      icon: <span className="font-mono text-xs">⤻</span>,
      title: "Redo (Ctrl+Y)",
      onClick: () => { document.execCommand('redo'); scheduleCommit(); },
      command: 'redo'
    },
    {
      icon: <span className="text-xs">CLR</span>,
      title: "Clear Formatting",
      onClick: () => {
        if (!editorRef.current) return;
        const plain = editorRef.current.innerText;
        editorRef.current.innerHTML = '';
        document.execCommand('insertHTML', false, `<p>${plain.replace(/\n+/g,'</p><p>')}</p>`);
        scheduleCommit();
      },
      command: 'clear'
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
              className={`toolbar-btn p-2 rounded transition-colors duration-150 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${selectionFormats[button.command] ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : ''}`}
              title={button.title}
              aria-label={button.title}
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
        onPaste={handlePaste}
        onFocus={() => setIsEditorFocused(true)}
        onBlur={() => setIsEditorFocused(false)}
        onKeyDown={handleKeyDown}
        style={{ minHeight: 'calc(100% - 60px)' }}
        data-placeholder={!value ? placeholder : ''}
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
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

        .toolbar-btn:active { transform: scale(0.95); }
        .toolbar-btn { outline: none; }
        .toolbar-btn:focus-visible { box-shadow: 0 0 0 2px rgba(59,130,246,0.6); }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

// Optional helper to safely render stored notes (server/client usage)
// Keeps only allowed tags already enforced in editor; strips others defensively.
export function sanitizeStoredNote(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const allowed = new Set(['P','H1','H2','H3','UL','OL','LI','BLOCKQUOTE','PRE','STRONG','EM','U','CODE','BR']);
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null);
    const remove: Element[] = [];
    while (walker.nextNode()) {
      const el = walker.currentNode as HTMLElement;
      if (!allowed.has(el.tagName)) {
        remove.push(el);
        continue;
      }
      [...el.attributes].forEach(attr => el.removeAttribute(attr.name));
    }
    remove.forEach(el => el.replaceWith(...Array.from(el.childNodes)));
    return doc.body.innerHTML;
  } catch { return ''; }
}

