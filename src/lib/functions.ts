import { 
  type EmojiData, 
  type Item, 
  type Empty,
  type Locked,
  type Slot,
  type Shelf, 
  type Cabinet, 
  type Level,
} from "../lib/definitions"

import { EMOJI_OBJECTS } from "./constants"
import _ from "lodash"

/** Get actual string from unicode code point e.g. "U+1F52E" -> 🔮 */
export function stringFromCodePoint(codePoint: string): Item {
  const codePointNumber = Number("0x" + codePoint.slice(2))
  return { value: String.fromCodePoint(codePointNumber) } 
}

/** Extract all code points from data and treat them as emojis */
export function parseEmojis(emojiData: EmojiData[]): Item[] {
  return emojiData.map(ed => stringFromCodePoint(ed.unicode[0]))
}

export function packShelves(slots: Slot[]): Cabinet {
  const result = []

  for (let i = 0; i < slots.length; i += 5) {
    result.push(slots.slice(i, i + 5) as Shelf)
  }

  return [
    result[4],
    result[2],
    result[0],
    result[1],
    result[3],
    result[5],
  ] as Cabinet
}

export function generateCabinet(level: Level): Cabinet {
  const unlockedSlotCount = (level.shelves - 1) * 5  + level.itemSlots
  const lockedSlotCount = 5 * 6 - unlockedSlotCount

  const itemCount = Math.ceil(unlockedSlotCount / 2)
  const emptyCount = unlockedSlotCount - itemCount

  const items: Item[] = _.sampleSize(EMOJI_OBJECTS, itemCount)
  const emptySlots: Empty[] = Array.from({ length: emptyCount }, () => ({ value: "" }))
  const unlockedSlots: Slot[] = [...items, ...emptySlots]
  const shuffledUnlockedSlots = _.shuffle(unlockedSlots)

  const lockedSlots: Locked[] = Array.from({ length: lockedSlotCount }, () => ({ value: null }))
  const slots = [...shuffledUnlockedSlots, ...lockedSlots]
  return packShelves(slots)
}
