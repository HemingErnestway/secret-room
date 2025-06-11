import { type PickerSlot } from "../lib/definitions"
import { Slot } from "../ui"

type Props = {
  slot: PickerSlot,
  handlePick: (itemValue: string) => void,
}

export function PickerSlot({ slot, handlePick }: Props) {
  return (
    <div onClick={() => handlePick(slot.content === "item" ? slot.value : "")}>
      <Slot slot={slot} />
    </div>
  )
}