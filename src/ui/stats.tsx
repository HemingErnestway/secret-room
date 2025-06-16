import { type Level } from "../lib/definitions"
import { formatTime } from "../lib/functions"
import { Indicator } from "./indicator"

type Props = {
  level: Level,
  timeLeft: number,
  strikes: number,
}

export function Stats({ level, timeLeft, strikes }: Props) {
  return (
    <div className="stats">
      <div>Time: {formatTime(timeLeft)}</div>
      <div>Level: {level.shelves}-{level.slots}</div>
      <Indicator indicator="attempt" value={level.attempts} />
      <Indicator indicator="strike" value={strikes} />
    </div>
  )
}
