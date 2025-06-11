import { type IndicatorColor } from "../lib/definitions"

export function Indicator({ color, value }: { color: IndicatorColor, value: number }) {
  const colors = [...Array(value).fill(color), ...Array(3 - value).fill("gray")]

  return (
    <div className="indicator-container">
      {colors.map((color, index) => (
        <div 
          className={`indicator indicator-${color}`}
          key={index}
        >
        </div>
      ))}
    </div>
  )
}
