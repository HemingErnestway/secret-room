import { useState } from "react"
import { type Level, type Item, type ItemsForLevel } from "./lib/definitions"
import { generateItemsForLevel, generateCabinet } from "./lib/functions"
import { Cabinet, ItemPicker } from "./ui"
import _ from "lodash"

export type GameState = "memorizing" | "guessing"

export function App() {
  const [level, setLevel] = useState<Level>({ shelves: 1, slots: 5 })
  const [items, setItems] = useState<ItemsForLevel>(generateItemsForLevel(level))

  const [itemsToBePicked, setItemsToBePicked] = useState<Item[]>(
    _.sampleSize(_.cloneDeep(items.real), items.pick)
  )

  const [pickerPool, setPickerPool] = useState<Item[]>(
    _.shuffle([...itemsToBePicked, ...items.fake])
  )

  const handlePick = (itemValue: string) => {
    const pickedItem = _.find(itemsToBePicked, _.matchesProperty("value", itemValue))

    if (pickedItem !== undefined) {
      // correct
      console.log("correct")
      pickedItem.hidden = true
      setItemsToBePicked([...itemsToBePicked])
    } else {
      // wrong
      console.log("wrong")
    }
  }

  const [cabinet, setCabinet] = useState(generateCabinet(level, items.real))

  return (
    <div className="game">
      <Cabinet cabinet={cabinet} />
      <ItemPicker 
        itemPool={pickerPool}
        handlePick={handlePick}
      />
    </div>
  )
}
