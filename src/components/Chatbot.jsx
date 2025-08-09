// Update your Chatbot.js to import the smart service instead

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import geminiService from "../services/geminiService";
import FallbackService from "../services/fallbackService"; // Updated import

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm Suhas's AI assistant. I can answer questions about his experience, skills, projects, and background. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const [apiStatus, setApiStatus] = useState("unknown");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Test API connection when component mounts
  useEffect(() => {
    const testApi = async () => {
      try {
        const isWorking = await geminiService.testConnection();
        setApiStatus(isWorking ? "working" : "error");
        if (!isWorking) {
          setUseGemini(false);
        }
      } catch (error) {
        console.error("API test failed:", error);
        setApiStatus("error");
        setUseGemini(false);
      }
    };

    testApi();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      let response;

      if (useGemini && apiStatus === "working") {
        try {
          response = await geminiService.generateResponse(inputMessage);
          setApiStatus("working");
        } catch (error) {
          console.error("Gemini API failed, switching to smart fallback:", error);
          setUseGemini(false);
          setApiStatus("error");
          response = FallbackService.generateResponse(inputMessage); // Using smart fallback
        }
      } else {
        response = FallbackService.generateResponse(inputMessage); // Using smart fallback
      }

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("All services failed:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing technical difficulties. However, I can still help you with basic information about Suhas. Please try asking about his skills, experience, or projects!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = async (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const quickQuestions = [
    "What are Suhas's technical skills?",
    "Tell me about his work experience",
    "What projects has he worked on?",
    "What is his educational background?",
    "What achievements does he have?",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center
             hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/40
             overflow-hidden"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-50 group-hover:opacity-75 transition-opacity"></div>

          {isOpen ? (
            <X className="text-white relative z-10" size={28} />
          ) : (
            <MessageCircle
              className="text-white relative z-10 animate-bounce"
              size={28}
            />
          )}

          {/* API Status indicator */}
          {apiStatus === "error" && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full">
              <AlertCircle
                size={12}
                className="text-white absolute inset-0.5"
              />
            </div>
          )}

          {!isOpen && apiStatus === "working" && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
              <Sparkles size={12} className="text-white absolute inset-0.5" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl border border-purple-500/30 backdrop-blur-sm z-50 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Suhas's Smart AI Assistant
                  </h3>
                  <p className="text-purple-100 text-sm flex items-center">
                    Ask me anything about Suhas!
                    {apiStatus === "error" && (
                      <span className="ml-2 text-yellow-200 text-xs">
                        (Smart mode)
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                        : "bg-gray-700/80 text-gray-100"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-700/80 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-gray-700/50">
              <p className="text-gray-400 text-xs mb-3">Quick questions:</p>
              <div className="space-y-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left text-sm text-purple-300 hover:text-purple-200 bg-purple-800/20 hover:bg-purple-800/40 rounded-lg px-3 py-2 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Suhas's experience, skills, projects..."
                className="flex-1 bg-gray-800/50 text-white placeholder-gray-400 rounded-full px-4 py-2 border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;