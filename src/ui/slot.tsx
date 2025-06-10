import { type Slot } from "../lib/definitions"

export function Slot({ slot }: { slot: Slot }) {
  return (
    <div className="item">
      {slot.value}
    </div>
  )
}
