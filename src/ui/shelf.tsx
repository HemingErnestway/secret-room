import { type Shelf } from "../lib/definitions"
import { Slot } from "../ui"

export function Shelf({ shelf }: { shelf: Shelf }) {
  return (
    <div className="shelf">
      {shelf.map((slot, index) => (
        <Slot slot={slot} key={index} />
      ))} 
    </div>
  )
}
