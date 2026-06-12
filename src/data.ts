import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "screwball",
    name: "Screwball",
    type: "cocktail",
    category: "signature",
    description: "Raspberry vodka, bubblegum, sweet vermouth, white chocolate cream foam. Nostalgic, sweet, and playful, transporting you straight to a seaside arcade.",
    price: 11.50,
    tags: ["sweet", "cream", "theatrical", "nostalgic"],
    visualEffect: "Topped with soft white chocolate foam and a cherry liqueur swirl"
  },
  {
    id: "cherry-poppins",
    name: "Cherry Poppins",
    type: "cocktail",
    category: "signature",
    description: "Raspberry gin, cherry liqueur, citrus elixir, topped with an organic cherry fog bubble. Pop the bubble to unleash a rich cherry-wood aroma.",
    price: 12.50,
    tags: ["citrus", "fruity", "theatrical", "aromatic"],
    visualEffect: "Crowned with a glowing, smoke-filled bubble ready to be popped"
  },
  {
    id: "lightbulb-bottle",
    name: "The Lightbulb Bottle",
    type: "cocktail",
    category: "signature",
    description: "Tanqueray gin, yuzu liqueur, ginger beer, lime. Served in a custom glass laboratory flask with a chilling dry ice fog.",
    price: 13.00,
    tags: ["citrus", "ginger", "theatrical", "refreshing"],
    visualEffect: "Bubbling dramatically with dense yuzu-scented mist"
  },
  {
    id: "smokey-old-fashioned",
    name: "Smokey Old Fashioned",
    type: "cocktail",
    category: "signature",
    description: "Buffalo Trace bourbon, maple syrup, Jerry Thomas bitters. Stirred, strained, and infused with cherry-wood smoke inside a glass science decanter.",
    price: 13.50,
    tags: ["smoky", "bourbon", "bitter", "rich"],
    visualEffect: "Poured from a smoking glass carafe right at your table"
  },
  {
    id: "solstice-sour",
    name: "Solstice Sour",
    type: "cocktail",
    category: "signature",
    description: "Aperol, elderflower, violet syrup, dynamic lemon solution. The liquid slowly shifts from vibrant indigo to golden amber when you stir in the elixir catalyst.",
    price: 12.00,
    tags: ["sweet", "bitter", "color-changing", "theatrical"],
    visualEffect: "Spectacular indigo-to-gold chemical color shift upon stirring"
  },
  // Food items
  {
    id: "prawn-lollypops",
    name: "Prawn Lollypops",
    type: "food",
    category: "small",
    description: "Juicy, crispy fried prawns skewered and served on glass hot stones with a sweet chilli dipping solution is charged with sensory steam.",
    price: 9.50,
    tags: ["seafood", "small-plate"],
    visualEffect: "Served sizzling over black volcanic vapor stones"
  },
  {
    id: "squid-alchemy",
    name: "Salt and Pepper Squid",
    type: "food",
    category: "small",
    description: "Lightly dusted crispy squid tossed in salted Sichuan spices, spring onions, and volcanic fire glaze.",
    price: 9.00,
    tags: ["seafood", "small-plate", "slightly-spicy"],
    visualEffect: "Presented with cracked salt sparks and a fresh lemon slice"
  },
  {
    id: "cauli-katsu",
    name: "Cauliflower Katsu Curry",
    type: "food",
    category: "main",
    description: "Crispy panko cauliflower steak, aromatic golden coconut curry sauce, served with jasmine rice and quick-pickled elixir vegetables.",
    price: 15.50,
    tags: ["vegan", "vegetarian", "main"],
    visualEffect: "Drizzled with dark sesame reduction and micro-greens"
  },
  {
    id: "fish-curry",
    name: "Salford Cod Curry",
    type: "food",
    category: "main",
    description: "Lightly spiced cod fillet poached in a rich South Indian curried broth of coconut, tamarind, and warming spices. Served with steamed basmati rice.",
    price: 17.50,
    tags: ["gluten-free", "seafood", "main"],
    visualEffect: "Topped with flash-fried curry leaves and fresh coriander"
  },
  {
    id: "alchemy-burger",
    name: "The Alchemy Burger",
    type: "food",
    category: "main",
    description: "Flame-grilled dry-aged beef patty, molten copper cheddar cheese, signature charcoal bun, smoke-infused house burger sauce, rosemary fries.",
    price: 16.50,
    tags: ["main"],
    visualEffect: "Revealed under a glass cloche of sweet woodsmoke"
  }
];

export interface FAQEntry {
  question: string;
  answer: string;
  category: string;
  triggerQuery: string;
}

export const FAQS: FAQEntry[] = [
  {
    question: "Where exactly are you located?",
    answer: "You will find our golden sanctuary at The Bund, The Quays, MediaCityUK, Salford M50 3AB. We sit grandly on the waterfront with a spectacular cantilevered terrace over the Manchester Ship Canal, neighbours with The Lowry Theatre and the BBC/ITV studios.",
    category: "Venue",
    triggerQuery: "Where exactly are you located?"
  },
  {
    question: "What are your opening hours?",
    answer: "Our mystical gates open during the following hours: Monday to Wednesday from 12pm to 11pm; Thursday and Friday from 12pm to 1am; Saturday from 10am to 1am; and Sunday from 10am to 11pm.",
    category: "Hours",
    triggerQuery: "What time are you open on Saturday?"
  },
  {
    question: "Do you have options for vegan/gluten-free guests?",
    answer: "Absolutely. We satisfy all curious palates with a generous selection of vegan, vegetarian, and gluten-free alchemy. Highly requested is our Cauliflower Katsu Curry (vegan) and our Salford Cod Curry (gluten-free). Please inform your host of any allegiances to specific dietary requirements.",
    category: "Dietary",
    triggerQuery: "Do you have vegan options?"
  },
  {
    question: "How do bookings work?",
    answer: "Bookings are highly recommended, especially for evening voyages and weekend spirits. You can reserve your table online using our interactive Alchemy Portal, select your preferred chamber (the Copper-Cased Interior or the Cantilevered Canal Terrace), or call our spellcasters directly at 0161 872 7396.",
    category: "Bookings",
    triggerQuery: "Can I book a table?"
  },
  {
    question: "What is the atmosphere like?",
    answer: "Descend into a dark, luxurious, futuristic world. Often described as 'a gigantic golden spacecraft', our venue features copper-cased detailing, mystical lighting, and a terrace with sweeping views of the canal. Every dish and libation is served with theatrical mixology—expect bubbles of fog, columns of fire, and vaporous clouds.",
    category: "Vibe",
    triggerQuery: "What's the atmosphere like?"
  }
];
