import { type Item } from "../lib/definitions"
import { PickerSlot } from "../ui"

type Props = {
  itemPool: Item[], 
  handlePick: (itemValue: string) => void,
}

export function ItemPicker({ itemPool, handlePick }: Props) {
  return (
    <div className="item-picker">
      {itemPool.map(item => (
        item.hidden === false && (
          <PickerSlot
            slot={item} 
            handlePick={handlePick}
            key={item.value} 
          />
        )
      ))}
    </div>  
  )
}
