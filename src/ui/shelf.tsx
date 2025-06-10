import { type TShelf } from "../lib/definitions"
import { Item } from "../ui"

export function Shelf({ shelf }: { shelf: TShelf }) {
  return (
    <div className="shelf">
      {shelf.map(item => (
        <Item item={item} key={item} />
      ))} 
    </div>
  )
}
