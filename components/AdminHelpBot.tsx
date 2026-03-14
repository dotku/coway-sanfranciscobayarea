"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";

const adminTransport = new TextStreamChatTransport({
  api: "/api/chat",
  body: { mode: "admin" },
});

export default function AdminHelpBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: adminTransport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#005A7A] hover:bg-[#004A66] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
        aria-label="Admin Help"
      >
        {open ? (
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: "min(500px, calc(100vh - 140px))" }}
        >
          {/* Header */}
          <div className="bg-[#005A7A] text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm">Admin Assistant</div>
              <div className="text-xs text-white/80">AI-Powered Help</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-8">
                <p className="mb-2">Hi Admin! How can I assist you?</p>
                <p className="text-xs">
                  Ask about team management, referral tracking, or business
                  strategy.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#005A7A] text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.parts
                    ?.filter((p) => p.type === "text")
                    .map((p) => p.text)
                    .join("")}
                </div>
              </div>
            ))}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2 text-sm text-gray-400">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      >
                        .
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      >
                        .
                      </span>
                    </span>
                  </div>
                </div>
              )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#005A7A] focus:ring-1 focus:ring-[#005A7A]"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-full bg-[#005A7A] hover:bg-[#004A66] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
