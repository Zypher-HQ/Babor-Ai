import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.715-.042 1.074-.042h.003c.36.001.72.016 1.074.042 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5V16.5c0 1.657 1.343 3 3 3h1.5c1.657 0 3-1.343 3-3V7.5" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default function Message({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-pop-in`}>
      <div
        className={`relative max-w-xs md:max-w-md p-3 rounded-lg ${
          isUser
            ? "bg-red-500 text-white"
            : "bg-white text-black border border-red-100"
        }`}
      >
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute -top-2 -right-2 p-1 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-800"
            title="Copy text"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              pre: ({node, ...props}) => <pre className="!bg-red-900 !text-white" {...props} />,
              code: ({node, ...props}) => <code className="!text-red-400" />,
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
