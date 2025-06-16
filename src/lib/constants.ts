import type { Item } from "./definitions"

export const ITEMS: Item[] = 
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(value => ({ 
      content: "item", 
      value: value, 
      hidden: false,
    }))
