import { useState, useEffect } from "react"
import type { GameStage, TSlot } from "./definitions"
import { prepareCabinetForGuessing } from "./functions"

export function useCountdownTimer(gameStage: string, initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
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

  return { timeLeft, setTimeLeft, timerExpired, setTimerExpired }
}

export function useLightsOutTransition(
  gameStage: string,
  setCabinet: React.Dispatch<React.SetStateAction<TSlot[][]>>,
  setGameStage: (stage: GameStage) => void,
  remainingValues: Set<string>,
) {
  useEffect(() => {
    if (gameStage !== "lightsOut") return

    const timer = setTimeout(() => {
      setCabinet(prev => prepareCabinetForGuessing(prev, remainingValues))
      setGameStage("guessing")
    }, 1000)

    return () => clearTimeout(timer)
  }, [gameStage, remainingValues, setCabinet, setGameStage])
}

export function useLockedBackgrounds() {
  const assets = import.meta.glob("/src/assets/locked-bg/*.svg", { eager: true })
  return Object.keys(assets).map((path) => path.split('/').pop()?.split('.')[0])
}
