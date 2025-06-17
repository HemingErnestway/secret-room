import { KIWI, MOCK_SHELF } from "../lib/constants"
import { type Level } from "../lib/definitions"
import { Shelf, Slot } from "../ui"

export function ResultScreen({ level }: { level: Level }) {
  const score = ((level.shelves * 5 + level.slots - 1) * 3 + level.attempts) * 10

  return (
    <div className="result-screen">
      <Shelf shelf={MOCK_SHELF} />
      <h2>Score: {score}</h2>
      <Slot slot={KIWI} />
    </div>
  )
}