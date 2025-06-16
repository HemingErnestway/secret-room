import { type TSlot } from "../lib/definitions"
import { Slot } from "../ui"

export function PickerSlot({ slot, handlePick }: { 
  slot: TSlot,
  handlePick: (itemValue: string) => void,
}) {
  return (
    <div onClick={
      () => handlePick(slot.content === "item" ? slot.value : "")
    }>
      <Slot slot={slot} />
    </div>
  )
}
