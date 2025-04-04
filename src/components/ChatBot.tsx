// ChatBot.js
import React, { useState } from 'react';
import axios from 'axios';
import { Bot, MessageSquare, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you today?", isBot: true }]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([{ text: "Chat cleared! How can I assist you?", isBot: true }]);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, isBot: false };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await axios.post("https://api.gemini.com/v1/chat", {
        prompt: userInput,
        api_key: "YOUR_GEMINI_API_KEY",
      });

      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { text: botReply, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error: Unable to fetch response.", isBot: true }]);
      console.error("API error:", error);
    }

    setUserInput("");
  };

  return (
    <div className="fixed bottom-10 right-5 z-50">
      <button
        className="p-3 rounded-full shadow-lg transition-transform hover:scale-110 bg-gradient-to-r from-green-400 to-blue-500"
        onClick={toggleChat}
      >
        <div className="flex items-center space-x-2">
          <Bot className="text-white" size={28} />
          <span className="text-white font-bold">Talk to DigiBot</span>
        </div>
      </button>
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg p-4 w-80 border shadow-2xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <MessageSquare size={28} className="text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-700">DigiBot Assistant</h3>
            </div>
            <button className="text-red-600 hover:text-red-800" onClick={toggleChat}>
              <XCircle size={24} />
            </button>
          </div>
          <div className="h-56 overflow-y-auto bg-gray-50 p-3 rounded-md">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.isBot ? "text-blue-600" : "text-gray-800"}`}>
                {msg.isBot ? "DigiBot: " : "You: "}{msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Send
            </Button>
          </div>
          <Button
            onClick={clearChat}
            className="mt-3 w-full bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300"
          >
            Clear Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
