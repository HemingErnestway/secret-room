export function StartScreen({ handleStart }: { handleStart: () => void }) {
  return (
    <div style={{
      background: "#aaa",
      width: `${50 * 5 + 10 * 4 + 20}px`,
      height: `${50 * 6 + 20 * 5 + 20}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <button onClick={handleStart}>
        Start
      </button>
    </div>
  )
}
