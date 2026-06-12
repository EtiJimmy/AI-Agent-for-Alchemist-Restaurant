/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import AlchemyChat from "./components/AlchemyChat";
import MenuExplorer from "./components/MenuExplorer";
import BookingPortal from "./components/BookingPortal";
import FaqSection from "./components/FaqSection";
import { Sparkles, GlassWater, BookOpen, Scroll } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"menu" | "booking" | "faq">("menu");

  return (
    <div className="min-h-screen bg-stone-950 text-gray-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Dynamic Background Stars/Mist simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      {/* Outer Wrapper container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 md:gap-8 relative z-10">
        
        {/* Elegant Top Header representing Salford Quays Venue */}
        <Header />

        {/* Dynamic Bento Workspace Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive AI Concierge Chat (Spans 5 of 12 columns) */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                Live Alchemist Telepathy
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                Responds immediately
              </span>
            </div>
            
            <AlchemyChat />

            {/* Aesthetic quote in footer of chat */}
            <div className="rounded-2xl border border-white/5 bg-stone-900/20 p-4 text-center">
              <p className="text-[11px] text-amber-400/80 font-serif italic">
                "For those who wish to step beyond the plain of physical form and taste the volatile spirits of Salford Quays."
              </p>
            </div>
          </section>

          {/* Right Column: Interactive Tabbed Chambers (Spans 7 of 12 columns) */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Thematic Tabs Controller */}
            <div className="flex bg-stone-900/60 p-1 md:p-1.5 rounded-2xl border border-white/5 items-center justify-between">
              
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "menu"
                    ? "bg-gradient-to-r from-amber-500/90 to-amber-600 text-black font-extrabold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <GlassWater className="h-4 w-4" />
                <span className="hidden sm:inline">Elixirs & Feasts</span>
                <span className="sm:hidden">Menu</span>
              </button>

              <button
                onClick={() => setActiveTab("booking")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "booking"
                    ? "bg-gradient-to-r from-amber-500/90 to-amber-600 text-black font-extrabold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Scroll className="h-4 w-4" />
                <span className="hidden sm:inline">Seal Reservation</span>
                <span className="sm:hidden">Booking</span>
              </button>

              <button
                onClick={() => setActiveTab("faq")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "faq"
                    ? "bg-gradient-to-r from-amber-500/90 to-amber-600 text-black font-extrabold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Mystic Codex</span>
                <span className="sm:hidden">Codex</span>
              </button>

            </div>

            {/* Dynamic Chamber Content Render */}
            <div className="transition-all duration-300">
              {activeTab === "menu" && <MenuExplorer />}
              {activeTab === "booking" && <BookingPortal />}
              {activeTab === "faq" && <FaqSection />}
            </div>

          </section>

        </div>

      </main>

      {/* Small Ambient Footer */}
      <footer className="w-full border-t border-white/5 py-4 mt-10 bg-black/40 text-center relative z-10">
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          The Alchemist MediaCityUK — © 2026 Alchemy Ritual Services
        </p>
      </footer>

    </div>
  );
}
