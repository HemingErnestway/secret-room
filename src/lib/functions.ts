import { type Emoji, type EmojiData } from "../lib/definitions"

/** Get actual string from unicode code point e.g. "U+1F52E" -> 🔮 */
export function stringFromCodePoint(codePoint: string): Emoji {
  const codePointNumber = Number("0x" + codePoint.slice(2))
  return String.fromCodePoint(codePointNumber) 
}

/** Extract unicode code points of all emojis presented */
export function parseEmojis(emojiData: EmojiData[]): Emoji[] {
  return emojiData.map(ed => stringFromCodePoint(ed.unicode[0]))
}
