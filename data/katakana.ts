export interface KatakanaEntry {
  kana: string;
  romaji: string;
  row: string;
}

export const katakana: KatakanaEntry[] = [
  // Vowels
  { kana: "ア", romaji: "a",  row: "Vowels" },
  { kana: "イ", romaji: "i",  row: "Vowels" },
  { kana: "ウ", romaji: "u",  row: "Vowels" },
  { kana: "エ", romaji: "e",  row: "Vowels" },
  { kana: "オ", romaji: "o",  row: "Vowels" },

  // K-row
  { kana: "カ", romaji: "ka", row: "K-row" },
  { kana: "キ", romaji: "ki", row: "K-row" },
  { kana: "ク", romaji: "ku", row: "K-row" },
  { kana: "ケ", romaji: "ke", row: "K-row" },
  { kana: "コ", romaji: "ko", row: "K-row" },

  // S-row
  { kana: "サ", romaji: "sa",  row: "S-row" },
  { kana: "シ", romaji: "shi", row: "S-row" },
  { kana: "ス", romaji: "su",  row: "S-row" },
  { kana: "セ", romaji: "se",  row: "S-row" },
  { kana: "ソ", romaji: "so",  row: "S-row" },

  // T-row
  { kana: "タ", romaji: "ta",  row: "T-row" },
  { kana: "チ", romaji: "chi", row: "T-row" },
  { kana: "ツ", romaji: "tsu", row: "T-row" },
  { kana: "テ", romaji: "te",  row: "T-row" },
  { kana: "ト", romaji: "to",  row: "T-row" },

  // N-row
  { kana: "ナ", romaji: "na", row: "N-row" },
  { kana: "ニ", romaji: "ni", row: "N-row" },
  { kana: "ヌ", romaji: "nu", row: "N-row" },
  { kana: "ネ", romaji: "ne", row: "N-row" },
  { kana: "ノ", romaji: "no", row: "N-row" },

  // H-row
  { kana: "ハ", romaji: "ha", row: "H-row" },
  { kana: "ヒ", romaji: "hi", row: "H-row" },
  { kana: "フ", romaji: "fu", row: "H-row" },
  { kana: "ヘ", romaji: "he", row: "H-row" },
  { kana: "ホ", romaji: "ho", row: "H-row" },

  // M-row
  { kana: "マ", romaji: "ma", row: "M-row" },
  { kana: "ミ", romaji: "mi", row: "M-row" },
  { kana: "ム", romaji: "mu", row: "M-row" },
  { kana: "メ", romaji: "me", row: "M-row" },
  { kana: "モ", romaji: "mo", row: "M-row" },

  // Y-row
  { kana: "ヤ", romaji: "ya", row: "Y-row" },
  { kana: "ユ", romaji: "yu", row: "Y-row" },
  { kana: "ヨ", romaji: "yo", row: "Y-row" },

  // R-row
  { kana: "ラ", romaji: "ra", row: "R-row" },
  { kana: "リ", romaji: "ri", row: "R-row" },
  { kana: "ル", romaji: "ru", row: "R-row" },
  { kana: "レ", romaji: "re", row: "R-row" },
  { kana: "ロ", romaji: "ro", row: "R-row" },

  // W-row
  { kana: "ワ", romaji: "wa", row: "W-row" },
  { kana: "ヲ", romaji: "wo", row: "W-row" },

  // N (standalone)
  { kana: "ン", romaji: "n",  row: "N" },
];

export const rowOrder = [
  "Vowels", "K-row", "S-row", "T-row", "N-row",
  "H-row", "M-row", "Y-row", "R-row", "W-row", "N",
];

export function groupByRow(entries: KatakanaEntry[]): Record<string, KatakanaEntry[]> {
  return entries.reduce<Record<string, KatakanaEntry[]>>((acc, entry) => {
    if (!acc[entry.row]) acc[entry.row] = [];
    acc[entry.row].push(entry);
    return acc;
  }, {});
}
