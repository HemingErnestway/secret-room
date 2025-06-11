import { 
  type EmojiData, 
  type Item, 
  type Empty,
  type Locked,
  type Slot,
  type Shelf, 
  type Cabinet, 
  type Level,
  type ItemsForLevel,
} from "../lib/definitions"

import { EMOJI_OBJECTS } from "./constants"
import _ from "lodash"

/** Get emoji as Item from unicode code point e.g. "U+1F52E" -> 🔮 */
export function stringFromCodePoint(codePoint: string): Item {
  const codePointNumber = Number("0x" + codePoint.slice(2))
  return { 
    content: "item",
    value: String.fromCodePoint(codePointNumber),
    hidden: false,
  } 
}

/** Extract all code points from data and treat them as emojis */
export function parseEmojis(emojiData: EmojiData[]): Item[] {
  return emojiData.map(ed => stringFromCodePoint(ed.unicode[0]))
}

/** Pack flat array of items: 5 items to 6 shelves. Start from cabinet's center */
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

/** Generate items for given level, as well as fake items for guessing */
export function generateItemsForLevel(level: Level): ItemsForLevel {
  const unlockedSlotCount = (level.shelves - 1) * 5  + level.slots
  const realItemCount = Math.ceil(unlockedSlotCount / 2)
  const itemsToBePickedCount = Math.floor(realItemCount / 2)

  const itemsSample = _.sampleSize(EMOJI_OBJECTS, realItemCount * 2 - itemsToBePickedCount)

  return { 
    real: _.slice(itemsSample, 0, realItemCount),
    fake: _.slice(itemsSample, realItemCount, itemsSample.length),
    pick: itemsToBePickedCount,
  }
}

/** Place items in the cabinet randomly */
export function generateCabinet(level: Level, items: Item[]): Cabinet {
  const unlockedSlotCount = (level.shelves - 1) * 5  + level.slots
  const itemCount = items.length

  const emptySlots: Empty[] = Array.from(
    { length: unlockedSlotCount - itemCount }, () => ({ content: "empty" })
  )

  const unlockedSlots: Slot[] = [...items, ...emptySlots]
  const shuffledUnlockedSlots = _.shuffle(unlockedSlots)

  const lockedSlots: Locked[] = Array.from(
    { length: 5 * 6 - unlockedSlotCount }, () => ({ content: "locked" })
  )

  return packShelves([...shuffledUnlockedSlots, ...lockedSlots])
}
