import type { TimelineBook } from "./types";

export const timeline: TimelineBook[] = [
  {
    "bookNumber": 0.5,
    "title": "The Assassin's Blade",
    "subtitle": "Prequel novellas before the glass castle",
    "beats": [
      {
        "id": "tab-1",
        "title": "The Assassin and the Pirate Lord",
        "summary": "Celaena and Sam take a contract to Skull's Bay that reveals how dirty Arobynn's deals can get.",
        "minBook": 0.5
      },
      {
        "id": "tab-2",
        "title": "The Assassin and the Healer",
        "summary": "A wounded assassin in a desert outpost crosses paths with Yrene: kindness in a life built on blades.",
        "minBook": 0.5
      },
      {
        "id": "tab-3",
        "title": "The Assassin and the Desert",
        "summary": "Exile to the Red Desert forges new skills, new enemies, and a debt that will echo for years.",
        "minBook": 0.5
      },
      {
        "id": "tab-4",
        "title": "The Assassin and the Underworld",
        "summary": "Back in Rifthold's shadows, loyalty to the Guild is tested, and so is Celaena's heart.",
        "minBook": 0.5
      },
      {
        "id": "tab-5",
        "title": "The Assassin and the Empire",
        "summary": "A mission that should have been triumph becomes the wound that sends her toward Endovier.",
        "minBook": 0.5
      }
    ]
  },
  {
    "bookNumber": 1,
    "title": "Throne of Glass",
    "subtitle": "The assassin and the glass castle",
    "beats": [
      {
        "id": "tog-1",
        "title": "From Endovier to Rifthold",
        "summary": "Celaena is offered a deadly chance at freedom through the king's competition.",
        "minBook": 1
      },
      {
        "id": "tog-2",
        "title": "Champion's game",
        "summary": "Court intrigue, new allies, and a prize that is never only a prize.",
        "minBook": 1
      }
    ]
  },
  {
    "bookNumber": 2,
    "title": "Crown of Midnight",
    "subtitle": "Secrets under the glass",
    "beats": [
      {
        "id": "com-1",
        "title": "King's Champion",
        "summary": "Freedom has terms, and the castle's shadows grow teeth.",
        "minBook": 2
      },
      {
        "id": "com-2",
        "title": "Truths that cut",
        "summary": "Friendship, betrayal, and the cost of asking the wrong questions.",
        "minBook": 2
      }
    ]
  },
  {
    "bookNumber": 3,
    "title": "Heir of Fire",
    "subtitle": "Fire remembers",
    "beats": [
      {
        "id": "hof-1",
        "title": "Wendlyn training",
        "summary": "Celaena faces what she is with Rowan as reluctant tutor.",
        "minBook": 3
      },
      {
        "id": "hof-2",
        "title": "Witches and princes",
        "summary": "Elsewhere, Manon's host rises and Dorian's world cracks.",
        "minBook": 3
      }
    ]
  },
  {
    "bookNumber": 4,
    "title": "Queen of Shadows",
    "subtitle": "A name reclaimed",
    "beats": [
      {
        "id": "qos-1",
        "title": "Return to Rifthold",
        "summary": "Aelin brings fire home and gathers a court of survivors.",
        "minBook": 4
      },
      {
        "id": "qos-2",
        "title": "Collars and crowns",
        "summary": "Adarlan's grip slips, violently.",
        "minBook": 4
      }
    ]
  },
  {
    "bookNumber": 5,
    "title": "Empire of Storms",
    "subtitle": "Keys and storms",
    "beats": [
      {
        "id": "eos-1",
        "title": "Sea and siege",
        "summary": "Alliances strain as the hunt for power accelerates.",
        "minBook": 5
      },
      {
        "id": "eos-2",
        "title": "Bargains",
        "summary": "Aelin gambles everything on a future she may not see.",
        "minBook": 5
      }
    ]
  },
  {
    "bookNumber": 6,
    "title": "Tower of Dawn",
    "subtitle": "Healing under southern sun",
    "beats": [
      {
        "id": "tod-1",
        "title": "Antica",
        "summary": "Chaol seeks healing; Yrene discovers the scale of her gift.",
        "minBook": 6
      },
      {
        "id": "tod-2",
        "title": "Ruks and roads home",
        "summary": "The southern continent answers the war call.",
        "minBook": 6
      }
    ]
  },
  {
    "bookNumber": 7,
    "title": "Kingdom of Ash",
    "subtitle": "The end of the world, almost",
    "beats": [
      {
        "id": "koa-1",
        "title": "War for Erilea",
        "summary": "Armies converge; every oath is tested.",
        "minBook": 7
      },
      {
        "id": "koa-2",
        "title": "Fire and aftermath",
        "summary": "Costs come due, and a kingdom must learn how to live.",
        "minBook": 7
      }
    ]
  }
];

export const BOOK_ORDER: number[] = timeline.map((b) => b.bookNumber);

export const BOOK_TITLES: Record<number, string> = Object.fromEntries(
  timeline.map((b) => [b.bookNumber, b.title]),
);

export function formatBookLabel(n: number): string {
  if (n === 0.5) return "0.5";
  return String(n);
}
