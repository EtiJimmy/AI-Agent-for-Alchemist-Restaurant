export interface MenuItem {
  id: string;
  name: string;
  type: "cocktail" | "food";
  category: "signature" | "small" | "main" | "dessert";
  description: string;
  price: number;
  tags: string[]; // e.g. "vegan", "gluten-free", "sweet", "smoky", "theatrical"
  visualEffect?: string; // a descriptive cue
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  partySize: number;
  date: string;
  time: string;
  section: "copper-vault" | "canal-terrace";
  vibe: "sweet" | "smoky" | "citrus" | "bitter" | "none";
  specialRequests?: string;
  bookingRef: string;
  potionName: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
