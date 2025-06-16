import type { IndicatorDisplay, IndicatorEmpty, TIndicator } from "../lib/definitions"

type Props = {
  indicator: IndicatorDisplay,
  value: number,
}

export function Indicator({ indicator, value }: Props) {
  const indicators: TIndicator[] = [
    ...Array<IndicatorDisplay>(value).fill(indicator), 
    ...Array<IndicatorEmpty>(3 - value).fill("empty"),
  ]

  return (
    <div className="indicator-container">
      {indicators.map((indicator, index) => (
        <div className={`indicator indicator-${indicator}`} key={index}></div>
      ))}
    </div>
  )
}
