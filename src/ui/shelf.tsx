import { type TShelf } from "../lib/definitions"
import { Slot } from "../ui"

export function Shelf({ shelf }: { shelf: TShelf }) {
  return (
    <div className="shelf">
      {shelf.map(slot => (
        <Slot 
          slot={slot} 
          key={`slot-${slot.id}`} 
        />
      ))}
    </div>
  )
}
