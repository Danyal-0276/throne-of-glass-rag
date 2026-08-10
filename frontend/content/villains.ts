import type { Villain } from "./types";

export const villains: Villain[] = [
  {
    slug: "king-of-adarlan",
    name: "The King of Adarlan",
    shortName: "King of Adarlan",
    titles: ["Conqueror of Erilea", "Banisher of Magic", "Father of Dorian"],
    image: "/images/villains/king-of-adarlan.png",
    blurb:
      "The iron fist behind Adarlan's conquest: magic outlawed, kingdoms broken, and a glass castle that glittered while the continent bled. Much of his cruelty is a human face for something older wearing the crown.",
    affiliation: "Adarlan · Valg influence",
    domain: "Rifthold · Glass Castle",
    motivations:
      "Empire without rivals, the erasure of magic, and absolute obedience from every border his armies touch.",
    conflicts: [
      "Aelin / Celaena",
      "Dorian Havilliard",
      "Terrasen's fall",
      "Magic-users across Erilea",
    ],
    askPrompt: "Who is the King of Adarlan?",
    traits: [
      "Tyrannical",
      "Coldly political",
      "Paranoid about magic",
      "A vessel for darker will",
    ],
    appearance:
      "A stern royal presence in Adarlan's colors: crown, court armor, and the unblinking authority of a conqueror who expects silence.",
    notableFor:
      "Crushing Terrasen, banning magic, and ruling as the public face of a war that was never only his.",
    mood: "shadow",
    accent: "#6b7280",
    minBook: 1,
  },
  {
    slug: "erawan",
    name: "Erawan",
    shortName: "Erawan",
    titles: ["Valg King", "Lord of Morath", "One of the Three"],
    image: "/images/villains/erawan.png",
    blurb:
      "One of the three Valg kings, the true darkness behind Adarlan's long conquest. Ilken, collars, and black-stone fortresses are tools in a war older than any mortal map.",
    affiliation: "Valg",
    domain: "Morath",
    motivations:
      "Dominion over Erilea and the unmaking of free will through Valg corruption, hosts, and fear.",
    conflicts: [
      "Aelin Galathynius",
      "Dorian Havilliard",
      "The Crochans and Ironteeth",
      "Anyone who still remembers magic",
    ],
    askPrompt: "Who is Erawan?",
    traits: [
      "Ancient",
      "Patient",
      "Cruel by design",
      "Hungry for vessels and keys",
    ],
    appearance:
      "A presence of void and borrowed flesh: darkness that wears a man's shape until the mask no longer matters.",
    notableFor:
      "The true architect behind Adarlan's empire, Morath's horrors, and the Valg war for Erilea.",
    mood: "void",
    accent: "#14532d",
    minBook: 4,
  },
  {
    slug: "maeve",
    name: "Maeve",
    shortName: "Maeve",
    titles: ["Queen of the Fae", "Queen of Doranelle", "Weaver of Blood Oaths"],
    image: "/images/villains/maeve.png",
    blurb:
      "Immortal Fae queen of Doranelle, beautiful as a blade and twice as sharp. She collects warriors with blood oaths and plays the long game across centuries.",
    affiliation: "Doranelle · Valg-touched legacy",
    domain: "Doranelle",
    motivations:
      "Power without witnesses, control of the Cadre, and secrets older than her glittering court admits.",
    conflicts: [
      "Aelin",
      "Rowan and the Cadre",
      "Lorcan",
      "Anyone who threatens her myths",
    ],
    askPrompt: "Who is Maeve?",
    traits: [
      "Manipulative",
      "Immortal patience",
      "Possessive of loyalty",
      "Myth-maker",
    ],
    appearance:
      "Dark-haired Fae beauty in moonlight silks and cold jewels: elegance that feels like a trap the moment you bow.",
    notableFor:
      "Binding the Cadre, rewriting history to suit her throne, and hunting what she cannot own.",
    mood: "shadow",
    accent: "#312e81",
    minBook: 3,
  },
  {
    slug: "duke-perrington",
    name: "Duke Perrington",
    shortName: "Perrington",
    titles: ["Duke of Morath", "Overseer of the South", "Valg host"],
    image: "/images/villains/duke-perrington.png",
    blurb:
      "Adarlan's southern fist, builder of nightmares at Morath and architect of experiments best left unnamed. His true allegiance is darker than court gossip suggests.",
    affiliation: "Adarlan / Valg",
    domain: "Morath",
    motivations:
      "Power through shadowfire, experimentation, and the Valg designs that wear his title like a coat.",
    conflicts: [
      "Kaltain Rompier",
      "Aelin's court",
      "The people of the southern marches",
    ],
    askPrompt: "Who is Duke Perrington?",
    traits: [
      "Sadistic",
      "Ambitious",
      "Scientifically cruel",
      "A mask for Erawan",
    ],
    appearance:
      "A towering court noble whose polish peels into something wrong: Morath's cold, and eyes that do not feel entirely human.",
    notableFor:
      "Building Morath into a forge of Valg war, and using Kaltain as both prize and weapon.",
    mood: "void",
    accent: "#3f3f46",
    minBook: 2,
  },
  {
    slug: "kaltain",
    name: "Kaltain Rompier",
    shortName: "Kaltain",
    titles: ["Lady Rompier", "Shadowfire", "Prisoner of Morath"],
    image: "/images/villains/kaltain.png",
    blurb:
      "A court climber reshaped into a weapon. Shadowfire and captivity rewrite who she is, and what she chooses to burn when agency returns.",
    affiliation: "Adarlan court to Valg-touched",
    domain: "Rifthold / Morath",
    motivations:
      "Survival, revenge, and reclaiming a self that court politics and Morath tried to hollow out.",
    conflicts: ["Duke Perrington", "Court rivals", "The machine of Morath"],
    askPrompt: "Who is Kaltain Rompier?",
    traits: [
      "Ambitious",
      "Broken and remade",
      "Capable of mercy and ruin",
      "Shadowfire-tempered",
    ],
    appearance:
      "Once a jeweled court beauty; later marked by captivity, shadowfire, and a stillness that warns before the burn.",
    notableFor:
      "Wielding shadowfire, surviving Morath's cruelty, and choosing how that power ends.",
    mood: "shadow",
    accent: "#581c87",
    minBook: 1,
  },
  {
    slug: "arobynn",
    name: "Arobynn Hamel",
    shortName: "Arobynn",
    titles: ["King of the Assassins", "Mentor of Celaena", "Master of the Guild"],
    image: "/images/villains/arobynn.png",
    blurb:
      "Rifthold's assassin king: polished, possessive, and expert at turning love into leverage. The early saga still wears his fingerprints.",
    affiliation: "Assassins' Guild · Rifthold underworld",
    domain: "Assassin's Keep, Rifthold",
    motivations:
      "Control of Celaena, wealth, and the Guild's supremacy over every shadow in the city.",
    conflicts: ["Celaena Sardothien", "Sam Cortland", "Guild rivals"],
    askPrompt: "Who is Arobynn Hamel?",
    traits: [
      "Charismatic",
      "Possessive",
      "Calculating",
      "Emotionally manipulative",
    ],
    appearance:
      "Immaculate coats, expensive steel, and a smile that looks like mentorship until it becomes ownership.",
    notableFor:
      "Raising Celaena into Adarlan's Assassin and treating loyalty as a debt that never clears.",
    mood: "shadow",
    accent: "#78350f",
    minBook: 0.5,
  },
  {
    slug: "cairn",
    name: "Cairn",
    shortName: "Cairn",
    titles: ["Witch hunter", "Valg-aligned tormentor", "Maeve's blade"],
    image: "/images/villains/cairn.png",
    blurb:
      "A sadist wrapped in duty, hunting witches and serving darker masters. Cruelty is not a side effect for him. It is the point.",
    affiliation: "Valg-aligned · Maeve's tools",
    domain: "Doranelle's shadow work",
    motivations:
      "Pain, obedience to power, and breaking whoever Maeve wants broken beyond repair.",
    conflicts: ["Aelin", "Fenrys", "Anyone caught in Maeve's nets"],
    askPrompt: "Who is Cairn?",
    traits: [
      "Sadistic",
      "Loyal to cruelty",
      "Methodical",
      "Without mercy",
    ],
    appearance:
      "A hard-edged warrior built for intimidation: armor, scars, and a face that enjoys the work too much.",
    notableFor:
      "Serving as Maeve's torturer and turning captivity into a prolonged act of breaking.",
    mood: "void",
    accent: "#44403c",
    minBook: 6,
  },
  {
    slug: "vernon",
    name: "Vernon Lochan",
    shortName: "Vernon",
    titles: ["Lord of Perranth (usurper)", "Elide's uncle", "Adarlan's creature"],
    image: "/images/villains/vernon.png",
    blurb:
      "A small man with large appetites for power. He steals Perranth's future and treats Elide as an obstacle to be sold.",
    affiliation: "Adarlan-aligned nobility",
    domain: "Perranth",
    motivations:
      "Titles, wealth, and favor from darker powers that promise both without asking what he is willing to sell.",
    conflicts: ["Elide Lochan", "Lorcan", "The true heirs of Perranth"],
    askPrompt: "Who is Vernon Lochan?",
    traits: [
      "Cowardly",
      "Greedy",
      "Cruel to the powerless",
      "Eager to please stronger monsters",
    ],
    appearance:
      "A soft noble who dresses like entitlement: rings, court cloth, and none of the courage his stolen title pretends to own.",
    notableFor:
      "Usurping Perranth and tormenting Elide in pursuit of Adarlan's favor.",
    mood: "shadow",
    accent: "#57534e",
    minBook: 5,
  },
];

export function getVillain(slug: string) {
  return villains.find((v) => v.slug === slug);
}
