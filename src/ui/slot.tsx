import spriteMap from "../assets/items-sprite.json"
import spriteImage from "../assets/items-sprite.png"

import { LOCKED_BACKGROUNDS } from "../lib/constants"
import { type TSlot } from "../lib/definitions"


export function Slot({ slot }: { slot: TSlot }) {
  // const bg 
  //   = slot.content === "locked" ? `url("/src/assets/locked-bg/${LOCKED_BACKGROUNDS[slot.id % 4]}.svg")`
  //   : slot.content === "item" ? `url("/src/assets/items/${slot.value}.png")` : ""

  const hidden = slot.content === "item" && slot.hidden ? "hidden" : ""
  const hasBgStyle = !(slot.content === "empty" || slot.content === "item" && slot.hidden || slot.content === "locked")

  let bgStyle = {}

  if (hasBgStyle) {
    const size = 50
    const spriteImageWidth = 673
    const spriteImageHeight = 673

    const { x, y, width, height } = spriteMap[slot.value]
    const scale = size / width 

    bgStyle = {
      width: size,
      height: size,
      backgroundImage: `url("${spriteImage}")`,
      backgroundPosition: `-${x * scale}px -${y * scale}px`,
      backgroundSize: `${spriteImageWidth * scale}px ${spriteImageHeight * scale}px`,
      backgroundRepeat: "no-repeat",
    }
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
