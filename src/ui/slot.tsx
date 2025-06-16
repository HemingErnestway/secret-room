import { LOCKED_BACKGROUNDS } from "../lib/constants"
import { type TSlot } from "../lib/definitions"

export function Slot({ slot }: { slot: TSlot }) {
  const bg 
    = slot.content === "locked" ? `locked-bg/${LOCKED_BACKGROUNDS[slot.id % 4]}`
    : slot.content === "item" ? `items/${slot.value}` : ""

  const hidden = slot.content === "item" && slot.hidden ? "hidden" : ""
  const hasBgStyle = !(slot.content === "empty" || slot.content === "item" && slot.hidden)

  const bgStyle = {
    backgroundImage: `url("/src/assets/${bg}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
    backgroundSize: "contain",
  }

  return (
    <div 
      className={`slot ${hidden} ${slot.content === "item" ? "item" : ""}`}
      style={hasBgStyle ? bgStyle : {}}
    >
      {slot.content === "item" && !slot.hidden}
    </div> 
  )
}
