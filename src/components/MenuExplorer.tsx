import { useState } from "react";
import { MENU_ITEMS } from "../data";
import { Sparkles, Wine, Flame, Eye, Leaf, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MenuExplorer() {
  const [activeCategory, setActiveCategory] = useState<"all" | "cocktail" | "food">("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Derive unique tags for filtering
  const allTags = Array.from(
    new Set(MENU_ITEMS.flatMap((item) => item.tags))
  );

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.type === activeCategory;
    const matchesTag = !selectedTag || item.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-black/60 p-6 backdrop-blur-xl relative">
      {/* Background radial highlight */}
      <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-yellow-500/5 blur-[80px]" />

      {/* Header section with theme */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-wider font-mono text-amber-300 uppercase flex items-center gap-2">
            <Wine className="h-5 w-5 text-amber-400" />
            Alchemical Formulations
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Explore our theatrical cocktails & international sensory dishes.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex bg-stone-900/60 p-1 rounded-xl border border-white/5 self-start">
          {(["all", "cocktail", "food"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedTag(null); // Reset tag filters
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-amber-500 text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "Whole Inventory" : cat === "cocktail" ? "Elixirs" : "Feasts"}
            </button>
          ))}
        </div>
      </div>

      {/* Tag filter pills */}
      <div className="mb-6 flex flex-wrap gap-1.5 items-center border-t border-b border-white/5 py-3">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mr-2">
          Filter Catalyst:
        </span>
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-2.5 py-1 text-[11px] font-sans rounded-lg transition-all border cursor-pointer ${
            !selectedTag
              ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-medium"
              : "border-white/5 bg-zinc-900/40 text-gray-400 hover:text-gray-200"
          }`}
        >
          All Flavours
        </button>
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(isSelected ? null : tag)}
              className={`px-2.5 py-1 text-[11px] font-sans rounded-lg transition-all capitalize border cursor-pointer ${
                isSelected
                  ? "bg-amber-500/20 border-amber-400/50 text-amber-300 font-semibold"
                  : "border-white/5 bg-zinc-900/20 text-gray-400 hover:text-gray-200"
              }`}
            >
              {tag.replace("-", " ")}
            </button>
          );
        })}
      </div>

      {/* Menu Item Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isVegan = item.tags.includes("vegan");
            const isGlutenFree = item.tags.includes("gluten-free");
            const isTheatrical = item.tags.includes("theatrical");
            const isSmoky = item.tags.includes("smoky");

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                className="group relative border border-white/5 hover:border-amber-500/20 rounded-2xl p-4 bg-zinc-950/40 hover:bg-stone-900/30 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Item header */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/15">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {isVegan && (
                      <span className="text-[9px] font-mono font-bold bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 rounded px-1.5 uppercase">
                        Vegan 🌱
                      </span>
                    )}
                    {isGlutenFree && (
                      <span className="text-[9px] font-mono font-bold bg-teal-950/40 border border-teal-500/20 text-teal-300 rounded px-1.5 uppercase">
                        Gluten Free
                      </span>
                    )}
                    {isTheatrical && (
                      <span className="text-[9px] font-mono font-bold bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 rounded px-1.5 uppercase flex items-center gap-0.5">
                        <Sparkles className="h-2 w-2 text-indigo-400" /> Theatrical
                      </span>
                    )}
                    {isSmoky && (
                      <span className="text-[9px] font-mono font-bold bg-orange-950/40 border border-orange-500/20 text-orange-300 rounded px-1.5 uppercase flex items-center gap-0.5">
                        <Flame className="h-2.5 w-2.5 text-orange-400" /> Smoky
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Chemical Visual Presentation Details */}
                {item.visualEffect && (
                  <div className="text-[10px] font-sans italic bg-stone-900/50 border border-white/5 rounded-lg p-2 flex items-center gap-1.5 text-gray-300">
                    <Eye className="h-3 w-3 text-amber-400 flex-shrink-0" />
                    <span>Presentation: {item.visualEffect}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="col-span-2 text-center py-12 border border-dashed border-white/10 rounded-2xl">
            <ShieldAlert className="h-8 w-8 text-amber-400/50 mx-auto mb-2" />
            <p className="text-xs font-mono text-gray-500">
              No matching elements have emerged from the cauldron matching this filter catalyst.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
