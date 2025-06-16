import { motion } from "motion/react"
import { type Level } from "../lib/definitions"

type Props = {
  level: Level;
  handleRestart: () => void;
}

export function ResultScreen({ level, handleRestart }: Props) {
  const score = ((level.shelves * 5 + level.slots - 1) * 3 + level.attempts) * 10

  return (
    <div className="result-screen">
      <h2>Score: {score}</h2>
      <motion.button 
        onClick={handleRestart}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 }
        }}
      >
        Restart
      </motion.button>
    </div>
  )
}