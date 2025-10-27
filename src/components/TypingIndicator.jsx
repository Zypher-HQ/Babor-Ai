import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center space-x-1.5 p-3 rounded-lg bg-white border border-red-100">
        <div className="w-2 h-2 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}
