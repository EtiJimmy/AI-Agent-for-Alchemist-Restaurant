import { MapPin, Phone, Clock, Compass } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-black/60 p-6 md:p-8 backdrop-blur-xl">
      {/* Mystical glowing backgrounds */}
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-orange-600/10 blur-[100px]" />

      <div className="relative flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          {/* Brand/Subtitle */}
          <div className="flex items-center gap-2 mb-2">
            <Compass className="h-5 w-5 text-amber-400 animate-spin-slow" />
            <span className="text-xs font-mono tracking-widest text-amber-500/80 uppercase">
              The Theatre of Mixology — Salford Quays
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-sans tracking-tight font-black text-white leading-none mb-3">
            THE ALCHEMIST
            <span className="block text-xl md:text-2xl font-light tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent mt-1">
              MediaCityUK
            </span>
          </h1>

          {/* Sensory Intro Text */}
          <p className="text-sm text-gray-300 max-w-xl leading-relaxed font-sans mb-6">
            Hovering over the water at Salford Quays like{" "}
            <span className="text-amber-300 font-medium font-serif italic">"a gigantic golden spacecraft,"</span>{" "}
            our sanctuary features a dramatic copper-cased interior & spectacular cantilevered terrace over the Manchester Ship Canal. Walk into a darkly delicious world of molecular wonder.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-gray-400">
            <div className="flex items-center gap-2 border border-white/5 rounded-xl p-3 bg-white/5 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-gray-200 font-medium">The Bund, Salford M50 3AB</p>
                <p className="text-[10px] text-gray-500">Beside BBC, ITV & The Lowry</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border border-white/5 rounded-xl p-3 bg-white/5 backdrop-blur-md">
              <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-gray-200 font-medium">0161 872 7396</p>
                <p className="text-[10px] text-gray-500">Bookings highly encouraged</p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="w-full md:w-auto flex-shrink-0 border border-amber-500/20 bg-stone-900/60 p-5 rounded-2xl sm:flex sm:flex-col md:block">
          <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <h4 className="text-xs font-mono text-amber-300 uppercase tracking-wider font-semibold">
              Opening Elixir Cycles
            </h4>
          </div>

          <div className="space-y-2 text-xs font-mono text-gray-300">
            <div className="flex justify-between gap-6">
              <span className="text-gray-500 font-sans">Mon — Wed</span>
              <span>12pm — 11pm</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-gray-500 font-sans">Thu — Fri</span>
              <span>12pm — 1am</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-amber-400/90 font-sans">Saturday</span>
              <span className="text-amber-400/90 font-bold">10am — 1am</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-gray-500 font-sans">Sunday</span>
              <span>10am — 11pm</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>Astral Vibe Status:</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
