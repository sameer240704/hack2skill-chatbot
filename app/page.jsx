"use client";

import { ChatInterface } from "@/components/ChatInterface";
import Navbar from "@/components/Navbar";
import Placeholder from "@/components/Placeholder";
import { TypingBox } from "@/components/TypingBox";
import { useGlobalState } from "@/context/GlobalContext";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedAvatar } = useGlobalState();

  const addMessage = async (userMessage) => {
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, avatar: selectedAvatar }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen relative bg-[#232A34] flex items-center justify-center overflow-hidden px-2">
      <Navbar />
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          messages.length > 0 ? "hidden" : "block"
        }`}
      >
        <Placeholder />
      </div>
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          messages.length > 0 ? "block" : "hidden"
        }`}
      >
        <ChatInterface messages={messages} selectedAvatar={selectedAvatar} />
      </div>
      <TypingBox
        setMessage={addMessage}
        loading={loading}
        setLoading={setLoading}
      />

      <div className="absolute bottom-1 max-md:hidden text-slate-500 tracking-wide">
        <h1>
          jarvis.ai may contain errors. We recommend checking important
          information
        </h1>
      </div>
    </div>
  );
}
