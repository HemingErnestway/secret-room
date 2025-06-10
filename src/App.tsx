import { EMOJI_OBJECTS } from "./lib/constants";
import { type FixedArray, type TCabinet, type TShelf, type Emoji } from "./lib/definitions";
import { Cabinet } from "./ui"
import _ from "lodash"

export function createEmptyShelf(): TShelf {
  return ["", "", "", "", ""]
}

const MOCK_SHELF: TShelf = [
  ...(_.sampleSize(EMOJI_OBJECTS, 3) as FixedArray<Emoji, 3>),
  "", 
  "",
]

export function App() {
  const cabinet: TCabinet = [
    createEmptyShelf(),
    createEmptyShelf(),
    createEmptyShelf(),
    MOCK_SHELF,
    createEmptyShelf(),
    createEmptyShelf(),
  ]

  return (
    <div className="game">
      <Cabinet cabinet={cabinet} />
    </div>
  )
}
