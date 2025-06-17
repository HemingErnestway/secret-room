import { MOCK_SHELF } from "../lib/constants"
import { type Level } from "../lib/definitions"
import { Shelf } from "./shelf"

export function ResultScreen({ level }: { level: Level }) {
  const score = ((level.shelves * 5 + level.slots - 1) * 3 + level.attempts) * 10

  return (
    <div className="result-screen">
      <div className="shelf-group">
        <Shelf shelf={MOCK_SHELF} />
        <Shelf shelf={MOCK_SHELF} />
      </div>
      <h2>Score: {score}</h2>
      <div className="shelf-group">
        <Shelf shelf={MOCK_SHELF} />
        <Shelf shelf={MOCK_SHELF} />
      </div>
    </div>
  )
}