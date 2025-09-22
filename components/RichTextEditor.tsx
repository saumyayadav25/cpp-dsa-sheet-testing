"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Link,
  Type,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Save,
  Check,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSave?: () => void;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your notes...",
  className = "",
  onSave,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [lastSavedContent, setLastSavedContent] = useState(value);

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  // Set initial content when component mounts or value changes externally
  useEffect(() => {
    if (mounted && editorRef.current && typeof window !== "undefined") {
      // Only update if the content is different and we're not currently editing
      const selection = window.getSelection();
      const isEditing =
        selection &&
        selection.rangeCount > 0 &&
        editorRef.current.contains(selection.anchorNode);

      if (!isEditing && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, mounted]);

  // Track changes for save state
  useEffect(() => {
    setIsSaved(value === lastSavedContent);
  }, [value, lastSavedContent]);

  // Handle save
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave();
      setLastSavedContent(value);
      setIsSaved(true);
    }
  }, [onSave, value]);

  // Handle content changes (define this first)
  const handleContentChange = useCallback(() => {
    if (editorRef.current && mounted && typeof window !== "undefined") {
      const newContent = editorRef.current.innerHTML;
      if (newContent !== value) {
        onChange(newContent);
      }
    }
  }, [onChange, mounted, value]);

  // Auto-save on Ctrl+S
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  // Helper functions for manual formatting
  const wrapSelection = useCallback((range: Range, tagName: string) => {
    const selectedText = range.toString();
    if (selectedText) {
      const element = document.createElement(tagName);
      element.textContent = selectedText;
      range.deleteContents();
      range.insertNode(element);

      // Restore selection
      const newRange = document.createRange();
      newRange.selectNodeContents(element);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      // If no text selected, insert placeholder text with formatting
      const element = document.createElement(tagName);
      element.textContent = "Formatted text";
      range.insertNode(element);

      // Select the inserted text
      const newRange = document.createRange();
      newRange.selectNodeContents(element);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, []);

  const createList = useCallback((range: Range, listType: "ul" | "ol") => {
    const selectedText = range.toString();

    // Create the list and list item
    const list = document.createElement(listType);
    const listItem = document.createElement("li");

    if (selectedText) {
      // If text is selected, use it as list item content
      listItem.textContent = selectedText;
    } else {
      // If no text selected, create empty list item with placeholder
      listItem.textContent = "List item";
    }

    list.appendChild(listItem);

    // Insert the list
    range.deleteContents();
    range.insertNode(list);

    // Add a line break after the list for better formatting
    const br = document.createElement("br");
    range.setStartAfter(list);
    range.insertNode(br);

    // Position cursor at the end of the list item content
    const newRange = document.createRange();
    newRange.selectNodeContents(listItem);
    newRange.collapse(false);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }, []);

  const alignText = useCallback((range: Range, alignment: string) => {
    // Get the selected text or current position
    const selectedText = range.toString();

    if (selectedText) {
      // If text is selected, wrap it in a div with alignment
      const alignDiv = document.createElement("div");
      alignDiv.style.textAlign = alignment;
      alignDiv.textContent = selectedText;

      range.deleteContents();
      range.insertNode(alignDiv);

      // Position cursor at the end of the aligned text
      const newRange = document.createRange();
      newRange.setStartAfter(alignDiv);
      newRange.collapse(true);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      // If no selection, find the current block element or create one
      const container = range.commonAncestorContainer;
      let targetElement =
        container.nodeType === Node.TEXT_NODE
          ? container.parentElement
          : (container as Element);

      // Find the closest block element or the editor itself
      while (
        targetElement &&
        targetElement !== editorRef.current &&
        !["DIV", "P", "H1", "H2", "H3", "H4", "H5", "H6", "LI"].includes(
          targetElement.tagName
        )
      ) {
        targetElement = targetElement.parentElement;
      }

      if (targetElement && targetElement !== editorRef.current) {
        (targetElement as HTMLElement).style.textAlign = alignment;
      } else if (editorRef.current) {
        // Apply to the entire editor if no specific block found
        editorRef.current.style.textAlign = alignment;
      }
    }
  }, []);

  const formatBlock = useCallback((range: Range, tagName: string) => {
    const selectedText = range.toString();

    if (selectedText) {
      // If text is selected, wrap it in the specified tag
      const element = document.createElement(tagName);
      element.textContent = selectedText;

      range.deleteContents();
      range.insertNode(element);

      // Add a line break after the element for better formatting
      const br = document.createElement("br");
      range.setStartAfter(element);
      range.insertNode(br);

      // Position cursor after the element
      const newRange = document.createRange();
      newRange.setStartAfter(br);
      newRange.collapse(true);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      // If no text selected, create a new heading with placeholder text
      const element = document.createElement(tagName);
      element.textContent =
        tagName.toUpperCase() === "P"
          ? "Paragraph"
          : `Heading ${tagName.slice(1)}`;

      range.insertNode(element);

      // Add a line break after for better formatting
      const br = document.createElement("br");
      range.setStartAfter(element);
      range.insertNode(br);

      // Select the placeholder text so user can type over it
      const newRange = document.createRange();
      newRange.selectNodeContents(element);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, []);

  const colorText = useCallback((range: Range, color: string) => {
    const selectedText = range.toString();
    if (selectedText) {
      const span = document.createElement("span");
      span.style.color = color;
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);

      // Restore selection
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, []);

  // Execute formatting commands with better handling
  const executeCommand = useCallback(
    (command: string, value?: string) => {
      if (!mounted || !editorRef.current || typeof window === "undefined")
        return;

      // Focus the editor first
      editorRef.current.focus();

      try {
        let success = false;

        // Try document.execCommand first
        if (document.execCommand) {
          if (command === "formatBlock") {
            success = document.execCommand(
              "formatBlock",
              false,
              value || "div"
            );
          } else {
            success = document.execCommand(command, false, value);
          }
        }

        // If execCommand failed or isn't available, use manual implementation
        if (!success) {
          const selection = window.getSelection();
          let range: Range;

          if (selection && selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
          } else {
            // Create a new range at the end of the editor if no selection
            range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
          }

          switch (command) {
            case "bold":
              wrapSelection(range, "strong");
              break;
            case "italic":
              wrapSelection(range, "em");
              break;
            case "underline":
              wrapSelection(range, "u");
              break;
            case "strikeThrough":
              wrapSelection(range, "s");
              break;
            case "insertUnorderedList":
              createList(range, "ul");
              break;
            case "insertOrderedList":
              createList(range, "ol");
              break;
            case "justifyLeft":
              alignText(range, "left");
              break;
            case "justifyCenter":
              alignText(range, "center");
              break;
            case "justifyRight":
              alignText(range, "right");
              break;
            case "formatBlock":
              formatBlock(range, value || "p");
              break;
            case "foreColor":
              colorText(range, value || "#000000");
              break;
            case "undo":
              if (document.execCommand) {
                document.execCommand("undo", false);
              }
              break;
            case "redo":
              if (document.execCommand) {
                document.execCommand("redo", false);
              }
              break;
            case "indent":
              if (document.execCommand) {
                document.execCommand("indent", false);
              }
              break;
            case "outdent":
              if (document.execCommand) {
                document.execCommand("outdent", false);
              }
              break;
          }
        }

        // Update content
        setTimeout(() => handleContentChange(), 10);
      } catch (error) {
        console.warn("Command execution failed:", command, error);
      }
    },
    [
      handleContentChange,
      mounted,
      wrapSelection,
      createList,
      alignText,
      formatBlock,
      colorText,
    ]
  );

  // Handle paste to clean up formatting
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (!mounted || typeof window === "undefined") return;

      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      try {
        document.execCommand("insertText", false, text);
        handleContentChange();
      } catch (error) {
        // Fallback for browsers that don't support execCommand
        if (editorRef.current) {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
            selection.collapseToEnd();
            handleContentChange();
          }
        }
      }
    },
    [handleContentChange, mounted]
  );

  // Insert link
  const insertLink = useCallback(() => {
    if (linkUrl && linkText && mounted && editorRef.current) {
      editorRef.current.focus();

      try {
        // Try using execCommand first
        const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${linkText}</a>`;
        let success = false;

        if (document.execCommand) {
          success = document.execCommand("insertHTML", false, linkHtml);
        }

        // Fallback method
        if (!success) {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const link = document.createElement("a");
            link.href = linkUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.style.color = "#2563eb";
            link.style.textDecoration = "underline";
            link.textContent = linkText;

            range.deleteContents();
            range.insertNode(link);

            // Position cursor after the link
            const newRange = document.createRange();
            newRange.setStartAfter(link);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } else {
            // If no selection, just append to the end
            const link = document.createElement("a");
            link.href = linkUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.style.color = "#2563eb";
            link.style.textDecoration = "underline";
            link.textContent = linkText;
            editorRef.current.appendChild(link);
          }
        }

        handleContentChange();
        setIsLinkModalOpen(false);
        setLinkUrl("");
        setLinkText("");
      } catch (error) {
        console.warn("Link insertion failed:", error);
      }
    }
  }, [linkUrl, linkText, handleContentChange, mounted]);

  // Apply text color
  const applyTextColor = useCallback(
    (color: string) => {
      executeCommand("foreColor", color);
      setShowColorPicker(false);
    },
    [executeCommand]
  );

  // Heading options
  const headingOptions = [
    { label: "Normal", value: "p" },
    { label: "Heading 1", value: "h1" },
    { label: "Heading 2", value: "h2" },
    { label: "Heading 3", value: "h3" },
  ];

  // Format buttons configuration
  const formatButtons = [
    { icon: Bold, command: "bold", title: "Bold (Ctrl+B)" },
    { icon: Italic, command: "italic", title: "Italic (Ctrl+I)" },
    { icon: Strikethrough, command: "strikeThrough", title: "Strikethrough" },
    { icon: Link, command: "link", title: "Insert Link", special: true },
    { icon: List, command: "insertUnorderedList", title: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
    { icon: Indent, command: "indent", title: "Increase Indent" },
    { icon: Outdent, command: "outdent", title: "Decrease Indent" },
    { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
    { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
    { icon: AlignRight, command: "justifyRight", title: "Align Right" },
    { icon: Undo, command: "undo", title: "Undo (Ctrl+Z)" },
    { icon: Redo, command: "redo", title: "Redo (Ctrl+Y)" },
  ];

  const colors = [
    "#000000",
    "#e60000",
    "#ff9900",
    "#ffff00",
    "#008a00",
    "#0066cc",
    "#9933ff",
    "#ffffff",
    "#facccc",
    "#ffebcc",
    "#ffffcc",
    "#cce8cc",
    "#cce0f5",
    "#ebd6ff",
    "#bbbbbb",
    "#f06666",
    "#ffc266",
    "#ffff66",
    "#66b266",
    "#66a3e0",
    "#c285ff",
    "#888888",
    "#a10000",
    "#b26b00",
    "#b2b200",
    "#006100",
    "#0047b2",
    "#6b24b2",
    "#444444",
    "#5c0000",
    "#663d00",
    "#666600",
    "#003700",
    "#002966",
    "#3d1466",
  ];

  if (!mounted) {
    return (
      <div
        className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${className}`}
      >
        <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="text-gray-500 dark:text-gray-400">
            Loading editor...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-blue-200/50 dark:border-blue-500/30 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/10 dark:shadow-blue-400/5 ${className}`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 border-b-2 border-blue-200/50 dark:border-blue-500/30 backdrop-blur-sm">
        {/* Heading Dropdown */}
        <div className="relative">
          <select
            onChange={(e) => executeCommand("formatBlock", e.target.value)}
            className="appearance-none px-3 py-2 pr-8 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-blue-200 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            title="Text Format"
          >
            {headingOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-indigo-300 dark:from-blue-600 dark:to-indigo-600 mx-2 rounded-full" />

        {formatButtons.map(({ icon: Icon, command, title, special }) => (
          <button
            key={command}
            type="button"
            onClick={() => {
              if (special && command === "link") {
                setIsLinkModalOpen(true);
              } else {
                executeCommand(command);
              }
            }}
            className="p-2.5 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
            title={title}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}

        {/* Color picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2.5 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
          </button>

          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 dark:shadow-blue-400/10 z-20 backdrop-blur-sm">
              <div className="grid grid-cols-7 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => applyTextColor(color)}
                    className="w-7 h-7 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:scale-110 hover:shadow-lg transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-indigo-300 dark:from-blue-600 dark:to-indigo-600 mx-2 rounded-full" />

        {/* Save Button */}
        {onSave && (
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
              isSaved
                ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 cursor-default border-2 border-green-200 dark:border-green-600"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-2 border-blue-500 hover:border-blue-600 hover:scale-105 active:scale-95"
            }`}
            title={isSaved ? "All changes saved" : "Save changes (Ctrl+S)"}
          >
            {isSaved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-6 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-0 transition-all duration-200"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
        onInput={handleContentChange}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70 dark:from-black/80 dark:via-black/70 dark:to-black/90 backdrop-blur-lg flex items-center justify-center z-[60] animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-white via-blue-50/50 to-white dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-800 rounded-3xl p-8 w-full max-w-lg mx-4 border-2 border-blue-200/50 dark:border-blue-500/30 shadow-2xl shadow-blue-500/20 dark:shadow-blue-400/10 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
                <Link className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Insert Link
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Enter link text"
                  className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setIsLinkModalOpen(false);
                  setLinkUrl("");
                  setLinkText("");
                }}
                className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                disabled={!linkUrl || !linkText}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:hover:scale-100"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0;
        }

        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.75rem 0;
        }

        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        [contenteditable] ul {
          list-style-type: disc;
          margin: 0.5rem 0 0.5rem 1.5rem;
          padding-left: 1rem;
        }

        [contenteditable] ol {
          list-style-type: decimal;
          margin: 0.5rem 0 0.5rem 1.5rem;
          padding-left: 1rem;
        }

        [contenteditable] li {
          margin: 0.25rem 0;
        }

        [contenteditable] strong {
          font-weight: 600;
        }

        [contenteditable] em {
          font-style: italic;
        }

        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
        }

        .dark [contenteditable] a {
          color: #60a5fa;
        }

        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
        }

        .dark [contenteditable] blockquote {
          border-left-color: #4b5563;
        }
      `}</style>
    </div>
  );
}
