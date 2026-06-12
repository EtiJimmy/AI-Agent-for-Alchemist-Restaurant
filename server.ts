import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI client lazy-loaded and safely guarded
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to start the alchemy concierge.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-memory persistent database for bookings
interface BookingStore {
  id: string;
  name: string;
  email: string;
  partySize: number;
  date: string;
  time: string;
  section: "copper-vault" | "canal-terrace";
  vibe: string;
  specialRequests?: string;
  bookingRef: string;
  potionName: string;
}

const bookingsDb: BookingStore[] = [
  // Seed with one theatrical booking
  {
    id: "1",
    name: "Aetheric Traveler",
    email: "traveler@salfordquays.com",
    partySize: 2,
    date: "2026-06-25",
    time: "19:30",
    section: "canal-terrace",
    vibe: "smoky",
    specialRequests: "Anniversary surprise",
    bookingRef: "ALCH-7798",
    potionName: "Resonant Vaporous Smoke-wood Potion"
  }
];

// System prompt as requested by the user
const ALCHEMIST_SYSTEM_PROMPT = `You are an AI concierge representing The Alchemist MediaCityUK, a futuristic cocktail bar and restaurant on Salford Quays. Your goal is to provide enchanting, helpful, and accurate information about the venue, menu, signature cocktails, and dining experience. 

Personality: 
— Theatrical, mysterious, and playful — leaning into the brand's 'alchemy' identity 
— Knowledgeable and confident about mixology and food 
— Warm and welcoming, never stuffy 
— Enjoys using evocative, sensory language (e.g., 'a swirl of smoke and citrus,' 'darkly delicious') 

Core Knowledge: 
1. About the Venue: 
— Located on The Bund at MediaCityUK, Salford Quays 
— Copper-cased interior and cantilevered terrace over the Manchester Ship Canal 
— Described as 'a gigantic golden spacecraft' 
— Neighbours: The Lowry Theatre, BBC and ITV studios 

2. Signature Cocktails: 
— Screwball: raspberry vodka, bubblegum, white chocolate cream foam (nostalgic, playful) 
— Cherry Poppins: raspberry gin topped with a cherry fog bubble that you pop to release flavour 
— Cocktails are theatrical and presentation-driven 

3. Food Menu: 
— All-day menu with international-inspired dishes 
— Small plates and mains: prawn lollypops, fish curry, salt and pepper squid, Cauliflower Katsu Curry (vegan-friendly) 
— Vegan, vegetarian, and gluten-free options available 

4. Opening Hours: 
— Mon–Wed: 12pm–11pm 
— Thu–Fri: 12pm–1am 
— Sat: 10am–1am 
— Sun: 10am–11pm 

5. Contact & Booking: 
— Address: The Bund, The Quays, MediaCityUK, Salford M50 3AB 
— Phone: 0161 872 7396 
— Bookings recommended, especially for evenings and weekends. Guests can book directly on our website or interactive portal.

Customer Interaction Guidelines: 
— Greet guests with a touch of theatrical warmth (e.g., 'Welcome, traveller...') 
— Recommend cocktails based on flavour preferences (sweet, smoky, citrus, bitter) 
— Suggest food pairings to complement drink choices 
— Highlight dietary options proactively for guests with restrictions 
— Mention the venue's atmosphere and location when relevant 
— For bookings, direct guests to call or use the booking system in this app! 
— Never output markdown or formatting errors. Keep text flows beautifully aligned and mysterious.

Always encourage guests to visit, experience the theatrical mixology, and indulge in the Alchemist's darkly delicious world. Keep your replies concise, elegant, and atmospheric, structured with a paragraph or two of sparkling conversation rather than walls of text. Be sensory and magical!`;

// API route 1: AI Concierge chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request. Message list required." });
      return;
    }

    const ai = getGenAI();

    // Map historical inputs into Gemini expected Format
    const contents = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: ALCHEMIST_SYSTEM_PROMPT,
        temperature: 0.85,
      },
    });

    const responseText = result.text || "Alas, the cosmic vapor didn't crystallize. Ask again, traveler...";
    res.json({ text: responseText });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "The alchemical reaction failed on the server.",
      details: error.message || String(error),
    });
  }
});

// API route 2: Create a booking ritual
app.post("/api/bookings", (req, res) => {
  try {
    const { name, email, partySize, date, time, section, vibe, specialRequests } = req.body;

    if (!name || !email || !partySize || !date || !time) {
      res.status(400).json({ error: "Crucial ingredients are missing from your booking scroll." });
      return;
    }

    // Generate a theatrical booking reference and customized potion name
    const randRef = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `ALCH-${randRef}`;

    const adjectives = ["Resonant", "Luminous", "Infinitum", "Vaporous", "Solar", "Oscillating", "Prismatic"];
    const elements = {
      smoky: "Wood smoke Catalyst",
      sweet: "Nectar Bubblegum Elixir",
      citrus: "Yuzu Acid Crystallization",
      bitter: "Wormwood Tonic Spirit",
      none: "Chamber Brew Solution"
    };

    const selectedAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const chosenElement = elements[vibe as keyof typeof elements] || elements.none;
    const potionName = `${selectedAdjective} ${chosenElement}`;

    const newBooking: BookingStore = {
      id: String(bookingsDb.length + 1),
      name,
      email,
      partySize: Number(partySize),
      date,
      time,
      section,
      vibe,
      specialRequests,
      bookingRef,
      potionName,
    };

    bookingsDb.push(newBooking);
    res.status(201).json(newBooking);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to seal your booking in our archives.", details: error.message });
  }
});

// API route 3: List bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookingsDb);
});

// Implement Vite server integration for full-stack build and serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Alchemist server running upon http://localhost:${PORT}`);
  });
}

startServer();
