import { useEffect, useRef, useState } from "react"
import { type Level, type Item, type ItemsForLevel, type GameStage } from "./lib/definitions"
import { generateItemsForLevel, generateCabinet } from "./lib/functions"
import { Cabinet, ItemPicker, Stats, StartGuessing } from "./ui"
import _ from "lodash"

export function App() {
  const [level, setLevel] = useState<Level>({ shelves: 3, slots: 1, attempts: 2 })
  const [items, setItems] = useState<ItemsForLevel>(generateItemsForLevel(level))
  const [strikes, setStrikes] = useState(0)
  const [itemsToBePicked, setItemsToBePicked] = useState<Item[]>(_.sampleSize(_.cloneDeep(items.real), items.pick))
  const [pickerPool, setPickerPool] = useState<Item[]>(_.shuffle([...itemsToBePicked, ...items.fake]))
  const [cabinet, setCabinet] = useState(generateCabinet(level, items.real))
  const [gameStage, setGameStage] = useState<GameStage>("start")

  const prevLevel = useRef(level)
  const prevStrikes = useRef(strikes)

  useEffect(() => {
    if (prevLevel.current !== level || prevStrikes.current !== strikes) {
      const newItems = generateItemsForLevel(level)
      const newItemsToBePicked = _.sampleSize(_.cloneDeep(newItems.real), newItems.pick)

      setItems(newItems)
      setItemsToBePicked(newItemsToBePicked)
      setPickerPool(_.shuffle([...newItemsToBePicked, ...newItems.fake]))
      setCabinet(generateCabinet(level, newItems.real))

      setGameStage("memorizing")

      // if (level.shelves === 1 && level.slots === 5 && level.attempts === 0) {
      //   setTimeLeft(60)
      //   setTimerRunning(true)
      // }
    }
    prevLevel.current = level
    prevStrikes.current = strikes
  }, [level, strikes])

  const [timeLeft, setTimeLeft] = useState(60)
  const [timerRunning, setTimerRunning] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (timerRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timerRunning && timeLeft <= 0) {
      handleGameOver()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerRunning, timeLeft])

  const handleGameOver = () => {
    setStrikes(0)
    setTimeLeft(60)
    setTimerRunning(false)
    setGameStage("result")
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

  const handlePick = (value: string) => {
    console.log(itemsToBePicked)

    setItemsToBePicked((old) =>
      old.map((item) =>
        item.value === value 
          ? { ...item, hidden: true } 
          : item
      )
    )

    setTimeout(() => {
      setItemsToBePicked((latest) => {
        if (latest.every((item) => item.hidden)) {
          handleLevelUp()
        }
        return latest
      })
    }, 0)
  }

  const handleStartGuessing = () => {
    setGameStage("guessing")

    // 1) Deep-clone the current cabinet and pickerPool:
    const hiddenCabinet = _.cloneDeep(cabinet)
    const hiddenPickerPool = pickerPool.map((item) => ({
      ...item,
      hidden: true,
    }))

    // 2) Hide every item‐slot in the cabinet:
    hiddenCabinet.forEach((shelf) => {
      shelf.forEach((slot, idx) => {
        if (slot.content === "item") {
          // overwrite that slot with a new object
          shelf[idx] = { ...slot, hidden: true }
        }
      })
    })

    // 3) Push these into state immediately:
    setCabinet(hiddenCabinet)
    setPickerPool(hiddenPickerPool)

    // 4) After 1s, reveal all, then immediately re-hide only the “to-be-picked” ones:
    setTimeout(() => {
      // a) Reveal everything
      const revealedCabinet = _.cloneDeep(hiddenCabinet)
      const revealedPickerPool = hiddenPickerPool.map((item) => ({
        ...item,
        hidden: false,
      }))

      revealedCabinet.forEach((shelf) => {
        shelf.forEach((slot, idx) => {
          if (slot.content === "item") {
            shelf[idx] = { ...slot, hidden: false }
          }
        })
      })

      setCabinet(revealedCabinet)
      setPickerPool(revealedPickerPool)

      // b) Immediately hide only those values we need to pick
      const pickSet = new Set(itemsToBePicked.map((i) => i.value))
      const finalCabinet = _.cloneDeep(revealedCabinet)

      finalCabinet.forEach((shelf) => {
        shelf.forEach((slot, idx) => {
          if (slot.content === "item" && pickSet.has(slot.value)) {
            shelf[idx] = { ...slot, hidden: true }
          }
        })
      })

      setCabinet(finalCabinet)
    }, 1000)
  }


  const handleGameStart = () => {
    setTimerRunning(true)
    setGameStage("memorizing")
  }

  return (
    <div className="game">
      <Stats level={level} strikes={strikes} timeLeft={timeLeft} />

      {gameStage === "start" && 
        <StartScreen handleStart={handleGameStart} />
      }

      {gameStage === "guessing" && (
        <>
          <Cabinet cabinet={cabinet} />
          <ItemPicker itemPool={pickerPool} handlePick={handlePick} />
        </>
      )}

      {gameStage === "memorizing" && (
        <>
          <Cabinet cabinet={cabinet} />
          <StartGuessing handleStart={handleStartGuessing} />
        </>
      )}

      {gameStage === "result" && (
        <ResultScreen handleStart={handleGameStart} />
      )}
    </div>
  )
}

export function StartScreen({ handleStart }: { handleStart: () => void }) {
  return (
    <div className="start-screen">
      <button onClick={handleStart}>
        Начать тест
      </button>
    </div>
  )
}

export function ResultScreen({ handleStart }: { handleStart: () => void }) {
  return (
    <div className="start-screen">
      <button onClick={handleStart}>
        Повторить
      </button>
    </div>
  )
}


