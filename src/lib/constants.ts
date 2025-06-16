// export const ITEM_IMAGES = Object.values(
//   import.meta.glob("/src/assets/items/*.png", {
//     eager: true,
//     import: "default",
//   })
// )

// export const LOCKED_BACKGROUND_IMAGES = Object.values(
//   import.meta.glob("/src/assets/locked-bg/*.svg", {
//     eager: true,
//     import: "default",
//   })
// )

import { type Item } from "./definitions";
import { useItemImages, useLockedBackgrounds } from "./hooks";

export const ITEM_IMAGES = useItemImages() 
export const LOCKED_BACKGROUNDS = useLockedBackgrounds()

export const ITEMS: Item[] = ITEM_IMAGES.map(image => ({
  content: "item",
  value: image ? image : "",
  hidden: false,
}))
