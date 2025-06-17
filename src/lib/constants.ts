import spriteMap from "../assets/items-sprite.json"
import type { Item, SpriteKey } from "./definitions"
import { useLockedBackgrounds } from "./hooks"

// export const ITEM_IMAGES = useItemImages() 
export const LOCKED_BACKGROUNDS = useLockedBackgrounds()
export const SPRITE_KEYS: SpriteKey[] = Object.keys(spriteMap) as SpriteKey[]

export const ITEMS: Item[] = SPRITE_KEYS.map(spriteKey => ({
  content: "item",
  value: spriteKey,
  hidden: false,
}))

