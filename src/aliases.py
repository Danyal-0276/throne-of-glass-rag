"""
Character / place alias expansion for Throne of Glass queries.

Drawn from common fandom / wiki name variants (Aelin's many aliases, titles,
Cadre, Thirteen, etc.). If any trigger appears in the question, related names
are appended so embedding can match passages that use a different label.
"""

from __future__ import annotations

import re

# Each group: triggers (lowercase, matched as whole words / phrases) + expand terms
# Sources: Throne of Glass Wiki, Wikipedia character list, common fan title lists
ALIAS_GROUPS: list[dict] = [
    {
        "triggers": [
            "aelin",
            "celaena",
            "celaena sardothien",
            "aelin galathynius",
            "aelin ashryver",
            "fireheart",
            "fire-bringer",
            "firebringer",
            "lillian",
            "lillian gordaina",
            "elentiya",
            "diana brackyn",
            "dianna brackyn",
            "laena",
            "adarlan's assassin",
            "adarlans assassin",
            "king's champion",
            "kings champion",
            "witch killer",
            "fbbq",
            "fire-breathing bitch queen",
        ],
        "expand": [
            "Aelin",
            "Aelin Ashryver Whitethorn Galathynius",
            "Aelin Galathynius",
            "Celaena",
            "Celaena Sardothien",
            "Lillian Gordaina",
            "Elentiya",
            "Diana Brackyn",
            "Fireheart",
            "Heir of Fire",
            "Heir of Mala",
            "Queen of Terrasen",
            "Adarlan's Assassin",
            "King's Champion",
            "Ashryver",
            "Galathynius",
        ],
    },
    {
        "triggers": [
            "rowan",
            "rowan whitethorn",
            "whitethorn",
            "buzzard",
            "prince of doranelle",
        ],
        "expand": [
            "Rowan",
            "Rowan Whitethorn",
            "Rowan Whitethorn Galathynius",
            "Whitethorn",
            "Buzzard",
            "Prince of Doranelle",
            "King of Terrasen",
            "Cadre",
        ],
    },
    {
        "triggers": [
            "dorian",
            "dorian havilliard",
            "havilliard",
            "prince of adarlan",
            "king of adarlan",
        ],
        "expand": [
            "Dorian",
            "Dorian Havilliard",
            "Dorian Havilliard II",
            "Prince of Adarlan",
            "King of Adarlan",
            "Havilliard",
        ],
    },
    {
        "triggers": [
            "chaol",
            "chaol westfall",
            "westfall",
            "captain of the guard",
            "hand of the king",
        ],
        "expand": [
            "Chaol",
            "Chaol Westfall",
            "Westfall",
            "Captain of the Guard",
            "Hand of the King",
        ],
    },
    {
        "triggers": [
            "manon",
            "manon blackbeak",
            "blackbeak",
            "wing leader",
            "wingleader",
            "crochan queen",
            "last crochan",
            "witchling",
        ],
        "expand": [
            "Manon",
            "Manon Blackbeak",
            "Manon Blackbeak Crochan",
            "Blackbeak",
            "Wing Leader",
            "The Thirteen",
            "Last Crochan Queen",
            "Ironteeth",
            "Abraxos",
        ],
    },
    {
        "triggers": ["abraxos", "wyvern"],
        "expand": ["Abraxos", "Manon", "Manon Blackbeak", "wyvern", "Ironteeth"],
    },
    {
        "triggers": ["aedion", "aedion ashryver", "general of the bane", "the bane"],
        "expand": [
            "Aedion",
            "Aedion Ashryver",
            "Ashryver",
            "General of the Bane",
            "Prince of Wendlyn",
            "Terrasen",
        ],
    },
    {
        "triggers": ["lysandra", "lady of caraverre", "caraverre"],
        "expand": [
            "Lysandra",
            "Lysandra Ennar",
            "Lady of Caraverre",
            "shape-shifter",
            "courtesan",
        ],
    },
    {
        "triggers": ["elide", "elide lochan", "lady of perranth", "perranth"],
        "expand": [
            "Elide",
            "Elide Lochan",
            "Lady of Perranth",
            "Perranth",
            "Marion Lochan",
            "Vernon Lochan",
        ],
    },
    {
        "triggers": ["lorcan", "lorcan salvaterre", "salvaterre"],
        "expand": [
            "Lorcan",
            "Lorcan Salvaterre",
            "Salvaterre",
            "Cadre",
            "demi-Fae",
            "Maeve",
        ],
    },
    {
        "triggers": ["fenrys", "fenrys moonbeam", "moonbeam"],
        "expand": ["Fenrys", "Fenrys Moonbeam", "Cadre", "Maeve", "Connall"],
    },
    {
        "triggers": ["connall"],
        "expand": ["Connall", "Fenrys", "Cadre", "Maeve"],
    },
    {
        "triggers": ["gavriel", "the lion"],
        "expand": ["Gavriel", "Lion", "Cadre", "Aedion", "Maeve"],
    },
    {
        "triggers": ["vaughan"],
        "expand": ["Vaughan", "Cadre", "Maeve"],
    },
    {
        "triggers": ["yrene", "yrene towers", "silba", "torre cesme"],
        "expand": [
            "Yrene",
            "Yrene Towers",
            "Yrene Towers Westfall",
            "Silba's Heir",
            "Torre Cesme",
            "Antica",
        ],
    },
    {
        "triggers": ["nesryn", "nesryn faliq", "faliq"],
        "expand": ["Nesryn", "Nesryn Faliq", "Captain of the Guard", "Rifthold", "Sartaq"],
    },
    {
        "triggers": ["sartaq", "winged prince", "rukhin", "ruk"],
        "expand": [
            "Sartaq",
            "Winged Prince",
            "rukhin",
            "Southern Continent",
            "Khaganate",
            "Kadara",
        ],
    },
    {
        "triggers": ["hasar", "kashin", "duva", "arghun", "urhsi"],
        "expand": ["Hasar", "Kashin", "Duva", "Arghun", "Urus", "Khagan", "Antica"],
    },
    {
        "triggers": ["asterin", "asterin blackbeak"],
        "expand": ["Asterin", "Asterin Blackbeak", "The Thirteen", "Manon", "Blackbeak"],
    },
    {
        "triggers": [
            "the thirteen",
            "thirteen",
            "sorrel",
            "vesta",
            "ghislaine",
            "imogen",
            "thea",
            "edda",
            "briar",
            "kaya",
            "linnea",
        ],
        "expand": [
            "The Thirteen",
            "Manon Blackbeak",
            "Asterin Blackbeak",
            "Sorrel",
            "Vesta",
            "Ghislaine",
            "Imogen",
            "Blackbeak coven",
        ],
    },
    {
        "triggers": ["maeve", "queen of the fae", "doranelle", "dark queen"],
        "expand": [
            "Maeve",
            "Queen of the Fae",
            "Doranelle",
            "Valg",
            "Cadre",
            "Wyrdkeys",
        ],
    },
    {
        "triggers": ["erawan", "valg king", "valg", "morath"],
        "expand": [
            "Erawan",
            "Valg",
            "Valg king",
            "Morath",
            "Duke Perrington",
            "Wyrdkeys",
            "ilken",
        ],
    },
    {
        "triggers": [
            "perrington",
            "duke perrington",
            "vernon",
            "vernon lochan",
        ],
        "expand": ["Duke Perrington", "Erawan", "Vernon Lochan", "Morath", "Valg"],
    },
    {
        "triggers": ["arobynn", "arobynn hamel", "king of the assassins"],
        "expand": [
            "Arobynn",
            "Arobynn Hamel",
            "King of the Assassins",
            "Assassin's Keep",
            "Rifthold",
        ],
    },
    {
        "triggers": ["nehemia", "nehemia ytger", "ytger", "eylwe"],
        "expand": ["Nehemia", "Nehemia Ytger", "Princess of Eyllwe", "Eyllwe", "Wyrdmarks"],
    },
    {
        "triggers": ["kaltain", "kaltain rompier", "rompier"],
        "expand": ["Kaltain", "Kaltain Rompier", "shadowfire", "Morath", "Duke Perrington"],
    },
    {
        "triggers": ["sam", "sam cortland", "cortland"],
        "expand": ["Sam", "Sam Cortland", "Celaena", "Arobynn", "Assassin's Blade"],
    },
    {
        "triggers": ["ansel", "ansel of briarcliff", "briarcliff", "red desert"],
        "expand": ["Ansel", "Ansel of Briarcliff", "Red Desert", "Silent Assassins", "Celaena"],
    },
    {
        "triggers": ["elena", "elena galathynius", "gavin"],
        "expand": [
            "Elena",
            "Elena Galathynius",
            "Elena Havilliard",
            "Gavin Havilliard",
            "Brannon",
            "first queen",
        ],
    },
    {
        "triggers": ["brannon", "mala", "deanna", "gods"],
        "expand": ["Brannon", "Mala Fire-Bringer", "Deanna", "Elena", "Terrasen", "gods"],
    },
    {
        "triggers": ["orlon", "rhoe", "evalin"],
        "expand": [
            "Orlon Galathynius",
            "Rhoe Galathynius",
            "Evalin Ashryver",
            "Aelin",
            "Terrasen",
        ],
    },
    {
        "triggers": ["cairn"],
        "expand": ["Cairn", "Maeve", "Doranelle", "Aelin"],
    },
    {
        "triggers": ["baba yellowlegs", "yellowlegs", "ironteeth", "crochan"],
        "expand": [
            "Baba Yellowlegs",
            "Ironteeth",
            "Crochan",
            "Manon",
            "witches",
            "Blueblood",
        ],
    },
    {
        "triggers": ["fleetfoot"],
        "expand": ["Fleetfoot", "Celaena", "Chaol", "Dorian"],
    },
    {
        "triggers": ["endovier", "salt mines"],
        "expand": ["Endovier", "Celaena", "Adarlan", "salt mines"],
    },
    {
        "triggers": ["rifthold", "glass castle", "adarlan"],
        "expand": ["Rifthold", "Glass Castle", "Adarlan", "Dorian", "Chaol"],
    },
    {
        "triggers": ["terrasen", "oarion", "oakwald"],
        "expand": ["Terrasen", "Orynth", "Oakwald", "Aelin", "Aedion"],
    },
    {
        "triggers": ["wyrdkey", "wyrdkeys", "wyrdgate", "wyrdmark", "wyrdmarks"],
        "expand": ["Wyrdkey", "Wyrdkeys", "Wyrdgate", "Wyrdmarks", "Erawan", "Elena"],
    },
]

# Cap how many extra terms we append so the query embedding stays focused
_MAX_EXTRAS = 12


def _phrase_pattern(phrase: str) -> re.Pattern[str]:
    """Word-boundary-ish match for multi-word triggers."""
    parts = [re.escape(p) for p in phrase.split()]
    return re.compile(rf"\b{r'\s+'.join(parts)}\b", re.IGNORECASE)


def expand_query(question: str) -> str:
    """
    Append alias terms for any character/place names detected in the question.
    Returns the original question unchanged when no aliases match.
    """
    lower = question.lower()
    extras: list[str] = []
    seen: set[str] = {t.strip().lower() for t in re.findall(r"[a-z0-9']+", lower)}

    for group in ALIAS_GROUPS:
        matched = False
        for trigger in group["triggers"]:
            if _phrase_pattern(trigger).search(question):
                matched = True
                break
        if not matched:
            continue

        for alias in group["expand"]:
            alias_l = alias.lower()
            if alias_l in seen:
                continue
            # Skip if the full alias phrase already appears in the question
            if _phrase_pattern(alias_l).search(question):
                seen.add(alias_l)
                continue
            seen.add(alias_l)
            extras.append(alias)
            if len(extras) >= _MAX_EXTRAS:
                break
        if len(extras) >= _MAX_EXTRAS:
            break

    if not extras:
        return question

    return f"{question} (also known as: {', '.join(extras)})"


# Back-compat for anything that imported the old flat dict
CHARACTER_ALIASES: dict[str, list[str]] = {
    group["triggers"][0]: group["expand"] for group in ALIAS_GROUPS
}
