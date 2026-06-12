import React, { useState, useEffect } from "react";
import { Sparkles, GlassWater, Eye, Calendar, CalendarCheck2, Ticket, Map, User, Users, Clock, Flame } from "lucide-react";
import { Booking } from "../types";

export default function BookingPortal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [section, setSection] = useState<"copper-vault" | "canal-terrace">("copper-vault");
  const [vibe, setVibe] = useState<"sweet" | "smoky" | "citrus" | "bitter" | "none">("none");
  const [specialRequests, setSpecialRequests] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch existing bookings on load
  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setAllBookings(data);
      }
    } catch (err) {
      console.error("Failed to query bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingRitual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) {
      setErrorMsg("Please pour all requested elements into the scroll before sealing.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          partySize,
          date,
          time,
          section,
          vibe,
          specialRequests
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "The celestial forces rejected the reservation alignment.");
      }

      const freshBooking = await res.json();
      setSuccessBooking(freshBooking);
      fetchBookings(); // Refresh the dynamic vault list

      // Reset fields
      setName("");
      setEmail("");
      setPartySize(2);
      setDate("");
      setTime("");
      setSection("copper-vault");
      setVibe("none");
      setSpecialRequests("");
    } catch (err: any) {
      setErrorMsg(err.message || "A rift in the flow disrupted your booking ritual.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-black/60 p-6 backdrop-blur-xl relative">
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-orange-600/5 blur-[80px]" />

      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-wider font-mono text-amber-300 uppercase flex items-center gap-2">
          <CalendarCheck2 className="h-5 w-5 text-amber-400" />
          The Booking Portal
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Reserve your table chamber at Salford Quays. To witness the theatrical mixology, pre-selected vibes are infused into complementary welcome droplets.
        </p>
      </div>

      {successBooking ? (
        /* Theatrical Successful Booking Ticket */
        <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-6 relative overflow-hidden animate-fade-in">
          {/* Ticket styling accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-b border-amber-500/30" />
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-950 rounded-full border-r border-amber-500/30" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-950 rounded-full border-l border-amber-500/30" />

          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Ritual Sealed successfully
            </span>
            <h3 className="text-lg font-serif italic text-white mt-3">
              "{successBooking.potionName}"
            </h3>
            <p className="text-[11px] text-gray-400 max-w-sm mx-auto font-mono mt-1">
              Your specific taste vibe alignment has created this dynamic complementary potion, formulated awaiting your arrival.
            </p>
          </div>

          {/* Ticket details breakdown */}
          <div className="border-t border-b border-dashed border-amber-500/20 py-4 mb-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono text-gray-300">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">TRAVELLER</span>
              <span className="font-sans font-medium text-white truncate block">{successBooking.name}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">PARTY LIMIT</span>
              <span className="text-amber-300 font-bold">{successBooking.partySize} Guests</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">CYCLES DATE</span>
              <span className="text-white">{successBooking.date}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">CHOSEN HOUR</span>
              <span className="text-white">{successBooking.time}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">CHAMBER SECTION</span>
              <span className="text-amber-400/95 font-sans capitalize">
                {successBooking.section === "copper-vault" ? "Copper Vault Interior" : "Canal Waterfront Terrace"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">BOOKING REFERENCE</span>
              <span className="text-amber-400 font-bold tracking-wider">{successBooking.bookingRef}</span>
            </div>
          </div>

          {specialRequests && (
            <div className="bg-black/40 border border-white/5 rounded-xl p-3 mb-4 text-xs">
              <span className="text-[10px] font-mono text-gray-500 block uppercase mb-1">Whispered Requests</span>
              <span className="text-gray-300 font-sans italic">"{specialRequests}"</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={() => setSuccessBooking(null)}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono py-2.5 rounded-xl transition-all cursor-pointer font-semibold uppercase text-center"
            >
              Exchanging Another Table Scroll
            </button>
            <a
              href="tel:01618727396"
              className="px-4 py-2.5 bg-stone-900 border border-amber-500/20 hover:border-amber-500/50 text-amber-300 text-xs font-mono rounded-xl transition-all text-center"
            >
              Call Alchemist (0161 872 7396)
            </a>
          </div>
        </div>
      ) : (
        /* Dynamic Reservation Form */
        <form onSubmit={handleBookingRitual} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Guest Name */}
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
                Traveller Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Nicolas Flamel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-900/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40"
                />
                <User className="absolute right-3.5 top-3 h-3.5 w-3.5 text-gray-500" />
              </div>
            </div>

            {/* Guest Email */}
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
                Email Address for Scroll
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="flamel@alchemy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-900/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Party Size */}
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
                Party Limit
              </label>
              <div className="relative">
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full bg-stone-900/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/40 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num} className="bg-stone-950 text-white">
                      {num === 1 ? "1 Alchemist" : `${num} Travelers`}
                    </option>
                  ))}
                </select>
                <Users className="absolute right-3.5 top-3.5 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
                Ritual Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2026-06-12"
                  className="w-full bg-stone-900/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/40"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
                Hour cycle
              </label>
              <div className="relative">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full bg-stone-900/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/40 appearance-none"
                >
                  <option value="" className="bg-stone-950 text-gray-500">Pick time</option>
                  {["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"].map((h) => (
                    <option key={h} value={h} className="bg-stone-950 text-white">{h}</option>
                  ))}
                </select>
                <Clock className="absolute right-3.5 top-3.5 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Chamber Location Selection */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
              Chamber Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSection("copper-vault")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  section === "copper-vault"
                    ? "bg-amber-500/10 border-amber-500 text-amber-300"
                    : "bg-stone-900/40 border-white/5 hover:border-white/15 text-gray-300"
                }`}
              >
                <span className="text-xs font-mono font-bold block mb-1">🏺 Copper Vault Interior</span>
                <span className="text-[10px] text-gray-450 block leading-normal">
                  Our core cased spacecraft. Immersive laboratory lighting and visual theater.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSection("canal-terrace")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  section === "canal-terrace"
                    ? "bg-amber-500/10 border-amber-500 text-amber-300"
                    : "bg-stone-900/40 border-white/5 hover:border-white/15 text-gray-300"
                }`}
              >
                <span className="text-xs font-mono font-bold block mb-1">🌊 Canal Waterfront Terrace</span>
                <span className="text-[10px] text-gray-450 block leading-normal">
                  Overhanging cantilevered terrace offering gorgeous waves of Salford Quays.
                </span>
              </button>
            </div>
          </div>

          {/* Taste Catalyst Vibe selection */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2 font-bold">
              Flavor Essence / Soul Vibe
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {([
                { id: "smoky", icon: "💨", label: "Smoky" },
                { id: "sweet", icon: "🍭", label: "Sweet" },
                { id: "citrus", icon: "🍋", label: "Citrus" },
                { id: "bitter", icon: "🧪", label: "Bitter" },
                { id: "none", icon: "💧", label: "Neutral" }
              ]).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibe(v.id as any)}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                    vibe === v.id
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 font-semibold"
                      : "bg-zinc-950/40 border-white/5 hover:border-white/15 text-gray-400 text-[11px]"
                  }`}
                >
                  <span className="text-base block mb-0.5">{v.icon}</span>
                  <span className="text-[9px] font-mono block tracking-tight leading-none uppercase">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">
              Whispered Pleasures / Dietary requests
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. We seek gluten-free options and celebrate a birthday. Bring dry ice fountains!"
              rows={2}
              className="w-full bg-stone-900/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40 resize-none font-sans"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold uppercase tracking-wider text-xs font-mono py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Binding Reservation Catalyst..." : "Seal Booking Ritual ✨"}
          </button>
        </form>
      )}

      {/* Bookings Drawer/Vault lists (To prove real dynamic persistence!) */}
      <div className="mt-6 border-t border-white/5 pt-5">
        <h4 className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
          <Ticket className="h-4 w-4 text-amber-500/50" />
          The Salford Vault Archives ({allBookings.length})
        </h4>

        <div className="max-h-36 overflow-y-auto space-y-2 border border-white/5 rounded-xl bg-zinc-950/40 p-2 scrollbar-thin">
          {allBookings.map((b) => (
            <div key={b.id} className="flex justify-between items-center bg-stone-950/60 px-3 py-2 rounded-lg border border-white/5 text-[11px]">
              <div>
                <p className="font-semibold text-gray-200">
                  {b.name} <span className="text-gray-500 font-mono font-normal">({b.partySize} travelers)</span>
                </p>
                <p className="text-[9px] text-gray-500 font-mono">
                  {b.date} at {b.time} — <span className="text-amber-400/80">{b.section === "copper-vault" ? "Copper Vault" : "Waterfront"}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 block font-bold text-[10px]">
                  {b.bookingRef}
                </span>
                <span className="text-[9px] text-gray-400 block mt-0.5 italic max-w-[120px] truncate">
                  {b.potionName}
                </span>
              </div>
            </div>
          ))}
          {allBookings.length === 0 && (
            <p className="text-center py-6 text-xs text-gray-500 font-mono italic">
              The sacred lists are empty. Claim the first vault, traveller.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
