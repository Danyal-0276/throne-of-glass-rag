export type Mood = "dawn" | "ember" | "shadow" | "void";

export type ArcByBook = {
  minBook: number;
  text: string;
};

export type Character = {
  slug: string;
  name: string;
  shortName: string;
  aliases: string[];
  image: string;
  blurb: string;
  relationships: string[];
  arcSummary: string;
  arcByBook: ArcByBook[];
  askPrompt: string;
  species: string;
  allegiance: string;
  powers: string[];
  mood: Mood;
  accent?: string;
};

export type Villain = {
  slug: string;
  name: string;
  shortName: string;
  titles: string[];
  image: string;
  blurb: string;
  affiliation: string;
  domain: string;
  motivations: string;
  conflicts: string[];
  askPrompt: string;
  mood: Mood;
  accent?: string;
  minBook?: number;
};

export type Location = {
  slug: string;
  name: string;
  region: string;
  image: string;
  blurb: string;
  aesthetics: string[];
  askPrompt: string;
  rulingPower: string;
  climate: string;
  significance: string;
  mood: Mood;
  accent?: string;
};

export type TimelineBeat = {
  id: string;
  title: string;
  summary: string;
  minBook: number;
};

export type TimelineBook = {
  bookNumber: number;
  title: string;
  subtitle: string;
  beats: TimelineBeat[];
};
