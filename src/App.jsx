import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import NamePrompt from "./components/NamePrompt";

export default function App() {
  // Try to get the user name from localStorage
  const [userName, setUserName] = useState(() => localStorage.getItem("baborai-username") || null);

  const handleNameSubmit = (name) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      localStorage.setItem("baborai-username", trimmedName);
      setUserName(trimmedName);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4 relative overflow-hidden">
      {!userName ? (
        <NamePrompt onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          <h1 className="text-5xl font-bold text-red-500 mb-4 z-10" style={{ textShadow: '2px 2px #fff' }}>
            Babor AI
          </h1>
          <ChatBox userName={userName} />
        </>
      )}
    </div>
  );
}
