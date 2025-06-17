import itemSpriteMap from "../assets/items-sprite.json"
import lockedBgSpriteMap from "../assets/locked-bgs-sprite.json"

import type { Item, ItemSpriteKey, LockedBgSpriteKey, TShelf } from "./definitions"

const ITEM_SPRITE_KEYS = Object.keys(itemSpriteMap) as ItemSpriteKey[]
export const LOCKED_BG_SPRITE_KEYS = Object.keys(lockedBgSpriteMap) as LockedBgSpriteKey[]

export const ITEMS: Item[] = ITEM_SPRITE_KEYS.map(spriteKey => ({
  content: "item",
  value: spriteKey,
  hidden: false,
}))

export const MOCK_SHELF: TShelf = [...Array(5).keys()].map(index => ({ 
  content: "locked", 
  id: index,
}))
