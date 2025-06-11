import { type Slot } from "../lib/definitions"

export function Slot({ slot }: { slot: Slot }) {
  return (
    <div className={`slot ${slot.content === "locked" ? "locked" : ""}`}>
      {(slot.content === "item" && !slot.hidden) && slot.value}
    </div>
  )
}
