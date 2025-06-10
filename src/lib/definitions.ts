type GrowToSize<T, N extends number, A extends T[]> = 
  A['length'] extends N ? A : GrowToSize<T, N, [...A, T]>

export type FixedArray<T, N extends number> = GrowToSize<T, N, []>

export type EmojiData = {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
}

export type Level = {
  shelves: 1 | 2 | 3 | 4 | 5 | 6;
  itemSlots: 1 | 2 | 3 | 4 | 5;
}

export type Item = { value: string }
export type Empty = { value: "" }
export type Locked = { value: null }
export type Slot = Item | Empty | Locked
export type Shelf = FixedArray<Slot, 5>
export type Cabinet = FixedArray<Shelf, 6>
