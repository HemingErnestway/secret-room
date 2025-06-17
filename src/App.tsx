import { motion } from "motion/react"
import { useMemo, useState } from "react"
import type { Level, GameStage, TSlot } from "./lib/definitions"
import { useCountdownTimer, useLightsOutTransition } from "./lib/hooks"
import { StartScreen, Cabinet, Picker, Stats, ResultScreen } from "./ui"
import { calcNextLevel, makeRound, revealByValue, toggleHidden } from "./lib/functions"

export function App() {
  const [level, setLevel] = useState<Level>({ shelves: 1, slots: 5, attempts: 1 })
  const [strikes, setStrikes] = useState(0)
  const [gameStage, setGameStage] = useState<GameStage>("start")

  const round0 = useMemo(() => makeRound(level), [])

  const [_items, setItems] = useState(round0.items)
  const [cabinet, setCabinet] = useState(round0.cabinet)
  const [_itemsToPick, setItemsToPick] = useState(round0.itemsToPick)
  const [pickerPool, setPickerPool] = useState(round0.pickerPool)
  const [remainingValues, setRemaining] = useState(round0.remainingValues)

  const { 
    timeLeft, setTimeLeft, 
    timerExpired, setTimerExpired,
  } = useCountdownTimer(gameStage, 60)

  useLightsOutTransition(gameStage, setCabinet, setGameStage, remainingValues)

  function handleStart() {
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
    setRemaining(next.remainingValues)

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
    if (remainingValues.has(val)) {
      const nextRemaining = new Set(remainingValues)
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
  
    if (nextStrikes >= 3 || timerExpired) {
      setGameStage("result")
      return
    }

    startNewRound(level)
  }

  function handleGuessing() {
    setCabinet(prev => toggleHidden(prev, true))
    setGameStage("lightsOut")
  }

  function handleRestart() {
    const firstLevel = { shelves: 1, slots: 5, attempts: 1 }

    setTimeLeft(60)
    setTimerExpired(false)
    setStrikes(0)

    startNewRound(firstLevel)
  }

  return (
    <div className="app">
      <Stats level={level} timeLeft={timeLeft} strikes={strikes} />

      <div className="game-container">
        {gameStage === "start" && (
          <>
            <StartScreen />
            <div className="start-container">
              <motion.button 
                onClick={handleStart}
                whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              >
                Start
              </motion.button>
            </div>
          </>
        )}

        {["memorizing", "lightsOut", "guessing"].includes(gameStage) && (
          <Cabinet cabinet={cabinet} />
        )}

        {gameStage === "memorizing" && (
          <div className="ready-container">
            <motion.button 
              onClick={handleGuessing}
              whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
            >
              Ready
            </motion.button>
          </div>
        )}

        {gameStage === "lightsOut" && (
          <div style={{ height: "190px", background: "var(--color-bg-dark)" }}></div>
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
          <>
            <ResultScreen level={level} />
            {/* <div style={{ height: "190px", background: "var(--color-bg-light)" }}></div> */}
            <div className="start-container">
              <motion.button 
                onClick={handleRestart}
                whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              >
                Restart
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>    
  )
}
