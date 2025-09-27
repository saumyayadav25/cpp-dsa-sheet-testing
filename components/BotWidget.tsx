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
      content: "👋 Hi! I'm your DSAMate Bot. Tell me what you've done so far!",
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
    <div ref={chatRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Bot Button - Responsive sizing */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-16 lg:h-16 
                   bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                   flex items-center justify-center hover:bg-blue-700 active:scale-95"
      >
        <Image
          src="/assets/bot.gif"
          alt="BOT"
          width={80}
          height={80}
          className="w-full h-full object-contain p-1"
          unoptimized
        />
      </button>

      {/* Chat Window - Responsive positioning and sizing */}
      {open && (
        <div className="absolute bottom-16 right-0 sm:bottom-20 sm:right-0
                        w-72 sm:w-80 md:w-96 lg:w-[400px] xl:w-[420px]
                        h-[50vh] sm:h-[60vh] md:h-[65vh] max-h-[450px]
                        bg-white rounded-xl shadow-lg border flex flex-col">
          
          {/* Messages Container - Responsive padding and text sizing */}
          <div className="flex-1 p-3 sm:p-4 md:p-5 overflow-y-auto space-y-3">
            {messages.map((msg, i) => {
              let contentElement;

              // Try to parse JSON
              try {
                const data = JSON.parse(msg.content);
                if (Array.isArray(data) && data[0]?.title && data[0]?.description) {
                  // Render as question cards
                  contentElement = (
                    <div className="space-y-2 sm:space-y-3">
                      {data.map((q, idx) => (
                        <div
                          key={idx}
                          className="border rounded-lg p-3 sm:p-4 bg-white text-black shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h3 className="font-bold text-blue-600 text-sm sm:text-base md:text-lg">{q.title}</h3>
                          <p className="text-sm sm:text-base md:text-lg mt-1">{q.description}</p>
                          <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-500">
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
                  className={`rounded-lg text-black whitespace-pre-line transition-all 
                             p-3 sm:p-4
                             text-sm sm:text-base
                             ${msg.role === "user"
                               ? "bg-blue-100 text-right ml-4"
                               : "bg-gray-100 text-left mr-4"
                             }`}
                >
                  {contentElement}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Responsive padding and sizing */}
          <div className="p-3 sm:p-4 border-t bg-gray-50">
            <div className="flex items-center gap-2 sm:gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What have you covered so far?"
                className="flex-grow border p-2 sm:p-3 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                          text-sm sm:text-base"
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
                className={`p-2 sm:p-3 rounded-lg text-white transition-all duration-200 ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                }`}
              >
                <SendHorizonal 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                />
              </button>
            </div>
            {loading && (
              <p className="text-gray-500 mt-2 animate-pulse text-sm">
                🤖 Thinking...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}