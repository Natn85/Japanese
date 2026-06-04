export interface KanjiEntry {
  kanji: string;
  meaning: string;
  /** On'yomi — the Chinese-derived reading, written in katakana. */
  onyomi: string;
  /** Kun'yomi — the native Japanese reading, written in hiragana. */
  kunyomi: string;
  group: string;
}

export const kanji: KanjiEntry[] = [
  // Numbers
  { kanji: "一", meaning: "one",   onyomi: "イチ", kunyomi: "ひと(つ)",  group: "Numbers" },
  { kanji: "二", meaning: "two",   onyomi: "ニ",   kunyomi: "ふた(つ)",  group: "Numbers" },
  { kanji: "三", meaning: "three", onyomi: "サン", kunyomi: "み(っつ)",  group: "Numbers" },
  { kanji: "四", meaning: "four",  onyomi: "シ",   kunyomi: "よん",      group: "Numbers" },
  { kanji: "五", meaning: "five",  onyomi: "ゴ",   kunyomi: "いつ(つ)",  group: "Numbers" },
  { kanji: "六", meaning: "six",   onyomi: "ロク", kunyomi: "む(っつ)",  group: "Numbers" },
  { kanji: "七", meaning: "seven", onyomi: "シチ", kunyomi: "なな(つ)",  group: "Numbers" },
  { kanji: "八", meaning: "eight", onyomi: "ハチ", kunyomi: "や(っつ)",  group: "Numbers" },
  { kanji: "九", meaning: "nine",  onyomi: "キュウ", kunyomi: "ここの(つ)", group: "Numbers" },
  { kanji: "十", meaning: "ten",   onyomi: "ジュウ", kunyomi: "とお",     group: "Numbers" },

  // Days & Elements (these double as the days of the week)
  { kanji: "日", meaning: "day, sun",     onyomi: "ニチ", kunyomi: "ひ",   group: "Days & Elements" },
  { kanji: "月", meaning: "month, moon",  onyomi: "ゲツ", kunyomi: "つき",  group: "Days & Elements" },
  { kanji: "火", meaning: "fire",         onyomi: "カ",   kunyomi: "ひ",   group: "Days & Elements" },
  { kanji: "水", meaning: "water",        onyomi: "スイ", kunyomi: "みず",  group: "Days & Elements" },
  { kanji: "木", meaning: "tree, wood",   onyomi: "モク", kunyomi: "き",   group: "Days & Elements" },
  { kanji: "金", meaning: "gold, money",  onyomi: "キン", kunyomi: "かね",  group: "Days & Elements" },
  { kanji: "土", meaning: "earth, soil",  onyomi: "ド",   kunyomi: "つち",  group: "Days & Elements" },

  // Nature
  { kanji: "山", meaning: "mountain",   onyomi: "サン", kunyomi: "やま",  group: "Nature" },
  { kanji: "川", meaning: "river",      onyomi: "セン", kunyomi: "かわ",  group: "Nature" },
  { kanji: "田", meaning: "rice field", onyomi: "デン", kunyomi: "た",   group: "Nature" },

  // People & Size
  { kanji: "人", meaning: "person", onyomi: "ジン", kunyomi: "ひと",     group: "People & Size" },
  { kanji: "大", meaning: "big",    onyomi: "ダイ", kunyomi: "おお(きい)", group: "People & Size" },
  { kanji: "小", meaning: "small",  onyomi: "ショウ", kunyomi: "ちい(さい)", group: "People & Size" },
  { kanji: "中", meaning: "middle", onyomi: "チュウ", kunyomi: "なか",   group: "People & Size" },

  // Position & Body
  { kanji: "上", meaning: "up, above",  onyomi: "ジョウ", kunyomi: "うえ", group: "Position & Body" },
  { kanji: "下", meaning: "down, below", onyomi: "カ",   kunyomi: "した", group: "Position & Body" },
  { kanji: "口", meaning: "mouth",      onyomi: "コウ",  kunyomi: "くち", group: "Position & Body" },
  { kanji: "目", meaning: "eye",        onyomi: "モク",  kunyomi: "め",  group: "Position & Body" },
];

export const groupOrder = [
  "Numbers",
  "Days & Elements",
  "Nature",
  "People & Size",
  "Position & Body",
];

export function groupByGroup(entries: KanjiEntry[]): Record<string, KanjiEntry[]> {
  return entries.reduce<Record<string, KanjiEntry[]>>((acc, entry) => {
    if (!acc[entry.group]) acc[entry.group] = [];
    acc[entry.group].push(entry);
    return acc;
  }, {});
}
