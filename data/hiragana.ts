export interface HiraganaEntry {
  kana: string;
  romaji: string;
  row: string;
}

export const hiragana: HiraganaEntry[] = [
  // Vowels
  { kana: "あ", romaji: "a",  row: "Vowels" },
  { kana: "い", romaji: "i",  row: "Vowels" },
  { kana: "う", romaji: "u",  row: "Vowels" },
  { kana: "え", romaji: "e",  row: "Vowels" },
  { kana: "お", romaji: "o",  row: "Vowels" },

  // K-row
  { kana: "か", romaji: "ka", row: "K-row" },
  { kana: "き", romaji: "ki", row: "K-row" },
  { kana: "く", romaji: "ku", row: "K-row" },
  { kana: "け", romaji: "ke", row: "K-row" },
  { kana: "こ", romaji: "ko", row: "K-row" },

  // S-row
  { kana: "さ", romaji: "sa", row: "S-row" },
  { kana: "し", romaji: "shi", row: "S-row" },
  { kana: "す", romaji: "su", row: "S-row" },
  { kana: "せ", romaji: "se", row: "S-row" },
  { kana: "そ", romaji: "so", row: "S-row" },

  // T-row
  { kana: "た", romaji: "ta",  row: "T-row" },
  { kana: "ち", romaji: "chi", row: "T-row" },
  { kana: "つ", romaji: "tsu", row: "T-row" },
  { kana: "て", romaji: "te",  row: "T-row" },
  { kana: "と", romaji: "to",  row: "T-row" },

  // N-row
  { kana: "な", romaji: "na", row: "N-row" },
  { kana: "に", romaji: "ni", row: "N-row" },
  { kana: "ぬ", romaji: "nu", row: "N-row" },
  { kana: "ね", romaji: "ne", row: "N-row" },
  { kana: "の", romaji: "no", row: "N-row" },

  // H-row
  { kana: "は", romaji: "ha", row: "H-row" },
  { kana: "ひ", romaji: "hi", row: "H-row" },
  { kana: "ふ", romaji: "fu", row: "H-row" },
  { kana: "へ", romaji: "he", row: "H-row" },
  { kana: "ほ", romaji: "ho", row: "H-row" },

  // M-row
  { kana: "ま", romaji: "ma", row: "M-row" },
  { kana: "み", romaji: "mi", row: "M-row" },
  { kana: "む", romaji: "mu", row: "M-row" },
  { kana: "め", romaji: "me", row: "M-row" },
  { kana: "も", romaji: "mo", row: "M-row" },

  // Y-row
  { kana: "や", romaji: "ya", row: "Y-row" },
  { kana: "ゆ", romaji: "yu", row: "Y-row" },
  { kana: "よ", romaji: "yo", row: "Y-row" },

  // R-row
  { kana: "ら", romaji: "ra", row: "R-row" },
  { kana: "り", romaji: "ri", row: "R-row" },
  { kana: "る", romaji: "ru", row: "R-row" },
  { kana: "れ", romaji: "re", row: "R-row" },
  { kana: "ろ", romaji: "ro", row: "R-row" },

  // W-row
  { kana: "わ", romaji: "wa", row: "W-row" },
  { kana: "を", romaji: "wo", row: "W-row" },

  // N (standalone)
  { kana: "ん", romaji: "n",  row: "N" },
];

export const rowOrder = [
  "Vowels", "K-row", "S-row", "T-row", "N-row",
  "H-row", "M-row", "Y-row", "R-row", "W-row", "N",
];

export function groupByRow(entries: HiraganaEntry[]): Record<string, HiraganaEntry[]> {
  return entries.reduce<Record<string, HiraganaEntry[]>>((acc, entry) => {
    if (!acc[entry.row]) acc[entry.row] = [];
    acc[entry.row].push(entry);
    return acc;
  }, {});
}
