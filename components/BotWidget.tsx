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
    contentElement = <span>{msg.content}</span>;
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
