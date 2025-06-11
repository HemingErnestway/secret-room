import { type Level } from "../lib/definitions"
import { Indicator } from "../ui"

type Props = {
  level: Level;
  strikes: number;
  timeLeft: number;
}

export function Stats({ level, strikes, timeLeft }: Props) {
  return (
    <div className="stats">
      <div className="level">{timeLeft}</div>
      <div className="level">{level.shelves}-{level.slots}</div>
      <Indicator color="gold" value={level.attempts} />
      <Indicator color="red" value={strikes} />
    </div>
  )
}
