import { type TShelf } from "../lib/definitions"
import { Slot } from "../ui"

export function Shelf({ shelf }: { shelf: TShelf }) {
  return (
    <div style={{
      display: "flex",
      gap: "10px",
    }}>
      {shelf.map(slot => (
        <Slot 
          slot={slot} 
          key={`slot-${slot.id}`} 
        />
      ))}
    </div>
  )
}
