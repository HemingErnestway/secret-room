import { useEffect, useMemo, useState } from "react"
import type { Level, GameStage, TSlot } from "./lib/definitions"
import { StartScreen, Cabinet, Picker } from "./ui"

import { 
  calcNextLevel, 
  formatTime, 
  makeRound, 
  revealByValue,
  revealExcept,
  shuffleUnlocked, 
  toggleHidden,
} from "./lib/functions"

export function App() {
  const [level, setLevel] = useState<Level>({ shelves: 1, slots: 5, attempts: 1 })
  const [strikes, setStrikes] = useState(0)
  const [gameStage, setGameStage] = useState<GameStage>("start")

  const round0 = useMemo(() => makeRound(level), [])

  const [items, setItems] = useState(round0.items)
  const [cabinet, setCabinet] = useState(round0.cabinet)
  const [itemsToPick, setItemsToPick] = useState(round0.itemsToPick)
  const [pickerPool, setPickerPool] = useState(round0.pickerPool)
  const [remaining, setRemaining] = useState(round0.remaining)

  const [timeLeft, setTimeLeft] = useState(60)
  const [timerExpired, setTimerExpired] = useState(false)

  useEffect(() => {
    if (["start", "result"].includes(gameStage) || timerExpired) return 
    
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(id)
          setTimerExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id) 
  }, [gameStage, timerExpired])

  function handleGameStart() {
    setTimeLeft(60)
    setTimerExpired(false)
    setStrikes(0)
    setLevel({ shelves: 1, slots: 5, attempts: 1 })
    setGameStage("memorizing")
  }

  function startNewRound(newLevel: Level) {
    const next = makeRound(newLevel)

    setLevel(newLevel)
    setItems(next.items)
    setCabinet(next.cabinet)
    setItemsToPick(next.itemsToPick)
    setPickerPool(next.pickerPool)
    setRemaining(next.remaining)

    setGameStage("memorizing")
  }

  function advanceAfterSuccess() {
    if (timerExpired) {
      setGameStage("result")
      return
    }

    // attempt 1 -> 2 or 2 -> 3
    if (level.attempts < 3) {
      startNewRound({ ...level, attempts: level.attempts + 1 })
      return
    }

    //  attempt 3 –> level up
    const nextLevel = calcNextLevel(level)
    if (nextLevel === null) {
      setGameStage("result")
    } else {
      startNewRound(nextLevel)
    }
  }

  function handlePick(val: string) {
    // correct 
    if (remaining.has(val)) {
      const nextRemaining = new Set(remaining)
      nextRemaining.delete(val)

      setCabinet(prev => revealByValue(prev, val))
      setRemaining(nextRemaining)

      if (nextRemaining.size === 0) {
        advanceAfterSuccess()
      }

      return
    }

    // wrong
    const nextStrikes = strikes + 1
    setStrikes(nextStrikes)    
  
    if (nextStrikes >= 3) {
      setGameStage("result")
      return
    }

    startNewRound(level)
  }

  function handleGuessing() {
    setCabinet(prev => toggleHidden(prev, true))
    setGameStage("lightsOut")
  }

  useEffect(() => {
    if (gameStage !== "lightsOut") return

    const timer = setTimeout(() => {
      setCabinet(prev => revealExcept(shuffleUnlocked(prev), remaining))
      setGameStage("guessing")
    }, 1000)

    return () => clearTimeout(timer)
  }, [gameStage, remaining])

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
    }}>
      <div style={{
        display: "flex", 
        flexDirection: "column", 
      }}>
        <div>Time Left: {formatTime(timeLeft)}</div>
        <div>Level: {level.shelves}-{level.slots}</div>
        <div>Attempts: {level.attempts}</div>
        <div>Strikes: {strikes}</div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}>
        {gameStage === "start" && (
          <>
            <StartScreen handleStart={handleGameStart} />
            <div style={{ height: "190px", background: "#aaa" }}></div>
          </>
        )}

        {(gameStage === "memorizing" || 
          gameStage === "lightsOut" ||
          gameStage === "guessing"
        ) && (
          <Cabinet cabinet={cabinet} />
        )}

        {gameStage === "memorizing" && (
          <div style={{ 
            height: "190px", 
            background: "#aaa",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
          }}>
            <button onClick={handleGuessing}>Ready</button>
          </div>
        )}

        {gameStage === "lightsOut" && (
          <div style={{ height: "190px", background: "#aaa" }}></div>
        )}

        {gameStage === "guessing" && (() => {
          const revealedValues = new Set<string>(
            cabinet
              .flat()
              .filter((slot): slot is Extract<TSlot, { content: "item" }> => 
                slot.content === "item" && !slot.hidden)
              .map(slot => slot.value)
          ) 

          return (
            <Picker 
              slots={pickerPool} 
              handlePick={handlePick} 
              revealedValues={revealedValues}
            />
          )
        })()}

        {gameStage === "result" && (
          <div>
            <h2>Results</h2>
            <div>Score: {((level.shelves * 5 + level.slots - 1) * 3 + level.attempts) * 10}</div> 
            <button onClick={handleGameStart}>Restart</button>
          </div>
        )}
      </div>
    </div>    
  )
}
