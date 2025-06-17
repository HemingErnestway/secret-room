import itemSpriteMap from "../assets/items-sprite.json"
import itemSpriteImage from "../assets/items-sprite.png"
import lockedBgSpriteMap from "../assets/locked-bgs-sprite.json"
import lockedBgSpriteImage from "../assets/locked-bgs-sprite.png"

import { LOCKED_BG_SPRITE_KEYS } from "../lib/constants"
import { type TSlot } from "../lib/definitions"

export function getBgStyle(slot: TSlot) {
  if (slot.content === "locked") {
    const { x, y } = lockedBgSpriteMap[LOCKED_BG_SPRITE_KEYS[slot.id % 4]]

    return {
      width: 50,
      height: 50,
      backgroundImage: `url("${lockedBgSpriteImage}")`,
      backgroundPosition: `-${x}px -${y}px`,
      backgroundSize: `auto`,
      backgroundRepeat: "no-repeat",
    } 
  }

  if (slot.content === "item") {
    const size = 50
    const spriteImageWidth = 673
    const spriteImageHeight = 673

    const { x, y, width } = itemSpriteMap[slot.value]
    const scale = size / width 

    return {
      width: size,
      height: size,
      backgroundImage: `url("${itemSpriteImage}")`,
      backgroundPosition: `-${x * scale}px -${y * scale}px`,
      backgroundSize: `${spriteImageWidth * scale}px ${spriteImageHeight * scale}px`,
      backgroundRepeat: "no-repeat",
    }
  }

  return {}
}

export function Slot({ slot }: { slot: TSlot }) {
  const hidden = slot.content === "item" && slot.hidden ? "hidden" : ""
  const hasBgStyle = slot.content === "item" && !slot.hidden || slot.content === "locked"

  return (
    <div 
      className={`slot ${hidden} ${slot.content === "item" ? "item" : ""}`}
      style={hasBgStyle ? getBgStyle(slot) : {}}
    >
      {slot.content === "item" && !slot.hidden}
    </div> 
  )
}
