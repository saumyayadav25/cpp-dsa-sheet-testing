"use client";
import { useState } from "react";
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

  const handleSend = async () => {
    if (!input.trim()) return;

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
    <div className="fixed bottom-20 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
      >
        <Image
          src="/assets/bot.gif"
          alt="BOT"
          width={80}
          height={80}
          className="object-contain"
        />
      </button>

      {open && (
        <div className="mt-2 w-96 bg-white p-4 rounded-xl shadow-md border max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded text-black text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What have you covered so far?"
              className="flex-grow border p-2 rounded text-black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded"
            >
              <SendHorizonal size={16} />
            </button>
          </div>

          {loading && (
            <p className="text-sm text-gray-500 mt-2">🤖 Thinking...</p>
          )}
        </div>
      )}
    </div>
  );
}
