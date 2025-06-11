import { useEffect, useState } from "react"
import { type Level, type Item, type ItemsForLevel } from "./lib/definitions"
import { generateItemsForLevel, generateCabinet } from "./lib/functions"
import { Cabinet, ItemPicker } from "./ui"
import _ from "lodash"

// export type GameState = "memorizing" | "guessing"

export function App() {
  // const [gameState, setGameState] = useState<GameState>("memorizing")

  const [level, setLevel] = useState<Level>({ shelves: 1, slots: 5, attempts: 0 })
  const [items, setItems] = useState<ItemsForLevel>(generateItemsForLevel(level))
  const [strikes, setStrikes] = useState(0)
  const [itemsToBePicked, setItemsToBePicked] = useState<Item[]>(_.sampleSize(_.cloneDeep(items.real), items.pick))
  const [pickerPool, setPickerPool] = useState<Item[]>(_.shuffle([...itemsToBePicked, ...items.fake]))
  const [cabinet, setCabinet] = useState(generateCabinet(level, items.real))
  const [guessing, setGuessing] = useState(false)

  useEffect(() => {
    const newItems = generateItemsForLevel(level)
    const newItemsToBePicked = _.sampleSize(_.cloneDeep(newItems.real), newItems.pick)
    setItems(newItems)
    setItemsToBePicked(newItemsToBePicked)
    setPickerPool(_.shuffle([...newItemsToBePicked, ...newItems.fake]))
    setCabinet(generateCabinet(level, newItems.real))
    setGuessing(false)
  }, [level, strikes])

  // const handleGameStart = () => {
  // }

  const handleGameOver = () => {
    console.log("гамовер")
  }

  const handleLevelUp = () => {
    if (level.attempts < 2) {
      setLevel({ shelves: level.shelves, slots: level.slots, attempts: level.attempts + 1 })
    } else if (level.slots === 5) {
      if (level.shelves === 6) {
        console.log("win")
        return
      }
      setLevel({ shelves: level.shelves + 1, slots: 1, attempts: 0 }) 
    } else {
      setLevel({ shelves: level.shelves, slots: level.slots + 1, attempts: 0})
    }
  }

  const handlePick = (itemValue: string) => {
    const pickedItem = _.find(itemsToBePicked, _.matchesProperty("value", itemValue))
    if (pickedItem !== undefined) {
      // correct
      pickedItem.hidden = true
      setItemsToBePicked([...itemsToBePicked])

      if (_.find(itemsToBePicked, _.matchesProperty("hidden", false)) === undefined) {
        // level up
        console.log("level up")
        handleLevelUp()  
      }
    } else {
      // wrong
      if (strikes === 2) {
        handleGameOver()
        return
      }
      setStrikes(strikes + 1)
    }
  }

  const handleStartGuessing = () => {
    setGuessing(true)
    const newCabinet = _.cloneDeep(cabinet)
    const valuesToBePicked = _.map(itemsToBePicked, _.property("value"))

    newCabinet.forEach(shelf => {
      shelf.forEach(slot => {
        if (slot.content === "item" && _.includes(valuesToBePicked, slot.value)) {
          console.log(slot.value)
          slot.hidden = true
        }
      })
    })

    setCabinet(newCabinet)
  }

  return (
    <div className="game">
      <div style={{ display: "flex", gap: "40px" }}>
        <div>Shelves: {level.shelves}</div>
        <div>Slots: {level.slots}</div>
        <div>Strikes: {strikes} / 3</div>
        <div>Attempts: {level.attempts} / 3</div>
      </div>
      <Cabinet cabinet={cabinet} />
      {guessing 
        ? <ItemPicker itemPool={pickerPool} handlePick={handlePick} />
        : <StartGuessingButton handleStart={handleStartGuessing} />
      }
    </div>
  )
}

export function StartGuessingButton({ handleStart }: { handleStart: () => void }) {
  return (
    <div className="start-guessing">
      <button onClick={handleStart}>
        Запомнил
      </button>
    </div>
  )
}
