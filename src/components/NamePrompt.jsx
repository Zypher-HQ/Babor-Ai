import React, { useState } from "react";

export default function NamePrompt({ onNameSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-yellow-100 border-2 border-red-500 rounded-lg shadow-2xl z-20 animate-pop-in"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Welcome to Babor AI
        </h2>
        <p className="text-center text-gray-700 mb-4">
          What should we call you?
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-red-500 rounded-md"
          placeholder="Enter your name..."
          autoFocus
        />
        <button
          type="submit"
          className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 disabled:bg-red-300"
          disabled={!name.trim()}
        >
          Start Chatting
        </button>
      </form>
    </div>
  );
}
