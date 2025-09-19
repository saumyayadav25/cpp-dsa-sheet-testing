"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";

export default function BotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "👋 Hi! I’m your DSAMate Bot. Tell me what you’ve done so far!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/bot-chat", {
        messages: updatedMessages,
      });

      const botReply = res.data.result;
      setMessages([...updatedMessages, { role: "bot", content: botReply }]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "bot", content: "⚠️ Gemini API failed. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div ref={chatRef} className="fixed bottom-7 sm:bottom-24 right-4 sm:right-5 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bottom-4
         right-4 sm:w-15 sm:h-15 
                cursor-pointer"
      >
        <Image
          src="/assets/bot.gif"
          alt="BOT"
          width={80}
          height={80}
          className="object-contain"
          unoptimized
        />
      </button>

      {open && (
        <div className="mt-2 w-96 bg-white rounded-xl shadow-md border max-h-[70vh] flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto max-h-[50vh] space-y-2">
            {messages.map((msg, i) => {
  let contentElement;

  // Try to parse JSON
  try {
    const data = JSON.parse(msg.content);
    if (Array.isArray(data) && data[0]?.title && data[0]?.description) {
      // Render as question cards
      contentElement = (
        <div className="space-y-3">
          {data.map((q, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-3 bg-white text-black shadow-sm"
            >
              <h3 className="font-bold text-blue-600">{q.title}</h3>
              <p className="text-sm mt-1">{q.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                <b>Topic:</b> {q.topic} | <b>Level:</b> {q.level}
              </p>
            </div>
          ))}
        </div>
      );
    } else {
      contentElement = <span>{msg.content}</span>;
    }
  } catch {
    // Parse markdown-style formatting
    const formattedContent = msg.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **bold**
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // *italic*
      .replace(/^(\d+\.)\s/gm, '<strong>$1</strong> '); // numbered lists
    
    contentElement = (
      <span 
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    );
  }

  return (
    <div
      key={i}
      className={`p-2 rounded text-black text-sm whitespace-pre-line ${
        msg.role === "user"
          ? "bg-blue-100 text-right"
          : "bg-gray-100 text-left"
      }`}
    >
      {contentElement}
    </div>
  );
})}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What have you covered so far?"
                className="flex-grow border p-2 rounded text-black"
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className={`p-2 rounded text-white ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <SendHorizonal size={16} />
              </button>
            </div>
            {loading && (
              <p className="text-sm text-gray-500 mt-2">🤖 Thinking...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
