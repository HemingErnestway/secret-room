import _ from "lodash"
import { ITEMS } from "./constants"
import type { Level, Item, Empty, Locked, TSlot, TCabinet, ItemsForLevel, Round } from "./definitions"

export function generateItemsForLevel(level: Level): ItemsForLevel {
  const unlockedSlotCount = (level.shelves - 1) * 5  + level.slots
  const realItemCount = Math.ceil(unlockedSlotCount / 2)

  const itemsSample = _.sampleSize(
    ITEMS, 
    realItemCount * 2 - level.shelves,
  )

  return { 
    real: _.slice(itemsSample, 0, realItemCount),
    fake: _.slice(itemsSample, realItemCount, itemsSample.length),
  }
}

export function packShelves(slots: TSlot[]): TCabinet {
  const result = []

  for (let i = 0; i < slots.length; i += 5) {
    result.push(slots.slice(i, i + 5))
  }

  return [
    result[4], result[2], result[0], result[1], result[3], result[5]
  ] 
}

export function fillCabinet(level: Level, items: Item[]): TCabinet {
  const unlockedSlotCount = (level.shelves - 1) * 5  + level.slots
  const itemCount = items.length

  const emptySlots: Empty[] = Array.from(
    { length: unlockedSlotCount - itemCount }, () => ({ content: "empty" })
  )

  const unlockedSlots: (Item | Empty)[] = [...items, ...emptySlots]
  const shuffledUnlockedSlots = _.shuffle(unlockedSlots)

  const lockedSlots: Locked[] = Array.from(
    { length: 5 * 6 - unlockedSlotCount }, () => ({ content: "locked" })
  )

  const slots: TSlot[] = [...shuffledUnlockedSlots, ...lockedSlots]
    .map((slot, index) => ({ ...slot, id: index }))

  return packShelves(slots)
}

export function toggleHidden(cab: TCabinet, hide: boolean): TCabinet {
  return cab.map(shelf =>
    shelf.map(slot =>
      slot.content === "item" ? { ...slot, hidden: hide } : slot
    )
  )
}

export function revealExcept(cab: TCabinet, keepHidden: Set<string>): TCabinet {
  return cab.map(shelf =>
    shelf.map(slot =>
      slot.content === "item"
        ? { ...slot, hidden: keepHidden.has(slot.value) }
        : slot
    )
  )
}

export function revealByValue(cab: TCabinet, val: string): TCabinet {
  return cab.map(shelf =>
    shelf.map(slot =>
      slot.content === "item" && slot.value === val
        ? { ...slot, hidden: false }
        : slot
    )
  )
}

export function calcNextLevel(cur: Level): Level | null {
  const isLastLevel = cur.shelves === 6 && cur.slots === 5
  const currentShelfHasRoom = cur.slots < 5

  if (isLastLevel) return null

  if (currentShelfHasRoom) {
    return { 
      shelves: cur.shelves, 
      slots: cur.slots + 1,
      attempts: 1,
    }
  }
  
  return { 
    shelves: cur.shelves + 1, 
    slots: 1, 
    attempts: 1,
  }
}

export function makeRound(level: Level): Round {
  const items = generateItemsForLevel(level)
  const cabinet = fillCabinet(level, items.real)
  const itemsToPick = _.sampleSize(_.cloneDeep(items.real), level.shelves)

  return {
    items,
    cabinet,
    itemsToPick,
    pickerPool: buildPicker(itemsToPick, items.fake),
    remainingValues: new Set(itemsToPick.map(i => i.value)),
  }
}

export function shuffleUnlocked(cab: TCabinet): TCabinet {
  const flat: TSlot[] = cab.flat()
  const movableIdx: number[] = []
  const movable: TSlot[] = []

  flat.forEach((s, i) => {
    if (s.content !== "locked") {
      movableIdx.push(i)
      movable.push(s)
    }
  })

  const shuffled = _.shuffle(movable)
  const out = [...flat]

  movableIdx.forEach((pos, k) => {
    out[pos] = { ...shuffled[k], id: out[pos].id }
  })

  const reshaped: TCabinet = []

  for (let i = 0; i < 6; ++i) {
    reshaped.push(out.slice(i * 5, i * 5 + 5))
  }

  return reshaped
}

export function buildPicker(itemsToPick: Item[], fake: Item[]): TSlot[] {
  return _.shuffle(
    [...itemsToPick, ..._.cloneDeep(fake)])
      .map((slot, index) => ({ 
        ...slot, 
        id: index,
      })
  )
}

export function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = `${s % 60}`.padStart(2, "0")
  return `${m}:${sec}`
}

export function prepareCabinetForGuessing(
  cabinet: TSlot[][],
  remainingValues: Set<string>,
): TSlot[][] {
  const shuffled = shuffleUnlocked(cabinet)
  return revealExcept(shuffled, remainingValues)
}
