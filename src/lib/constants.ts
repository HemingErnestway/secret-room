import spriteMap from "../assets/items-sprite.json"
import type { Item, SpriteKey, TShelf } from "./definitions"
import { useLockedBackgrounds } from "./hooks"

export const LOCKED_BACKGROUNDS = useLockedBackgrounds()
export const SPRITE_KEYS: SpriteKey[] = Object.keys(spriteMap) as SpriteKey[]

export const ITEMS: Item[] = SPRITE_KEYS.map(spriteKey => ({
  content: "item",
  value: spriteKey,
  hidden: false,
}))

export const MOCK_SHELF: TShelf = [...Array(5).keys()].map(index => ({ 
  content: "locked", 
  id: index,
}))
