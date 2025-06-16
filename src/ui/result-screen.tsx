import { type Level } from "../lib/definitions"

type Props = {
  level: Level;
  handleRestart: () => void;
}

export function ResultScreen({ level, handleRestart }: Props) {
  const score = ((level.shelves * 5 + level.slots - 1) * 3 + level.attempts) * 10

  return (
    <div className="result-screen">
      <h2>Score: {score}</h2>
      <button onClick={handleRestart}>
        Restart
      </button>
    </div>
  )
}