import { type TCabinet } from "../lib/definitions"
import { Shelf } from "../ui"

export function Cabinet({ cabinet }: { cabinet: TCabinet }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      background: "#aaa",
      padding: "10px",
    }}>
      {cabinet.map((shelf, index) => (
        <Shelf shelf={shelf} key={index} />  
      ))}
    </div>
  )
}
