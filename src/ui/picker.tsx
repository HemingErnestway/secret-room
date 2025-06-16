import { type TSlot } from "../lib/definitions"
import { PickerSlot } from "../ui"

export function Picker({ slots, handlePick, revealedValues }: { 
  slots: TSlot[],
  handlePick: (itemValue: string) => void,
  revealedValues: Set<string>,
}) {
  return (
    <div className="picker">
      {slots.map(slot => {
        const isRevealed = slot.content === "item" && revealedValues.has(slot.value)
        if (isRevealed) return null

        return (
          <PickerSlot 
            slot={slot} 
            handlePick={handlePick} 
            key={`picker-slot-${slot.id}`} 
          />
        )
      })}
    </div>
  )
}
