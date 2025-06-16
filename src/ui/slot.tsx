import { type TSlot } from "../lib/definitions"

export function Slot({ slot }: { slot: TSlot }) {
  const bg 
    = slot.content === "locked" ? "gray" 
    : slot.content === "empty" ? "lightgray" 
    : slot.content === "item" && slot.hidden ? "lightblue"
    : "white"

  return (
    <div style={{ 
      background: bg, 
      width: "50px",
      height: "50px",
      outline: "1px solid black",
    }}>
      {slot.content === "item" && !slot.hidden && slot.value}
      <br /> 
      {slot.id}
    </div> 
  )
}
