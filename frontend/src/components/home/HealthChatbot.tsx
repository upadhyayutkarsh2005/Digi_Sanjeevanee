import React, { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const HealthChatbot = () => {
  const [language, setLanguage] = useState('');
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setChat([
      { role: 'bot', text: lang === 'en' ? 'How can I assist you with your health today?' : 'मैं आपकी स्वास्थ्य संबंधी किस प्रकार मदद कर सकता हूँ?' },
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
      setChat((prev) => [...prev, { role: 'bot', text: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-sanjeevani-dark text-center">DigiSanjeevani Chatbot</h2>

      {!language ? (
        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={() => handleLanguageSelect('en')} className="text-lg px-6">English</Button>
          <Button onClick={() => handleLanguageSelect('hi')} className="text-lg px-6">हिन्दी</Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-inner p-4 h-[500px] overflow-y-auto mb-4 border">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 p-2 rounded-lg max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-sanjeevani-primary text-white ml-auto text-right'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p className="text-gray-500 italic">Typing...</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask your health-related question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={sendMessage} disabled={loading}>
              <SendHorizonal size={18} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthChatbot;