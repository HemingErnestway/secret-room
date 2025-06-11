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
  shelves: number;
  slots: number;
  attempts: number;
}

export type Item = { 
  content: "item";
  value: string;
  hidden: boolean;
}

export type Empty = { 
  content: "empty";
}

export type Locked = { 
  content: "locked";
}

export type Slot = Item | Empty | Locked
export type PickerSlot = Slot

export type Shelf = FixedArray<Slot, 5>
export type Cabinet = FixedArray<Shelf, 6>

export type ItemsForLevel = {
  real: Item[];
  fake: Item[];
  pick: number,
}
