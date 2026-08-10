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
      "The lost queen of Terrasen who learned to survive as Adarlan's most feared assassin. Gold hair, turquoise-and-gold eyes, and a temper that can level cities: she carries fire in her blood and a crown she never stopped claiming, even when the world buried her name.",
    relationships: [
      "Rowan Whitethorn (mate and consort)",
      "Aedion Ashryver (cousin)",
      "Lysandra (chosen sister)",
      "Dorian Havilliard (ally)",
      "Chaol Westfall (complicated history)",
      "Sam Cortland (first love, Assassin's Blade)",
    ],
    arcSummary:
      "From Celaena's deadly games in Rifthold to reclaiming her name as Aelin, her story climbs through trauma, found family, and the cost of saving a continent. Every mask she wore becomes fuel for the queen she chooses to be.",
    arcByBook: [
      {
        minBook: 0.5,
        text: "As Celaena under Arobynn, she takes Guild jobs, travels far from Rifthold, and loses the life she thought she was building with Sam.",
      },
      {
        minBook: 1,
        text: "As Celaena, she fights for survival and a champion's prize in the glass castle, hiding a queen's heart behind an assassin's grin.",
      },
      {
        minBook: 3,
        text: "In Wendlyn she confronts her Fae heritage and begins training with Rowan, learning that fire without control is only another cage.",
      },
      {
        minBook: 5,
        text: "War, keys, and impossible bargains push her toward becoming the queen the world needs, even when the price is everything she loves.",
      },
    ],
    askPrompt: "Who is Aelin Galathynius?",
    species: "Demi-Fae (Fae queen of Terrasen)",
    allegiance: "Terrasen · Court of Terrasen",
    powers: [
      "Fire magic",
      "Water magic (Ashryver line)",
      "Shifted Fae form",
      "Wyrdmark skill",
    ],
    traits: ["fierce", "cunning", "loyal", "theatrical", "stubborn", "brave"],
    appearance:
      "Tall and striking, with golden hair that catches light like a banner and Ashryver eyes of turquoise ringed in gold. In Fae form she carries pointed ears and a predator's stillness; as Celaena she wrapped that same beauty in silk, steel, and carefully chosen lies.",
    personality:
      "She is a storm dressed as a queen: witty, ruthless when cornered, and fiercely protective of the people she claims as hers. Beneath the swagger sits deep grief and a stubborn hope that the world can still be remade.",
    notableFor:
      "Surviving Endovier and Adarlan's arenas to reclaim Terrasen's throne and lead the fight against the Valg.",
    mood: "ember",
    accent: "#e8a05c",
  },
  {
    slug: "rowan",
    name: "Rowan Whitethorn Galathynius",
    shortName: "Rowan",
    aliases: ["Buzzard", "Prince of Doranelle", "Whitethorn", "King-Consort of Terrasen"],
    image: "/images/characters/rowan.png",
    blurb:
      "A centuries-old Fae warrior once bound to Maeve's cadre: ice on the wind, silver hair like a blade's edge, and loyalty that outlasts kingdoms. Reluctant mentorship in Wendlyn becomes the partnership that steadies a queen of fire.",
    relationships: [
      "Aelin (mate and queen)",
      "Cadre companions (Fenrys, Gavriel, Lorcan)",
      "Maeve (former blood oath)",
      "Lyria (past mate, remembered)",
    ],
    arcSummary:
      "Rowan's walls crack as he chooses Aelin's court over Doranelle's chains, becoming king-consort in every way that matters. He trades cold obedience for a love that demands he feel again.",
    arcByBook: [
      {
        minBook: 3,
        text: "Assigned to train Celaena in Wendlyn, he is cold, precise, and hiding old grief behind centuries of discipline.",
      },
      {
        minBook: 5,
        text: "His loyalty shifts fully to Aelin as war and the cadre's past collide, and he claims a throne beside hers.",
      },
    ],
    askPrompt: "Who is Rowan Whitethorn?",
    species: "Fae",
    allegiance: "Court of Terrasen (formerly Maeve's cadre)",
    powers: ["Ice and wind", "Hawk shift", "Centuries of combat skill"],
    traits: ["stoic", "protective", "disciplined", "loyal", "blunt", "fierce"],
    appearance:
      "Silver hair, pine-green eyes, and a warrior's build marked by old scars and tattooed honor. He moves like winter given form: tall, still, and suddenly lethal when the wind answers him.",
    personality:
      "He speaks little and means every word, measuring the world in threats, oaths, and what he will die to protect. Softness comes slowly, earned through trust rather than charm.",
    notableFor:
      "Breaking Maeve's blood oath to stand as Aelin's mate, trainer, and king-consort through the war for Erilea.",
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
      "Scholar-prince turned king, burdened by a father's empire and magic he can barely name. Sapphire eyes and a gentle mouth hide raw power: kindness is his rebellion, and freedom is the cost he pays again and again.",
    relationships: [
      "Chaol Westfall (friend)",
      "Manon Blackbeak (complicated bond)",
      "Aelin (ally)",
      "Sorscha (memory that shaped him)",
    ],
    arcSummary:
      "Dorian breaks Adarlan's collar, literal and figurative, and learns that ruling may mean burning the throne he inherited. His fight is as much for his own soul as for a kingdom remade.",
    arcByBook: [
      {
        minBook: 1,
        text: "A curious prince who sees Celaena as more than a weapon, and begins to question the glass castle's lies.",
      },
      {
        minBook: 4,
        text: "Possession, grief, and raw magic force him into a darker fight for his soul and the crown he never wanted this way.",
      },
    ],
    askPrompt: "Who is Dorian Havilliard?",
    species: "Human (raw magic wielder)",
    allegiance: "Adarlan (reformed crown)",
    powers: ["Raw magic", "Scholar's mind", "Political leverage of the throne"],
    traits: ["curious", "compassionate", "haunted", "brave", "thoughtful", "resolute"],
    appearance:
      "Dark hair, striking blue eyes, and the polished bearing of a prince raised in glass and gold. After the collar and the war, that elegance carries a harder edge, as if power and pain have both left their mark.",
    personality:
      "He prefers books to bloodshed, yet will not look away when the cost of looking away is other people's freedom. Wit and gentleness sit beside a capacity for terrible magic he never asked to wield.",
    notableFor:
      "Casting off Valg control and using raw magic to help unmake the darkness that poisoned Adarlan.",
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
      "Duty first, heart second, until both break. The captain who loved a kingdom's order must learn what justice costs when the map is wrong, and what strength means when the body will not obey as it once did.",
    relationships: [
      "Dorian (chosen brother)",
      "Yrene Towers (love)",
      "Aelin / Celaena (complicated past)",
      "Nesryn Faliq (ally and former partner in Rifthold)",
    ],
    arcSummary:
      "From glass-castle loyalty to southern healing and hard-won humility, Chaol's arc is learning to stand when standing hurts. He trades rigid duty for a wider definition of honor.",
    arcByBook: [
      {
        minBook: 1,
        text: "Captain of the Guard, torn between duty to Dorian and feelings for Celaena as Adarlan's secrets deepen.",
      },
      {
        minBook: 5,
        text: "Injury, Anielle, and Yrene reshape what strength means to him on the road through the southern continent and home again.",
      },
    ],
    askPrompt: "Who is Chaol Westfall?",
    species: "Human",
    allegiance: "Adarlan · later allied with the southern continent and Aelin's cause",
    powers: ["Master swordsman", "Military command", "Stubborn endurance"],
    traits: ["dutiful", "stubborn", "honorable", "guarded", "loyal", "earnest"],
    appearance:
      "Broad-shouldered and disciplined, with brown hair and the posture of a lifelong soldier. After his injury he moves with new limits, but the same steady presence that once commanded a king's guard.",
    personality:
      "He believes in rules until the rules betray the people they claim to protect. Pride and guilt war in him, yet love and hard truth slowly teach him flexibility without costing him his spine.",
    notableFor:
      "Leaving the glass castle's certainties to fight for a freer Adarlan, and finding healing and partnership with Yrene Towers.",
    mood: "dawn",
    accent: "#c4a574",
  },
  {
    slug: "manon",
    name: "Manon Blackbeak",
    shortName: "Manon",
    aliases: ["Wing Leader", "Crochan Queen", "Witch of the West", "Blackbeak Heir"],
    image: "/images/characters/manon.png",
    blurb:
      "Ironteeth heir raised on cruelty who learns that choosing mercy can be the sharpest blade. Gold eyes, white hair, and iron in her smile: wyverns, witches, and a crown she never asked to want.",
    relationships: [
      "Abraxos (wyvern)",
      "The Thirteen",
      "Dorian Havilliard",
      "Asterin Blackbeak",
      "Elide Lochan (unlikely ally)",
    ],
    arcSummary:
      "From Blackbeak weapon to Crochan queen, Manon breaks the only rules she was taught and rebuilds a people from ash. Every act of mercy costs her, and she pays it anyway.",
    arcByBook: [
      {
        minBook: 4,
        text: "Wing Leader of the Thirteen, testing loyalty against a grandmother's iron will and the first cracks in her training.",
      },
      {
        minBook: 6,
        text: "Choices between Ironteeth and Crochan blood rewrite what she fights for, and who she becomes for her people.",
      },
    ],
    askPrompt: "Who is Manon Blackbeak?",
    species: "Witch (Ironteeth / Crochan blood)",
    allegiance: "The Thirteen · later Crochan witches",
    powers: ["Iron teeth and nails", "Wyvern bond", "Battle command"],
    traits: ["ruthless", "proud", "loyal", "evolving", "fierce", "commanding"],
    appearance:
      "Pale hair like winter bone, gold eyes, and beauty edged with iron teeth and nails. She wears black and blood-red like armor, and Abraxos's scars taught her that even monsters can choose softness.",
    personality:
      "She was forged to kill without question, yet curiosity and loyalty keep carving new paths through her. Cold on the surface, she loves with the intensity of someone who was never supposed to love at all.",
    notableFor:
      "Defying the Blackbeak Matron to lead witches toward a future that includes Crochan hope and hard-won mercy.",
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
      "Terrasen's golden general: Ashryver eyes, a soldier's pragmatism, and fierce devotion to the cousin he waited years to serve again. He holds the northern line with a wolf's patience and a prince's pride.",
    relationships: [
      "Aelin (cousin)",
      "Lysandra (love)",
      "Ren Allsbrook (ally)",
      "The Bane",
      "Evangeline (protective of Lysandra's ward)",
    ],
    arcSummary:
      "Aedion holds the northern line while Aelin becomes herself again, balancing honor, fury, and the politics of a returning court. He learns that winning the war also means trusting the people who remake the peace.",
    arcByBook: [
      {
        minBook: 3,
        text: "Reunited with Aelin's cause, he becomes the military spine of Terrasen's hope and the Bane's hard edge.",
      },
      {
        minBook: 5,
        text: "Siege, politics, and love for Lysandra test the general who would burn the world for his queen and his country.",
      },
    ],
    askPrompt: "Who is Aedion Ashryver?",
    species: "Demi-Fae",
    allegiance: "Terrasen · The Bane",
    powers: ["Ashryver lineage", "Battlefield command", "Shifting potential"],
    traits: ["fierce", "loyal", "proud", "strategic", "hot-tempered", "devoted"],
    appearance:
      "Golden hair, turquoise-and-gold Ashryver eyes, and the lean strength of a warrior who has lived too long in enemy courts. He looks like Terrasen's lost glory given a sword and a scowl.",
    personality:
      "Blunt, protective, and quick to anger when his people are threatened. Beneath the general's bark is deep loyalty and a hunger for a home that finally feels like his again.",
    notableFor:
      "Commanding the Bane and holding Terrasen's military hope through occupation and the return of its queen.",
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
      "Courtesan turned shape-shifter and queen's sister-in-arms. Every form she wears is a choice, and loyalty is the one she never sheds. Beauty was once her cage; now it is one more weapon in Terrasen's arsenal.",
    relationships: [
      "Aelin (chosen sister)",
      "Aedion (love)",
      "Evangeline (ward)",
      "Arobynn (past debt)",
    ],
    arcSummary:
      "Lysandra buys freedom with cunning, then spends it on Terrasen: spy, stand-in, and heart of the court that rebuilds itself. She turns performance into power and found family into an unbreakable vow.",
    arcByBook: [
      {
        minBook: 4,
        text: "Her bargain with Aelin binds their fates and unlocks her shifting gifts for the war ahead.",
      },
      {
        minBook: 5,
        text: "She risks everything as double and defender, proving a courtesan's courage can outmatch a courtier's blade.",
      },
    ],
    askPrompt: "Who is Lysandra?",
    species: "Human (shape-shifter)",
    allegiance: "Court of Terrasen",
    powers: ["Shape-shifting", "Courtly performance", "Spy craft"],
    traits: ["cunning", "loyal", "adaptable", "protective", "witty", "brave"],
    appearance:
      "Striking in every form, with a dancer's grace and eyes that miss nothing. As herself she carries the polish of Rifthold's high houses; as a ghost leopard or other shapes, she becomes pure predatory elegance.",
    personality:
      "She reads rooms the way others read battle maps, and loves with a ferocity earned from years of having little that was truly hers. Humor and steel share the same smile.",
    notableFor:
      "Becoming Aelin's sworn sister and using her shifting gifts to protect Terrasen's court and its secrets.",
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
      "Quiet steel in a world that tried to break her. Clever, limping, and lethal with a secret when it matters most, she turns survival into strategy and fear into a map she can outwalk.",
    relationships: [
      "Lorcan Salvaterre (love)",
      "Aelin (ally and friend)",
      "Vernon Lochan (uncle / antagonist)",
      "Manon (unlikely ally)",
    ],
    arcSummary:
      "From captive of Perranth to lady reclaiming her house, Elide proves cunning can outpace cruelty. Her soft voice hides a will that refuses to stay owned.",
    arcByBook: [
      {
        minBook: 5,
        text: "Flight from Morath's shadow and a bond with Lorcan remake her path from hunted girl to lady of her own choosing.",
      },
      {
        minBook: 6,
        text: "She claims Perranth and her place among allies who finally see the strength she always carried.",
      },
    ],
    askPrompt: "Who is Elide Lochan?",
    species: "Human",
    allegiance: "Perranth · Court of Terrasen",
    powers: ["Sharp intellect", "Wyrdkey awareness", "Quiet courage"],
    traits: ["clever", "resilient", "gentle", "observant", "brave", "determined"],
    appearance:
      "Dark hair, careful eyes, and a limp that never defines her as much as her stillness does. She looks fragile until you notice how little she wastes: every step, every word, every secret held close.",
    personality:
      "Soft-spoken and watchful, she survives by noticing what others overlook. Love and loyalty do not make her naive; they make her dangerous in quieter ways.",
    notableFor:
      "Escaping Vernon and Morath's reach, and helping turn the tide with courage and knowledge others underestimated.",
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
      "Darkness-tempered Fae warrior who learns that love is not weakness. Once Maeve's blade, later a man choosing who deserves his loyalty: black hair, colder magic, and a heart that only opens for the right voice.",
    relationships: [
      "Elide Lochan (love)",
      "Rowan and the cadre",
      "Maeve (former oath)",
      "Aelin (hard-won ally)",
    ],
    arcSummary:
      "Lorcan's redemption is slow and jagged: breaking old oaths, surviving new ones, and staying for Elide. He learns that power without belonging is only another kind of exile.",
    arcByBook: [
      {
        minBook: 5,
        text: "Exile, Elide, and the war against Valg force him to redefine honor beyond Maeve's commands.",
      },
      {
        minBook: 6,
        text: "He fights for a future that includes love, loyalty freely given, and a place among those he once opposed.",
      },
    ],
    askPrompt: "Who is Lorcan Salvaterre?",
    species: "Fae (dark-blooded)",
    allegiance: "Formerly Maeve · later Aelin's cause",
    powers: ["Dark magic", "Immense strength", "Centuries of war craft"],
    traits: ["brooding", "powerful", "loyal", "harsh", "protective", "stubborn"],
    appearance:
      "Dark hair, dark eyes, and a frame built for centuries of battle. Shadows seem to cling to him even in daylight, and his presence fills a room before he speaks.",
    personality:
      "He is blunt, often cruel in honesty, and slow to trust. Once he chooses someone, that loyalty becomes absolute, even when pride and old habits try to drag him backward.",
    notableFor:
      "Leaving Maeve's service and finding redemption through love for Elide and allegiance to Terrasen's war.",
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
      "A healer from Fenharrow who climbs Torre Cesme's ranks and turns light into a weapon against Valg darkness. Soft hands, fierce mind: she proves that mending the world can be as radical as conquering it.",
    relationships: [
      "Chaol Westfall (love)",
      "Hafiza (mentor)",
      "Nesryn and Sartaq (allies)",
      "Chaol's companions on the southern journey",
    ],
    arcSummary:
      "Yrene's gift becomes one of the war's quiet miracles: healing that can unmake corruption as surely as any sword. From runaway student to essential ally, she chooses courage every time the darkness asks her to look away.",
    arcByBook: [
      {
        minBook: 5,
        text: "In Antica she meets Chaol and discovers how far her light can reach against Valg infection and despair.",
      },
      {
        minBook: 6,
        text: "She carries Torre Cesme's hope into the northern war, healing bodies and breaking darkness where steel alone fails.",
      },
    ],
    askPrompt: "Who is Yrene Towers?",
    species: "Human",
    allegiance: "Torre Cesme · allied courts",
    powers: ["Healing magic", "Light against Valg", "Scholar healer training"],
    traits: ["compassionate", "brilliant", "brave", "gentle", "determined", "hopeful"],
    appearance:
      "Warm-eyed and steady-handed, with the practical beauty of someone who works long hours over the wounded. There is light in her presence that has nothing to do with magic and everything to do with resolve.",
    personality:
      "She meets cruelty with competence and fear with questions worth answering. Kind without being soft, she refuses to let healing be dismissed as lesser than war.",
    notableFor:
      "Wielding Torre Cesme's light to purge Valg darkness and standing as Chaol's partner through the southern and final wars.",
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
      "Archer, captain, and bridge between Rifthold's streets and the southern skies. Precision is her language; loyalty is her creed. She leaves the city she protected to find a wider war and a home on the wind.",
    relationships: [
      "Sartaq (love)",
      "Chaol (former partner in Rifthold)",
      "Yrene (friend)",
      "Kashin and Hasar (allies by kinship through Sartaq)",
    ],
    arcSummary:
      "Nesryn leaves the city she protected to find a wider war, and a home among rukhin winds. Duty expands from one skyline to a continent's fate without ever dulling her aim.",
    arcByBook: [
      {
        minBook: 4,
        text: "As captain in Rifthold she holds the streets with Chaol, archery and pragmatism against a city sliding into darkness.",
      },
      {
        minBook: 5,
        text: "From Rifthold's walls to the Dagul Fells, she chooses a future with Sartaq and the khaganate's fight.",
      },
    ],
    askPrompt: "Who is Nesryn Faliq?",
    species: "Human",
    allegiance: "Rifthold guard · later rukhin / khaganate",
    powers: ["Master archery", "Ruk riding", "City intelligence"],
    traits: ["precise", "loyal", "pragmatic", "brave", "steady", "independent"],
    appearance:
      "Dark hair, sharp focus, and the lean strength of a captain who lives with a bow in reach. In the air she looks born to the saddle of a ruk, wind-cut and fearless.",
    personality:
      "She values competence over ceremony and truth over comfort. Quietly intense, she loves by standing firm, whether on Rifthold's rooftops or in southern skies.",
    notableFor:
      "Bridging Adarlan's resistance and the khaganate's rukhin, and choosing Sartaq while never abandoning the fight for Erilea.",
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
      "Eyllwe's brilliant princess, scholar of Wyrdmarks, and the friend whose courage reshapes Celaena's path even after tragedy. Braided hair, bright mind, and a rebellion written in ink and quiet defiance.",
    relationships: [
      "Celaena / Aelin (dear friend)",
      "Chaol and Dorian (allies in Rifthold)",
      "Eyllwe's resistance",
    ],
    arcSummary:
      "Nehemia's presence in the glass castle plants seeds of rebellion, scholarship, and grief that echo through the entire series. She teaches that freedom is worth any price, and that knowledge can be a blade.",
    arcByBook: [
      {
        minBook: 1,
        text: "She befriends Celaena and teaches her that freedom is worth any price, sharing Wyrdmarks and a princess's dangerous hope.",
      },
    ],
    askPrompt: "Who is Nehemia Ytger?",
    species: "Human",
    allegiance: "Eyllwe",
    powers: ["Wyrdmark scholarship", "Political courage", "Elemental cultural legacy"],
    traits: ["brilliant", "courageous", "kind", "principled", "witty", "resolute"],
    appearance:
      "Dark braided hair, warm brown skin, and eyes that hold both scholarship and steel. She carries herself like someone who knows her people's suffering and refuses to make it invisible.",
    personality:
      "Gentle in friendship, unyielding in principle. She meets empire with intellect and moral clarity, and loves her friends enough to ask them to become better than their fear.",
    notableFor:
      "Igniting Celaena's deeper fight for freedom and leaving a legacy of courage that outlives her time in the glass castle.",
    mood: "dawn",
    accent: "#34d399",
  },
  {
    slug: "sartaq",
    name: "Sartaq",
    shortName: "Sartaq",
    aliases: ["Prince of the khaganate", "Captain of the rukhin", "Heir of the khagan"],
    image: "/images/characters/sartaq.png",
    blurb:
      "Son of the khagan, rider of ruks, and a strategist who measures worth by courage rather than court rank. Wind-cut and steady, he brings the southern skies into a war that would otherwise stay earthbound.",
    relationships: [
      "Nesryn Faliq (love)",
      "Hasar and Kashin (siblings)",
      "Chaol and Yrene (allies)",
      "The rukhin",
    ],
    arcSummary:
      "Sartaq's arc widens the map: southern politics, aerial war, and a partnership with Nesryn that ties continents together. He chooses merit and love over easier paths to power.",
    arcByBook: [
      {
        minBook: 5,
        text: "In Antica and beyond, he chooses Nesryn and the fight against Valg expansion, leading rukhin into a war of empires.",
      },
      {
        minBook: 6,
        text: "He carries the khaganate's strength north, proving aerial command can tip the balance of Erilea's last battles.",
      },
    ],
    askPrompt: "Who is Sartaq?",
    species: "Human",
    allegiance: "Southern Continent khaganate · rukhin",
    powers: ["Ruk command", "Aerial tactics", "Royal influence"],
    traits: ["honorable", "strategic", "steady", "brave", "fair", "devoted"],
    appearance:
      "Dark hair, keen eyes, and the weathered grace of a prince who prefers the saddle of a ruk to a gilded hall. He looks most himself in open sky, wind in his coat and command in his posture.",
    personality:
      "Measured and sincere, he judges people by courage and competence. Court intrigue does not dull his loyalty; it sharpens his preference for honest allies like Nesryn.",
    notableFor:
      "Leading the rukhin into the Valg war and binding the khaganate's fate to Erilea through Nesryn and chosen alliance.",
    mood: "dawn",
    accent: "#c45c26",
  },
  {
    slug: "sam",
    name: "Sam Cortland",
    shortName: "Sam",
    aliases: ["Sam Cortland of the Assassins' Guild", "Celaena's first love"],
    image: "/images/characters/sam.png",
    blurb:
      "A Guild assassin with a conscience sharper than his blades. Kind where the underworld taught cruelty, he offered Celaena a future beyond Arobynn's leash: love, freedom, and a life they almost reached.",
    relationships: [
      "Celaena / Aelin (love)",
      "Arobynn Hamel (Guild master, antagonistic)",
      "Assassins' Guild companions",
    ],
    arcSummary:
      "Sam's story is the road before the queen: two assassins trying to buy a clean life, and the grief that forges Celaena into someone harder and hungrier for freedom. His memory remains a compass for the woman she becomes.",
    arcByBook: [
      {
        minBook: 0.5,
        text: "Beside Celaena under Arobynn's shadow, he plans escape, takes jobs that test their morals, and becomes the heart of the life she almost claimed.",
      },
    ],
    askPrompt: "Who is Sam Cortland?",
    species: "Human",
    allegiance: "Assassins' Guild (reluctantly) · freedom with Celaena",
    powers: ["Assassin training", "Blade skill", "Moral courage"],
    traits: ["kind", "loyal", "brave", "idealistic", "skilled", "protective"],
    appearance:
      "Handsome in a quiet way, with the lean readiness of a Guild-trained killer and eyes that still know how to be gentle. He looks like someone who never fully belonged to the darkness he worked in.",
    personality:
      "He chooses mercy when the Guild rewards ruthlessness, and love when survival would be easier alone. Steady and earnest, he gives Celaena a glimpse of who she could be without a master's chain.",
    notableFor:
      "Loving Celaena enough to help her dream of leaving the Guild, and remaining the first great loss that shapes Aelin's fire.",
    mood: "dawn",
    accent: "#a8b5c4",
  },
  {
    slug: "ansel",
    name: "Ansel of Briarcliff",
    shortName: "Ansel",
    aliases: ["Ansel of the West", "Lady of Briarcliff"],
    image: "/images/characters/ansel.png",
    blurb:
      "A western warlord's daughter with a pirate's grin and a survivor's calculus. Red hair, sharp humor, and a throne taken by blood: she crosses Celaena's path as rival, ally, and a reminder that crowns are rarely clean.",
    relationships: [
      "Celaena / Aelin (complicated ally)",
      "Briarcliff's court and warriors",
      "Western lords shaped by her rise",
    ],
    arcSummary:
      "Ansel's path is ambition tempered by hard lessons: betrayal, rule, and the slow work of becoming more than the violence that crowned her. She returns later as proof that old enemies can choose better wars.",
    arcByBook: [
      {
        minBook: 0.5,
        text: "In the Silent Assassins' Keep and the western lands, she crosses Celaena's journey with ambition, charm, and a claim on Briarcliff written in steel.",
      },
      {
        minBook: 5,
        text: "As Lady of Briarcliff she brings western strength into the wider war, paying old debts with soldiers and hard-earned loyalty.",
      },
    ],
    askPrompt: "Who is Ansel of Briarcliff?",
    species: "Human",
    allegiance: "Briarcliff · later allied with Terrasen's cause",
    powers: ["Combat skill", "Political cunning", "Western military command"],
    traits: ["ambitious", "witty", "ruthless", "charismatic", "pragmatic", "fierce"],
    appearance:
      "Flame-bright hair, a ready smirk, and the bearing of someone who learned court and camp with equal fluency. She wears power like a blade she forged herself, not one she inherited gently.",
    personality:
      "She laughs easily and calculates constantly, mixing warmth with a warlord's cold math. Loyalty from Ansel is never free, but once given it can reshape a battlefield.",
    notableFor:
      "Seizing Briarcliff and later standing with Aelin's war as a western ally who knows the cost of a crown.",
    mood: "shadow",
    accent: "#b85c38",
  },
  {
    slug: "evangeline",
    name: "Evangeline",
    shortName: "Evangeline",
    aliases: ["Lysandra's ward", "Little lioness"],
    image: "/images/characters/evangeline.png",
    blurb:
      "A child rescued from cruelty who becomes the soft heart of a hard court. Clever, loving, and braver than her years, she reminds Terrasen's warriors what they are fighting to keep alive.",
    relationships: [
      "Lysandra (guardian and chosen mother)",
      "Aedion (protector)",
      "Aelin's court (found family)",
    ],
    arcSummary:
      "Evangeline grows from rescued orphan to cherished ward of Terrasen's court, teaching its fiercest fighters that gentleness is not weakness. Her safety becomes one of the personal stakes behind the war for a kingdom.",
    arcByBook: [
      {
        minBook: 4,
        text: "Lysandra claims her as ward, pulling her out of Arobynn's world and into a future built on chosen family.",
      },
      {
        minBook: 5,
        text: "In Terrasen's struggle she remains a bright constant, protected by a court that has learned how precious hope looks in a child's face.",
      },
    ],
    askPrompt: "Who is Evangeline?",
    species: "Human",
    allegiance: "Court of Terrasen (Lysandra's household)",
    powers: ["Sharp observation", "Unbreakable hope", "Courtly learning"],
    traits: ["kind", "brave", "clever", "loving", "resilient", "bright"],
    appearance:
      "Young and bright-eyed, with the careful manners of a child who learned early how adults can be dangerous. In safer halls she blossoms into laughter, ribbons, and the soft courage of someone finally allowed to be small.",
    personality:
      "She loves openly and notices everything, trusting Lysandra with a devotion that softens everyone around them. Fear did not make her cruel; it made her fiercely grateful for kindness.",
    notableFor:
      "Becoming Lysandra's ward and the living reminder of why Terrasen's court fights for a gentler future.",
    mood: "dawn",
    accent: "#e8c4a8",
  },
  {
    slug: "fenrys",
    name: "Fenrys Moonbeam",
    shortName: "Fenrys",
    aliases: ["Fenrys", "Moonbeam", "Whitethorn cadre wolf"],
    image: "/images/characters/fenrys.png",
    blurb:
      "A Fae warrior of Maeve's cadre with a wolf's smile and a twin's grief. Charm on the surface, fury underneath: blood oath and impossible bargains teach him what freedom is worth.",
    relationships: [
      "Connall (twin brother)",
      "Rowan, Gavriel, and Lorcan (cadre)",
      "Aelin (oath and hard-won loyalty)",
      "Maeve (former binder)",
    ],
    arcSummary:
      "Fenrys endures Maeve's leash, pays a brother's price, and chooses Aelin's cause with the ferocity of someone who knows captivity from the inside. Humor becomes armor; loyalty becomes choice.",
    arcByBook: [
      {
        minBook: 5,
        text: "Bound by Maeve yet drawn into Aelin's war, he walks the knife-edge between oath and conscience.",
      },
      {
        minBook: 6,
        text: "Sacrifice, freedom, and a new court claim him as more than Maeve's weapon: a warrior who finally fights for himself.",
      },
    ],
    askPrompt: "Who is Fenrys Moonbeam?",
    species: "Fae",
    allegiance: "Formerly Maeve's cadre · later Court of Terrasen",
    powers: ["Wolf shift", "Fae strength and speed", "Warrior skill"],
    traits: ["witty", "fierce", "loyal", "haunted", "charming", "reckless"],
    appearance:
      "Golden good looks, easy grin, and the coiled readiness of a predator who has worn a collar too long. In wolf form he is moonlit muscle and teeth; in Fae form the smile never quite hides the storm.",
    personality:
      "He jokes to keep the dark at bay and loves hard once trust is earned. Beneath the flirtation sits grief for Connall and a hunger for a life no queen can command.",
    notableFor:
      "Breaking free of Maeve's control and binding his fate to Aelin's court after paying a terrible personal cost.",
    mood: "shadow",
    accent: "#8b9dc3",
  },
  {
    slug: "gavriel",
    name: "Gavriel",
    shortName: "Gavriel",
    aliases: ["The Lion", "Gavriel of the cadre"],
    image: "/images/characters/gavriel.png",
    blurb:
      "The Lion of Maeve's cadre: golden, measured, and quietly burdened by a son he did not raise. Honor is his compass even when blood oaths twist the map, and fatherhood becomes the war inside the war.",
    relationships: [
      "Aedion Ashryver (son)",
      "Rowan, Fenrys, and Lorcan (cadre)",
      "Maeve (former blood oath)",
      "Aelin's court (later allegiance)",
    ],
    arcSummary:
      "Gavriel seeks redemption not through speeches but through standing where it costs him most: beside the son who grew up without him, and the queen who offers a different kind of loyalty. His courage is paternal, steady, and absolute.",
    arcByBook: [
      {
        minBook: 5,
        text: "Cadre duties collide with the truth of Aedion, forcing the Lion to choose between old oaths and a son's future.",
      },
      {
        minBook: 6,
        text: "He gives everything for Terrasen's hope, proving that a late father can still rewrite what legacy means.",
      },
    ],
    askPrompt: "Who is Gavriel?",
    species: "Fae",
    allegiance: "Formerly Maeve's cadre · later Aelin's cause and Aedion",
    powers: ["Lion shift", "Fae combat mastery", "Centuries of war experience"],
    traits: ["honorable", "steadfast", "protective", "reserved", "brave", "dutiful"],
    appearance:
      "Golden hair, feline grace, and the solid presence of a warrior called the Lion for more than his shift. Age sits lightly on him; regret sits heavier, visible mostly in how carefully he watches Aedion.",
    personality:
      "Calm, principled, and slow to anger, he carries guilt without making it anyone else's burden. When he loves, he loves by standing in the path of the blade.",
    notableFor:
      "Reclaiming a bond with Aedion and standing as one of Terrasen's fiercest, most selfless Fae allies.",
    mood: "dawn",
    accent: "#c9a227",
  },
  {
    slug: "asterin",
    name: "Asterin Blackbeak",
    shortName: "Asterin",
    aliases: ["Asterin of the Thirteen", "Second to Manon"],
    image: "/images/characters/asterin.png",
    blurb:
      "Manon's Second: wild grin, iron teeth, and a heart that refused to stay caged by coven law. She teaches her Wing Leader that love and loyalty can be chosen, not only commanded.",
    relationships: [
      "Manon Blackbeak (cousin, Wing Leader)",
      "The Thirteen",
      "Her lost child and chosen loves (remembered)",
    ],
    arcSummary:
      "Asterin's past of forbidden love and punishment becomes the spark that cracks Manon's iron training. She fights as Second and as conscience, proving a witch can be both monster and merciful.",
    arcByBook: [
      {
        minBook: 4,
        text: "As Manon's Second she pushes against Blackbeak cruelty, protecting Abraxos's place and the first softness in her heir.",
      },
      {
        minBook: 6,
        text: "Her choices and sacrifice sear the Thirteen's legacy into Manon's path toward a different kind of queenship.",
      },
    ],
    askPrompt: "Who is Asterin Blackbeak?",
    species: "Witch (Ironteeth)",
    allegiance: "The Thirteen · Manon Blackbeak",
    powers: ["Iron teeth and nails", "Wyvern warfare", "Coven battle skill"],
    traits: ["fierce", "loyal", "rebellious", "passionate", "brave", "protective"],
    appearance:
      "Wind-wild hair, iron-edged beauty, and a grin that looks like trouble riding a wyvern. She wears the Thirteen's black with the ease of someone born for sky and slaughter, yet her eyes hold more humanity than coven law allows.",
    personality:
      "Loud where Manon is cold, tender where the Matron demanded silence. She loves without apology and fights without hesitation, dragging her heir toward a freer definition of witch.",
    notableFor:
      "Being Manon's Second and the voice that helped break Blackbeak cruelty from inside the Thirteen.",
    mood: "shadow",
    accent: "#9a8c98",
  },
  {
    slug: "ren",
    name: "Ren Allsbrook",
    shortName: "Ren",
    aliases: ["Lord of Allsbrook", "Rebel of Terrasen"],
    image: "/images/characters/ren.png",
    blurb:
      "A young Terrasen lord tempered by occupation and rebellion. Quiet steel, northern loyalty, and a willingness to bleed for a queen still hidden: he keeps the kingdom's hope alive in the shadows before the banners rise.",
    relationships: [
      "Aedion Ashryver (ally)",
      "Aelin (queen he waited for)",
      "Terrasen rebel networks",
      "Murtaugh Allsbrook (kin)",
    ],
    arcSummary:
      "Ren holds the rebel line when open war is still impossible, balancing caution with courage. When Aelin returns, he stands as proof that Terrasen never fully knelt.",
    arcByBook: [
      {
        minBook: 3,
        text: "Working with Aedion and the rebels, he keeps Terrasen's resistance breathing under Adarlan's boot.",
      },
      {
        minBook: 5,
        text: "He fights openly for his queen and country as occupation becomes open war across the north.",
      },
    ],
    askPrompt: "Who is Ren Allsbrook?",
    species: "Human",
    allegiance: "Terrasen · northern rebels",
    powers: ["Sword skill", "Rebel leadership", "Northern political ties"],
    traits: ["loyal", "steady", "brave", "reserved", "principled", "resilient"],
    appearance:
      "Lean and watchful, with the weathered look of a lord who has spent more nights in safehouses than ballrooms. Northern practicality shapes his dress and his silence alike.",
    personality:
      "He speaks carefully and means what he says, preferring action to spectacle. Devotion to Terrasen sits at his core, quiet and unshakable.",
    notableFor:
      "Sustaining Terrasen's rebellion beside Aedion and standing ready when Aelin reclaims her kingdom.",
    mood: "dawn",
    accent: "#6b8f71",
  },
  {
    slug: "hasar",
    name: "Hasar",
    shortName: "Hasar",
    aliases: ["Princess Hasar", "Princess of the khaganate"],
    image: "/images/characters/hasar.png",
    blurb:
      "A khaganate princess with a sharp tongue, sharper mind, and little patience for fools. Silk and steel in equal measure, she navigates Antica's politics with ambition, wit, and a surprising capacity for alliance.",
    relationships: [
      "Sartaq (brother)",
      "Kashin (brother)",
      "Chaol, Yrene, and Nesryn (allies)",
      "The khagan's court",
    ],
    arcSummary:
      "Hasar moves through Tower of Dawn's intrigue as a royal player who can wound with words or with armies. Her arc bends from self-interest toward a clearer stake in the war threatening every continent.",
    arcByBook: [
      {
        minBook: 5,
        text: "In Antica she tests Chaol's company with barbs and politics, then chooses where the khaganate's strength must stand.",
      },
    ],
    askPrompt: "Who is Hasar?",
    species: "Human",
    allegiance: "Southern Continent khaganate",
    powers: ["Political influence", "Military resources", "Court strategy"],
    traits: ["sharp", "ambitious", "witty", "proud", "calculating", "formidable"],
    appearance:
      "Regal and striking, dressed in the rich styles of the southern court, with eyes that inventory every weakness in a room. She looks like a princess who has never mistaken kindness for naivety.",
    personality:
      "She is blunt, often cutting, and rarely impressed. Beneath the pride sits a strategist's clarity: she will aid a cause when it serves her people, and she does not pretend otherwise.",
    notableFor:
      "Wielding khaganate politics with ruthless clarity and becoming an essential southern ally in the fight against the Valg.",
    mood: "dawn",
    accent: "#d4a017",
  },
  {
    slug: "kashin",
    name: "Kashin",
    shortName: "Kashin",
    aliases: ["Prince Kashin", "Prince of the khaganate"],
    image: "/images/characters/kashin.png",
    blurb:
      "A khaganate prince of steady hands and quieter ambition than his siblings. Soldierly, sincere, and easy to underestimate in a court of louder stars, he proves that reliable courage can turn the course of alliances.",
    relationships: [
      "Sartaq (brother)",
      "Hasar (sister)",
      "Chaol and Yrene (allies)",
      "Nesryn (ally)",
    ],
    arcSummary:
      "Kashin offers the southern continent a different royal face: less spectacle, more steadfast help. In the war's widening map he stands as a prince willing to fight beside foreign friends for a shared survival.",
    arcByBook: [
      {
        minBook: 5,
        text: "In Antica and the campaigns beyond, he supports Chaol's company and the larger stand against darkness threatening the khaganate.",
      },
    ],
    askPrompt: "Who is Kashin?",
    species: "Human",
    allegiance: "Southern Continent khaganate",
    powers: ["Military command", "Royal authority", "Battlefield experience"],
    traits: ["honorable", "steady", "sincere", "brave", "modest", "loyal"],
    appearance:
      "A soldier-prince's build and an open expression that contrasts Hasar's edge and Sartaq's wind-worn command. He looks most at ease in armor or on campaign, less interested in mirrors than in maps.",
    personality:
      "Straightforward and kind without performance, he prefers clear loyalty to court games. Where others scheme, Kashin shows up: a rare and valuable thing in royal halls.",
    notableFor:
      "Standing as a sincere khaganate prince and military ally to Chaol's cause during the southern war against Valg threat.",
    mood: "dawn",
    accent: "#b08d57",
  },
];

export function getCharacter(slug: string) {
  return characters.find((c) => c.slug === slug);
}
