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

export type Level = { 
  shelves: number;
  slots: number;
  attempts: number;
}

export type ItemsForLevel = {
  real: Item[];
  fake: Item[];
}

export type GameStage = 
  | "start" 
  | "memorizing" 
  | "lightsOut"
  | "guessing" 
  | "result"

export type Round = {
  items: ItemsForLevel;
  cabinet: TCabinet;
  itemsToPick: Item[];
  pickerPool: TSlot[];
  remainingValues: Set<string>;
}

export type TSlot = (Item | Empty | Locked) & { id: number }
export type TShelf = TSlot[]
export type TCabinet = TShelf[]
