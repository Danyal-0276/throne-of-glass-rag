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
};

export type Location = {
  slug: string;
  name: string;
  region: string;
  image: string;
  blurb: string;
  aesthetics: string[];
  askPrompt: string;
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
