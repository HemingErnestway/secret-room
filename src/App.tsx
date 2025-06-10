import { type Level } from "./lib/definitions"
import { Cabinet } from "./ui"
import { generateCabinet } from "./lib/functions"

export function App() {
  const level: Level = {
    shelves: 6,
    itemSlots: 5,
  }

  const cabinet = generateCabinet(level)

  return (
    <div className="game">
      <Cabinet cabinet={cabinet} />
    </div>
  )
}
