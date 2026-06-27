import { useState, useCallback } from "react"
import { cn } from "@/utils/cn"

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  values: [number, number]
  onChange: (values: [number, number]) => void
  formatLabel?: (value: number) => string
}

export function RangeSlider({
  min,
  max,
  step = 1,
  values,
  onChange,
  formatLabel,
}: RangeSliderProps) {
  const [localValues, setLocalValues] = useState(values)

  const handleChange = useCallback(
    (index: 0 | 1, e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues: [number, number] = [...localValues]
      newValues[index] = Number(e.target.value)
      if (index === 0 && newValues[0] > newValues[1]) newValues[0] = newValues[1]
      if (index === 1 && newValues[1] < newValues[0]) newValues[1] = newValues[0]
      setLocalValues(newValues)
      onChange(newValues)
    },
    [localValues, onChange]
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-navy-500">
        <span>{formatLabel ? formatLabel(localValues[0]) : localValues[0]}</span>
        <span>{formatLabel ? formatLabel(localValues[1]) : localValues[1]}</span>
      </div>
      <div className="relative h-2">
        <div className="absolute inset-0 rounded-full bg-navy-100" />
        <div
          className="absolute top-0 bottom-0 rounded-full bg-teal-500"
          style={{
            left: `${((localValues[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((localValues[1] - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[0]}
          onChange={(e) => handleChange(0, e)}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-teal-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[1]}
          onChange={(e) => handleChange(1, e)}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-teal-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  )
}
