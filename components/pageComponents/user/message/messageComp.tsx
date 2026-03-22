"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "admin" | "customer";
  time: string;
}

export default function MessageComp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello, I need help with my order.",
      sender: "customer",
      time: "10:00 AM",
    },
    {
      id: 2,
      text: "Sure! Can you provide your order ID?",
      sender: "admin",
      time: "10:01 AM",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "customer",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="mt-10 flex h-screen flex-col bg-[#F9FAFB] md:my-1">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div>
          <h2 className="text-lg font-bold">Support Chat</h2>
          <p className="text-xs text-gray-500">Admin • Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "customer" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow ${
                msg.sender === "customer"
                  ? "bg-[#2E7D32] text-white"
                  : "border bg-white text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="mt-1 block text-[10px] opacity-70">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t bg-white p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border px-4 py-2 text-sm outline-none focus:border-[#2E7D32]"
        />

        <button
          onClick={handleSend}
          className="flex items-center justify-center rounded-xl bg-[#2E7D32] p-3 text-white hover:bg-[#1B5E20]"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
