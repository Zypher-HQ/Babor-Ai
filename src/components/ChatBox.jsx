import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import Effects from "./Effects";
import TypingIndicator from "./TypingIndicator";

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75-6.75M4.5 12l6.75 6.75" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.875L6 12z" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
);

// Get the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BackendAi_URL;
const HISTORY_KEY = "baborai-chathistory";

export default function ChatBox({ userName }) {
  // Load messages from localStorage or start with an empty array
  const [messages, setMessages] = useState(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    if (!BACKEND_URL) {
      setMessages([...newMessages, { sender: "ai", text: "Error: Backend URL is not configured." }]);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(BACKEND_URL, { prompt: input });
      setMessages(prev => [...prev, { sender: "ai", text: res.data.response }]);
    } catch (err) {
      console.error("Error contacting AI:", err);
      setMessages(prev => [...prev, { sender: "ai", text: "Error contacting AI. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]); // This will trigger the useEffect to save the empty array
  };

  return (
    <div className="w-full max-w-lg p-4 border-2 border-red-500 rounded-lg shadow-2xl bg-yellow-100 relative z-10 flex flex-col">
      <Effects />
      <div className="flex justify-between items-center pb-2 border-b border-red-200">
        <h2 className="text-xl font-bold text-red-600">Chat with Babor</h2>
        <button
          onClick={clearChat}
          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
          title="Clear Chat History"
        >
          <ClearIcon />
        </button>
      </div>

      <div className="h-96 overflow-y-auto my-4 space-y-4 pr-2">
        {messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-red-500 rounded-md resize-none"
          placeholder={`Ask Babor AI, ${userName}...`}
          rows="1"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="w-12 h-10 flex items-center justify-center bg-red-500 text-white p-2 rounded-md hover:bg-red-600 disabled:bg-red-300"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : <SendIcon />}
        </button>
      </div>
    </div>
  );
}
