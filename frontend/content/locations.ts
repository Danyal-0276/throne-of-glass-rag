import type { Location } from "./types";

export const locations: Location[] = [
  {
    slug: "rifthold",
    name: "Rifthold",
    region: "Adarlan · Erilea",
    image: "/images/locations/rifthold.png",
    blurb:
      "Capital of Adarlan, home of the Glass Castle, where Book 1's competition unfolds and empires wear perfume over blood.",
    aesthetics: ["river fog", "glass spires", "crowded docks", "court intrigue"],
    askPrompt: "What is Rifthold?",
    rulingPower: "Adarlan's crown (Havilliard line under Valg shadow)",
    climate: "Temperate river city: damp streets, cold winters, smog over wealth.",
    significance:
      "Stage for the Champion's competition, Assassin's Keep politics, and the heart of Adarlan's empire.",
    mood: "shadow",
    accent: "#64748b",
  },
  {
    slug: "glass-castle",
    name: "The Glass Castle",
    region: "Rifthold · Adarlan",
    image: "/images/locations/glass-castle.png",
    blurb:
      "The crystalline seat of Adarlan's throne: beauty designed to intimidate, corridors that remember every secret.",
    aesthetics: ["crystal towers", "cold light", "iron beneath glitter"],
    askPrompt: "What is the Glass Castle?",
    rulingPower: "King of Adarlan / later contested crown",
    climate: "Indoor chill and glittering brightness regardless of season.",
    significance:
      "Throne, prison, and arena: the glass walls frame Dorian's youth and Celaena's deadly games.",
    mood: "shadow",
    accent: "#94a3b8",
  },
  {
    slug: "terrasen",
    name: "Terrasen / Orynth",
    region: "Northern Erilea",
    image: "/images/locations/terrasen.png",
    blurb:
      "Aelin's homeland and its snowbound capital, ringed by the Staghorn Mountains and stubborn green hope.",
    aesthetics: ["pine snow", "stag banners", "mountain light"],
    askPrompt: "What is Terrasen?",
    rulingPower: "House Galathynius (restored court)",
    climate: "Cold winters, deep forests, mountain air sharp enough to wake the dead.",
    significance:
      "The kingdom Adarlan tried to erase, and the home Aelin fights the continent to reclaim.",
    mood: "dawn",
    accent: "#9db4c8",
  },
  {
    slug: "endovier",
    name: "Endovier",
    region: "Adarlan's labor camps",
    image: "/images/locations/endovier.png",
    blurb:
      "The brutal salt-mine camp where Celaena's story begins after sentencing. Salt, scars, and survival.",
    aesthetics: ["white flats", "iron chains", "bleak sky"],
    askPrompt: "What is Endovier?",
    rulingPower: "Adarlan's prison system",
    climate: "Harsh, exposed, and merciless in every season.",
    significance:
      "Origin of Celaena's captive years and the first measure of how much she can endure.",
    mood: "void",
    accent: "#a8a29e",
  },
  {
    slug: "doranelle",
    name: "Doranelle",
    region: "Fae lands across the sea",
    image: "/images/locations/doranelle.png",
    blurb:
      "Militarized Fae capital ruled by Maeve: moonlight beauty with an army behind every courtesy.",
    aesthetics: ["pale stone", "moon rivers", "blood-oath courts"],
    askPrompt: "What is Doranelle?",
    rulingPower: "Queen Maeve",
    climate: "Mild coasts and mountain hinterlands, lit more by magic than weather.",
    significance:
      "Home of the Cadre, Maeve's long game, and the Fae politics that shape Rowan's past.",
    mood: "shadow",
    accent: "#818cf8",
  },
  {
    slug: "morath",
    name: "Morath",
    region: "Southern Adarlan / Valg stronghold",
    image: "/images/locations/morath.png",
    blurb:
      "Perrington and Erawan's black-mountain fortress: laboratories, ilken, and a darkness that invents new kinds of war.",
    aesthetics: ["obsidian peaks", "green mist", "nightmare forges"],
    askPrompt: "What is Morath?",
    rulingPower: "Duke Perrington / Erawan",
    climate: "Ash, cold stone, and air that feels wrong in the lungs.",
    significance:
      "Engine of Valg conquest and the southern horror the free courts must eventually face.",
    mood: "void",
    accent: "#14532d",
  },
  {
    slug: "wendlyn",
    name: "Wendlyn / Varese",
    region: "Fae homeland across the sea",
    image: "/images/locations/wendlyn.png",
    blurb:
      "Ashryver lands of green cliffs and older magic, where Aelin begins to remember who she is.",
    aesthetics: ["sea cliffs", "emerald courts", "training grounds"],
    askPrompt: "What is Wendlyn?",
    rulingPower: "House Ashryver",
    climate: "Lush temperate coasts with soft rains and deep forests.",
    significance:
      "Setting for Heir of Fire's awakening: Rowan, Fae form, and the road back to queenhood.",
    mood: "dawn",
    accent: "#34d399",
  },
  {
    slug: "eyllwe",
    name: "Eyllwe",
    region: "Southern Erilea",
    image: "/images/locations/eyllwe.png",
    blurb:
      "Nehemia's homeland, known for resistance, scholarship, and a culture Adarlan tried to crush.",
    aesthetics: ["river light", "warm dusk", "resistance banners"],
    askPrompt: "What is Eyllwe?",
    rulingPower: "Eyllwe's royal line (under Adarlan pressure)",
    climate: "Warm rivers, wetlands, and long golden evenings.",
    significance:
      "Heart of Nehemia's courage and a symbol of what empire costs the conquered.",
    mood: "dawn",
    accent: "#f59e0b",
  },
  {
    slug: "antica",
    name: "Antica / Torre Cesme",
    region: "Southern Continent",
    image: "/images/locations/antica.png",
    blurb:
      "The southern capital and its healer's tower, where light is studied as carefully as war.",
    aesthetics: ["white tower", "terracotta roofs", "golden courtyards"],
    askPrompt: "What is Antica?",
    rulingPower: "Khaganate courts · Torre Cesme healers",
    climate: "Warm sun, dry winds, nights cooled by desert breath.",
    significance:
      "Home of Yrene's training and the alliance that brings rukhin and healers into the war.",
    mood: "dawn",
    accent: "#e8a05c",
  },
  {
    slug: "skulls-bay",
    name: "Skull's Bay",
    region: "Pirate isles",
    image: "/images/locations/skulls-bay.png",
    blurb:
      "Pirate stronghold of Rolfe's fleet: salt, black sails, and bargains sealed in blood or gold.",
    aesthetics: ["ship masts", "black flags", "salt spray"],
    askPrompt: "What is Skull's Bay?",
    rulingPower: "Pirate Lord Rolfe (and whoever outbids him)",
    climate: "Tropical coasts, storms that arrive without manners.",
    significance:
      "Key port in Assassin's Blade and later sea politics tying pirates to larger wars.",
    mood: "shadow",
    accent: "#0e7490",
  },
  {
    slug: "oakwald",
    name: "Oakwald Forest",
    region: "Terrasen borderlands",
    image: "/images/locations/oakwald.png",
    blurb:
      "Ancient woodland that remembers older names. Paths here do not always lead where maps insist.",
    aesthetics: ["deep oak", "moss light", "hidden trails"],
    askPrompt: "What is Oakwald Forest?",
    rulingPower: "Wild land under Terrasen's claim",
    climate: "Cool shade, damp earth, seasons muffled by canopy.",
    significance:
      "Refuge, crossing, and reminder that Erilea's wild places still keep their own counsel.",
    mood: "dawn",
    accent: "#166534",
  },
  {
    slug: "ferian-gap",
    name: "Ferian Gap",
    region: "Mountain corridors of the west",
    image: "/images/locations/ferian-gap.png",
    blurb:
      "Wind-scoured pass where witches and wyverns learn the sky's cruelty and its freedom.",
    aesthetics: ["sheer cliffs", "storm wind", "wyvern sky"],
    askPrompt: "What is the Ferian Gap?",
    rulingPower: "Contested / witch flight routes",
    climate: "Brutal winds, thin air, sudden ice.",
    significance:
      "Training ground and battleground for Ironteeth flights and the war's aerial front.",
    mood: "shadow",
    accent: "#b91c1c",
  },
  {
    slug: "red-desert",
    name: "The Red Desert",
    region: "Southern wastes",
    image: "/images/locations/red-desert.png",
    blurb:
      "Burning dunes where Silent Assassins hone their craft and the horizon swallows soft people whole.",
    aesthetics: ["red dunes", "heat shimmer", "desert fortresses"],
    askPrompt: "What is the Red Desert?",
    rulingPower: "Desert fortresses / Silent Assassins",
    climate: "Scorching days, freezing nights, sand that gets into every secret.",
    significance:
      "Setting of Assassin's Blade training arcs and the forging of Celaena beyond Rifthold.",
    mood: "ember",
    accent: "#c45c26",
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
