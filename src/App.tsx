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
    setLevel({ shelves: 1, slots: 5, attempts: 0 })
    setStrikes(0)
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
    
    // hide all items 
    const hiddenCabinet = _.cloneDeep(cabinet)
    const hiddenPickerPool = _.cloneDeep(pickerPool)

    hiddenCabinet.forEach(shelf => {
      shelf.forEach(slot => {
        if (slot.content === "item") {
          slot.hidden = true
        }
      })
    })

    hiddenPickerPool.forEach(item => {
      item.hidden = true
    })

    setCabinet(hiddenCabinet)
    setPickerPool(hiddenPickerPool)

    // reveal all the items in 1s
    setTimeout(() => {
      const revealedCabinet = _.cloneDeep(cabinet)
      const revealedPickerPool = _.cloneDeep(pickerPool)

      revealedCabinet.forEach((shelf) => {
        shelf.forEach((slot) => {
          if (slot.content === "item") {
            slot.hidden = false
          }
        })
      })

      revealedPickerPool.forEach(item => {
        item.hidden = false
      })

      setCabinet(revealedCabinet)
      setPickerPool(revealedPickerPool)

      // hide items to be picked 
      setTimeout(() => {
        const newCabinet = _.cloneDeep(cabinet)
        const valuesToBePicked = _.map(itemsToBePicked, "value")

        newCabinet.forEach((shelf) => {
          shelf.forEach((slot) => {
            if (slot.content === "item" && _.includes(valuesToBePicked, slot.value)) {
              slot.hidden = true
            }
          })
        })

        setCabinet(newCabinet)
      }, 0)
    }, 1000)
  }

  return (
    <div className="game">
      <Stats level={level} strikes={strikes} />
      <Cabinet cabinet={cabinet} />
      {guessing 
        ? <ItemPicker itemPool={pickerPool} handlePick={handlePick} />
        : <StartGuessingButton handleStart={handleStartGuessing} />
      }
    </div>
  )
}

export type IndicatorColor = "red" | "gold" | "gray"

export function Indicator({ color, value }: { color: IndicatorColor, value: number }) {
  const colors = [...Array(value).fill(color), ...Array(3 - value).fill("gray")]

  return (
    <div className="indicator-container">
      {colors.map(color => (
        <div className={`indicator indicator-${color}`}> </div>
      ))}
    </div>
  )
}

export function Stats({ level, strikes }: { level: Level, strikes: number }) {
  return (
    <div className="stats">
      <div className="level">{level.shelves}-{level.slots}</div>
      <Indicator color="gold" value={level.attempts} />
      <Indicator color="red" value={strikes} />
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
