import { type Emoji } from "../lib/definitions"

export function Item({ item }: { item: Emoji }) {
  return (
    <div className="item">
      {item}
    </div>
  )
}
