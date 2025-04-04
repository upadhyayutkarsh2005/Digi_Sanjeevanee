import React, { useState } from 'react';
import { SendHorizonal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import ChatbotIcon from '@/asset/chatbot_6667589.svg'; // Adjust the path if needed

const FloatingHealthChatbot = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('');
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setChat([
      {
        role: 'bot',
        text:
          lang === 'en'
            ? 'How can I assist you with your health today?'
            : 'मैं आपकी स्वास्थ्य संबंधी किस प्रकार मदद कर सकता हूँ?',
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setChat([...chat, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/chatbot/', {
        message: input,
        language,
      });

      const reply = response.data.response;
      setChat((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 h-[500px] bg-white shadow-2xl rounded-xl border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-sanjeevani-primary text-white rounded-t-xl">
            <h3 className="text-lg font-semibold">Health Assistant</h3>
            <X className="cursor-pointer" onClick={toggleChat} />
          </div>

          {/* Chat content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {!language ? (
              <div className="text-center space-y-3">
                <p className="text-gray-700">Choose your language</p>
                <Button onClick={() => handleLanguageSelect('en')} className="w-full">English</Button>
                <Button onClick={() => handleLanguageSelect('hi')} className="w-full">हिन्दी</Button>
              </div>
            ) : (
              <>
                {chat.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-sanjeevani-primary text-white ml-auto'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && <p className="text-gray-400 italic">Typing...</p>}
              </>
            )}
          </div>

          {/* Input */}
          {language && (
            <div className="p-2 border-t flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={sendMessage} disabled={loading}>
                <SendHorizonal size={18} />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white p-4 rounded-full shadow-xl flex items-center justify-center"
        >
          <img src={ChatbotIcon} alt="Chatbot" className="w-12 h-12" />
        </button>
      )}
    </div>
  );
};

export default FloatingHealthChatbot;