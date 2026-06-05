export interface Particle {
  particle: string;
  romaji: string;
  role: string;
  example: string;
  exampleRomaji: string;
  exampleEn: string;
}

// The core particles a beginner meets first. Romaji reflects pronunciation
// (は as "wa", を as "o", へ as "e") rather than the kana's usual reading.
export const particles: Particle[] = [
  {
    particle: "は",
    romaji: "wa",
    role: "Topic marker — “as for…”. Sets what the sentence is about.",
    example: "わたしは がくせいです。",
    exampleRomaji: "Watashi wa gakusei desu.",
    exampleEn: "As for me, I'm a student.",
  },
  {
    particle: "が",
    romaji: "ga",
    role: "Subject marker. Points to who or what does the action.",
    example: "ねこが います。",
    exampleRomaji: "Neko ga imasu.",
    exampleEn: "There is a cat.",
  },
  {
    particle: "を",
    romaji: "o",
    role: "Direct object. Marks the thing the verb acts on.",
    example: "みずを のみます。",
    exampleRomaji: "Mizu o nomimasu.",
    exampleEn: "I drink water.",
  },
  {
    particle: "に",
    romaji: "ni",
    role: "Destination, time, or indirect object. A point you move toward.",
    example: "がっこうに いきます。",
    exampleRomaji: "Gakkō ni ikimasu.",
    exampleEn: "I go to school.",
  },
  {
    particle: "で",
    romaji: "de",
    role: "Where an action happens, or the means used to do it.",
    example: "いえで たべます。",
    exampleRomaji: "Ie de tabemasu.",
    exampleEn: "I eat at home.",
  },
  {
    particle: "へ",
    romaji: "e",
    role: "Direction of movement. Interchangeable with に for destinations.",
    example: "とうきょうへ いきます。",
    exampleRomaji: "Tōkyō e ikimasu.",
    exampleEn: "I'm heading to Tokyo.",
  },
  {
    particle: "の",
    romaji: "no",
    role: "Possessive and connector — links two nouns, like “'s” or “of”.",
    example: "わたしの ほん。",
    exampleRomaji: "Watashi no hon.",
    exampleEn: "My book.",
  },
  {
    particle: "も",
    romaji: "mo",
    role: "“Also / too”. Replaces は or が to add another item.",
    example: "わたしも いきます。",
    exampleRomaji: "Watashi mo ikimasu.",
    exampleEn: "I'll go too.",
  },
  {
    particle: "と",
    romaji: "to",
    role: "“And” between nouns, or “with” a person.",
    example: "ともだちと いきます。",
    exampleRomaji: "Tomodachi to ikimasu.",
    exampleEn: "I go with a friend.",
  },
  {
    particle: "か",
    romaji: "ka",
    role: "Turns a statement into a question. Goes at the very end.",
    example: "がくせいですか。",
    exampleRomaji: "Gakusei desu ka.",
    exampleEn: "Are you a student?",
  },
];
