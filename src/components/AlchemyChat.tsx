import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Brain, Flame, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

// Quick-tap buttons that correspond directly to queries we handle
const QUICK_CATALYSTS = [
  { label: "Sweet Cocktails", query: "What's a good cocktail for someone who likes sweet drinks?" },
  { label: "Vegan Options", query: "Do you have vegan options?" },
  { label: "Saturday Hours", query: "What time are you open on Saturday?" },
  { label: "Atmosphere", query: "Tell me about the atmosphere and look of your venue is Salford Quays!" },
  { label: "Book a Table", query: "How can I book a table for 4 guests this coming Saturday evening?" }
];

export default function AlchemyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-1",
      role: "model",
      text: "Welcome, traveller... 🌟 I am your Alchemist Concierge, speaking from the gaseous center of our Salford Quays sanctuary. Whether you seek a swirl of nostalgic bubblegum bubble smoke, a sizzling skewer of Prawn Lollypops, or to seal your weekend table bookings in our archives—reveal your desires, and we shall formulate the answer.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBrewing, setIsBrewing] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBrewing]);

  const sendToCauldron = async (text: string) => {
    if (!text.trim() || isBrewing) return;

    setErrorText(null);
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsBrewing(true);

    try {
      // Package full conversation history for the stateless backend API (Express endpoint)
      // Map ChatMessage format to Gemini's user/model parts
      const activeHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: activeHistory })
      });

      if (!res.ok) {
        throw new Error("The bubbling ingredients boiled over, corrupting the connection spell.");
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "An error corrupted the alchemical translation wave.");
    } finally {
      setIsBrewing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToCauldron(inputMessage);
  };

  return (
    <div className="flex flex-col h-[580px] rounded-3xl border border-amber-500/20 bg-black/60 overflow-hidden relative backdrop-blur-xl">
      {/* Background Mist glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="z-10 flex items-center justify-between border-b border-white/5 bg-stone-900/40 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/30 rounded-full animate-ping" />
            <div className="h-3 w-3 bg-amber-400 rounded-full relative" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider font-mono text-amber-300 uppercase flex items-center gap-1.5">
              The Mystical Cauldron <Brain className="h-4 w-4 text-orange-400" />
            </h3>
            <p className="text-[10px] text-gray-400">Powered by server-side Gemini 3.5 AI</p>
          </div>
        </div>

        <button 
          onClick={() => {
            if (window.confirm("Do you wish to purge the current memories of this session?")) {
              setMessages([
                {
                  id: "intro-reset",
                  role: "model",
                  text: "Memory cleansed. State your intent, traveller... 🌟 What magical revelations can I procure for your feast today?",
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]);
            }
          }}
          className="text-[10px] font-mono text-gray-500 hover:text-amber-400 transition-colors border border-white/5 hover:border-amber-500/30 rounded-lg px-2 py-1 bg-white/5"
        >
          Cleanse Memory
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 relative scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              {/* Message box */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white font-sans rounded-tr-sm shadow-md"
                    : "bg-stone-900/80 border border-white/5 text-gray-200 font-sans rounded-tl-sm shadow-lg"
                }`}
              >
                {msg.text}
              </div>
              
              {/* Metadata */}
              <span className="text-[9px] font-mono mt-1 text-gray-500 flex items-center gap-1 px-1">
                {msg.role === "model" ? "CONCIERGE" : "TRAVELLER"} • {msg.timestamp}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isBrewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 bg-stone-900/30 border border-amber-500/10 p-4 rounded-2xl max-w-[50%]"
          >
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-xs font-mono text-amber-500/80 animate-pulse uppercase tracking-wider flex items-center gap-1">
              Brewing elixir... <Flame className="h-3 w-3 text-orange-500 inline animate-[spin_3s_linear_infinite]" />
            </span>
          </motion.div>
        )}

        {errorText && (
          <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-300">
            <span className="font-bold block mb-1">Alchemy Distortion:</span>
            {errorText}
            <button 
              onClick={() => sendToCauldron(messages[messages.length - 1]?.text || "Hello")}
              className="mt-2 text-[10px] font-mono uppercase bg-red-900/40 hover:bg-red-800/60 transition-all text-white px-2.5 py-1 rounded border border-red-500/30"
            >
              Re-Brew Reaction
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Runic Catalyst Tags */}
      <div className="px-5 py-3 border-t border-white/5 bg-stone-900/20 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none scroll-smooth">
        <HelpCircle className="h-4 w-4 text-amber-500/40 flex-shrink-0 self-center mr-1" />
        {QUICK_CATALYSTS.map((cat, i) => (
          <button
            key={i}
            onClick={() => sendToCauldron(cat.query)}
            disabled={isBrewing}
            className="text-[11px] font-sans border border-amber-500/15 hover:border-amber-400/40 bg-zinc-950/60 hover:bg-amber-950/30 text-amber-300/85 hover:text-amber-300 rounded-full px-3 py-1 transition-all flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-stone-950/80 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Whisper your inquiry to the Alchemist..."
          disabled={isBrewing}
          className="flex-1 bg-stone-900/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40 disabled:opacity-50 font-sans"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isBrewing}
          className="bg-amber-500 hover:bg-amber-400 text-black p-3 rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-amber-500 cursor-pointer flex items-center justify-center flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
