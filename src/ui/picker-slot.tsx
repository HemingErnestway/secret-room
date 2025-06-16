import { useMemo } from "react"
import { motion } from "motion/react"
import { type TSlot } from "../lib/definitions"
import { Slot } from "../ui"

export function PickerSlot({ slot, handlePick }: { 
  slot: TSlot,
  handlePick: (itemValue: string) => void,
}) {
  const angle = useMemo(() => Math.floor(Math.random() * 360), [])

  return (
    <motion.div 
      className="picker-slot"
      onClick={() => handlePick(slot.content === "item" ? slot.value : "")}
      initial={{ rotate: angle }}
      whileHover={{ scale: 1.2, rotate: angle + Math.floor(Math.random() * 60) - 30 }}
    >
      <Slot slot={slot} />
    </motion.div>
  )
}
