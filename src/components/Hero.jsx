import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  const handleGetStarted = () => {
    user ? navigate("/daily-discipline") : navigate("/login");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("/api/chat", { messages: newMessages });
      setMessages([...newMessages, response.data.message]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F0E6D2] from-[#F0E6D2] to-[#D2B48C] bg-gradient-to-b min-h-screen py-10 flex flex-col items-center justify-center text-[#333333]">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          "Master Yourself. Elevate Your Mind."
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mb-8 italic"
        >
          "Embrace Brahmacharya – Discipline, Clarity, and Inner Strength."
        </motion.p>
        <motion.button
          onClick={handleGetStarted}
          className="bg-[#8B5E3C] text-[#F5F5DC] py-3 px-6 rounded-full font-semibold hover:bg-[#A67C52] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Your Journey
        </motion.button>
      </div>

      {/* Chatbot Button */}
      <button
        className="fixed bottom-5 right-5 bg-[#8B5E3C] text-[#F5F5DC] p-4 rounded-full shadow-lg hover:bg-[#A67C52] transition-all"
        onClick={() => setChatOpen(!chatOpen)}
      >
        💬
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-20 right-5 bg-[#F0E6D2] border border-[#C0A080] rounded-md shadow-lg w-80 max-h-[400px] flex flex-col overflow-hidden">
          <div className="p-3 border-b border-[#C0A080]">
            <h3 className="text-lg font-semibold text-[#333333]">Chat with Wisdom</h3>
          </div>
          <div className="p-3 overflow-y-auto flex-grow flex flex-col">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md mb-2 max-w-[80%] ${msg.role === "user" ? "bg-[#E8E8D4] text-[#333333] self-end" : "bg-[#C0A080] text-[#F5F5DC] self-start"}`}>
                {msg.content}
              </div>
            ))}
            {loading && <p className="text-center text-sm text-gray-500">Thinking...</p>}
          </div>
          <input type="text" className="w-full p-2 border border-[#C0A080] rounded-md" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." />
          <button onClick={sendMessage} className="bg-[#8B5E3C] text-[#F5F5DC] py-2 px-4 rounded-md">Send</button>
        </div>
      )}
    </div>
  );
};

export default Hero;
