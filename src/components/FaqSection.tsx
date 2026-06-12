import { FAQS } from "../data";
import { HelpCircle, ChevronRight, HelpCircle as HelpIcon, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-black/60 p-6 backdrop-blur-xl relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-32 w-32 rounded-full bg-amber-500/5 blur-[90px]" />

      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-wider font-mono text-amber-300 uppercase flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-400" />
          The Mystic Codex (FAQ)
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Unveil ancestral scroll secrets regarding our Salford Quays spacecraft, dietary solutions, and timings.
        </p>
      </div>

      <div className="space-y-2.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-white/5 rounded-xl bg-zinc-950/40 p-1 hover:border-amber-500/20 transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between text-left px-3.5 py-3 cursor-pointer text-xs font-semibold text-gray-200 hover:text-amber-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono text-amber-500/70 border border-amber-500/15 px-1.5 py-0.5 rounded leading-none bg-amber-500/5">
                    {faq.category}
                  </span>
                  <span className="font-sans text-[12px]">{faq.question}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-90 text-amber-400" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 pt-1 animate-fade-in text-xs font-sans text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                  <p>{faq.answer}</p>
                  
                  {/* Action prompt */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 border-t border-white/5 pt-2.5">
                    <span>Ask this to the cauldron AI concierge to explore further!</span>
                    <span className="text-amber-400 font-mono flex items-center gap-0.5">
                      Scroll to cauldron <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
