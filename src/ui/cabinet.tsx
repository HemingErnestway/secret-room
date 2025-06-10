import { type Cabinet } from "../lib/definitions"
import { Shelf } from "../ui"

export function Cabinet({ cabinet }: { cabinet: Cabinet }) {
  return (
    <div className="cabinet">
      {cabinet.map((shelf, index) => (
        <Shelf shelf={shelf} key={index} />
      ))}
    </div>
  )
}
