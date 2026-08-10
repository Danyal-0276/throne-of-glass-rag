import type { Character } from "./types";

export const characters: Character[] = [
  {
    slug: "aelin",
    name: "Aelin Ashryver Whitethorn Galathynius",
    shortName: "Aelin",
    aliases: [
      "Celaena Sardothien",
      "Fireheart",
      "Lillian Gordaina",
      "Elentiya",
      "Queen of Terrasen",
      "Adarlan's Assassin",
    ],
    image: "/images/characters/aelin.png",
    blurb:
      "The lost queen of Terrasen who survived as Adarlan's most infamous assassin. Fire, fury, and stubborn hope carry her from slave mines to a throne she never stopped claiming.",
    relationships: [
      "Rowan Whitethorn (mate and consort)",
      "Aedion Ashryver (cousin)",
      "Lysandra (chosen sister)",
      "Dorian Havilliard (ally)",
      "Chaol Westfall (complicated history)",
    ],
    arcSummary:
      "From Celaena's deadly games in Rifthold to reclaiming her name as Aelin, her story climbs through trauma, found family, and the cost of saving a continent.",
    arcByBook: [
      {
        minBook: 0.5,
        text: "As Celaena under Arobynn, she takes Guild jobs, travels far from Rifthold, and loses the life she thought she was building with Sam.",
      },
      {
        minBook: 1,
        text: "As Celaena, she fights for survival and a champion's prize in the glass castle.",
      },
      {
        minBook: 3,
        text: "In Wendlyn she confronts her Fae heritage and begins training with Rowan.",
      },
      {
        minBook: 5,
        text: "War, keys, and impossible bargains push her toward becoming the queen the world needs.",
      },
    ],
    askPrompt: "Who is Aelin Galathynius?",
    species: "Demi-Fae (Fae queen of Terrasen)",
    allegiance: "Terrasen · Court of Terrasen",
    powers: ["Fire magic", "Water magic (Ashryver line)", "Shifted Fae form", "Wyrdmark skill"],
    mood: "ember",
    accent: "#e8a05c",
  },
  {
    slug: "rowan",
    name: "Rowan Whitethorn Galathynius",
    shortName: "Rowan",
    aliases: ["Buzzard", "Prince of Doranelle", "Whitethorn"],
    image: "/images/characters/rowan.png",
    blurb:
      "A centuries-old Fae warrior once bound to Maeve's cadre: ice, wind, and unyielding loyalty. Reluctant mentorship becomes the partnership that steadies a queen of fire.",
    relationships: [
      "Aelin (mate)",
      "Cadre companions (Fenrys, Gavriel, Lorcan)",
      "Maeve (former blood oath)",
    ],
    arcSummary:
      "Rowan's walls crack as he chooses Aelin's court over Doranelle's chains, becoming king-consort in every way that matters.",
    arcByBook: [
      {
        minBook: 3,
        text: "Assigned to train Celaena in Wendlyn, he is cold, precise, and hiding old grief.",
      },
      {
        minBook: 5,
        text: "His loyalty shifts fully to Aelin as war and the cadre's past collide.",
      },
    ],
    askPrompt: "Who is Rowan Whitethorn?",
    species: "Fae",
    allegiance: "Court of Terrasen (formerly Maeve's cadre)",
    powers: ["Ice and wind", "Hawk shift", "Centuries of combat skill"],
    mood: "dawn",
    accent: "#9db4c8",
  },
  {
    slug: "dorian",
    name: "Dorian Havilliard",
    shortName: "Dorian",
    aliases: ["King of Adarlan", "Prince of Adarlan"],
    image: "/images/characters/dorian.png",
    blurb:
      "Scholar-prince turned king, burdened by a father's empire and magic he can barely name. Kindness is his rebellion; raw power is the cost of freedom.",
    relationships: [
      "Chaol Westfall (friend)",
      "Manon Blackbeak (complicated bond)",
      "Aelin (ally)",
      "Sorscha (memory that shaped him)",
    ],
    arcSummary:
      "Dorian breaks Adarlan's collar, literal and figurative, and learns that ruling may mean burning the throne he inherited.",
    arcByBook: [
      {
        minBook: 1,
        text: "A curious prince who sees Celaena as more than a weapon.",
      },
      {
        minBook: 4,
        text: "Possession, grief, and raw magic force him into a darker fight for his soul.",
      },
    ],
    askPrompt: "Who is Dorian Havilliard?",
    species: "Human (raw magic wielder)",
    allegiance: "Adarlan (reformed crown)",
    powers: ["Raw magic", "Scholar's mind", "Political leverage of the throne"],
    mood: "dawn",
    accent: "#c5d4e0",
  },
  {
    slug: "chaol",
    name: "Chaol Westfall",
    shortName: "Chaol",
    aliases: ["Captain of the Guard", "Hand of the King", "Lord of Anielle"],
    image: "/images/characters/chaol.png",
    blurb:
      "Duty first, heart second, until both break. The captain who loved a kingdom's order must learn what justice costs when the map is wrong.",
    relationships: [
      "Dorian (chosen brother)",
      "Yrene Towers (love)",
      "Aelin / Celaena (complicated past)",
      "Nesryn Faliq (ally and former partner in Rifthold)",
    ],
    arcSummary:
      "From glass-castle loyalty to southern healing and hard-won humility, Chaol's arc is learning to stand when standing hurts.",
    arcByBook: [
      {
        minBook: 1,
        text: "Captain of the Guard, torn between duty to Dorian and feelings for Celaena.",
      },
      {
        minBook: 5,
        text: "Injury, Anielle, and Yrene reshape what strength means to him.",
      },
    ],
    askPrompt: "Who is Chaol Westfall?",
    species: "Human",
    allegiance: "Adarlan · later allied with the southern continent and Aelin's cause",
    powers: ["Master swordsman", "Military command", "Stubborn endurance"],
    mood: "dawn",
    accent: "#c4a574",
  },
  {
    slug: "manon",
    name: "Manon Blackbeak",
    shortName: "Manon",
    aliases: ["Wing Leader", "Crochan Queen", "Witch of the West"],
    image: "/images/characters/manon.png",
    blurb:
      "Ironteeth heir raised on cruelty who learns that choosing mercy can be the sharpest blade. Wyverns, witches, and a crown she never asked to want.",
    relationships: [
      "Abraxos (wyvern)",
      "The Thirteen",
      "Dorian Havilliard",
      "Asterin Blackbeak",
    ],
    arcSummary:
      "From Blackbeak weapon to Crochan queen, Manon breaks the only rules she was taught and rebuilds a people from ash.",
    arcByBook: [
      {
        minBook: 4,
        text: "Wing Leader of the Thirteen, testing loyalty against a grandmother's iron will.",
      },
      {
        minBook: 6,
        text: "Choices between Ironteeth and Crochan blood rewrite what she fights for.",
      },
    ],
    askPrompt: "Who is Manon Blackbeak?",
    species: "Witch (Ironteeth / Crochan blood)",
    allegiance: "The Thirteen · later Crochan witches",
    powers: ["Iron teeth and nails", "Wyvern bond", "Battle command"],
    mood: "shadow",
    accent: "#a8a29e",
  },
  {
    slug: "aedion",
    name: "Aedion Ashryver",
    shortName: "Aedion",
    aliases: ["Wolf of the North", "General of Terrasen"],
    image: "/images/characters/aedion.png",
    blurb:
      "Terrasen's golden general: Ashryver eyes, a soldier's pragmatism, and fierce devotion to the cousin he waited years to serve again.",
    relationships: [
      "Aelin (cousin)",
      "Lysandra (love)",
      "Ren Allsbrook (ally)",
      "The Bane",
    ],
    arcSummary:
      "Aedion holds the northern line while Aelin becomes herself again, balancing honor, fury, and the politics of a returning court.",
    arcByBook: [
      {
        minBook: 3,
        text: "Reunited with Aelin's cause, he becomes the military spine of Terrasen's hope.",
      },
    ],
    askPrompt: "Who is Aedion Ashryver?",
    species: "Demi-Fae",
    allegiance: "Terrasen · The Bane",
    powers: ["Ashryver lineage", "Battlefield command", "Shifting potential"],
    mood: "ember",
    accent: "#e8a05c",
  },
  {
    slug: "lysandra",
    name: "Lysandra",
    shortName: "Lysandra",
    aliases: ["Lady of Caraverre", "Shape-shifter"],
    image: "/images/characters/lysandra.png",
    blurb:
      "Courtesan turned shapeshifter and queen's sister-in-arms. Every form she wears is a choice, and loyalty is the one she never sheds.",
    relationships: [
      "Aelin (chosen sister)",
      "Aedion (love)",
      "Evangeline (ward)",
      "Arobynn (past debt)",
    ],
    arcSummary:
      "Lysandra buys freedom with cunning, then spends it on Terrasen: spy, stand-in, and heart of the court that rebuilds itself.",
    arcByBook: [
      {
        minBook: 4,
        text: "Her bargain with Aelin binds their fates and unlocks her shifting gifts for the war ahead.",
      },
    ],
    askPrompt: "Who is Lysandra?",
    species: "Human (shape-shifter)",
    allegiance: "Court of Terrasen",
    powers: ["Shape-shifting", "Courtly performance", "Spy craft"],
    mood: "ember",
    accent: "#c45c26",
  },
  {
    slug: "elide",
    name: "Elide Lochan",
    shortName: "Elide",
    aliases: ["Lady of Perranth", "Elide Lochan of Perranth"],
    image: "/images/characters/elide.png",
    blurb:
      "Quiet steel in a world that tried to break her. Clever, limping, and lethal with a secret when it matters most.",
    relationships: [
      "Lorcan Salvaterre (love)",
      "Aelin (ally and friend)",
      "Vernon Lochan (uncle / antagonist)",
      "Manon (unlikely ally)",
    ],
    arcSummary:
      "From captive of Perranth to lady reclaiming her house, Elide proves cunning can outpace cruelty.",
    arcByBook: [
      {
        minBook: 5,
        text: "Flight from Morath's shadow and a bond with Lorcan remake her path.",
      },
    ],
    askPrompt: "Who is Elide Lochan?",
    species: "Human",
    allegiance: "Perranth · Court of Terrasen",
    powers: ["Sharp intellect", "Wyrdkey awareness", "Quiet courage"],
    mood: "dawn",
    accent: "#d4b896",
  },
  {
    slug: "lorcan",
    name: "Lorcan Salvaterre",
    shortName: "Lorcan",
    aliases: ["Lorcan of Doranelle", "Commander"],
    image: "/images/characters/lorcan.png",
    blurb:
      "Darkness-tempered Fae warrior who learns that love is not weakness. Once Maeve's blade, later a man choosing who deserves his loyalty.",
    relationships: [
      "Elide Lochan (love)",
      "Rowan and the cadre",
      "Maeve (former oath)",
      "Aelin (hard-won ally)",
    ],
    arcSummary:
      "Lorcan's redemption is slow and jagged: breaking old oaths, surviving new ones, and staying for Elide.",
    arcByBook: [
      {
        minBook: 5,
        text: "Exile, Elide, and the war against Valg force him to redefine honor.",
      },
    ],
    askPrompt: "Who is Lorcan Salvaterre?",
    species: "Fae (dark-blooded)",
    allegiance: "Formerly Maeve · later Aelin's cause",
    powers: ["Dark magic", "Immense strength", "Centuries of war craft"],
    mood: "shadow",
    accent: "#64748b",
  },
  {
    slug: "yrene",
    name: "Yrene Towers",
    shortName: "Yrene",
    aliases: ["Healer of Torre Cesme", "Lady Westfall"],
    image: "/images/characters/yrene.png",
    blurb:
      "A healer from Fenharrow who climbs Torre Cesme's ranks and turns light into a weapon against Valg darkness.",
    relationships: [
      "Chaol Westfall (love)",
      "Hafiza (mentor)",
      "Nesryn and Sartaq (allies)",
    ],
    arcSummary:
      "Yrene's gift becomes one of the war's quiet miracles: healing that can unmake corruption as surely as any sword.",
    arcByBook: [
      {
        minBook: 5,
        text: "In Antica she meets Chaol and discovers how far her light can reach.",
      },
    ],
    askPrompt: "Who is Yrene Towers?",
    species: "Human",
    allegiance: "Torre Cesme · allied courts",
    powers: ["Healing magic", "Light against Valg", "Scholar healer training"],
    mood: "dawn",
    accent: "#f0d9a8",
  },
  {
    slug: "nesryn",
    name: "Nesryn Faliq",
    shortName: "Nesryn",
    aliases: ["Captain Faliq", "ruk rider"],
    image: "/images/characters/nesryn.png",
    blurb:
      "Archer, captain, and bridge between Rifthold's streets and the southern skies. Precision is her language; loyalty is her creed.",
    relationships: [
      "Sartaq (love)",
      "Chaol (former partner in Rifthold)",
      "Yrene (friend)",
    ],
    arcSummary:
      "Nesryn leaves the city she protected to find a wider war, and a home among rukhin winds.",
    arcByBook: [
      {
        minBook: 5,
        text: "From Rifthold's walls to the Dagul Fells, she chooses a future with Sartaq and the khaganate.",
      },
    ],
    askPrompt: "Who is Nesryn Faliq?",
    species: "Human",
    allegiance: "Rifthold guard · later rukhin / khaganate",
    powers: ["Master archery", "Ruk riding", "City intelligence"],
    mood: "dawn",
    accent: "#e8a05c",
  },
  {
    slug: "nehemia",
    name: "Nehemia Ytger",
    shortName: "Nehemia",
    aliases: ["Princess of Eyllwe", "Friend of Celaena"],
    image: "/images/characters/nehemia.png",
    blurb:
      "Eyllwe's brilliant princess, scholar of Wyrdmarks, and the friend whose courage reshapes Celaena's path even after tragedy.",
    relationships: [
      "Celaena / Aelin (dear friend)",
      "Chaol and Dorian (allies in Rifthold)",
      "Eyllwe's resistance",
    ],
    arcSummary:
      "Nehemia's presence in the glass castle plants seeds of rebellion, scholarship, and grief that echo through the entire series.",
    arcByBook: [
      {
        minBook: 1,
        text: "She befriends Celaena and teaches her that freedom is worth any price.",
      },
    ],
    askPrompt: "Who is Nehemia Ytger?",
    species: "Human",
    allegiance: "Eyllwe",
    powers: ["Wyrdmark scholarship", "Political courage", "Elemental cultural legacy"],
    mood: "dawn",
    accent: "#34d399",
  },
  {
    slug: "sartaq",
    name: "Sartaq",
    shortName: "Sartaq",
    aliases: ["Prince of the khaganate", "Captain of the rukhin"],
    image: "/images/characters/sartaq.png",
    blurb:
      "Second son of the khagan, rider of ruks, and a strategist who measures worth by courage rather than court rank.",
    relationships: [
      "Nesryn Faliq (love)",
      "Hasar and Kashin (siblings)",
      "Chaol and Yrene (allies)",
    ],
    arcSummary:
      "Sartaq's arc widens the map: southern politics, aerial war, and a partnership with Nesryn that ties continents together.",
    arcByBook: [
      {
        minBook: 5,
        text: "In Antica and beyond, he chooses Nesryn and the fight against Valg expansion.",
      },
    ],
    askPrompt: "Who is Sartaq?",
    species: "Human",
    allegiance: "Southern Continent khaganate · rukhin",
    powers: ["Ruk command", "Aerial tactics", "Royal influence"],
    mood: "dawn",
    accent: "#c45c26",
  },
];

export function getCharacter(slug: string) {
  return characters.find((c) => c.slug === slug);
}
