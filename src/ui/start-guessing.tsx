export function StartGuessing({ handleStart }: { handleStart: () => void }) {
  return (
    <div className="start-guessing">
      <button onClick={handleStart}>
        Запомнил
      </button>
    </div>
  )
}
