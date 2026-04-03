import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import geminiService from "../services/geminiService";
import FallbackService from "../services/fallbackService";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Suhas's AI assistant. Ask me about his experience, skills, projects, or background.", sender: "bot", timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const [apiStatus, setApiStatus] = useState("unknown");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  useEffect(() => {
    const test = async () => {
      try { const ok = await geminiService.testConnection(); setApiStatus(ok ? "working" : "error"); if (!ok) setUseGemini(false); }
      catch { setApiStatus("error"); setUseGemini(false); }
    };
    test();
  }, []);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;
    setMessages(p => [...p, { id: Date.now(), text: inputMessage, sender: "user", timestamp: new Date() }]);
    setInputMessage(""); setIsLoading(true);
    try {
      let response;
      if (useGemini && apiStatus === "working") {
        try { response = await geminiService.generateResponse(inputMessage); }
        catch { setUseGemini(false); setApiStatus("error"); response = FallbackService.generateResponse(inputMessage); }
      } else response = FallbackService.generateResponse(inputMessage);
      setMessages(p => [...p, { id: Date.now() + 1, text: response, sender: "bot", timestamp: new Date() }]);
    } catch {
      setMessages(p => [...p, { id: Date.now() + 1, text: "Technical difficulties. Try asking about Suhas's skills, experience, or projects!", sender: "bot", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  const quickQs = ["What are Suhas's technical skills?", "Tell me about his work experience", "What projects has he worked on?"];

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <button onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
          style={{ background: 'linear-gradient(135deg, var(--gold), #c27840)', boxShadow: '0 4px 20px rgba(212,168,83,0.2)' }}>
          {isOpen ? <X size={18} style={{ color: 'var(--bg-primary)' }} /> : <MessageCircle size={18} style={{ color: 'var(--bg-primary)' }} />}
          {apiStatus === "error" && !isOpen && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center">
              <AlertCircle size={8} className="text-white" />
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 left-6 w-[360px] h-[480px] glass-card z-50 flex flex-col overflow-hidden"
          style={{ background: `color-mix(in srgb, var(--bg-primary) 95%, transparent)` }}>
          <div className="p-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, var(--gold), #c27840)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Bot size={14} className="text-white" /></div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--bg-primary)' }}>AI Assistant</h3>
                <p className="text-[10px]" style={{ color: 'rgba(0,0,0,0.5)' }}>{apiStatus === "error" ? "Offline mode" : "Ask about Suhas"}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'rgba(0,0,0,0.4)' }}><X size={16} /></button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3" style={{ background: 'var(--bg-secondary)' }}>
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-2 max-w-[80%] ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: m.sender === "user" ? 'linear-gradient(135deg, #5b8def, #4ecdc4)' : 'linear-gradient(135deg, var(--gold), #c27840)' }}>
                    {m.sender === "user" ? <User size={10} className="text-white" /> : <Bot size={10} style={{ color: 'var(--bg-primary)' }} />}
                  </div>
                  <div className="rounded-xl px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: m.sender === "user" ? 'linear-gradient(135deg, rgba(91,141,239,0.2), rgba(78,205,196,0.2))' : 'var(--bg-card)',
                      border: `1px solid ${m.sender === "user" ? 'rgba(91,141,239,0.2)' : 'var(--bg-card-border)'}`,
                      color: 'var(--text-secondary)',
                    }}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--gold), #c27840)' }}>
                    <Bot size={10} style={{ color: 'var(--bg-primary)' }} />
                  </div>
                  <div className="rounded-xl px-3 py-2" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)' }}>
                    <div className="flex space-x-1">
                      {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--gold)', animationDelay: `${i*0.1}s` }} />)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="p-3" style={{ borderTop: '1px solid var(--bg-card-border)' }}>
              <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Quick questions</p>
              <div className="space-y-1">
                {quickQs.map((q, i) => (
                  <button key={i} onClick={() => { setInputMessage(q); setTimeout(handleSend, 100); }}
                    className="w-full text-left text-[11px] rounded-lg px-3 py-2 transition-colors"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-tertiary)' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3" style={{ borderTop: '1px solid var(--bg-card-border)' }}>
            <div className="flex items-center gap-2">
              <input ref={inputRef} type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about skills, projects..."
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-primary)' }}
                disabled={isLoading} />
              <button onClick={handleSend} disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
                style={{ background: 'linear-gradient(135deg, var(--gold), #c27840)', color: 'var(--bg-primary)' }}>
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
