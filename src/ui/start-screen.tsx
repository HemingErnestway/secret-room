export function StartScreen({ handleStart }: { handleStart: () => void }) {
  return (
    <div className="start-screen">
      <button onClick={handleStart}>
        Start
      </button>
    </div>
  )
}
